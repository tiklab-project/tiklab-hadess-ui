/**
 * @name: acgency
 * @author: limingliang
 * @date: 2022-12-29 10:30
 * @description：代理信息
 * @update: 2022-12-29 10:30
 */
import React, {useState, useEffect} from "react";
import "./Agency.scss"
import {Button, Modal, Space, Table} from "antd";
import AgencyCompile  from "./AgencyAddEdit";
import proxyService from "../api/ProxyApi";
import {ExclamationCircleOutlined} from "@ant-design/icons";
const { confirm } = Modal;
const Agency = (props) => {
    const {match:{params}} = props;
    //代理信息列表
    const [agencyList,setAgencyList]=useState([])
    //代理信息
    const [agency,setAgency]=useState(null)
    //编辑弹窗的状态
    const [visible,setVisible]=useState(false)
    //编辑的类型 add、update
    const [compileType,setCompileType]=useState(null)

    const columns = [
        {
            title: '来源',
            dataIndex: 'agencyName',
            width:'20%',
            render:(text,record)=><div className=''> {text}</div>
        },
        {
            title: '地址',
            dataIndex: 'agencyUrl',
            width:'50%',
        },
        {
            title: '操作',
            key: 'activity',
            width:'10%',
            render: (text, record) => (
                <Space size="useState" className='space-x-4 text-blue-500 cursor-pointer'>
                    <div onClick={()=>updateAgency(record)}>配置</div>
                    <div onClick={()=>openDeletePop(record)}>删除</div>
                </Space>
            )
        },
    ];

    useEffect(async () => {
        await findAgencyList()
    }, []);

    /**
     * 查询代理信息列表
     */
    const findAgencyList = async () => {
      const param={
          repositoryId:params.id
      }
      const res =  await proxyService.findRepositoryRemoteProxyList(param)
      if (res.code===0){
          setAgencyList(res.data)
      }
    }

    /**
     * 关闭编辑代理信息弹窗
     */
    const onCancel = async () => {
        await findAgencyList()
        setVisible(false)
    }
    /**
     * 打开创建代理信息弹窗
     */
    const openAgencyCompile =async () => {
        setCompileType('add')
        setVisible(true)
    }
    /**
     * 打开编辑代理信息弹窗
     * @param  value 代理信息
     */
    const updateAgency =async (value) => {
        setAgency(value)
        setCompileType('update')
        setVisible(true)
    }

    /**
     * 删除代理信息的弹窗
     * @param  agency 代理信息
     */
    const openDeletePop =async (agency) => {
        confirm({
            title: '是否确认删除该代理配置',
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',

            onOk() {
                deleteAgency(agency.id)
            },
            onCancel() {
            },
        });
    }
    /**
     * 删除代理信息
     * @param  agency 代理信息id
     */
    const deleteAgency =async (id) => {
      const param = new FormData();
      param.append("id",id)
      const res =  await proxyService.deleteRepositoryRemoteProxy(param)
        if (res.code===0){
           await findAgencyList()
        }
    }

    return(
        <div className='agency'>
            <div className='agency-width'>
                <div className='agency-exe-table'>
                    <div className=' agency-title'>代理</div>
                    <div className='agency-button'>
                        <Button type="primary" htmlType="submit" onClick={openAgencyCompile}>
                            + 代理来源
                        </Button>
                    </div>
                </div>
                {/*<Deploy type={"agency"}  repositoryId={params.id} {...props}/>*/}
                <div className='agency-table'>
                    <Table
                        dataSource={agencyList}
                        columns={columns}
                        pagination={false}
                    />
                </div>
                <AgencyCompile visible={visible} onCancel={onCancel} repositoryId={params.id} agency={agency} compileType={compileType}/>
            </div>
        </div>
    )
}
export default Agency
