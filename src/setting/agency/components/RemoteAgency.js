/**
 * @name: RemoteProxy
 * @author: limingliang
 * @date: 2024-01-19 14:30
 * @description：代理管理
 * @update: 2024-01-19 14:30
 */
import React,{useState,useEffect} from 'react';
import "./RemoteAgency.scss"
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import {Col, Table} from "antd";
import {observer} from "mobx-react";
import RemoteProxyStore from "../store/RemoteAgencyStore";
import {DeleteOutlined, EditOutlined, StopOutlined} from "@ant-design/icons";
import Btn from "../../../common/btn/Btn";
import RemoteAgencyEditPop from "./RemoteAgencyEditPop";
import DeleteExec from "../../../common/delete/DeleteExec";
import {PrivilegeButton} from 'tiklab-privilege-ui';
const RemoteAgency = (props) => {
    const {createRemoteProxy,updateRemoteProxy,findRemoteProxyList,deleteRemoteProxy,findRepositoryByProxyId,fresh}=RemoteProxyStore

    const [remoteProxyList,setRemoteProxyList]=useState([])  //代理地址list
    const [editVisible,setEditVisible] = useState(false)    //编辑扫描方案弹窗状态
    const [compileType,setCompileType]=useState("add")    //弹窗类型
    const [remoteProxy,setRemoteProxy]=useState(null)

    const [title]=useState("确认删除")

    useEffect(()=>{
        findRemoteProxyList({}).then(res=>{
           res.code===0&& setRemoteProxyList(res.data)
        })

    },[fresh])


    const columns = [
        {
            title: '代理来源',
            dataIndex: 'agencyName',
            key: 'agencyName',
            width:'20%',
            ellipsis:true,
        },
        {
            title: '地址',
            dataIndex: 'agencyUrl',
            key: 'agencyUrl',
            width:'50%',
            ellipsis:true,
        },
        {
            title: '类型',
            dataIndex: 'agencyType',
            key: 'agencyType',
            width:'20%',
            ellipsis:true,
            render:(text,record)=>  <div className='proxy-tab-nav'>{text}</div>
        },
        {
            title:'操作',
            dataIndex: 'action',
            key: 'action',
            width:'10%',
            ellipsis:true,
            render:(text,record)=>(
                record.type===1?
                    <div className='proxy-icon-style'>
                        <PrivilegeButton  code={"hadess_proxy_update"} key={'hadess_proxy_update'} >
                            <EditOutlined className='actions-se' onClick={()=>openUpdate(record)}/>
                        </PrivilegeButton >
                        <PrivilegeButton  code={"hadess_proxy_delete"} key={'hadess_proxy_delete'} >
                            <DeleteExec value={record} deleteData={deleteRemoteProxy} title={title} type={"agency"} findRepositoryByProxyId={findRepositoryByProxyId}/>
                        </PrivilegeButton >
                    </div>
                   :
                    <StopOutlined className='proxy-icon-no'/>

            )
        }
    ]

    //打开弹窗
    const openUpdate = (value) => {
        setCompileType("update")
        setEditVisible(true)
        setRemoteProxy(value)
    }

    return(
        <div className='proxy hadess-data-width'>
            <Col
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "22", offset: "1" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <div className='proxy-head-up'>
                    <BreadcrumbContent firstItem={'仓库代理'} />
                   {/* <PrivilegeButton  code={"hadess_proxy_add"} key={'hadess_proxy_delete'} >
                        <Btn
                            type={'primary'}
                            title={'添加代理'}
                            onClick={()=> setEditVisible(true)}
                        />
                    </PrivilegeButton>*/}
                    <Btn
                        type={'primary'}
                        title={'添加代理'}
                        onClick={()=> setEditVisible(true)}
                    />
                </div>
                <div className='proxy-table-style'>
                    <Table
                        bordered={false}
                        columns={columns}
                        dataSource={remoteProxyList}
                        rowKey={record=>record.id}
                        pagination={false}
                        /*  locale={{emptyText: <EmptyText title={'暂无方案'}/>}}*/
                    />
                </div>
                <RemoteAgencyEditPop editVisible={editVisible} setEditVisible={setEditVisible} compileType={compileType}
                                     createRemoteProxy={createRemoteProxy} updateRemoteProxy={updateRemoteProxy}
                                     remoteProxy={remoteProxy} setRemoteProxy={setRemoteProxy}/>

            </Col>
     </div>
    )
}
export default observer(RemoteAgency)
