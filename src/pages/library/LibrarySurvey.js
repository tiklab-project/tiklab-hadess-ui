/**
 * @name: LibrarySurvey
 * @author: limingliang
 * @date: 2023-01-09 14:30
 * @description：制品详情-概览
 * @update: 2023-01-09 14:30
 */
import React from "react";
import './LibrarySurvey.scss'
import Survey from "../../common/library/survey";
const LibrarySurvey = (props) => {
    const {match:{params}} = props;
    debugger
    return(
        <div className='survey'>
            <div className='history-width'>
                <Survey versionId={params.versionId} type={"library"} {...props}/>
            </div>
        </div>
    )
}
export default LibrarySurvey
