/**
 * @name: LibraryFileList
 * @author: limingliang
 * @date: 2023-01-09 14:30
 * @description：制品详情-文件列表
 * @update: 2023-01-09 14:30
 */
import React from "react";
import './LibraryFileList.scss'
import FileList from "../../common/library/FileList";
import LibraryNav from "./LibraryNav";
import {observer} from "mobx-react";
const LibraryFileList = (props) => {
    const {match:{params}} = props;

    return(
        <div className='fileList'>
            <LibraryNav {...props} type={params.type}/>
            <div className='fileList-style'>
                <div className='fileList-data'>
                    <FileList versionId={params.versionId} type={'library'}   {...props}/>
                </div>
            </div>
        </div>
    )
}
export default observer(LibraryFileList)
