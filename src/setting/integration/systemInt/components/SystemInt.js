/**
 * @name: SystemInt
 * @author: limingliang
 * @date: 2025-8-29 14:30
 * @description：第三方集成地址
 * @update: 2025-8-29 14:30
 */
import React,{useState,useEffect} from 'react';
import {Col, Modal, Table} from "antd";
import BreadcrumbContent from "../../../../common/breadcrumb/Breadcrumb";
import Btn from "../../../../common/btn/Btn";
import EmptyText from "../../../../common/emptyText/EmptyText";
import "./SystemInt.scss"
const { confirm } = Modal;
import {observer} from "mobx-react";
import ThirdPathStore from "../store/ThirdPathStore";
import SystemIntEdit from "./SystemIntEdit";
import {
    DeleteOutlined,
    DownOutlined,
    EditOutlined, ExclamationCircleOutlined,
    FormOutlined,
    RightOutlined
} from "@ant-design/icons";
import DeleteExec from "../../../../common/delete/DeleteExec";
import nexus from "../../../../assets/images/img/nexus.png";
const SystemInt = (props) => {

    const {fresh,findThirdPathList,deleteThirdPath}=ThirdPathStore

    const [editVisible,setEditVisible] = useState(false)    //编辑扫描方案弹窗状态
    const [thirdPathData,setThirdPathData]=useState(null)  //代理地址list

    const [thirdPath,setThirdPath]=useState(null)  //代理地址list

    const [systemNav,setSystemNav]=useState(null)
    const [type,setType]=useState("nexus")
    const [compileType,setCompileType]=useState(null)

    useEffect(()=>{
        getThirdPathList()
    },[fresh])


    const getThirdPathList = () => {
        findThirdPathList({type:type}).then(res=>{
            if (res.code===0){
                if (res.data.length){
                    setThirdPathData(res.data[0])
                }    else {
                    setThirdPathData(null)
                }
            }
        })
    }

    const openLi = (value) => {
       if (systemNav===value){
           setSystemNav(null)
       }else {
           setSystemNav(value)
       }
    }

    const openEdit = (value) => {
        if (value==="add"){
            setThirdPath(null)
            setCompileType('添加')
        }else {
            setThirdPath(thirdPathData)
            setCompileType('修改')
        }
        setEditVisible(true)
    }


    //删除弹窗
    const  DeletePop = (id) =>{
        confirm({
            title: "确认删除",
            icon: <ExclamationCircleOutlined />,
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                deleteThirdPath(id)
            },
            onCancel() {
            },
        });
    }

    return(
        <div className='system-int hadess-data-width'>
            <Col
                sm={{ span: 24 }}
                xs={{ span: 24 }}
                md={{ span: 24 }}
                lg={{ span: "18", offset: "2" }}
                xl={{ span: "16", offset: "3" }}
                xxl={{ span: "14", offset: "4" }}
            >
                <div className='system-int-head-up'>
                    <BreadcrumbContent firstItem={'服务集成'} />
                </div>
                <div className="system-int-ul">
                    <div className='system-int-ul-li' onClick={()=>openLi("nexus")}>
                        <img  src={nexus}  style={{width:30,height:30}}/>
                        <div className='integration-li-center'>
                            <div className='integration-li-center-title'>Nexus</div>
                            <div className={"integration-li-center-desc"}>Nexus地址</div>
                        </div>
                        {
                            systemNav==="nexus"?<DownOutlined />: <RightOutlined />
                        }
                    </div>
                    {
                        systemNav==="nexus"&&
                        <div className='system-int-body'>
                            <div className={`system-body-details `}>
                                {  thirdPathData?
                                    <>
                                        <div className='system-body-details-text'>
                                            <div>服务地址</div>
                                            <div>{thirdPathData?.address}</div>
                                        </div>
                                        <div className='system-body-details-icon'>
                                            <FormOutlined style={{cursor:"pointer"}} onClick={()=>openEdit("edit")} />
                                            <DeleteOutlined style={{cursor:"pointer"}} onClick={()=>DeletePop(thirdPathData?.id)}/>
                                        </div>
                                    </> :
                                    <div className='system-body-details-icon system-int-body-add' onClick={()=>openEdit("add")}>
                                        添加地址
                                    </div>
                                }
                            </div>
                        </div>
                    }

                </div>
               {/* <div className='system-int-table'>
                    <Table
                        bordered={false}
                        columns={columns}
                        dataSource={thirdPathList}
                        rowKey={record=>record.id}
                        pagination={false}
                        locale={{emptyText: <EmptyText title={'暂无服务'}/>}}
                    />
                </div>*/}
             </Col>
            <SystemIntEdit  visible={editVisible}
                            setVisible={setEditVisible}
                            thirdPath={thirdPath}
                            compileType={compileType}

            />
        </div>
    )
}
export default observer(SystemInt)
