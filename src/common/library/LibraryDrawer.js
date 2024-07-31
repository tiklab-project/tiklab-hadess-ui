/**
 * 制品左侧弹抽屉
 * @param props
 * @constructor
 */

import React, {useEffect, useRef, useState} from "react";
import {Drawer, Space, Tooltip} from 'antd'
import {CloseOutlined} from "@ant-design/icons";
import "./LibraryDrawer.scss"
import libraryStore from "../../library/store/LibraryStore";
import LibraryTableNav from "./LibraryTableNav";
import LibraryDetails from "./LibraryDetails";
import LibraryFileList from "./LibraryFileList";
import {observer} from "mobx-react";
import LibraryHistory from "./LibraryHistory";
import Breadcrumb from "../breadcrumb/Breadcrumb";
import Btn from "../btn/Btn";

const LibraryDrawer = (props) => {
    const {visible,setVisible,versionId}=props
    const detailRef = useRef()
    const {findLibraryVersion,libraryVersionData}=libraryStore
    const [tableType,setTableType]=useState()   //table 类型

    const [historyName,setHistoryName]=useState()   //选择的历史名称
    const [changeVersionId,setChangeVersionId]=useState() //切换历史版本的id

    useEffect( async () => {
        visible&&findLibrary()
    }, [versionId,visible]);

    useEffect( async () => {
        visible&& findLibrary()
    }, [changeVersionId]);

    useEffect(  () => {
        window.addEventListener("mousedown", closeModal, false);
        return () => {
            window.removeEventListener("mousedown", closeModal, false);
        }
    }, [visible]);

    const findLibrary = async () => {
        setTableType("survey")
        if (changeVersionId){
            findLibraryVersion(changeVersionId).then(res=>{
                setHistoryName(res.data.version)
            })
        }else {
            if (versionId){
                findLibraryVersion(versionId).then(res=>{
                    setHistoryName(res.data.version)
                })
            }

        }

    }

    const closeModal = (e) => {
        if (!detailRef.current) {
            return;
        }
        let IsSelectclear = false;
        if (e.target.localName === "path") {
            const classList = e.target.parentElement.parentElement.classList;
            if (classList.value === "anticon anticon-close-circle") {
                IsSelectclear = true
            }
        } else {
            IsSelectclear = false
        }

        if (!detailRef.current.contains(e.target) && detailRef.current !== e.target && !IsSelectclear && visible) {
            setVisible(false)
            setHistoryName(null)
            setChangeVersionId(null)
          /*  let pathname = props.location.pathname;
            const index = pathname.lastIndexOf("\/");
            pathname = pathname.substring(0, index);
            console.log(pathname);
            props.history.replace(`${pathname}`)*/
           // setVisible(false)
        }
    }


    //切换table 类型
    const cuteType = async (value) => {
        setTableType(value)
    }


    const goBack = () => {
        setHistoryName(null)
        setChangeVersionId(version.id)
        findLibraryVersion(version.id)
    }

    //取消弹窗
    const cancelDrawer = () => {

        setHistoryName(null)
        setChangeVersionId(null)
        console.log("关闭")
        let pathname = props.location.pathname;
        const index = pathname.lastIndexOf("\/");
        pathname = pathname.substring(0, index);
        console.log(pathname);
        props.history.replace(`${pathname}`)

        setVisible(false)
        setTableType("survey")
    }

    return(
        <Drawer
           /* title={
                historyName?<Breadcrumb  firstItem={"制品"} secondItem={historyName}    goBack={goBack}/>
                :<Breadcrumb  firstItem={"制品"}/>
        }*/
            placement='right'
            closable={false}
            width={"60%"}
            onClose={cancelDrawer}
            destroyOnClose={true}
            contentWrapperStyle={{top:48,height:"calc(100% - 48px)"}}
            bodyStyle={{overflow:"hidden"}}
            visible={visible}
            mask={false}
        >
            <div className='library-drawer' ref={detailRef}>
                <div className='library-drawer-bread'>
                    {
                        historyName?
                            <Breadcrumb  firstItem={"制品"} secondItem={historyName}>
                                <Btn
                                    title={<CloseOutlined style={{fontSize:16}}/>}
                                    type="text"
                                    onClick={()=>setVisible(false)}
                                />
                            </Breadcrumb>:
                            <Breadcrumb  firstItem={"制品"}>
                                <Btn
                                    title={<CloseOutlined style={{fontSize:16}}/>}
                                    type="text"
                                    onClick={()=>setVisible(false)}
                                />
                            </Breadcrumb>
                    }
                    <LibraryTableNav {...props} libraryVersion={libraryVersionData} tableType={tableType} setTableType={cuteType}/>

                </div>
                <div className='library-drawer-bottom'>
                   {
                       tableType==='survey'&&<LibraryDetails versionData={libraryVersionData} />||
                       tableType==='file'&&<LibraryFileList versionData={libraryVersionData}/> ||
                       tableType==='history'&&<LibraryHistory versionData={libraryVersionData} setVersionName={setHistoryName}
                                                              setChangeVersionId={setChangeVersionId} historyName={historyName}/>
                   }
               </div>
            </div>
        </Drawer>
    )
}
export default observer(LibraryDrawer)
