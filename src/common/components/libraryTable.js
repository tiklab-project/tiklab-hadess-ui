/**
 * @name: LibraryTable
 * @author: limingliang
 * @date: 2023-01-09 16:53
 * @description：制品详情-table切换
 * @update: 2022-11-12 16:53
 */
import React from 'react';
import './librayTable.scss'
const LibraryTable = (props) => {
    const {type,versionId,repositoryId,classify}=props   //type : library repository  ; classify: survey、history、file
    const cuteTable = (value) => {
        if (type==='library'&&value==='survey'){
            props.history.push(`/index/library/librarySurvey/${versionId}`)
        }
        if (type==='library'&&value==="file"){
            props.history.push(`/index/library/fileList/${versionId}`)
        }
        if (type==='library'&&value==='history'){
            props.history.push(`/index/library/history/${versionId}`)
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
    }
    const goLibrary =async () => {
        if (type=='repository'){
            props.history.push(`/index/repository/${repositoryId}/libraryList`)
        }else {
            props.history.push(`/index/library`)
        }

    }
    return(
        <div className='libraryTable'>
            <div className='library-title space-x-2 '>
                <div className='cursor-pointer' onClick={goLibrary}>制品</div>
                <div>/</div>
                <div>历史</div>
            </div>
            <div className='flex space-x-8 '>
                <div className={`${classify==='survey'&& ' choose_library_type '}  library_tab`} onClick={()=>cuteTable("survey")}>概览</div>
                <div className={`${classify==='file'&& ' choose_library_type '}  library_tab`} onClick={()=>cuteTable("file")}>文件列表</div>
                <div className={`${classify==='history'&& ' choose_library_type '}  library_tab`} onClick={()=>cuteTable("history")}>历史版本</div>
            </div>
        </div>

    )
}
export default LibraryTable
