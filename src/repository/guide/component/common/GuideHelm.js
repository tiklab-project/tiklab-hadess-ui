/**
 * @name: GuideHelm
 * @author: limingliang
 * @date: 2024-08-22 10:30
 * @description：helm仓库指引
 * @update: 2024-08-22 10:30
 */
import React,{useEffect,useState} from "react";
import {message} from "antd";
import {CopyOutlined} from "@ant-design/icons";
import {copy} from "../../../../common/utils";
import {observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";
const GuideHelm = (props) => {
    const {repositoryData,tableType,clickCopy}=props


    return(
        <>
            <div className='rpy-guide-tab'>
                <div className='rpy-guide-illustrate'>
                    <div>注意：Helm暂时只支持本地库</div>
                    <div>;</div>
                    <div>
                        {repositoryData.repositoryType==='local'&&"该制品库为本地库"}
                        {repositoryData.repositoryType==='remote'&&"该制品库为远程库"}
                        {repositoryData.repositoryType==='group'&&"该制品库为组合库"}
                    </div>
                </div>
                <div>
                    <div className='rpy-guide-title'>步骤一: 设置仓库凭证</div>
                    <div className='rpy-guide-desc'>添加helm仓库</div>
                    <div className='rpy-guide-table'>
                        <code id={"helmConfig"}>{`helm repo add  "${repositoryData.repositoryUrl}" --username ${getUser().name} --password [password]`}</code>
                        <div className='rpy-guide-table-copy' onClick={()=>clickCopy("helmConfig")}>
                            <CopyOutlined />
                        </div>
                    </div>
                </div>
            </div>
            {
                tableType==='push'?
                    <div className='rpy-guide-tab'>
                        <div >
                            <div className='rpy-guide-title'>步骤二: 推送</div>
                            <div className='rpy-guide-desc'>推送打包后的 Chart</div>
                            <div className='rpy-guide-table'>
                                <code id={"helmDeploy"}>{`curl ${repositoryData.repositoryUrl} -F "file=@[CHART_NAME]-[VERSION].tgz" -u ${getUser().name}:[password]`}</code>
                                <div className='rpy-guide-table-copy' onClick={()=>clickCopy("helmDeploy")}>
                                    <CopyOutlined />
                                </div>
                            </div>
                        </div>
                    </div>:
                    <div className='rpy-guide-tab'>
                        <div>
                            <div className='rpy-guide-title'>步骤二: 拉取</div>
                            <div className='rpy-guide-desc'>请在命令行执行以下命令进行拉取</div>
                            <div className='rpy-guide-table'>
                                <code id={"helmPull"}>{`docker pull ${repositoryData.repositoryUrl}/[LIBRARY-NAME]:[VERSION]`}</code>
                                <div className='rpy-guide-table-copy' onClick={()=>clickCopy("helmPull")}>
                                    <CopyOutlined />
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )

}
export default observer(GuideHelm)
