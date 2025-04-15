/**
 * @name: GuidePypi
 * @author: limingliang
 * @date: 2025-04-08 10:30
 * @description：mypi仓库指引
 * @update: 2025-04-08 10:30
 */
import React,{useEffect,useState} from "react";
import {message, Tooltip} from "antd";
import {CopyOutlined} from "@ant-design/icons";
import {observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";

const GuidePypi = (props) => {
    const {repositoryData,tableType,clickCopy}=props

    const [pullPath,setPullPath]=useState('')

    const [ipPath,setIpPath]=useState();
    useEffect(async () => {
        const proPath=node_env? base_url:window.location.origin
        if (proPath.startsWith("http://")){
            const result = proPath.replace(/^[^:]+:\/\//, '').split(':')[0];
            setIpPath(result)
        }
        if (repositoryData){
            const splice = repositoryData.repositoryUrl.split("://");
            const path=splice[0]+"://[USERNAME]:[PASSWORD]@"+splice[1]
            setPullPath(path)
        }

    }, [repositoryData]);

    //跳转文档
    const goDocument = () => {
        window.open(`https://doc.tiklab.net/document/a9abc0b02ca7/c3847cde02de`)
    }
    return(
        <>
            <div className='rpy-guide-tab'>
                <div className='rpy-guide-illustrate'>
                    <div>注意：Pyi制品推送只支持推送到本地库</div>
                    <div>;</div>
                    <div>建议配置本地库或者关联了本地库的组合库</div>
                    <div>;</div>
                    <div>
                        {repositoryData.repositoryType==='local'&&"该制品库为本地库"}
                        {repositoryData.repositoryType==='remote'&&"该制品库为远程库"}
                        {repositoryData.repositoryType==='group'&&"该制品库为组合库"}
                    </div>
                </div>
                {
                    tableType==='push'&&
                    <div className='rpy-guide-data-nav'>
                        <div className='rpy-guide-tab'>
                            <div>
                                <div className='rpy-guide-title'>推送方式一: 设置凭证推送</div>
                                <div className='rpy-guide-desc'>设置推送凭证: 在您的 $HOME/.pypirc 文件添加以下配置</div>
                                <pre className='rpy-guide-table'>
                                    <code id={"pypiConfig"}>
                                         {
                                             "[distutils]\n" +
                                             "index-servers =\n" +
                                             `    ${repositoryData.name}\n`+
                                             `[${repositoryData.name}]\n`+
                                             `repository:  ${repositoryData.repositoryUrl}\n`+
                                             "username: [USERNAME]\n"+
                                             "password: [PASSWORD]"
                                         }
                                    </code>
                                    <div className='rpy-guide-table-copy' onClick={()=>clickCopy("pypiConfig")}>
                                        <CopyOutlined />
                                    </div>
                             </pre>
                            </div>
                            <div>
                                <div className='rpy-guide-desc'>命令行执行以下命令进行推送</div>
                                <pre className='rpy-guide-table'>
                             <code id={"pypiConPush"}>
                                {`twine upload --verbose -r ${repositoryData.name} dist/* `}
                            </code>
                            <div className='rpy-guide-table-copy' onClick={()=>clickCopy("pypiConPush")}>
                                <CopyOutlined />
                            </div>
                        </pre>
                            </div>
                        </div>
                        <div>
                            <div className='rpy-guide-title'>推送方式二: 直接通过命令推送</div>
                            <div className='rpy-guide-desc'>请在命令行执行以下命令进行制品推送</div>
                            <pre className='rpy-guide-table'>
                                    <code id={"pypiPush"}>
                                        {`twine upload --verbose --repository-url ${repositoryData.repositoryUrl} `}
                                    </code>
                                    <div className='rpy-guide-table-copy' onClick={()=>clickCopy("pypiPush")}>
                                        <CopyOutlined />
                                    </div>
                                </pre>
                        </div>
                    </div>||
                    tableType==='pull'&&
                    <div className='rpy-guide-data-nav'>
                        <div className='rpy-guide-tab'>
                            <div>
                                <div className='rpy-guide-title'>推送方式一: 设置凭证拉取</div>
                                <div className='rpy-guide-desc'>请根据您的操作系统添加 pip 配置</div>
                                <div style={{marginTop:20,fontSize:15}}>MacOS / Linu系统</div>
                                <div className='rpy-guide-desc'>在您的 $HOME/.pip/pip.conf 文件添加以下配置。</div>
                                <pre className='rpy-guide-table'>
                                    <code id={"pypiConfigML"}>
                                         {
                                             "[global]\n" +
                                             `index-url =${pullPath}`
                                         }
                                    </code>
                                    <div className='rpy-guide-table-copy' onClick={()=>clickCopy("pypiConfigML")}>
                                        <CopyOutlined />
                                    </div>
                             </pre>

                                <div style={{marginTop:20,fontSize:15}}>Windows系统</div>
                                <div className='rpy-guide-desc'>在您的 %HOME%/pip/pip.ini 文件添加以下配置。</div>
                                <pre className='rpy-guide-table'>
                                    <code id={"pypiConfigW"}>
                                         {
                                             "[global]\n" +
                                             `index-url =${pullPath}`
                                         }
                                    </code>
                                    <div className='rpy-guide-table-copy' onClick={()=>clickCopy("pypiConfigW")}>
                                        <CopyOutlined />
                                    </div>
                             </pre>
                            </div>
                            <div>
                                <div className='rpy-guide-desc'>命令行执行以下命令进行推送</div>
                                <pre className='rpy-guide-table'>
                             <code id={"pypiConPull"}>
                                {`pip install [PACKAGE]  ${repositoryData.repositoryUrl?.startsWith("http:")? `--trusted-host ${ipPath}` :''}`}
                            </code>
                            <div className='rpy-guide-table-copy' onClick={()=>clickCopy("pypiConPull")}>
                                <CopyOutlined />
                            </div>
                        </pre>
                            </div>
                        </div>
                        <div>
                            <div className='rpy-guide-title'>推送方式二: 直接通过命令拉取</div>
                            <div className='rpy-guide-desc'>请在命令行执行以下命令进行制品推送</div>
                            <pre className='rpy-guide-table'>
                                    <code id={"pypiPull"}>
                                        {`pip install  [PACKAGE] -i ${repositoryData.repositoryUrl}  ${repositoryData.repositoryUrl?.startsWith("http:")? `--trusted-host ${ipPath}` :''}`}
                                    </code>
                                    <div className='rpy-guide-table-copy' onClick={()=>clickCopy("pypiPull")}>
                                        <CopyOutlined />
                                    </div>
                                </pre>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}
export default GuidePypi
