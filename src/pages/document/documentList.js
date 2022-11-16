/**
 * @name: repository
 * @author: limingliang
 * @date: 2022-01-20 14:30
 * @description：空间管理
 * @update: 2022-01-20 14:30
 */
import {withRouter} from "react-router";
import React,  {useState, useEffect} from "react";
import {
    Breadcrumb,
    Button,
    Col,
    Input,
    Row,
    Select,
    Space,
    Table,
    Modal,
    Tooltip,
    Empty,
    Pagination
} from "antd";
import documentService from "../../service/document.service"
import CompileRepository from "./compileRepository";
import './document.scss'
import {comment} from "postcss";
import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import Paging from "../../common/components/paging";
const { confirm } = Modal;
const DocumentList = props => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalPage,setTotalPage]=useState(0);  //总页数

    const [repositoryData,setRepositoryData]=useState([]) //空间
    const [visible, setVisible] = useState(false); //创建弹窗状态
    const [editData, setEditData] = useState(null);  //编辑空间传到弹窗的数据
    const [name,setName]=useState('');// 搜索名称

    const [compileType,setCompileType]=useState('')   //编辑类型
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
            width:'10%',
            render: (text, record) => (
                <Space size="useState" className='flex  gap-x-4 '>
                    <Tooltip title="编辑">
                        <EditOutlined className='cursor-pointer' onClick={()=>editRepository(record)}/>
                    </Tooltip>
                    <Tooltip title="删除">
                        <DeleteOutlined className='cursor-pointer' onClick={()=>deletePop(record.id)}/>
                    </Tooltip>
                </Space>
            ),
        },
    ];
    useEffect(async ()=>{
        await findRepository(currentPage)
    },[])

    const skipDocument=async (record)=>{
        props.history.push({
            pathname:"/index/document/details",
            params:record
        });
    }
    //查询所有文档空间
    const findRepository=async (currentPage)=>{
        const param={
            name:name,
             pageParam: {
                pageSize: pageSize,
                currentPage: currentPage,
             }
        }

     const res=  await documentService.findRepositoryPage(param)
        if (res.code===0){
            setRepositoryData(res.data.dataList)
            setTotalPage(res.data.totalPage)
        }
    }
    //编辑文档空间
    const editRepository=(record)=> {
        setEditData(record)
        setVisible(true)
        setCompileType('update')
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
       setCompileType('add')
       setVisible(true)
   }
    //取消创建弹窗
    const onCancel = async () => {
        setEditData(null)
        setVisible(false)
    }
    //确认添加
    const onOk=async ()=>{
        setVisible(false)
        await findRepository(currentPage)
    }
    //分页
    const handleTableChange = async (pagination) => {
        setCurrentPage(pagination)
        await findRepository(pagination)
    }
    const onInputName = (e) => {
        const value = e.target.value
        setName(value)
    }
    const onSearch = async () => {
        await findRepository(currentPage)
    }
    return(
        <div className=' document'>
            <div className='document-head-style'>
                <div className='document-title'>文档列表</div>
                <Button type="primary" onClick={openCreatePopup}>添加文档空间</Button>
            </div>
            {
                repositoryData.length>0?
                    <div>
                        <Row gutter={[16, 16]} className='document-data'>
                            <Col span={6}>
                                <Input placeholder={'搜索名称'} value={name} onChange={onInputName} onPressEnter={onSearch}/>
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]} >
                            <Col span={24}>
                                <Table
                                    dataSource={repositoryData}
                                    columns={columns}
                                    rowKey={record => record.id}
                                    pagination={false}
                                />
                            </Col>
                        </Row>
                        <Paging totalPage={totalPage} currentPage={currentPage} handleTableChange={handleTableChange}/>
                    </div>

                    : <div>
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}  >
                            <Button type="primary" onClick={openCreatePopup}>现在创建</Button>
                        </Empty>
                    </div>

            }
            <CompileRepository visible={visible} onCancel={onCancel} onok={onOk} editData={editData} compileType={compileType}/>
        </div>
    )
}

export default withRouter(DocumentList)