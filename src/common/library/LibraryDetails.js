/**
 * @name: LibraryDetails
 * @author: limingliang
 * @date: 2023-09-04 10:30
 * @description：制品详情  概览
 * @update: 2023-09-04 10:30
 */
import React from "react";

import "./LibraryDetails.scss"
import {observer} from "mobx-react";
import OmitFiled from "./OmitFiled";
const LibraryDetails = (props) => {
    const {versionData}=props

    return(
        <div className='library-details'>
            <div className='survey-title'>基本信息</div>
            <div className='survey-body'>
                <div className='survey-body-left'>
                    <div className='survey-body-item'>
                        <div className='survey-body-item-title'>名称</div>
                        <div>{versionData?.library?.name}</div>
                    </div>
                    <div className='survey-body-item'>
                        <div className='survey-body-item-title'>仓库</div>
                        <div>{versionData?.repository?.name}</div>
                    </div>
                    {
                        versionData?.libraryType==='maven'&&
                        <div className='survey-body-item'>
                            <div className='survey-body-item-title'>GroupID</div>
                            <div>{versionData?.groupId}</div>
                        </div>
                    }
                    <div className='survey-body-item'>
                        <div className='survey-body-item-title'>版本</div>

                        <div>{versionData?.version}</div>
                    </div>
                </div>
                <div className='survey-body-right'>
                    <div className='survey-body-item'>
                        <div className='survey-body-item-title'>类型</div>
                        <div>{versionData?.libraryType}</div>
                    </div>
                    <div className='survey-body-item'>
                        <div className='survey-body-item-title'>大小</div>
                        <div>{versionData?.showSize}</div>
                    </div>
                    {
                        versionData?.libraryType==='maven'&&
                        <div className='survey-body-item'>
                            <div className='survey-body-item-title'>ArtifactID</div>
                            <div>{versionData?.artifactId}</div>
                        </div>
                    }
                    <div className='survey-body-item'>
                        <div className='survey-body-item-title'>hash</div>
                        <div>{versionData?.hash}</div>
                       {/* {<OmitFiled value={versionData?.hash}/>}*/}
                    </div>
                </div>
            </div>

            <div className='survey-title survey-top'>推送信息</div>
            <div className='survey-body '>
                <div className='survey-body-left'>
                    <div className='survey-body-item'>
                        <div className='survey-body-item-title'>推送人</div>
                        <div>{versionData?.pusher}</div>
                    </div>
                </div>
                <div className='survey-body-right'>
                    <div className='survey-body-item'>
                        <div className='survey-body-item-title'>推送时间</div>
                        <div>{versionData?.updateTime}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default observer(LibraryDetails)
