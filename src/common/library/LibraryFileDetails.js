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
import {getUser} from "thoughtware-core-ui";
import {LeftOutlined} from "@ant-design/icons";
const LibraryFileDetails = (props) => {
    const {fileDetail,mavenData,serverIp,goBack}=props

    const goContent = () => {
       const a=getUser().tenant
       window.open(`${node_env? base_url:window.location.origin}/fileHand/read/${a?getUser().tenant+"/":""}${fileDetail?.fileUrl}`)
        //window.location.href=`${node_env? base_url:window.location.origin}/fileHand/read/${a?getUser().tenant+"/":""}${fileDetail?.fileUrl}`
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
                <div className='file-name-style'>
                    <div className='file-name-icon'>
                        <LeftOutlined onClick={goBack} style={{color:'#0063FF'}}/>
                    </div>
                    <div className='file-details-name'>{fileDetail.fileName}</div>
                </div>
                <div className='file-details-title' >基本信息</div>
                <div className='file-details-body'>
                    <div className='file-details-basic'>
                        <div className='basic-body-left'>
                            <div className='basic-body-item'>
                                <div className='basic-body-item-title'>制品库</div>
                                <span>{fileDetail?.repository.name}</span>
                            </div>
                            <div className='basic-body-item'>
                                <div className='basic-body-item-title'>版本</div>
                                <span>{fileDetail?.libraryVersion.version}</span>
                            </div>
                            {
                                fileDetail?.repository.type==="maven"&&
                                <div className='basic-body-item'>
                                    <div className='basic-body-item-title'>groupId</div>
                                    <span>{mavenData?.groupId}</span>
                                </div>
                            }
                            <div className='basic-body-item'>
                                <div className='basic-body-item-title'>提交人</div>
                                <span>{"admin"}</span>
                            </div>
                        </div>
                        <div className='basic-body-right'>
                            <div className='basic-body-item'>
                                <div className='basic-body-item-title'>类型</div>
                                <span>{fileDetail?.repository.type}</span>
                            </div>
                            <div className='basic-body-item'>
                                <div className='basic-body-item-title'>大小</div>
                                <span>{fileDetail.fileSize}</span>
                            </div>
                            {
                                fileDetail?.repository.type==="maven"&&
                                <div className='basic-body-item'>
                                    <div className='basic-body-item-title'>artifactId</div>
                                    <span>{mavenData?.artifactId}</span>
                                </div>
                            }
                            <div className='basic-body-item'>
                                <div className='basic-body-item-title'>更新时间</div>
                                <span>{fileDetail.libraryVersion.updateTime}</span>
                            </div>
                        </div>
                    </div>
                    <div className='basic-body-item'>
                        <div className='basic-body-item-title'>路径</div>
                        <span className='basic-path-cursor basic-path-color' onClick={goContent}>{omitFiled(fileDetail?.relativePath)}</span>
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
                            npm install {"thoughtware-eam-ui@1.0.0"}
                        </div>
                    </div>
                }
            </div>
        </Fragment>
    )
}
export default observer(LibraryFileDetails)
