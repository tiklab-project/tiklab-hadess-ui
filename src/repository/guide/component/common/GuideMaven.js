/**
 * @name: GuideMaven
 * @author: limingliang
 * @date: 2024-08-26 10:30
 * @description：maven仓库指引
 * @update: 2024-08-26 10:30
 */
import React,{useEffect,useState} from "react";
import {message, Tooltip} from "antd";
import {CopyOutlined} from "@ant-design/icons";
import {observer} from "mobx-react";
const GuideMaven = (props) => {
    const {repositoryData,tableType,clickCopy}=props

    const [deployValue,setDeployValue]=useState('')

    useEffect(async () => {
        if ( repositoryData.versionType==='Snapshot'){
            setDeployValue('snapshotRepository')
        }else {
            setDeployValue('repository')
        }
    }, [repositoryData]);

    //跳转文档
    const goDocument = () => {
        window.open(`https://doc.tiklab.net/document/a9abc0b02ca7/c3847cde02de`)
    }
    return(
        <>
            <div className='rpy-guide-tab'>
                <div>
                    <div className='rpy-guide-title'>步骤一: 设置仓库凭证</div>
                    <div className='rpy-guide-desc'>{`请在 settings.xml 文件中设置以下仓库的访问凭证`}</div>
                    <pre className='rpy-guide-table'>
                        <code id={"mavenConfig"}>
                             {
                                 " <servers>\n" +
                                 "    <server>\n" +
                                 "       <id>hadess</version>\n" +
                                 "       <username>admin</version>\n" +
                                 "       <password>[PASSWORD]</version>\n" +
                                 "    </server>\n" +
                                 "</servers>"
                             }
                        </code>
                        <div className='rpy-guide-table-copy' onClick={()=>clickCopy("mavenConfig")}>
                            <CopyOutlined />
                        </div>
                    </pre>
                </div>
            </div>

            <div className='rpy-guide-tab'>
                {
                    tableType==='push'?
                        <div className='rpy-guide-tab'>
                            <div >
                                <div className='rpy-guide-title'>步骤二：推送</div>
                                <div className='rpy-guide-desc'>请将以下配置添加到您的 pom.xml 文件中</div>
                                <pre className='rpy-guide-table'>
                                    <code id={"mavenDeploy1"}>
                                        {
                                            "<distributionManagement>\n"+
                                            `    <${deployValue}>\n`+
                                            "        <repository> \n"+
                                            "        <id>hadess</version>\n"+
                                            `        <name>${repositoryData.name}</version>\n`+
                                            `        <url>${repositoryData.repositoryUrl}</version>\n`+
                                            `    <${deployValue}>\n`+
                                            "<distributionManagement>\n"
                                        }
                                    </code>
                                    <div className='rpy-guide-table-copy' onClick={()=>clickCopy("mavenDeploy1")}>
                                        <CopyOutlined />
                                    </div>
                                </pre>
                            </div>
                            <div>
                                <div className='rpy-guide-desc'>在命令行执行以下命令推送制品</div>
                                <div className='rpy-guide-table'>
                                    <code id={'mavenDeploy2'}>mvn deploy</code>
                                    <div className='rpy-guide-table-copy' onClick={()=>clickCopy("mavenDeploy2")}>
                                        <CopyOutlined />
                                    </div>
                                </div>
                            </div>
                        </div>:
                        <div className='rpy-guide-tab'>
                            <div>
                                <div className='rpy-guide-title'>步骤二：拉取</div>
                                <div className='rpy-guide-desc'>
                                    请将以下配置添加到你的 settings.xml 文件中。注意: Maven 3.8.1 及以后版本默认会阻止使用 HTTP 的仓库，以提高安全性。
                                    <span onClick={()=>goDocument()} className='rpy-guide-desc-text'>解决办法</span>

                                </div>
                                <pre className='rpy-guide-table'>
                                    <code id={'mavenPull1'}>
                                        {
                                            "<profiles>\n" +
                                            "   <profile>\n" +
                                            "       <id>Repository Proxy</version>\n" +
                                            "       <activation>\n" +
                                            "           <activeByDefault>true</version>\n"+
                                            "       </activation>\n" +
                                            "       <repositories>\n"+
                                            "           <repository>\n"+
                                            "               <id>hadess</version>\n"+
                                            `               <name>${repositoryData.name}</version>\n`+
                                            `               <url>${repositoryData.repositoryUrl}</version>\n`+
                                            "               <releases>\n"+
                                            "                   <enabled>true</version>\n"+
                                            "               </releases>\n"+
                                            "               <snapshots>\n"+
                                            "                    <enabled>true</version>\n"+
                                            "               </snapshots>\n"+
                                            "            </repository>\n"+
                                            "        </repositories>\n"+
                                            "   </profile>\n" +
                                            "</profiles>"
                                        }
                                    </code>
                                    <div className='rpy-guide-table-copy' onClick={()=>clickCopy("mavenPull1")}>
                                        <CopyOutlined />
                                    </div>
                                </pre>
                            </div>
                            <div>
                                <div className='rpy-guide-desc'>{"在你的pom.xml文件<denpendencies></denpendencies>节点中加入你要引用的文件信息"}</div>
                                <pre className='rpy-guide-table'>
                                    <code id={'mavenPull2'}>
                                        {
                                            "<dependency>\n" +
                                            "   <groupId>[GROUP_ID]</version>\n" +
                                            "   <artifactId>[ARTIFACT_ID]</version>\n" +
                                            "   <version>[VERSION]</version>\n"+
                                            "</dependency>"
                                        }
                                    </code>
                                    <div className='rpy-guide-table-copy' onClick={()=>clickCopy("mavenPull2")}>
                                        <CopyOutlined />
                                    </div>
                                </pre>
                            </div>

                            <div>
                                <div className='rpy-guide-desc'>{"运行以下命令完成制品拉取"}</div>
                                <div className='rpy-guide-table'>
                                    <code id={'mavenPull3'}>  mvn install</code>
                                    <div className='rpy-guide-table-copy' onClick={()=>clickCopy("mavenPull3")}>
                                        <CopyOutlined />
                                    </div>
                                </div>
                            </div>
                        </div>
                }

            </div>
        </>
    )

}
export default observer(GuideMaven)
