/**
 * @name: Tenant
 * @author: mahai
 * @date: 2021-08-09 14:30
 * @description：租户管理
 * @update: 2021-08-09 14:30
 */
import React, {useState, useEffect} from "react";
import {
    Row,
    Col,
    Input,
    message,
    Table,
    Space,
    Modal,
    Switch,
    Tooltip,
    Tag,
    Spin,
    Image, Pagination
} from "antd";
import tenantService from "../../service/tenant.service"
import {withRouter} from "react-router";
import './tenant.scss'
const { confirm } = Modal;
import TenantDetails from './tenantDetails'
import {ExclamationCircleOutlined} from "@ant-design/icons";
import Paging from "../../common/components/paging";
const Tenant = props => {
    const [name, setName] = useState('');
    const [tenantList, setTenantList] = useState([]);   //企业list
    const [tenant,setTenant]=useState()  //企业数据
    const [memberDataList,setMemberDataList]=useState()   //企业的成员数据
    const [currentPage, setCurrentPage] = useState(1);  //当前页
    const [pageSize] = useState(10);
    const [totalPage,setTotalPage]=useState(0);  //总页数
    const [spinning, setSpinning] = useState(false)
    const [visible,setVisible]=useState(false)    //详情抽屉打开状态
    const columns = [
        {
            title: '租户名称',
            dataIndex: 'name',
            render: (text, record) => (
                <a className='text-blue-500 cursor-pointer' onClick={() => openDetails(record)}>{filedState(record.name)}</a>
            )},
        {
            title: '访问地址',
            dataIndex: 'id',
            render: (text, record) => (
                <div className={(record.isDelete===1?'':' text-gray-300')}>{record.id}</div>
            )
        },
        {
            title: '用户',
            dataIndex: ['master','nickName'],
            render: (text, record) => (
                <div className={(record.isDelete===1?'':' text-gray-300')}>{filedState(record.master?.nickName)}</div>
            )
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            render:(text,record)=><div className={(record.isDelete===1?'':' text-gray-300')}>{text}</div>
        },
        {
            title: '启用状态',
            key: 'useState',
            render: (text, record) => (
                <Space size="middle">
                    {
                        record.useState===1&& <Tag color={'green'} key={text} >启用</Tag>||
                        record.useState===2&& <Tag color={'red'} key={text}>禁用</Tag>
                    }
                </Space>
            )},
        {
            title: '删除状态',
            dataIndex: 'isDelete',
            render: (text, record) =>(
                <Space size="middle">
                    {
                        record.useState!==3?record.isDelete===1?
                            <Tag color={'green'} key={text}>
                                正常
                            </Tag>:
                            <div className='text-gray-300'>
                                已删除
                            </div>:
                            <div className='text-red-400'>数据恢复中...</div>
                    }
                </Space>
            )
        },
        {
            title: '操作',
            key: 'activity',
            render: (text, record) => (
                <Space size="useState" className='space-x-3 text-blue-500'>
                    {
                        record.useState!==3&&record.isDelete===2?
                            <a onClick={()=>recoverData(record)}>恢复数据</a>: ''
                    }
                    {record.isDelete!==2&&record.useState==1?
                        <a  disabled>启用</a>:
                        <a onClick={()=>disable(record,'open')}>启用</a>
                    }
                    {record.isDelete!==2&&record.useState==2?
                        <a  disabled>禁用</a>:
                        <a onClick={()=>disable(record,'close')}>禁用</a>
                    }
                </Space>
            ),
        },
    ];

    useEffect(async ()=>{
        await getFindMemberData(currentPage)
    },[])


    const filedState = (value) => {
        return(
            value?.length>25?
                <Tooltip placement="right" title={value}>
                    <div style={{
                        width: 150,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                    }}>
                        {value}
                    </div>
                </Tooltip>
                :
                <div>{value}</div>
        )
    }

    //打开企业抽屉
    const openDetails = async (value) => {
        await findTenantMember(value)
        setTenant(value)
        setVisible(true)
    }
    //关闭企业抽屉
    const onClose = () => {
        setVisible(false)
    }
    //启用
    const openTenantState =async (record) => {
        record.useState=1
        await updateTenant(record)
    }
    //禁用
    const closeTenantState =async (record) => {
        record.useState=2
        await updateTenant(record)
    }



    //修改租户
      const updateTenant=async param=>{
          //修改租户
          const pre=await tenantService.updateTenantService(param)

         await getFindMemberData(currentPage)
    }

    //分页条件查询租户
    const getFindMemberData=async (currentPage)=>{
        const param={
            pageParam: {
                pageSize: pageSize,
                currentPage: currentPage,
            },
            name:name
        }
        const res = await  tenantService.findTenantListPage(param)
        if(res.code===0){
            setTotalPage(res.data.totalPage)
            setTenantList(res.data.dataList)
        }
    }

    //条件查询
    const onSearch = async () => {
       await  getFindMemberData(currentPage)
    }
    //查询输入的内容
    const onInputName = (e) => {
        const value = e.target.value
        setName(value)
    }

    //分页查询
    const handleTableChange = async (value) => {
        setCurrentPage(value)
        await getFindMemberData(value)

    }
    //查询该租户的成员
    const findTenantMember=async (tenantData)=>{
        const param={
            tenantId:tenantData.id
        }
        const pre=await tenantService.findTenantMemberService(param)
        if (pre.code===0){
            setMemberDataList(pre.data)
        }
    }

    //恢复数据
    const recoverData =async (tenant) => {
        setSpinning(true)
      const res=await tenantService.recoverData(tenant)
        setSpinning(false)
        await getFindMemberData(currentPage)
    }

    //启用禁用弹窗
    const disable=async (data,type)=>{
        confirm({
            title: [type==='open'?'确定启用':'注意! 禁用后该企业不可用,请谨慎操作'],
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                if (type==='open'){
                    openTenantState(data)
                }else {
                    closeTenantState(data)
                }
            },
            onCancel() {
            },
        });
    }

    return(
        <Spin tip="Loading..." spinning={spinning}>
            <div className='tenant'>
                <div className='tenant-title'>
                  {/*  <img src={titleImage} alt='' width={20}  height={20}/>*/}
                    <div>租列表</div>
                </div>

                <Row gutter={[16, 16]} className='tenant-data'>
                    <Col span={6}>
                        <Input placeholder={'租户名称'} value={name} onChange={onInputName} onPressEnter={onSearch} />
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Table
                            dataSource={tenantList}
                            columns={columns}
                            rowKey={record => record.id}
                            pagination={false}
                        />
                    </Col>
                </Row>
                <Paging totalPage={totalPage} currentPage={currentPage} handleTableChange={handleTableChange}/>
            </div>
            <TenantDetails onClose={onClose} visible={visible} tenantData={tenant} memberDataList={memberDataList} />
        </Spin>
    )
}

export default  withRouter(Tenant)
