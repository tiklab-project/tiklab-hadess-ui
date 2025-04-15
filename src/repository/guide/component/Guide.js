/**
 * @name: Guide
 * @author: limingliang
 * @date: 2024-08-22 10:30
 * @description：仓库指引
 * @update: 2024-08-22 10:30
 */
import React, {useEffect, useState, Fragment, useRef} from "react";
import "./Guide.scss"
import {Col,message} from "antd";
import Breadcrumb from "../../../common/breadcrumb/Breadcrumb";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
import GuideNpm from "./common/GuideNpm";
import GuideMaven from "./common/GuideMaven";
import GuideGeneric from "./common/GuideGeneric";
import GuideDocker from "./common/GuideDocker";
import GuideHelm from "./common/GuideHelm";
import GuideGo from "./common/GuideGo";
import GuidePypi from "./common/GuidePypi";
const Guide = (props) => {
    const {repositoryStore}=props
    const valueRef = useRef();
    const {repositoryData}=repositoryStore

    const [tableType,setTableType]=useState("push")

    const clickCopy = (type) => {
        let value= document.getElementById(type).outerText;
        const textarea = document.createElement('textarea');
        textarea.value = value;

        // 使 textarea 不可见
        textarea.style.position = 'fixed'; // 避免影响页面布局
        textarea.style.left = '-9999px';

        // 添加到文档中
        document.body.appendChild(textarea);

        // 选中 textarea 的内容
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length); // 确保在移动设备上也能正确选中

        // 执行复制命令
        const successful = document.execCommand('copy');
        if (successful){
            message.success("复制成功")
        }
        document.body.removeChild(textarea);
    }



    return(
        <div className=' hadess-data-width'>
            <Col
                sm={{ span: "22" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "20", offset: "2" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <div className='rpy-guide'>
                    <Breadcrumb firstItem={"操作指南"}/>
                    {
                        repositoryData.type!=='go'&&
                        <div className='guide-head-tab'>
                            <div className={`${tableType==='push'&& ' choose-guide-tab-nav '} guide-tab-nav`} onClick={()=>setTableType("push")}>推送</div>
                            <div className={`${tableType==='pull'&& ' choose-guide-tab-nav '} guide-tab-nav`} onClick={()=>setTableType("pull")}>拉取</div>
                        </div>
                    }

                    <div className='rpy-guide-data'>
                        {
                            repositoryData.type==='npm'&&
                            <GuideNpm repositoryData={repositoryData}
                                      tableType={tableType}
                                      clickCopy={clickCopy}
                            />||
                            repositoryData.type==='maven'&&
                            <GuideMaven repositoryData={repositoryData}
                                        tableType={tableType}
                                        clickCopy={clickCopy}
                            />||
                            repositoryData.type==='generic'&&
                            <GuideGeneric repositoryData={repositoryData}
                                          tableType={tableType}
                                          clickCopy={clickCopy}
                            />||
                            repositoryData.type==='docker'&&
                            <GuideDocker repositoryData={repositoryData}
                                          tableType={tableType}
                                         clickCopy={clickCopy}
                            />||
                            repositoryData.type==='helm'&&
                            <GuideHelm repositoryData={repositoryData}
                                       tableType={tableType}
                                       clickCopy={clickCopy}
                            />||
                            repositoryData.type==='go'&&
                            <GuideGo repositoryData={repositoryData}
                                     tableType={tableType}
                                     clickCopy={clickCopy}
                            />||
                            repositoryData.type==='pypi'&&
                            <GuidePypi repositoryData={repositoryData}
                                        tableType={tableType}
                                        clickCopy={clickCopy}
                            />
                        }
                    </div>
                </div>
            </Col>
        </div>
    )
}
export default withRouter(inject('repositoryStore')(observer(Guide)))
