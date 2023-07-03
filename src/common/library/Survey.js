/**
 * @name: Survey
 * @author: limingliang
 * @date: 2023-01-09 14:30
 * @description：制品详情-概览
 * @update: 2023-01-09 14:30
 */
import React,{useEffect} from "react";
import LibraryTable from "../../common/components/libraryTable";
import {Descriptions} from "antd";
import './survey.scss'
import libraryStore from "../../library/store/LibraryStore"
const Survey = (props) => {
    const {type,repositoryId,versionId}=props
    const {findLibraryVersion,libraryVersionData}=libraryStore


    useEffect(async () => {
        findLibraryVersion(versionId)
    }, []);


    return(
        <div>
            <LibraryTable type={type} classify={"survey"} versionId={versionId} repositoryId={repositoryId}  {...props} />
            <div className='file-survey'>
                <Descriptions title="基本信息" className='file-survey-nav' >
                    <Descriptions.Item label="名称">{libraryVersionData?.library?.name}</Descriptions.Item>
                    <Descriptions.Item label="类型">{libraryVersionData?.libraryType}</Descriptions.Item>
                    {
                        libraryVersionData?.libraryType==='maven'&&
                        <Descriptions.Item  label="GroupID">{libraryVersionData?.groupId}</Descriptions.Item>
                    }

                    <Descriptions.Item label="仓库">{libraryVersionData?.repository?.name}</Descriptions.Item>
                    <Descriptions.Item label="版本">{libraryVersionData?.version}</Descriptions.Item>

                    {
                        libraryVersionData?.libraryType==='maven'&&
                        <Descriptions.Item label="ArtifactID">{libraryVersionData?.artifactId}</Descriptions.Item>
                    }

                    <Descriptions.Item label="大小">{libraryVersionData?.size}</Descriptions.Item>
                    <Descriptions.Item label="hash">{libraryVersionData?.hash}</Descriptions.Item>
                </Descriptions>
                <Descriptions title="推送信息" className='file-survey-nav' >
                    <Descriptions.Item label="推送人">{libraryVersionData?.pusher}</Descriptions.Item>
                    <Descriptions.Item label="推送时间">{libraryVersionData?.pushTime}</Descriptions.Item>
                </Descriptions>
               {/* <Descriptions title="拉取信息" className='file-survey-nav' >
                    <Descriptions.Item label="最近拉取人">{version?.pullUser?version.pullUser:"null"}</Descriptions.Item>
                    <Descriptions.Item label="最近拉取时间">{version?.pullTime?version.pullTime:"null"}</Descriptions.Item>
                    <Descriptions.Item label="总拉取数">{version?.pullNum?version?.pullNum:"null"}</Descriptions.Item>
                </Descriptions>*/}
            </div>
        </div>
    )
}
export default Survey
