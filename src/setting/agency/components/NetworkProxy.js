/**
 * @name: networkProxy
 * @author: limingliang
 * @date: 2025-03-27 14:30
 * @description：网络代理地址
 * @update: 2025-03-27 14:30
 */
import React,{useState,useEffect} from 'react';
import "./NetworkProxy.scss"
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import {Col, Switch, Table,message} from "antd";
import Btn from "../../../common/btn/Btn";
import {observer} from "mobx-react";
import {PrivilegeButton} from "tiklab-privilege-ui";
import {EditOutlined, StopOutlined} from "@ant-design/icons";
import DeleteExec from "../../../common/delete/DeleteExec";
import EmptyText from "../../../common/emptyText/EmptyText";
import NetworkProxyEdit from "./NetworkProxyEdit";
import NetworkProxyStore from "../store/NetworkProxyStore";
const networkProxy = (props) => {

    const {findNetworkProxyList,fresh,deleteNetworkProxy,updateNetworkProxy}=NetworkProxyStore
    //编辑的状态
    const [editVisible,setEditVisible]=useState(false)

    //代理地址list
    const [proxyList,setProxyList]=useState([])
    const [proxy,setProxy]=useState()

    const [compileType,setCompileType]=useState()

    useEffect(()=>{
        findNetworkProxyList({}).then(res=>{
            res.code===0&& setProxyList(res.data)
        })

    },[fresh])


    const columns = [
        {
            title: '地址',
            dataIndex: 'address',
            key: 'address',
            width:'30%',
            ellipsis:true,
        },
        {
            title: '端口',
            dataIndex: 'port',
            key: 'port',
            width:'10%',
            ellipsis:true,
        },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
            width:'15%',
            ellipsis:true,
        },
        {
            title: '启动',
            dataIndex: 'enable',
            key: 'enable',
            width:'15%',
            ellipsis:true,
            render:(text,record)=> (
                <div>
                    {
                        text===0?
                            <Switch unCheckedChildren="关闭" checked={false} onChange={(e)=>onChange(e,record)}/>:
                            <Switch checkedChildren="开启" checked={true} defaultChecked onChange={(e)=>onChange(e,record)}/>
                    }
                </div>
            )
        },
        {
            title:'操作',
            dataIndex: 'action',
            key: 'action',
            width:'10%',
            ellipsis:true,
            render:(text,record)=>(
                <div className='network-proxy-exec'>
                    <EditOutlined className='actions-se' onClick={()=>openUpdate(record)}/>
                    <DeleteExec value={record} deleteData={deleteNetworkProxy} title={"确认删除"} />
                </div>

            )
        }
    ]

    const onChange = (e,record) => {
        const enable=e?1:0
        const data=proxyList.filter(a=>a.enable===1)
        if (data.length){
            if ( data[0].id!==record.id&&enable===1){
                message.error("存在已经启用的代理")
                return
            }
        }
        updateNetworkProxy({...record,enable:enable})
    }


    const openUpdate = (data) => {
        setCompileType("update")
        setProxy(data)
        setEditVisible(true)
    }
    //打开添加弹窗
    const openAdd = () => {
        setCompileType("add")
        setEditVisible(true)
    }

    return(
        <div className='network-proxy hadess-data-width'>
            <Col
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "22", offset: "1" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <div className='network-proxy-head'>
                    <BreadcrumbContent firstItem={'网络代理'} />
                    <Btn
                        type={'primary'}
                        title={'添加代理地址'}
                        onClick={openAdd}
                    />
                </div>
                <div className='network-proxy-table'>
                    <Table
                        bordered={false}
                        columns={columns}
                        dataSource={proxyList}
                        rowKey={record=>record.id}
                        pagination={false}
                       /*   locale={{emptyText: <EmptyText title={'暂无地址'}/>}}*/
                    />
                </div>
            </Col>

            <NetworkProxyEdit visible={editVisible}
                              setVisible={setEditVisible}
                              proxy={proxy}
                              setProxy={setProxy}
                              compileType={compileType}
            />
        </div>
    )
}
export default observer(networkProxy)
