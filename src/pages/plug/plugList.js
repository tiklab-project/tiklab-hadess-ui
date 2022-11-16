/**
 * @name: PlugList
 * @author: limingliang
 * @date: 2022-10-20 14:48
 * @description：插件列表
 * @update: 2022-10-20 14:48
 */
import React, {useState, useEffect} from "react";
import {Breadcrumb, Row, Col, Button, Table, Space, Tooltip, Modal, Pagination} from "antd";
import plugService from "../../service/plug.service";
import CompilePlug from "./compilePlug";
const { confirm } = Modal;
import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import PlugDetails from "./plugDetails";
import './plug.scss'
import Paging from "../../common/components/paging";
const PlugList = (props) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalPage,setTotalPage]=useState(0);  //总页数
    const [plugList, setPlugList] = useState([]);  //插件列表
    const [plugVersionList,setPlugVersionList]=useState([])  //插件版本

    const [visible, setVisible] = useState(false);   //编辑弹窗状态
    const [plugData, setPlugData] = useState(null);


    const [detailsVisible,setDetailsVisible]=useState(false)   //详情抽屉状态
    const   columns = [
        {
            title: '插件名称',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => {
                return <a className='text-blue-500' onClick={() => openPLugDetails(record)}>{record.name}</a>
            }
        },
        {
            title: '版本',
            dataIndex: ['artifactVersion','version'],
            key: 'version',
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: '描述',
            dataIndex: 'des',
            render: (text, record) => (
                <>
                    {text&&filedState(text)}
                </>
            )
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Space size="useState" className='flex  gap-x-4 '>
                    <Tooltip title="编辑">
                        <EditOutlined className='cursor-pointer' onClick={()=>compilePlug(record)}/>
                    </Tooltip>
                    <Tooltip title="删除">
                        <DeleteOutlined className='cursor-pointer' onClick={()=>openDeletePop(record)}/>
                    </Tooltip>
                </Space>
            ),
        },
    ];

    useEffect(async ()=>{
        await findPlugList()
    },[])

    //查询插件列表
    const findPlugList = async (currentPage) => {
        const param={
            pageParam: {
                pageSize: pageSize,
                currentPage: currentPage
            }
        }
        const res= await plugService.findArtifactPag(param)
        if(res.code===0){
            setTotalPage(res.data.totalPage)
            setPlugList(res.data.dataList)
        }
    }


    //打开插件详情抽屉
    const openPLugDetails =async (value) => {
        setPlugData(value)
      await  findPlugVersion(value.id)
        setDetailsVisible(true)
    }
    //关闭插件详情抽屉
    const closePLugDetails = (value) => {
        setDetailsVisible(false)
    }
    //通过插件id查询插件版本
    const findPlugVersion=async (plugId)=>{
        const param={
            artifactId:plugId
        }
        const res= await plugService.findArtifactVersionList(param);
        if (res.code===0){
            setPlugVersionList(res.data)
        }
    }


    const filedState = (value) => {
        return(
            value.length>35?
                <Tooltip placement="right" title={value}>
                    <div style={{
                        width: 200,
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

    //跳转添加插件
    const goAddPlug = () => {
     setVisible(true)
    }
    //分页查询
    const handleTableChange =async (pagination) => {
        setCurrentPage(pagination)
        await  findPlugList(pagination)
    }

    //取消弹窗
    const onCancel = async () => {
        setVisible(false)
        setPlugData(null);

        await findPlugList(1)
    }
    //编辑插件
    const compilePlug = (plug) => {
        setPlugData(plug)
        goAddPlug()
    }
    //跳转创建版本页面
    const goCompileVersion = (plug) => {
        props.history.push(`/index/plug/compileVersion/${plug.id}`);
    }
    
    const openDeletePop = (plug) => {
        confirm({
            title: '注意：删除该插件会删除相应的所有版本',
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                deletePlug(plug)
            },
            onCancel() {
            },
        });
    }
    const deletePlug = async (plug) => {
      const param=new FormData();
      param.append("id",plug.id)
      const res= await plugService.deleteArtifact(param)
        if (res.code===0){
            await findPlugList(1)
        }
    }
    
    return(
        <div className=' plug'>
            <div className='plug-head-style'>
                <div className='plug-title'>插件列表</div>
                <Button type="primary" onClick={goAddPlug}>添加插件</Button>
            </div>
            <Row gutter={[16, 16]} className='plug-data' >
                <Col span={24}>
                    <Table
                        dataSource={plugList}
                        columns={columns}
                        rowKey={record =>  record.id}
                        pagination={false}
                    />
                </Col>
            </Row>
            <Paging totalPage={totalPage} currentPage={currentPage} handleTableChange={handleTableChange}/>
            <CompilePlug visible={visible} onCancel={onCancel} editData={plugData}/>
            <PlugDetails  onClose={closePLugDetails} visible={detailsVisible} plugData={plugData} plugVersionList={plugVersionList}/>
        </div>
    )
}
export default PlugList