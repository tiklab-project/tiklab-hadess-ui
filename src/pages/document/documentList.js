/**
 * @name: repository
 * @author: limingliang
 * @date: 2022-01-20 14:30
 * @description：空间管理
 * @update: 2022-01-20 14:30
 */
import {withRouter} from "react-router";
import React,  {useState, useEffect} from "react";
import {Breadcrumb, Button, Col, Input, Row, Select, Space, Table,Modal,Tooltip } from "antd";
import documentService from "../../service/document.service"
import CreateOrUpdateRepository from "./popup/createOrUpdateRepository";
import {comment} from "postcss";
import {ExclamationCircleOutlined} from "@ant-design/icons";
const { confirm } = Modal;
const DocumentList = props => {
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalRecord, setTotalRecord] = useState('');
    const [repositoryData,setRepositoryData]=useState([]) //空间
    const [visible, setVisible] = useState(false); //创建弹窗状态
    const [editData, setEditData] = useState(null);  //编辑空间传到弹窗的数据
    const [name,setName]=useState('');// 搜索名称
    const columns = [
        {
            title: '知识库名称',
            dataIndex: 'name',
            render: (text, record) => {
                return <a className='text-blue-500' onClick={() => skipDocument(record)}>{record.name}</a>
            }
        },
        {
            title: '知识库编码',
            dataIndex:'id',
        },

        {
            title: '创建人',
            dataIndex: ['user','name'],
        },
        {
            title: '描述',
            dataIndex: 'desc',
            render: (text, record) => {
                return <Tooltip placement="top" title={text}><div style={{width:280,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{text}</div></Tooltip>
            }
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => editRepository(record)}>编辑</a>
                    <a onClick={() => deletePop(record.id)}>删除</a>
                </Space>
            ),
        },
    ];
    useEffect(async ()=>{
        await findRepository(page)
    },[])

    const skipDocument=async (record)=>{
        props.history.push({
            pathname:"/setting/document/details",
            params:record
        });
    }
    //查询所有文档空间
    const findRepository=async (page)=>{
        const param={
            name:name,
             pageParam: {
                pageSize: pageSize,
                currentPage: page,
             }
        }

     const res=  await documentService.findRepositoryPage(param)
        if (res.code===0){
            setRepositoryData(res.data.dataList)
            setTotalRecord(res.data.total)
        }
    }
    //编辑文档空间
    const editRepository=(record)=> {
        debugger
        setEditData(record)
        openCreatePopup()
    }
    //删除弹窗
    const deletePop=async (data)=>{
        confirm({
            title: '是否删除该文档空间',
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                deleteRepository(data)
            },
            onCancel() {
            },
        });
    }
    //删除文档空间
    const deleteRepository=async (data)=>{
        const param=new FormData();
        param.append('id',data)
      const res= await documentService.deleteRepository(param)
        if (res.code===0){
           setRepositoryData( repositoryData.filter(item=>item.id!==data))
        }
    }

    //打开创建弹窗
   const openCreatePopup=()=>{
       setVisible(true)
   }
    //取消创建弹窗
    const onCancel = async () => {
        setVisible(false)
    }
    //确认添加
    const onOk=async ()=>{
        setVisible(false)
        await findRepository(page)
    }
    //分页
    const handleTableChange = async (pagination) => {
        setPage(pagination.current)
        await findRepository(pagination.current)
    }
    const onInputName = (e) => {
        const value = e.target.value
        setName(value)
    }
    const onSearch = async () => {
        await findRepository(page)
    }
    return(
        <section className='w-full flex flex-row'>
            <div className='w-full p-6 max-w-full m-auto'>
                <Breadcrumb separator=">" className='border-b border-solid pb-4'>
                    <Breadcrumb.Item>文档管理</Breadcrumb.Item>
                    <Breadcrumb.Item href=""> 文档列表</Breadcrumb.Item>
                </Breadcrumb>

                {
                    repositoryData.length>0?
                        <div>
                            <Row gutter={[16, 16]} className='py-6'>
                                <Col span={6}>
                                    <Input placeholder={'搜索名称'} value={name} onChange={onInputName} onPressEnter={onSearch}/>
                                </Col>
                                <Col span={10} offset={8} className='flex justify-end'>
                                    <Button type="primary" onClick={openCreatePopup}>添加文档空间</Button>
                                </Col>
                            </Row>
                            <Row gutter={[16, 16]} >
                                <Col span={24}>
                                    <Table
                                        dataSource={repositoryData}
                                        columns={columns}
                                        rowKey={record => record.id}
                                        pagination={{
                                            current:page,
                                            pageSize: pageSize,
                                            total: totalRecord,
                                        }}
                                        onChange={(pagination, filters, sorter) => handleTableChange(pagination, filters, sorter)}
                                    />
                                </Col>
                            </Row>
                        </div>

                    : <div>
                        <section className='w-full m-auto border-solid border-2 p-6 mt-6 max-w-screen-xl text-center'>
                        还没有创建任何文档
                        <span className='text-blue-600 cursor-pointer' onClick={openCreatePopup}>创建</span>
                        </section>
                    </div>

                }
            </div>
            <CreateOrUpdateRepository visible={visible} onCancel={onCancel} onok={onOk} editData={editData}/>
        </section>
    )
}

export default withRouter(DocumentList)