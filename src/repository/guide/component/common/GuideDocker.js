/**
 * @name: GuideDocker
 * @author: limingliang
 * @date: 2024-08-22 10:30
 * @description：docker仓库指引
 * @update: 2024-08-22 10:30
 */
import React,{useEffect,useState} from "react";
import {message} from "antd";
import {CopyOutlined} from "@ant-design/icons";
import {observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";
const GuideDocker = (props) => {
    const {repositoryData,tableType,clickCopy}=props
    const [serverIp,setServerIp]=useState('')  //docker 不需要带http或者https

    useEffect(async () => {
        const path=node_env? base_url:window.location.origin
        setServerIp(path.substring(path.indexOf("//")+2))

    }, []);

    return(
        <>
            <div className='rpy-guide-tab'>
                <div className='rpy-guide-illustrate'>
                    <div>注意：Docker因网络原因远程库暂时无法拉取中央仓库的镜像</div>
                    <div>;</div>
                    <div>
                        {repositoryData.repositoryType==='local'&&"该制品库为本地库"}
                        {repositoryData.repositoryType==='remote'&&"该制品库为远程库"}
                        {repositoryData.repositoryType==='group'&&"该制品库为组合库"}
                    </div>
                </div>
                <div>
                    <div className='rpy-guide-title'>步骤一: 设置仓库凭证</div>
                    <div className='rpy-guide-desc'>请在命令行执行一下命令登陆仓库</div>
                    <div className='rpy-guide-table'>
                        <code id={"dockerConfig"}>{`docker login -u ${getUser().name} -p [password] ${repositoryData.repositoryUrl}`}</code>
                        <div className='rpy-guide-table-copy' onClick={()=>clickCopy("dockerConfig")}>
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
                            <div className='rpy-guide-desc'>请在命令行执行以下命令给本地镜像打标签</div>
                            <div className='rpy-guide-table'>
                                <code id={"dockerDeploy1"}>{`docker tag [TAG] ${repositoryData.repositoryUrl}/[LIBRARY-NAME]:[VERSION]`}</code>
                                <div className='rpy-guide-table-copy' onClick={()=>clickCopy("dockerDeploy1")}>
                                    <CopyOutlined />
                                </div>
                            </div>
                        </div>
                        <div >
                            <div className='rpy-guide-desc'>请在命令行执行以下命令进行推送</div>
                            <div className='rpy-guide-table'>
                                <code id={"dockerDeploy2"}>{`docker push ${repositoryData.repositoryUrl}/[LIBRARY-NAME]:[VERSION]`}</code>
                                <div className='rpy-guide-table-copy' onClick={()=>clickCopy("dockerDeploy2")}>
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
                                <code id={"dockerPull"}>{`docker pull ${repositoryData.repositoryUrl}/[LIBRARY-NAME]:[VERSION]`}</code>
                                <div className='rpy-guide-table-copy' onClick={()=>clickCopy("dockerPull")}>
                                    <CopyOutlined />
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )

}
export default observer(GuideDocker)
