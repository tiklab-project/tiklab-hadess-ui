/**
 * @name: LibraryHistory
 * @author: limingliang
 * @date: 2023-01-09 14:30
 * @description：制品详情-历史版本
 * @update: 2023-01-09 14:30
 */
import React from "react";
import './LibraryHistory.scss'
import {Modal} from "antd";
import History from "../../common/library/history";
const LibraryHistory = (props) => {
    const {match:{params}} = props;
    return(
        <div className='history'>
            <div className='history-width'>
              <History versionId={params.versionId} type={'library'} {...props}/>
            </div>
         </div>
    )
}

export default LibraryHistory
