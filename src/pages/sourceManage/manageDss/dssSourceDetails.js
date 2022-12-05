
/**
 * @name: TenantDssList
 * @author: limingliang
 * @date: 2022-05-16 14:30
 * @description：租户的数据源列表管理
 * @update: 2022-05-16 14:30
 */
import React, {useState, useEffect} from "react";
import {Breadcrumb, Button, Input, message, Select, Space, Table} from "antd";
import tenantService from "../../../service/tenant.service";
const { Option } = Select;
import TenantDssUpdate from "./tenantDssUpdate";
import './manageDss.scss'
const DssSourceDetails = props => {
    const {match:{params}} = props;

    const [name, setName] = useState('');   //搜索内容
    const [tenantDssDataList,setTenantDssDataList]=useState([])  //
    const [dssData,setDssData]=useState()
    const [allDssData, setAllDssData] = useState([]);   //所有的dss数据源
    const [oldDss,setOldDss]=useState()  //原dss数据源
    const [tenantDssVisible,setTenantDssVisible]=useState(false)  //修改租户的dss数据源弹窗
    const [tenantDssIds,setTenantDssIds]=useState([])  //需要切换数据源租户的dss
    const [type,setType]=useState()  //类型
    const [dataState,setDataState]=useState(true)
    const columns = [
        {
            title: '租户名称',
            dataIndex: ['tenant','name'],
        },
        {
            title: '产品',
            dataIndex: 'app',
        },
        {
            title: '地址',
            dataIndex: 'url',
        },
        {
            title: '操作',
            key: 'activity',
            render: (text, record) => (
                <Space size="useState">
                    <div className='border border-gray-200 bg-blue-400 px-2 text-white cursor-pointer'onClick={()=>openUpdateVisible(record)} >
                        切换
                    </div>
                </Space>
            ),
        },
    ];
    useEffect(async ()=>{
        setType(params.type)
        await findDssSource(params.id)
    },[])

    //通过id查询dss数据源详情
    const findDssSource =async (id) => {
      const param=new FormData()
        param.append('id',id)
        const res = await  tenantService.findTenantDsGroup(param)

        if (res.code===0){
            setDssData(res.data)

            await findTenantDss(1,res.data)
        }
    }
    const findTenantDss =async (type,dss,name) => {

        const param={
            dssGroupId:id,
            tenantName:name
        }
        let res;
        if (dss.dsType==="dss"){
             res= await tenantService.findTenantDssByCon(param)
        }
         if (dss.dsType==="dfs"){
              res= await tenantService.findTenantDfsByCon(param)
         }
        if (dss.dsType==="dcs"){
             res= await tenantService.findTenantDcsByCon(param)
        }

        if (res.code===0){
            if (!res.data.length&&type===1){
                setDataState(false)
            }
            setTenantDssDataList(res.data)
        }
        await findAllDss(dss)
    }


    //查询所有dss数据源
    const findAllDss = async (value) => {
        const param={
            dsType:value.dsType
        }
        const res=await tenantService.findTenantDsGroupList(param)
        if (res.code===0){
            setAllDssData(res.data)
        }
    }
    //打开单个修改租户db数据弹窗
    const openUpdateVisible = (value) => {
        setOldDss(value)
        setTenantDssVisible(true)
    }
    //打开多个修改租户的弹窗
    const openUpdateVisibleS = async () => {
        if (tenantDssIds.length){
            const database=JSON.parse(sessionStorage.getItem("dss"));
            await openUpdateVisible(database)
        }
    }

    const closeUpdateVisible =async () => {
        setName('')
        setTenantDssIds([])
        setTenantDssVisible(false)
        await findTenantDss(2,dssData)
    }
    //通过名字搜索租户
    const onInputName = (e) => {
        const value = e.target.value
        setName(value)

    }
    const onSearch = async () => {
        if (tenantDssIds.length){
            return message.warn('请取消多选在搜索');
        }
        await findTenantDss(2,dssData,name)
    }

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setTenantDssIds(selectedRowKeys)
        }
    };

    return(
        <div className='manage-dss'>
            <Breadcrumb separator="/" className=' manage-title'>
                <Breadcrumb.Item href="#/index/sourceManage/manageDss">dss数据源列表</Breadcrumb.Item>
                <Breadcrumb.Item href="">详情</Breadcrumb.Item>
            </Breadcrumb>
            {
                dssData&&
                <div className='manage-data'>
                    <div>
                        {type==='dss'&&'dss路径'||type==='dfs'&&'dfs路径'||type==='dcs'&&'dcs路径'}: {dssData.url}
                    </div>
                    <div>类型: {dssData.dsType}</div>
                    <div>简介: {dssData.details}</div>
                </div>
            }
            { dataState?
                <div>
                    <div className='flex mt-6 justify-between'>
                        <div className='text-base  font-medium'>{`企业${type}数据源列表`}</div>
                        <Button type="primary" onClick={openUpdateVisibleS}>批量切换</Button>
                    </div>
                    <div className='mt-4'>
                        {/*<div className='flex justify-between py-4 pl-4 px-2' >
                            <div className='flex space-x-6 '>
                                <div>
                                    <Input placeholder={'搜索租户'} style={{ width: 240 }} value={name} onChange={onInputName}  onPressEnter={onSearch}/>
                                </div>
                            </div>

                        </div>*/}
                        <div className='' >
                            <Table
                                rowSelection={{
                                    type: 'checkbox',
                                    ...rowSelection,
                                }}
                                columns={columns}
                                dataSource={tenantDssDataList}
                                rowKey = {record => record.id}
                               // scroll={{ y: 400 }}
                                pagination={false}
                            />
                        </div>
                    </div>
                </div>
              :
                <div className='border border-gray-200 h-12 text-center py-3 bg-gray-50'>
                    该数据源下面没有租户
                </div>

            }
            <TenantDssUpdate  visible={tenantDssVisible} onCancel={closeUpdateVisible} oldDssData={oldDss} allDssData={allDssData} tenantDssIds={tenantDssIds}/>

        </div>

)
}
export default DssSourceDetails