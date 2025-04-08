/**
 * @name: GuideGo
 * @author: limingliang
 * @date: 2024-08-22 10:30
 * @description：go仓库指引
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
                    <div className='rpy-guide-desc'>进入go项目打开终端并执行</div>
                    <div className='rpy-guide-table'>
                        <code id={'goConfig'}>
                            <div id={"config"}>{`export GO111MODULE=on`}</div>
                            <div id={"config"}>{`export GOPROXY=${repositoryData.repositoryUrl}`}</div>
                        </code>
                        <div className='rpy-guide-table-copy' onClick={()=>clickCopy("goConfig")}>
                            <CopyOutlined />
                        </div>
                    </div>

                </div>
            </div>
            <div className='rpy-guide-tab'>
                <div >
                    <div className='rpy-guide-title'>步骤二: 拉取</div>
                    <div className='rpy-guide-desc'>拉取单个包</div>
                    <div className='rpy-guide-table'>
                        <code id={"goDeploy1"}>{`go get -v [MODULE] `}</code>
                        <div className='rpy-guide-table-copy' onClick={()=>clickCopy("goDeploy1")}>
                            <CopyOutlined />
                        </div>
                    </div>
                </div>
                <div>
                    <div className='rpy-guide-desc'>拉取全部</div>
                    <div className='rpy-guide-table'>
                        <code id={"goDeploy2"}>{`go mod download `}</code>
                        <div className='rpy-guide-table-copy' onClick={()=>clickCopy("goDeploy2")}>
                            <CopyOutlined />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
export default observer(GuideGo)
