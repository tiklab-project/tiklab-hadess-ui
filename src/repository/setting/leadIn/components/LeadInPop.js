/**
 * @name: LeadInPop
 * @author: limingliang
 * @date: 2025-08-26 14:30
 * @description：导入第三方制品
 * @update: 2025-08-26 14:30
 */
import React,{useState,useEffect,Fragment} from 'react';
import ThirdPathStore from "../../../../setting/integration/systemInt/store/ThirdPathStore";
import Modals from "../../../../common/modal/Modal";
import Btn from "../../../../common/btn/Btn";
import {Form, Steps, Table} from "antd";
import {observer} from "mobx-react";
import "./LeadInPop.scss"
import LeadInStore from "../store/LeadInStore";
import EmptyText from "../../../../common/emptyText/EmptyText";
const { Step } = Steps;
const LeadInPop = (props) => {
    const {visible,setVisible,type,repositoryData,startTimeTask}=props
    const [form] = Form.useForm();
    const {findThirdPathList}=ThirdPathStore
    const {findRepository,leadInRepLibrary}=LeadInStore

    const [thirdPathList,setThirdPathList]=useState([])
    //步骤
    const [step,setStep]=useState(0)

    const [address,setAddress]=useState(null)
    //仓库地址
    const [repositoryList,setRepositoryList]=useState([])
    const [repository,setRepository]=useState(null)


    useEffect(()=>{
        if (type){
            findThirdPathList({type:type}).then(res=>{
                res.code===0&&setThirdPathList(res.data)
            })
        }
    },[type])




    //关闭弹窗
    const closePop = () => {
        setStep(0)
        setRepository(null)
        setAddress(null)
        setVisible(false)
    }

    //选择地址
    const clickAddress = (value) => {
        setAddress(value)
    }
    //选择仓库
    const clickRepository = (value) => {
      setRepository(value)
    }

    //下一步
    const handleOk = () => {
        setStep(2)
        findRepository({url:address.address,type:repositoryData?.type}).then(res=>{
            setRepositoryList(res.data)
        })
    }

    const onclickImport = () => {
        leadInRepLibrary({
            url:address.address,
            sourceRepName:repository.name,
            targetRepId:repositoryData.id,
            type:repositoryData.type,
            versionType: repositoryData.versionType
        }).then(res=>{
            startTimeTask()
            closePop()
        })
    }

    const goAddPath = () => {
        props.history.push(`/setting/systemInt`)
    }


    const modalFooter = (
        <>
            <Btn onClick={closePop} title={'取消'} isMar={true}/>
            {
                step===0?
                    <Btn  title={'下一步'} type={'primary'} onClick={handleOk}/>:
                    <>
                        <Btn  title={'上一步'}  onClick={()=>setStep(0)} isMar={true}/>
                        {
                            repository?
                            <Btn  title={'导入'} type={'primary'} onClick={onclickImport} />:
                            <Btn  title={'导入'} type={'disabled'} />
                        }

                    </>
            }
        </>
    )

    return(
        <Modals
            visible={visible}
            closable={false}
            onCancel={closePop}
            footer={thirdPathList.length?modalFooter:null}
            destroyOnClose={true}
            width={600}
            title={'制品导入'}
        >

            {
                thirdPathList.length?
                    <div style={{marginBottom:15}}>
                        <Steps size="small" current={step}>
                            <Step title="选择地址" />
                            <Step title="选择仓库" />
                        </Steps>
                        <div className='leadIn-pop-top'>

                            {
                                step===0?
                                    <Fragment>
                                        <div className='leadIn-pop-title'>
                                            <div className={'leadIn-pop-name-width'}>名称</div>
                                            <div>地址</div>
                                        </div>
                                        {
                                            thirdPathList.map(item=>{
                                                return(
                                                    <div key={item.id} className={`leadIn-pop-data ${address?.id===item.id&& " leadIn-pop-data-chose"}`}
                                                         onClick={()=>clickAddress(item)}>
                                                        <div className='leadIn-pop-name-width'>{item.name}</div>
                                                        <div>{item.address}</div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </Fragment>:
                                    <Fragment>
                                        <div className='leadIn-pop-title'>
                                            <div className={'leadIn-pop-name-width'}>仓库名称</div>
                                            <div>类型</div>
                                        </div>
                                        {
                                            repositoryList?.length?repositoryList.map(item=>{
                                                return(
                                                    <div key={item.id} className={`leadIn-pop-data ${repository?.name===item.name&& " leadIn-pop-data-chose"}`}
                                                         onClick={()=>clickRepository(item)}>
                                                        <div className='leadIn-pop-name-width'>{item.name}</div>
                                                        <div>{item.format}</div>
                                                    </div>
                                                )
                                            }):
                                                <EmptyText title={'没有仓库'}/>
                                        }
                                    </Fragment>
                            }

                        </div>
                    </div>:
                    <div className='leadIn-pop-title-no'>
                        未添加nexus地址,
                        <span className='title-no-click' onClick={goAddPath}>添加</span>
                    </div>

            }


        </Modals>
    )
}
export default observer(LeadInPop)
