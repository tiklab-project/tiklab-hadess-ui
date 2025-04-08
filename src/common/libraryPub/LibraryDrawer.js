/**
 * 制品左侧弹抽屉
 * @param props
 * @constructor
 */

import React, {useEffect, useRef, useState} from "react";
import {Col, Drawer, Row, Space, Tooltip} from 'antd'
import {CloseOutlined} from "@ant-design/icons";
import "./LibraryDrawer.scss"
import libraryStore from "../../library/store/LibraryStore";
import LibraryTableNav from "../library/LibraryTableNav";
import {observer} from "mobx-react";
import Breadcrumb from "../breadcrumb/Breadcrumb";
import Btn from "../btn/Btn";
import LibraryInfo from "./LibraryInfo";
import LibraryFile from "./LibraryFile";
import LibraryHistory from "./LibraryHistory";
import {SpinLoading} from "../loading/Loading";

const LibraryDrawer = (props) => {
    const {visible,setVisible,library,tab}=props
    const detailRef = useRef()

    const {findVersionByLibraryId,libraryVersionData,refresh,versionLoad,
        findLibraryFileList,readLibraryFileData,findDockerLayers}=libraryStore
    const [tableType,setTableType]=useState()   //table 类型

    const [historyName,setHistoryName]=useState()   //选择的历史名称
    const [changeVersionId,setChangeVersionId]=useState() //切换历史版本的id


    const [manifest,setManifest]=useState()
    //镜像历史列表
    const [layersList,setLayersList]=useState([])
    const [dataRefresh,setDataRefresh]=useState(false)

    useEffect( async () => {
        if (visible){
            setTableType(tab)
        }
    }, [visible]);

    useEffect( async () => {
        if (visible){
            findLibrary()
        }
    }, [visible,refresh,changeVersionId,versionLoad]);

    useEffect(async () => {
        //docker类型查询文件内容
        if (libraryVersionData.libraryType==='docker'){
            //查询manifest
            if (tableType==='manifest'){
                setDataRefresh(true)
                findLibraryFileList(libraryVersionData.id).then(res=>{
                    if (res.code===0&&res.data.length>0){
                        const manifestsFile=res.data.filter(a=>a.fileUrl.includes("/manifests/"))
                        readLibraryFileData({repositoryId:libraryVersionData.repository.id,
                            fileUrl:manifestsFile[0].fileUrl
                        }).then(data=>{
                            setDataRefresh(false)
                            setManifest(data.data)
                            // 将格式化后的 JSON 输出到 <pre> 标签
                            // 格式化 JSON
                            const jsonObject = JSON.parse(data.data);
                            const formattedJson = JSON.stringify(jsonObject, null, 2); // 2 是缩进的空格数

                            document.getElementById('jsonOutput').textContent = formattedJson;
                        })
                    }
                })
            }
            //查询镜像历史
            if (tableType==='layers'){
                setDataRefresh(true)
                findLibraryFileList(libraryVersionData.id).then(res=>{
                    if (res.code===0&&res.data.length>0){
                        const manifestsFile=res.data.filter(a=>a.fileUrl.includes("/manifests/"))
                        findDockerLayers({repositoryId:libraryVersionData.repository.id,
                            fileUrl:manifestsFile[0].fileUrl,
                            libraryId:manifestsFile[0].library.id
                        }).then(data=>{
                            setDataRefresh(false)
                            setLayersList(data.data)
                        })
                    }
                })
            }
        }
    }, [tableType]);


 /*   useEffect(  () => {
        window.addEventListener("mousedown", closeModal, false);
        return () => {
            window.removeEventListener("mousedown", closeModal, false);
        }
    }, [visible]);*/



    //查询版本
    const findLibrary = async (versionId) => {
        findVersionByLibraryId(library.id,versionId)
    }


 /*   const closeModal = (e) => {

        if (!detailRef.current || !detailRef) {
            return;
        }
        let IsSelectclear = false;
        const classList = e.target.parentElement.parentElement.classList;
        if (classList.value.startsWith('ant-popover')||classList.value==='' ||classList.value.startsWith("ant-drawer")||
            classList.value.startsWith("file-details")||classList.value==='anticon anticon-close'||
            classList.value.startsWith('basic-body')){
            IsSelectclear = true
        }

        if (!detailRef.current.contains(e.target) && detailRef.current !== e.target && !IsSelectclear && visible) {
            setVisible(false)
            setHistoryName(null)
            setChangeVersionId(null)
        }
    }*/


    //切换table 类型
    const cuteType = async (value) => {
        setTableType(value)
    }


    //取消弹窗
    const cancelDrawer = () => {
        setHistoryName(null)
        setChangeVersionId(null)
        console.log("关闭")
     /*   let pathname = props.location.pathname;
        const index = pathname.lastIndexOf("\/");
        pathname = pathname.substring(0, index);
        console.log(pathname);
        props.history.replace(`${pathname}`)*/

        setVisible(false)
        setTableType("info")
    }


    //切换版本
    const cuteVersion = (value) => {
        setTableType("info")
        findLibrary(value.id)
    }

    return(
        <Drawer
            placement='right'
            closable={false}
            width={"60%"}
            onClose={cancelDrawer}
            destroyOnClose={true}
            /*contentWrapperStyle={{top:48,height:"calc(100% - 48px)"}}*/
            bodyStyle={{overflow:"hidden"}}
            visible={visible}
            /*mask={false}*/
        >
            <div className='library-drawer' ref={detailRef}>
                <div className='crumbs-nav'>
                    <div className='crumbs-nav-title'>
                        <div>{libraryVersionData?.library?.name}</div>
                        <div>/</div>
                        {
                            libraryVersionData?.libraryType==='maven'&&libraryVersionData?.groupId&&
                            <>
                                <div>{libraryVersionData?.groupId}</div>
                                <div>/</div>
                            </>
                        }
                        <div>{libraryVersionData?.version}</div>
                    </div>
                    <CloseOutlined style={{fontSize:16,cursor:"pointer"}} onClick={()=>setVisible(false)}/>
                </div>

                <LibraryTableNav {...props}
                                 libraryVersionData={libraryVersionData}
                                 tableType={tableType}
                                 setTableType={cuteType}/>
                        <div className='library-drawer-bottom'>
                            {
                                tableType==='manifest'&&
                                <>
                                    {
                                        !dataRefresh?
                                            <pre style={{ whiteSpace: "pre-wrap" }}
                                                 className='manifest-data'
                                                 id="jsonOutput"/>
                                             :
                                            <SpinLoading type={'table'}/>
                                    }
                                </> ||
                                tableType==='layers'&&
                                    <>
                                        {
                                            !dataRefresh?
                                                <div className='layers-data'>
                                                    {
                                                        layersList&&layersList.map((item,key)=>{
                                                            return(
                                                                <div key={key} className='layers-data-nav'>
                                                                    {item}
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>:  <SpinLoading type={'table'}/>
                                        }
                                    </>

                            ||
                            tableType==='info'&&<LibraryInfo libraryVersionData={libraryVersionData} />||
                            tableType==='file'&&<LibraryFile crumbsType={tableType}
                                                             versionData={libraryVersionData}/>||
                            tableType==='history'&&<LibraryHistory  crumbsType={tableType}
                                                                    setVisible={setVisible}
                                                                    versionData={libraryVersionData}
                                                                        cuteVersion={cuteVersion}
                                />
                            }
                        </div>
            </div>
        </Drawer>
    )
}
export default observer(LibraryDrawer)
