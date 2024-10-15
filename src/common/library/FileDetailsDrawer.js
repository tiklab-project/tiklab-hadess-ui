/**
 * @name: FileDetailsDrawer
 * @author: limingliang
 * @date: 2023-09-04 10:30
 * @description：制品文件详情
 * @update: 2023-09-04 10:30
 */
import React from "react";
import "./FileDetailsDrawer.scss"
import {Drawer, Tooltip} from "antd";
import {observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";
const FileDetailsDrawer = (props) => {
    const {versionData,fileDetail,mavenData,visible,setVisible}=props
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
        <Drawer
            title={`文件详情 / ${fileDetail?.fileName}`}
            placement='right'
            closable={false}
            width={"50%"}
            onClose={()=>setVisible(false)}
            destroyOnClose={true}
            contentWrapperStyle={{height:"100%"}}
            bodyStyle={{overflow:"auto"}}
            visible={visible}
        >
            {fileDetail&&
                <div className='file-details-drawer'>

                    <div className='file-details-body'>
                        <div className='file-details-basic'>
                            <div className='basic-body-left'>
                                <div className='basic-body-item'>
                                    <div className='basic-body-item-title'>制品库</div>
                                    <span>{versionData?.repository.name}</span>
                                </div>
                                <div className='basic-body-item'>
                                    <div className='basic-body-item-title'>版本</div>
                                    <span>{versionData.version}</span>
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
                                    <span>{versionData?.repository.type}</span>
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
                                    <span>{versionData.updateTime}</span>
                                </div>
                            </div>
                        </div>
                        <div className='basic-body-item'>
                            <div className='basic-body-item-title'>路径</div>
                            <span className='basic-path-cursor basic-path-color' onClick={goContent}>{omitFiled(fileDetail?.relativePath)}</span>
                        </div>
                    </div>

                </div>
            }
        </Drawer>
    )
}
export default observer(FileDetailsDrawer)
