/**
 * @name: GuideComposer
 * @author: limingliang
 * @date: 2025-04-17 10:30
 * @description：Composer仓库指引
 * @update: 2025-04-17 10:30
 */
import React from "react";
import {message} from "antd";
import {CopyOutlined} from "@ant-design/icons";
import {observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";
const GuideComposer = (props) => {
    const {repositoryData,tableType,clickCopy}=props

    return(
        <>
            {
                tableType==='push'?
                    <div className='rpy-guide-tab'>
                        <code>
                            <div className='rpy-guide-title'>推送</div>
                            <div className='rpy-guide-desc'>进入 Composer 包的文件目录，将其打包成 zip (排除 vendor 目录)</div>
                            <div className='rpy-guide-table'>
                                <code id={'composerPack'}>
                                    {`zip -r [PACKAGE_NAME].zip . -x "./vendor/*""`}
                                </code>
                                <div className='rpy-guide-table-copy' onClick={()=>clickCopy("composerPack")}>
                                    <CopyOutlined />
                                </div>
                            </div>
                        </code>
                        <code>
                            <div className='rpy-guide-desc'>请在 Composer 包文件目录命令行执行以下命令进行推送</div>
                            <div className='rpy-guide-table'>
                                <code id={'composerPush'}>
                                    {`curl -T [PACKAGE].zip -u [USERNAME]:[PASSWORD] "${repositoryData.repositoryUrl}"?version=[VERSION]`}
                                </code>
                                <div className='rpy-guide-table-copy' onClick={()=>clickCopy("composerPush")}>
                                    <CopyOutlined />
                                </div>
                            </div>
                        </code>
                    </div>:
                    <div className='rpy-guide-tab'>
                        <div>
                            <div className='rpy-guide-title'>拉取</div>
                            <div className='rpy-guide-desc'>进入 Composer 包的文件目录，设置仓库地址</div>
                            <div className='rpy-guide-table'>
                                <code id={'composerSetPath'}>
                                    {`composer config repos.${repositoryData.name} composer ${repositoryData.repositoryUrl}`}
                                </code>
                                <div className='rpy-guide-table-copy' onClick={()=>clickCopy("composerSetPath")}>
                                    <CopyOutlined />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='rpy-guide-desc'>在 Composer 包文件的目录下，创建一个 auth.json 文件，配置认证信息。</div>
                            <pre className='rpy-guide-table'>
                                <code id={'composerSetUser'}>

                                    {
                                        "{\n" +
                                        "   \"http-basic\": {\n" +
                                        "         \"hadess-composer\": {\n" +
                                        "              \"username\": \"[USERNAME]\",\n" +
                                        "              \"password\": \"[PASSWORD]\"\n" +
                                        "          }\n" +
                                        "      }\n" +
                                        "}"
                                    }
                                </code>
                                <div className='rpy-guide-table-copy' onClick={()=>clickCopy("composerSetUser")}>
                                    <CopyOutlined />
                                </div>
                            </pre>
                        </div>
                        <div>
                            <div className='rpy-guide-desc'>请在 Composer 包文件目录，执行以下命令进行拉取</div>
                            <div className='rpy-guide-table'>
                                <code id={'composerPull'}>
                                    {`composer require [PACKAGE]:[VERSION]`}
                                </code>
                                <div className='rpy-guide-table-copy' onClick={()=>clickCopy("composerPull")}>
                                    <CopyOutlined />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='rpy-guide-desc'>或者</div>
                            <div className='rpy-guide-table'>
                                <code id={'composerPull1'}>
                                    {`composer require [PACKAGE]`}
                                </code>
                                <div className='rpy-guide-table-copy' onClick={()=>clickCopy("composerPull1")}>
                                    <CopyOutlined />
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default observer(GuideComposer)
