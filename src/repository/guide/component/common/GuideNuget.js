/**
 * @name: GuideNuget
 * @author: limingliang
 * @date: 2025-04-25 10:30
 * @description：nuget仓库指引
 * @update: 2025-04-25 10:30
 */
import React,{useEffect,useState} from "react";
import {CopyOutlined} from "@ant-design/icons";
import {observer} from "mobx-react";
const GuideNuget = (props) => {
    const {repositoryData,tableType,clickCopy}=props



    //跳转文档
    const goDocument = () => {
        window.open(`https://doc.tiklab.net/document/a9abc0b02ca7/c3847cde02de`)
    }
    return(
        <>
            <div className='rpy-guide-tab'>
                <div className='rpy-guide-illustrate'>
                    <div>注意：Nuget制品推送只支持推送到本地库或者关联了本地库的组合库</div>
                    <div>;</div>
                    <div>制品拉取地址建议配置组合库的地址</div>
                    <div>;</div>
                    <div>
                        {repositoryData.repositoryType==='local'&&"该制品库为本地库"}
                        {repositoryData.repositoryType==='remote'&&"该制品库为远程库"}
                        {repositoryData.repositoryType==='group'&&"该制品库为组合库"}
                    </div>
                </div>
                <div>
                    <div className='rpy-guide-title'>步骤一: 设置仓库凭证</div>
                    <div className='rpy-guide-desc'>{`编辑NuGet.config, windows位于%AppData%\\Roaming\\NuGet\\NuGet.Config，macOS位于~/.nuget/NuGet/NuGet.Config`}</div>
                    <pre className='rpy-guide-table'>
                        <code id={"nugetConfig"}>
                             {
                                 " <?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
                                 " <configuration>\n" +
                                 "    <packageSources>\n" +
                                 `      <add key=\"Hadess\" value=\"${repositoryData.repositoryUrl}\" ${repositoryData.repositoryUrl.startsWith("http://")?"allowInsecureConnections=\"true\"":''} />\n`  +
                                 "    </packageSources>\n" +
                                 "    <packageSourceCredentials>\n" +
                                 "       <Hadess>\n" +
                                 "           <add key=\"Username\" value=\"[USERNAME]\" />\n" +
                                 "           <add key=\"ClearTextPassword\" value=\"[PASSWORD]\" />\n" +
                                 "       </Hadess>\n" +
                                 "    </packageSourceCredentials>\n" +
                                 "</configuration>"
                             }
                        </code>
                        <div className='rpy-guide-table-copy' onClick={()=>clickCopy("nugetConfig")}>
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
                                <div className='rpy-guide-desc'>执行以下命令上传软件包</div>
                                <pre className='rpy-guide-table'>
                                    <code id={"nugetPush"}>
                                        {"dotnet nuget push [PACKAGE].nupkg --source \"Hadess\" "}
                                    </code>
                                    <div className='rpy-guide-table-copy' onClick={()=>clickCopy("nugetPush")}>
                                        <CopyOutlined />
                                    </div>
                                </pre>
                            </div>
                        </div>:
                        <div className='rpy-guide-tab'>
                            <div>
                                <div className='rpy-guide-title'>步骤二：拉取</div>
                                <div className='rpy-guide-desc'>执行以下命令拉取软件包</div>
                                <pre className='rpy-guide-table'>
                                    <code id={'nugetPull'}>
                                        {"dotnet add package [PACKAGE] --version [VERSION]"}
                                    </code>
                                    <div className='rpy-guide-table-copy' onClick={()=>clickCopy("nugetPull")}>
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
export default observer(GuideNuget)
