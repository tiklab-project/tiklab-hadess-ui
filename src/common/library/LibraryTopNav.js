/**
 * @name: LibraryTable
 * @author: limingliang
 * @date: 2023-01-09 16:53
 * @description：制品详情-table切换
 * @update: 2022-11-12 16:53
 */
import React,{useEffect} from 'react';
import './LibraryTopNav.scss'
import Breadcrumb from "../breadcrumb/Breadcrumb";
import {observer} from "mobx-react";
import libraryStore from "../../library/store/LibraryStore";
const LibraryTopNav = (props) => {
    const {match:{params}} = props;
    const {type,versionId,repositoryId,classify}=props   //type : library repository  ; classify: survey、history、file
    const {findLibraryVersionById,libraryVersion,findLibraryNewVersion}=libraryStore

    useEffect( () => {
        findLibraryVersionById(versionId)
    }, [params.versionId]);

    useEffect( () => {

    }, [params.versionId]);

    const cuteTable = (value) => {
        debugger
        if (!params.num){
            if (type==='library'&&value==='survey'){
                props.history.push(`/index/library/${params.type}/survey/${versionId}`)
            }
            if (type==='library'&&value==="file"){
                props.history.push(`/index/library/${params.type}/fileList/${versionId}`)
            }
            if (type==='library'&&value==='history'){
                props.history.push(`/index/library/${params.type}/history/${versionId}`)
            }
            if (type==='repository'&&value==='survey'){
                props.history.push(`/index/repository/${repositoryId}/libraryList/survey/${versionId}`)
            }
            if (type==='repository'&&value==='file'){
                props.history.push(`/index/repository/${repositoryId}/libraryList/file/${versionId}`)
            }
            if (type==='repository'&&value==='history'){
                props.history.push(`/index/repository/${repositoryId}/libraryList/history/${versionId}`)
            }
        }else {
            if (type==='library'&&value==='survey'){
                props.history.push(`/index/library/${params.type}/survey/${versionId}/2`)
            }
            if (type==='library'&&value==="file"){
                props.history.push(`/index/library/${params.type}/fileList/${versionId}/2`)
            }
            if (type==='library'&&value==='history'){
                props.history.push(`/index/library/${params.type}/history/${versionId}/2`)
            }
            if (type==='repository'&&value==='survey'){
                props.history.push(`/index/repository/${repositoryId}/libraryList/survey/${versionId}/2`)
            }
            if (type==='repository'&&value==='file'){
                props.history.push(`/index/repository/${repositoryId}/libraryList/file/${versionId}/2`)
            }
            if (type==='repository'&&value==='history'){
                props.history.push(`/index/repository/${repositoryId}/libraryList/history/${versionId}/2`)
            }
        }

    }
    const goLibrary =async () => {
        if (params.num){
            const res=await findLibraryNewVersion(libraryVersion?.library.id)
            if (res.code===0){
                if (type=='repository'){
                    props.history.push(`/index/repository/${repositoryId}/libraryList/survey/${res.data.id}`)
                }else {
                    props.history.push(`/index/library/${params.type}/survey/${res.data.id}`)
                }
            }

        }else {
            if (type=='repository'){
                props.history.push(`/index/repository/${repositoryId}/libraryList`)
            }else {
                props.history.push(`/index/library/${params.type}`)
        }
        }
    }

    return(
        <div className='libraryTable'>
            {
                params.num?
                    <Breadcrumb firstItem={libraryVersion?.library?.name} secondItem={libraryVersion?.version}  goBack={goLibrary}/>
                   : <Breadcrumb firstItem={libraryVersion?.library?.name}   goBack={goLibrary}/>
            }
            <div className='library-tab '>
                <div className={`${classify==='survey'&& ' choose-library-type '}  library-tab-nav`} onClick={()=>cuteTable("survey")}>概览</div>
                <div className={`${classify==='file'&& ' choose-library-type '}  library-tab-nav library-tab-nav-mar`} onClick={()=>cuteTable("file")}>文件</div>
                <div className={`${classify==='history'&& ' choose-library-type '}  library-tab-nav`} onClick={()=>cuteTable("history")}>历史版本</div>
            </div>
        </div>

    )
}
export default observer(LibraryTopNav)
