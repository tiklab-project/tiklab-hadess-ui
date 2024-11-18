/**
 * @name: GuideNpm
 * @author: limingliang
 * @date: 2024-08-22 10:30
 * @description：npm仓库指引
 * @update: 2024-08-22 10:30
 */
import React from "react";
import {message} from "antd";
import {CopyOutlined} from "@ant-design/icons";
import {copy} from "../../../../common/utils";
import {observer} from "mobx-react";
const GuideNpm = (props) => {
    const {repositoryData,tableType,clickCopy}=props


    return(
        <>
            <div className='rpy-guide-tab'>
                <div>
                    <div className='rpy-guide-title'>步骤一: 设置仓库凭证</div>
                    <div className='rpy-guide-desc'>设置仓库为npm的默认仓库</div>
                    <div className='rpy-guide-table'>
                        <code id={"npmConfig"}>{`npm config set registry ${repositoryData.repositoryUrl}`}</code>
                        <div className='rpy-guide-table-copy' onClick={()=>clickCopy("npmConfig")}>
                            <CopyOutlined />
                        </div>
                    </div>
                </div>
                <div>
                    <div className='rpy-guide-desc'>登陆 npm 仓库并设置凭证</div>
                    <div className='rpy-guide-table'>
                        <code id={"npmLogin"}> {"npm login"}</code>
                        <div className='rpy-guide-table-copy' onClick={()=>clickCopy("npmLogin")}>
                            <CopyOutlined />
                        </div>
                    </div>
                </div>
            </div>

            <div className='rpy-guide-tab'>
                {
                    tableType==='push'?
                        <div>
                            <div className='rpy-guide-title'>步骤二：推送</div>
                            <div className='rpy-guide-desc'>进入你的工程目录，设置好您的package.json，执行以下指令完成推送</div>
                            <div className='rpy-guide-table'>
                                <code id={"npmDeploy"}>{"npm publish"}</code>
                                <div className='rpy-guide-table-copy' onClick={()=>clickCopy("npmDeploy")}>
                                    <CopyOutlined />
                                </div>
                            </div>
                        </div>:
                        <div>
                            <div className='rpy-guide-title'>步骤二：拉取</div>
                            <div className='rpy-guide-table'>
                                <code id={'npmPull'}> {"npm install [PACKAGE]@[VERSION]"}</code>
                                <div className='rpy-guide-table-copy' onClick={()=>clickCopy("npmPull")}>
                                    <CopyOutlined />
                                </div>
                            </div>
                        </div>
                }

            </div>
        </>
    )
}
export default observer(GuideNpm)
