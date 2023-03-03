/**
 * @name: LibrarySurvey
 * @author: limingliang
 * @date: 2023-01-09 14:30
 * @description：制品详情-概览
 * @update: 2023-01-09 14:30
 */
import React,{useEffect, useState} from "react";
import LibraryTable from "../../common/components/libraryTable";
import {Descriptions} from "antd";
import libraryService from "../api/LibraryApi";
const Survey = (props) => {
    const {type,repositoryId,versionId}=props
    const [version,setVersion]=useState(null)   //最新的版本
    useEffect(async () => {
        await findLibraryDetailsById()

    }, []);
    //查询制品版本详情
    const findLibraryDetailsById =async () => {
        const param = new FormData()
        param.append('id',versionId)
        const res = await libraryService.findLibraryVersion(param)
        if (res.code===0){
            setVersion(res.data)
        }
    }

    return(
        <div>
            <LibraryTable type={type} classify={"survey"} versionId={versionId} repositoryId={repositoryId}  {...props} />
            <div className='mt-5 space-y-5'>
                <Descriptions title="基本信息" className=' text-sm' >
                    <Descriptions.Item label="名称">{version?.library.name}</Descriptions.Item>
                    <Descriptions.Item label="类型">{version?.libraryType}</Descriptions.Item>
                    <Descriptions.Item  label="GroupID">{version?.groupId}</Descriptions.Item>
                    <Descriptions.Item label="仓库">{version?.repository.name}</Descriptions.Item>
                    <Descriptions.Item label="版本">{version?.version}</Descriptions.Item>

                    <Descriptions.Item label="ArtifactID">{version?.artifactId}</Descriptions.Item>
                    <Descriptions.Item label="大小">{version?.size}</Descriptions.Item>
                    <Descriptions.Item label="hash">{version?.hash}</Descriptions.Item>
                </Descriptions>
                <Descriptions title="推送信息" className=' text-sm' >
                    <Descriptions.Item label="推送人">{version?.user.name}</Descriptions.Item>
                    <Descriptions.Item label="推送时间">{version?.pushTime}</Descriptions.Item>
                </Descriptions>
                <Descriptions title="拉取信息" className=' text-sm' >
                    <Descriptions.Item label="最近拉取人">{version?.library.name}</Descriptions.Item>
                    <Descriptions.Item label="最近拉取时间">{version?.repository.name}</Descriptions.Item>
                    <Descriptions.Item label="总拉取数">{version?.repository.name}</Descriptions.Item>
                </Descriptions>
            </div>
        </div>
    )
}
export default Survey
