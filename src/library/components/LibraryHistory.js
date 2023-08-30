/**
 * @name: LibraryHistory
 * @author: limingliang
 * @date: 2023-01-09 14:30
 * @description：制品详情-历史版本
 * @update: 2023-01-09 14:30
 */
import React from "react";
import './LibraryHistory.scss'
import History from "../../common/library/History";
import LibraryNav from "./LibraryNav";

const LibraryHistory = (props) => {
    const {match:{params}} = props;




    return(
        <div className='history'>
            <LibraryNav {...props} type={params.type}/>
            <div className='history-style'>
                <div className='history-data'>
                    <History versionId={params.versionId} type={'library'} {...props}/>
                </div>
            </div>
         </div>
    )
}

export default LibraryHistory
