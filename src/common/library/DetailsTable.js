/**
 * @name: DetailsTable
 * @author: limingliang
 * @date: 2023-09-04 10:30
 * @description：制品文件详情table
 * @update: 2023-09-04 10:30
 */
import React,{useState,useEffect} from "react";
import OverviewUse from "./OverviewUse";
import FileList from "./FileList";
import History from "./History";
import FileDetailsDrawer from "./FileDetailsDrawer";
import "./DetailsTable.scss"
import libraryStore from "../../library/store/LibraryStore";
import {observer} from "mobx-react";
import {SpinLoading} from "../loading/Loading";
import Print from "../image/Print";
const DetailsTable = (props) => {
    const {libraryVersionData,cuteVersion,detailsLoad,publicState}=props
    const {findLibraryMaven,libraryMavenData,detailsType}=libraryStore
    const [tableType,setTableType]=useState("info")   //table 类型

    //文件详情弹窗状态
    const [fileVisible,setFileVisible]=useState(false)
    //文件详情
    const [fileDetail,setFileDetail]=useState()

    const [libraryType,setLibraryType]=useState()

    useEffect(async () => {
        setLibraryType(capitalizeFirstLetter(libraryVersionData?.libraryType))

        if (libraryVersionData.libraryType==='go'){
            setTableType("file")
        }else {
            if (detailsType){
                setTableType(detailsType)
            }
        }
    }, [libraryVersionData]);

    //将首字母大写
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    //打开文件详情
    const openFileDetails = (value) => {
        setFileVisible(true)
        setFileDetail(value)
        if (value.library.libraryType==='maven'){
            findLibraryMaven(value.library.id)
        }
    }

    //切换版本
    const findVersion = (versionId) => {
        cuteVersion(versionId)
        setTableType("info")
    }

    //快照版本切换
    const findSnapshotVersion = (snapshot) => {
        setTableType("info")
        cuteVersion(snapshot.versionId)
    }

    return(
        <div className='details-table'>
            {
                detailsLoad?
                <>
                <div className='library-details-tab'>
                    {
                        libraryVersionData.libraryType!=="go"&&
                        <div className={`${tableType==='info'&& ' choose-library-type '}  library-tab-nav`} onClick={()=>setTableType("info")}>制品信息</div>
                    }
                    <div className={`${tableType==='file'&& ' choose-library-type '}  library-tab-nav`} onClick={()=>setTableType("file")}>
                        文件
                        <div className='library-tab-num'>{libraryVersionData?.fileNum}</div>
                    </div>
                    <div className={`${tableType==='history'&& ' choose-library-type '}  library-tab-nav`} onClick={()=>setTableType("history")}>
                        版本
                        <div className='library-tab-num'>{libraryVersionData?.versionNum}</div>
                    </div>
                </div>
                    {
                        tableType==='info'&&
                        <div>
                            <div className='overview-body-title'>基本信息</div>
                            <div className='overview-body'>

                                <div className='overview-body-left'>
                                    <div className='overview-body-item'>
                                        <div className='overview-body-item-title'>名称</div>
                                        <div>{libraryVersionData?.library?.name}</div>
                                    </div>
                                    <div className='overview-body-item'>
                                        <div className='overview-body-item-title'>仓库</div>
                                        <div>{libraryVersionData?.repository?.name}</div>
                                    </div>
                                    {
                                        libraryVersionData?.libraryType==='maven'&&
                                        <div className='overview-body-item'>
                                            <div className='overview-body-item-title'>GroupID</div>
                                            <div>{libraryVersionData?.groupId}</div>
                                        </div>
                                    }
                                    <div className='overview-body-item'>
                                        <div className='overview-body-item-title'>版本</div>
                                        <div>{libraryVersionData?.version}</div>
                                    </div>
                                </div>
                                <div className='overview-body-right'>
                                    <div className='overview-body-item'>
                                        <div className='overview-body-item-title'>类型</div>
                                        <div className='overview-body-item-type'>
                                            <div className='item-type-text'>{libraryType}</div>
                                        </div>
                                    </div>
                                    <div className='overview-body-item'>
                                        <div className='overview-body-item-title'>大小</div>
                                        <div>{libraryVersionData?.showSize}</div>
                                    </div>
                                    {
                                        libraryVersionData?.libraryType==='maven'&&
                                        <div className='overview-body-item'>
                                            <div className='overview-body-item-title'>ArtifactID</div>
                                            <div>{libraryVersionData?.artifactId}</div>
                                        </div>
                                    }
                                    <div className='overview-body-item'>
                                        <div className='overview-body-item-title'>hash</div>
                                        <div>{libraryVersionData?.hash}</div>
                                    </div>
                                </div>
                            </div>

                            <div className='overview-body-title'>使用指南</div>
                            <OverviewUse {...props} versionData={libraryVersionData}/>
                        </div> ||
                        tableType==='file'&&<FileList {...props} versionData={libraryVersionData}
                                                      openFileDetails={openFileDetails}/>||
                        tableType==='history'&&<History {...props} versionData={libraryVersionData}
                                                        setVersionId={findVersion}
                                                        setSnapshotVersion={findSnapshotVersion}
                                                        publicState={publicState}
                        />
                    }
                    <FileDetailsDrawer  visible={fileVisible}
                                        setVisible={setFileVisible}
                                        versionData={libraryVersionData}
                                        fileDetail={fileDetail}
                                        mavenData={libraryMavenData}
                    />
                </>: <SpinLoading type="table"/>
            }

        </div>
    )

}
export default observer(DetailsTable)
