/**
 * @name: LibraryFileDetails
 * @author: limingliang
 * @date: 2023-09-04 10:30
 * @description：制品文件详情
 * @update: 2023-09-04 10:30
 */
import React, {useState, useEffect,Fragment} from "react";
import "./LibraryFileDetails.scss"
import {Tooltip} from "antd";
import {observer} from "mobx-react";
import Return from "../../assets/images/img/return.png";
import {getUser} from "tiklab-core-ui";
const LibraryFileDetails = (props) => {
    const {fileDetail,mavenData,serverIp,goBack}=props

    const goContent = () => {
       const a=getUser().tenant
        window.open(`${node_env? base_url:window.location.origin}/fileHand/read/${a?getUser().tenant+"/":""}${fileDetail?.fileUrl}`)
    }

    /**
     * 省略过长路径
     * @param  value
     */
    const omitFiled=(value)=>{
        return(
            value?.length>50?
                <Tooltip placement="right" title={value}>
                    <div style={{
                        display:"flex",
                        overflow: "hidden",
                        maxWidth:"500px",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                    }} >{value}</div>
                </Tooltip>
                :
                <div  >{value}</div>
        )
    }

    return(
        <Fragment>
            <div className='file-details'>
                <div style={{display:"flex",marginBottom:15}}>
                    <img  src={Return}  style={{width:25,height:25,cursor:'pointer'}} onClick={goBack}/>
                    <div className='file-details-name'>{fileDetail.fileName}</div>
                </div>
                <div className='file-details-title' >基本信息</div>
                <div className='file-details-body'>
                    <div className='nav-table'  style={{marginTop:10}}>
                        <div className='nav-title'>制品库:</div>
                        <span>{fileDetail?.repository.name}</span>
                    </div>
                    <div className='nav-table'>
                        <div className='nav-title'>类型:</div>
                        <span>{fileDetail?.repository.type}</span>
                    </div>
                    {
                        fileDetail?.repository.type==="Maven"&&
                        <div>
                            <div className='nav-table'>
                                <div className='nav-title'>groupId:</div>
                                <span>{mavenData?.groupId}</span>
                            </div>
                            <div className='nav-table'>
                                <div className='nav-title'>artifactId:</div>
                                <span>{mavenData?.artifactId}</span>
                            </div>
                        </div>
                    }
                    <div className='nav-table'>
                        <div className='nav-title'>版本:</div>
                        <span>{fileDetail?.libraryVersion.version}</span>
                    </div>
                    <div className='nav-table'>
                        <div className='nav-title'>大小:</div>
                        <span>{fileDetail.fileSize}</span>
                    </div>
                    <div className='nav-table'>
                        <div className='nav-title'>提交人:</div>
                        <span>{"admin"}</span>
                    </div>
                    <div className='nav-table'>
                        <div className='nav-title'>创建时间:</div>
                        <span>{fileDetail.createTime}</span>
                    </div>
                    <div className='nav-table'>
                        <div className='nav-title'>更新时间:</div>
                        <span>{fileDetail.libraryVersion.updateTime}</span>
                    </div>

                    <div className='nav-table nav-path'>
                        <div className='nav-title'>路径:</div>
                        <span className='nav-path-color nav-path-cursor' onClick={goContent}>{omitFiled(fileDetail?.relativePath)}</span>
                    </div>
                </div>
                {
                    fileDetail?.repository.type==="maven"&&
                    <div className='file-details-use'>
                        <div className='file-details-title'>使用指南</div>
                        <div className='use-des'>Insert this snippet into your pom.xml</div>
                        <div className='use-table'>
                            <div>{"<dependency>"}</div>
                            <div className='per-line'>
                                <div>{"<groupId>"}</div>
                                <div>{mavenData?.groupId}</div>
                                <div>{"</groupId>"}</div>
                            </div>
                            <div className='per-line'>
                                <div>{"<artifactId>"}</div>
                                <div>{mavenData?.artifactId}</div>
                                <div>{"</artifactId>"}</div>
                            </div>
                            <div className='per-line'>
                                <div>{"<version>"}</div>
                                <div>{fileDetail.libraryVersion?.version}</div>
                                <div>{"</version>"}</div>
                            </div>
                            <div>{"<dependency>"}</div>
                        </div>
                    </div>
                }
                {
                    fileDetail?.repository.type==="npm"&&
                    <div className='file-details-use'>
                        <div className='file-details-title'>使用指南</div>
                        <div className='use-des'>Install runtime dependency</div>
                        <div className='use-table'>
                            npm install {"tiklab-eam-ui@1.0.0"}
                        </div>
                    </div>
                }
            </div>
        </Fragment>
    )
}
export default observer(LibraryFileDetails)
