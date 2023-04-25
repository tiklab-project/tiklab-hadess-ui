/**
 * @name: LibraryFileList
 * @author: limingliang
 * @date: 2023-01-09 14:30
 * @description：制品详情-文件列表
 * @update: 2023-01-09 14:30
 */
import React from "react";
import './Library.scss'
import FileList from "../../../common/library/FileList";
const LibraryFileList = (props) => {
    const {match:{params}} = props;
    return(
        <div className='repositoryLibrary'>
            <div className='repository-library-width'>
                <FileList versionId={params.versionId} repositoryId={params?.id} type={"repository"} {...props}/>
            </div>
        </div>
    )
}
export default LibraryFileList
