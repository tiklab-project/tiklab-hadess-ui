/**
 * @name: LibraryFileList
 * @author: limingliang
 * @date: 2023-01-09 14:30
 * @description：制品详情-文件列表
 * @update: 2023-01-09 14:30
 */
import React from "react";
import './LibraryFileList.scss'
import LibraryApi from "../api/LibraryApi";
import FileList from "../../common/library/fileList";
const LibraryFileList = (props) => {
    const {match:{params}} = props;

    return(
        <div className='fileList'>
            <div className='fileList-width'>
                <FileList versionId={params.versionId} type={'library'}   {...props}/>
            </div>
        </div>
    )
}
export default LibraryFileList
