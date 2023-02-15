/**
 * @name: LibrarySurvey
 * @author: limingliang
 * @date: 2023-01-09 14:30
 * @description：制品库-制品详情-概览
 * @update: 2023-01-09 14:30
 */
import React from "react";
import './library.scss'
import Survey from "../../../common/library/survey";
const LibrarySurvey = (props) => {
    const {match:{params}} = props;
    return(
        <div className='repositoryLibrary'>
            <div className='repository-library-width'>
                <Survey versionId={params.versionId} repositoryId={params?.id} type={"repository"} {...props}/>
            </div>
        </div>
    )
}
export default LibrarySurvey
