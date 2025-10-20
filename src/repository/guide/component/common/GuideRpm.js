/**
 * @name: GuideRpm
 * @author: limingliang
 * @date: 2025-09-08 10:30
 * @description：rpm仓库指引
 * @update: 2025-09-08 10:30
 */
import React, {useEffect, useState} from "react";
import {message} from "antd";
import {CopyOutlined} from "@ant-design/icons";
import {observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";
const GuideRpm = (props) => {
    const {repositoryData,tableType,clickCopy}=props

    const [pullPath,setPullPath]=useState('')

    useEffect(async () => {

        if (repositoryData){
            const splice = repositoryData.repositoryUrl.split("://");
            const path=splice[0]+`://${getUser().name}:[PASSWORD]@`+splice[1]
            setPullPath(path)
        }

    }, [repositoryData]);

    return(
        <>
            {
                tableType==='push'?
                    <div className='rpy-guide-tab'>
                        <code>
                            <div className='rpy-guide-title'>推送</div>
                            <div className='rpy-guide-desc'>请在命令行执行以下命令进行制品推送</div>
                            <div className='rpy-guide-table'>
                                <code id={'rpmDeploy'}>
                                    {`curl -u ${getUser().name} ${repositoryData.repositoryUrl}/[PACKAGE].rpm  -T [PACKAGE].rpm`}
                                </code>
                                <div className='rpy-guide-table-copy' onClick={()=>clickCopy("rpmDeploy")}>
                                    <CopyOutlined />
                                </div>
                            </div>
                        </code>
                    </div>:
                    <div className='rpy-guide-data-nav'>
                        <div className='rpy-guide-tab'>
                            <div>
                                <div className='rpy-guide-title'>拉取方式一：yum命令拉取</div>
                                <div className='rpy-guide-desc'>配置凭证，请将下列配置添加到您的 /etc/yum.repos.d/rpm.repo 文件中：</div>
                                <pre className='rpy-guide-table'>
                                    <code id={'yumVoucher'}>
                                        {
                                            `[${repositoryData.name}]\n`+
                                            `name=${repositoryData.name}\n`+
                                            `baseurl=${repositoryData.repositoryUrl}\n`+
                                            "enabled=1\n" +
                                            `username=${getUser().name}\n`+
                                            "password=[PASSWORD]\n" +
                                            "repo_gpgcheck=0\n" +
                                            "gpgcheck=0"
                                        }
                                    </code>
                                    <div className='rpy-guide-table-copy' onClick={()=>clickCopy("yumVoucher")}>
                                        <CopyOutlined />
                                    </div>
                                </pre>
                            </div>
                            <div>
                                <div className='rpy-guide-desc'>执行命令拉取</div>
                                <pre className='rpy-guide-table'>
                                    <code id={'yumPull'}>
                                        {
                                            `yum install --repo ${repositoryData.name} [PACKAGE]`
                                        }
                                    </code>
                                    <div className='rpy-guide-table-copy' onClick={()=>clickCopy("yumPull")}>
                                        <CopyOutlined />
                                    </div>
                                </pre>
                            </div>
                        </div>
                        <div className='rpy-guide-tab'>
                            <div>
                                <div className='rpy-guide-title'>拉取方式二：使用 rpm 命令拉取</div>
                                <pre className='rpy-guide-table'>
                                    <code id={'rpmPull'}>
                                        {`rpm -i ${pullPath}`}
                                    </code>
                                    <div className='rpy-guide-table-copy' onClick={()=>clickCopy("rpmPull")}>
                                        <CopyOutlined />
                                    </div>
                                </pre>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default observer(GuideRpm)
