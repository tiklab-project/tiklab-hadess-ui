/**
 * @name: LeadIn
 * @author: limingliang
 * @date: 2025-08-26 14:30
 * @description：导入第三方制品
 * @update: 2025-08-26 14:30
 */
import React,{useState,useEffect} from 'react';
import LeadInStore from "../store/LeadInStore";
import {Col, Spin} from "antd";
import "./LeadIn.scss"
import BreadcrumbContent from "../../../../common/breadcrumb/Breadcrumb";
import nexus from "../../../../assets/images/img/nexus.png";
import LeadInPop from "./LeadInPop";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
import {SpinLoading} from "../../../../common/loading/Loading";
const LeadIn = (props) => {
    const {repositoryStore,match:{params},publicState} = props;
    const {repositoryData}=repositoryStore

    const {findRepository,leadInRepLibrary,findLeadInState}=LeadInStore

    const [visible,setVisible]=useState(false)
    const [type,setType]=useState(null)

    const [leadInState,setLeadInState]=useState(false)

    useEffect(()=>{
        findLeadInState(params.id).then(res=>{
            if (res.code==0&&res.data){
                getLeadInTime()
            }
        })
    },[])




    //
    const openData = (value) => {
        setVisible(true)
        setType(value)
    }

    //扫描定时任务
    const getLeadInTime =async()=>{

        setLeadInState(true)
        let timer=setInterval(()=>{
            findLeadInState(params.id).then(res=>{
                if (res.code===0){
                    if (!res.data){
                        message.success("导入成功",1)
                        setLeadInState(false)
                        clearInterval(timer)
                    }
                }else {
                    clearInterval(timer)
                    setLeadInState(false)
                    message.error(res.msg)
                }
            })
        },5000)
    }

    return(
        <div className=' lead-in'>
            <Col
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "18", offset: "3" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <div>
                    <BreadcrumbContent firstItem={"制品导入"} />
                <div>
                    <div className='lead-in-desc'>
                        快捷、方便导入第三方的制品到该支持库中，支持nexus
                    </div>
                    <Spin tip="导入中..." spinning={leadInState}>
                        <div className='lead-in-data' >
                            <div className='lead-in-border' onClick={()=>openData("nexus")}>
                                <div className='lead-in-icon'>
                                    <img  src={nexus}  style={{width:50,height:50}}/>
                                </div>
                                <div className='lead-in-icon'>Nexus导入</div>
                            </div>
                        </div>
                    </Spin>
                </div>
            </div>
            </Col>
            <LeadInPop {...props} visible={visible}
                       setVisible={setVisible}
                        type={type}
                       repositoryData={repositoryData}
                       startTimeTask={getLeadInTime}
            />
        </div>
    )


}
export default withRouter(inject('repositoryStore')(observer(LeadIn)))
