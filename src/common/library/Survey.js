/**
 * @name: Survey
 * @author: limingliang
 * @date: 2023-01-09 14:30
 * @description：制品详情-概览
 * @update: 2023-01-09 14:30
 */
import React,{useEffect} from "react";
import LibraryTopNav from "./LibraryTopNav";
import {Descriptions} from "antd";
import './survey.scss'
import libraryStore from "../../library/store/LibraryStore"
import {observer} from "mobx-react";
const Survey = (props) => {
    const {type,repositoryId,versionId}=props
    const {findLibraryVersion,libraryVersionData}=libraryStore


    useEffect(async () => {
        findLibraryVersion(versionId)
    }, [versionId]);


    return(
        <div>
            <LibraryTopNav {...props} type={type} classify={"survey"} versionId={versionId}
                           repositoryId={repositoryId}  />
            <div className='file-survey'>

                <div className='survey-title'>基本信息</div>
                <div className='survey-body'>
                    <div className='survey-body-left'>
                        <div className='survey-body-item'>
                           <div className='survey-body-item-title'>名称</div>
                            <div>{libraryVersionData?.library?.name}</div>
                        </div>
                        <div className='survey-body-item'>
                            <div className='survey-body-item-title'>仓库</div>
                            <div>{libraryVersionData?.repository?.name}</div>
                        </div>
                        {
                            libraryVersionData?.libraryType==='maven'&&
                            <div className='survey-body-item'>
                                <div className='survey-body-item-title'>GroupID</div>
                                <div>{libraryVersionData?.groupId}</div>
                            </div>
                        }
                        <div className='survey-body-item'>
                            <div className='survey-body-item-title'>版本</div>
                            <div>{libraryVersionData?.version}</div>
                        </div>
                    </div>
                    <div className='survey-body-right'>
                        <div className='survey-body-item'>
                            <div className='survey-body-item-title'>类型</div>
                            <div>{libraryVersionData?.libraryType}</div>
                        </div>
                        <div className='survey-body-item'>
                            <div className='survey-body-item-title'>大小</div>
                            <div>{libraryVersionData?.size}</div>
                        </div>
                        {
                            libraryVersionData?.libraryType==='maven'&&
                            <div className='survey-body-item'>
                                <div className='survey-body-item-title'>ArtifactID</div>
                                <div>{libraryVersionData?.artifactId}</div>
                            </div>
                        }
                        <div className='survey-body-item'>
                            <div className='survey-body-item-title'>hash</div>
                            <div>{libraryVersionData?.hash}</div>
                        </div>
                    </div>
                </div>

                <div className='survey-title survey-top'>推送信息</div>
                <div className='survey-body '>
                    <div className='survey-body-left'>
                        <div className='survey-body-item'>
                            <div className='survey-body-item-title'>推送人</div>
                            <div>{libraryVersionData?.pusher}</div>
                        </div>
                    </div>
                    <div className='survey-body-right'>
                        <div className='survey-body-item'>
                            <div className='survey-body-item-title'>推送时间</div>
                            <div>{libraryVersionData?.pushTime}</div>
                        </div>
                    </div>
                </div>
              {/*  <Descriptions title="基本信息" className='file-survey-nav' column={2} >
                    <Descriptions.Item label="名称">{libraryVersionData?.library?.name}</Descriptions.Item>
                    <Descriptions.Item label="类型">{libraryVersionData?.libraryType}</Descriptions.Item>
                    <Descriptions.Item label="仓库">{libraryVersionData?.repository?.name}</Descriptions.Item>
                    {
                        libraryVersionData?.libraryType==='maven'&&
                        <Descriptions.Item  label="GroupID">{libraryVersionData?.groupId}</Descriptions.Item>
                    }
                    <Descriptions.Item label="版本">{libraryVersionData?.version}</Descriptions.Item>

                    {
                        libraryVersionData?.libraryType==='maven'&&
                        <Descriptions.Item label="ArtifactID">{libraryVersionData?.artifactId}</Descriptions.Item>
                    }

                    <Descriptions.Item label="大小">{libraryVersionData?.size}</Descriptions.Item>
                    <Descriptions.Item label="hash">{libraryVersionData?.hash}</Descriptions.Item>
                </Descriptions>
                <Descriptions title="推送信息" className='file-survey-nav' column={2}>
                    <Descriptions.Item label="推送人">{libraryVersionData?.pusher}</Descriptions.Item>
                    <Descriptions.Item label="推送时间">{libraryVersionData?.pushTime}</Descriptions.Item>
                </Descriptions>*/}
               {/* <Descriptions title="拉取信息" className='file-survey-nav' >
                    <Descriptions.Item label="最近拉取人">{version?.pullUser?version.pullUser:"null"}</Descriptions.Item>
                    <Descriptions.Item label="最近拉取时间">{version?.pullTime?version.pullTime:"null"}</Descriptions.Item>
                    <Descriptions.Item label="总拉取数">{version?.pullNum?version?.pullNum:"null"}</Descriptions.Item>
                </Descriptions>*/}
            </div>
        </div>
    )
}
export default observer(Survey)
