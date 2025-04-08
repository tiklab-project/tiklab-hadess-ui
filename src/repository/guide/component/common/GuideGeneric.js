/**
 * @name: GuideGeneric
 * @author: limingliang
 * @date: 2024-08-22 10:30
 * @description：Generic仓库指引
 * @update: 2024-08-22 10:30
 */
import React from "react";
import {message} from "antd";
import {CopyOutlined} from "@ant-design/icons";
import {observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";
const GuideGeneric = (props) => {
    const {repositoryData,tableType,clickCopy}=props

    return(
        <>
            {
                tableType==='push'?
                    <div className='rpy-guide-tab'>
                        <code>
                            <div className='rpy-guide-title'>推送</div>
                            <div className='rpy-guide-desc'>请在命令行执行以下命令进行制品推送</div>
                            <div className='rpy-guide-table'>
                                <code id={'genericDeploy'}>
                                    {`curl -T [LOCAL_FILE] -u ${getUser().name}:[PASSWORD] "${repositoryData.repositoryUrl}/[FILE_NAME]?version=[VERSION]"`}
                                </code>
                                <div className='rpy-guide-table-copy' onClick={()=>clickCopy("genericDeploy")}>
                                    <CopyOutlined />
                                </div>
                            </div>
                        </code>
                    </div>:
                    <div className='rpy-guide-tab'>
                        <div>
                            <div className='rpy-guide-title'>拉取</div>
                            <div className='rpy-guide-desc'>请在命令行执行以下命令进行制品推送</div>
                            <div className='rpy-guide-table'>
                                <code id={'genericPull'}>
                                    {`curl -H "type:download" -u ${getUser().name}:[PASSWORD] "${repositoryData.repositoryUrl}/[FILE_NAME]?version=[version]" -o [OUTPUT_FILE]/[FILE_NAME]`}
                                </code>
                                <div className='rpy-guide-table-copy' onClick={()=>clickCopy("genericPull")}>
                                    <CopyOutlined />
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default observer(GuideGeneric)
