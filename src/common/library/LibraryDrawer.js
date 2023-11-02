/**
 * 制品左侧弹抽屉
 * @param props
 * @constructor
 */

import React , {useEffect, useState}from "react";
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

const LibraryDrawer = (props) => {
    const {visible,setVisible,version}=props
    const {findLibraryVersion,libraryVersionData}=libraryStore
    const [tableType,setTableType]=useState()   //table 类型

    const [historyName,setHistoryName]=useState()   //选择的历史名称
    const [versionId,setVersionId]=useState()


    useEffect( async () => {
        findLibrary()
    }, [version]);

    useEffect( async () => {
        visible&& findLibrary()
    }, [versionId]);

    const findLibrary = async () => {
        setTableType("survey")
        if (versionId){
            findLibraryVersion(versionId)
        }else {
            if (version){
                setVersionId(version.id)
                findLibraryVersion(version.id)
            }
        }

    }

    //切换table 类型
    const cuteType = async (value) => {
        setTableType(value)
    }


    const goBack = () => {
        setHistoryName(null)
        setVersionId(version.id)
        findLibraryVersion(version.id)
    }

    //取消弹窗
    const cancelDrawer = () => {
        setHistoryName(null)
        setVersionId(null)
        setVisible()
        setTableType("survey")
    }

    return(
        <Drawer
            title={
                historyName?<Breadcrumb  firstItem={"制品"} secondItem={historyName}    goBack={goBack}/>
                :<Breadcrumb  firstItem={"制品"}/>
        }
            placement='right'
            closable={false}
            width={"65%"}
            className='library-drawer'
            onClose={cancelDrawer}
            visible={visible}
            extra={
                <CloseOutlined style={{cursor:'pointer'}} onClick={cancelDrawer} />
            }
        >
            <div>
                <LibraryTableNav {...props} libraryVersion={libraryVersionData} tableType={tableType} setTableType={cuteType}/>
                {
                    tableType==='survey'&&<LibraryDetails versionData={libraryVersionData} />||
                    tableType==='file'&&<LibraryFileList versionData={libraryVersionData}/> ||
                    tableType==='history'&&<LibraryHistory versionData={libraryVersionData} setVersionName={setHistoryName}  setVersionId={setVersionId}/>
                }
            </div>
        </Drawer>
    )
}
export default observer(LibraryDrawer)
