/**
 * @name: GuideGo
 * @author: limingliang
 * @date: 2024-08-22 10:30
 * @description：conan仓库指引
 * @update: 2024-08-22 10:30
 */
import React,{useEffect,useState} from "react";
import {message} from "antd";
import {CopyOutlined} from "@ant-design/icons";
import {observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";
const GuideGo = (props) => {
    const {repositoryData,tableType,clickCopy}=props

    return(
        <>
            <div className='rpy-guide-tab'>
                <div>
                    <div className='rpy-guide-title'>步骤一: 设置仓库凭证</div>
                    <div className='rpy-guide-desc'>进入项目配置制品仓库地址</div>
                    <div className='rpy-guide-table'>
                        <code id={'conanPath'}>
                            {`conan remote add ${repositoryData.name} ${repositoryData.repositoryUrl}`}
                        </code>
                        <div className='rpy-guide-table-copy' onClick={()=>clickCopy("conanPath")}>
                            <CopyOutlined />
                        </div>
                    </div>
                    <div className='rpy-guide-desc'>配置制品仓库凭据</div>
                    <div className='rpy-guide-table'>
                        <code id={'conanUse'}>
                            {`conan user -p [PASS_WORD] -r ${repositoryData.name} [USER_NAME]`}
                        </code>
                        <div className='rpy-guide-table-copy' onClick={()=>clickCopy("conanUse")}>
                            <CopyOutlined />
                        </div>
                    </div>
                </div>
            </div>

            <div className='rpy-guide-tab'>
                {
                    tableType==='push'?
                        <div>
                            <div className='rpy-guide-title'>推送</div>
                            <div className='rpy-guide-table'>
                                <code id={"conanPush"}>{`conan upload [PACKAGE/VERSION] --all -r=${repositoryData.name}`}</code>
                                <div className='rpy-guide-table-copy' onClick={()=>clickCopy("conanPush")}>
                                    <CopyOutlined />
                                </div>
                            </div>
                        </div>:
                        <div>
                            <div className='rpy-guide-title'>拉取</div>
                            <div className='rpy-guide-table'>
                                <code id={"conanPull"}>{`conan install [PACKAGE/VERSION]@ -r ${repositoryData.name} `}</code>
                                <div className='rpy-guide-table-copy' onClick={()=>clickCopy("conanPull")}>
                                    <CopyOutlined />
                                </div>
                            </div>
                        </div>
                }
            </div>
        </>
    )

}
export default observer(GuideGo)
