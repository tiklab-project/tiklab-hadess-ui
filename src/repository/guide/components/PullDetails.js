/**
 * @name: PushDetails
 * @author: limingliang
 * @date: 2022-12-27 10:30
 * @description：拉取信息
 * @update: 2022-12-27 10:30
 */
import React ,{Fragment}from "react";
import "./PullDetails.scss"
const PullDetails = (props) => {
    const {type,serverIp}=props

    const helm = () => {
        return(
            <Fragment>
                <div className='push-details-title'>拉取chart</div>
                <div className='nav-style'>
                    helm repo update
                </div>
                <div className='nav-style'>
                    {`helm pull [repositoryName]/[chartName] --version [VERSION]`}
                </div>

                <div className='push-details-title'>安装</div>
                <div className='nav-style'>
                    {`helm pull [repositoryName]/[chartName] --version [VERSION]`}
                </div>
            </Fragment>
        )
    }

    return(
        <div className='guide-details pull-details'>
            {
                type==='Maven'&&
                <Fragment>
                    <div className='push-details-title'>请将下列配置添加到您的 settings.xml 文件中：</div>
                    <div className='nav-style'>
                        <div>{"<settings>"}</div>
                        <div className='nav-left-20'>{"<mirrors>"}</div>
                        <div className='nav-left-40 display'>
                            {"<id> [local库名称] </id>"}
                        </div>
                        <div className='nav-left-40 display'>
                            {"<name> [local库名称] </name>"}
                        </div>
                        <div className='nav-left-40 display'>
                            {"<url> [组合库URL] </url>"}
                        </div>
                        <div className='nav-left-40 display'>
                            {"<mirrorOf> * </mirrorOf>"}
                        </div>
                        <div className='nav-left-20'>{"</mirrors>"}</div>

                        {/*---*/}
                        <div className='ref-line-top'>
                            <div className='nav-left-20 display'>{"<profiles>"}</div>
                            <div className='nav-left-40'>{"<profile>"}</div>
                            <div className='nav-left-60 display'>
                                {"<id> repository profile </div>"}
                            </div>
                            <div className='nav-left-60'>{"<repositories>"}</div>
                            <div className='nav-left-80'>{"<repository>"}</div>
                            <div className='nav-left-100 display'>
                                {"<div> xpack-maven </div>"}
                            </div>
                            <div className='nav-left-100 display'>
                                {"<name> xpack-maven </name>"}
                            </div>
                            <div className='nav-left-100 display'>
                                {"<url> [组合库地址] </url>"}
                            </div>
                            <div className='nav-left-100'>{"<releases>"}</div>
                            <div className='nav-left-120'>
                                {"<url> [组合库地址] </url>"}
                            </div>
                            <div className='nav-left-120'>
                                {"<enabled> true </enabled>"}
                            </div>
                            <div className='nav-left-100'>{"</releases>"}</div>
                            <div className='nav-left-100'>{"<snapshots>"}</div>
                            <div className='nav-left-120'>
                                {"<enabled> true </enabled>"}
                            </div>
                            <div className='nav-left-100'>{"</snapshots>"}</div>
                            <div className='nav-left-80'>{"</repository>"}</div>
                            <div className='nav-left-60'>{"</repositories>"}</div>
                            <div className='nav-left-40'>{"</profile>"}</div>
                            <div className='nav-left-20'>{"</profiles>"}</div>
                        </div>
                        <div>{"<settings>"}</div>
                    </div>
                    <div className='text-style'>
                        <div>替换文本：</div>
                        <div className='text-nav'>
                            <div className='text-nav-title'>{"[组合库URL]"}</div>
                            替换您组合库的地址
                        </div>
                    </div>
                </Fragment>||
                type==='npm'&&
                <Fragment>
                    <div className='push-details-title'>命令拉取：</div>
                    <div className='nav-style'>
                        {"npm install [PACKAGE]@[VERSION]"}
                    </div>
                </Fragment>||
                type==='Generic'&&
                <Fragment>
                    <div className='push-details-title'>命令拉取：</div>
                    <div className='nav-style'>
                        {`curl -H "type:download"  -u [USER_NAME]:[PASSWORD]  "${node_env? base_url:window.location.origin}/generic/[GENERIC_RPY]/[FILE_NAME]" -o [OUTPUT_FILE]`}
                    </div>
                    <div className='text-style'>
                        <div>替换文本：</div>
                        <div className='text-nav'>
                            <div className='text-nav-title'>{"[USER_NAME]"}</div>
                            账号
                        </div>
                        <div className='text-nav'>
                            <div className='text-nav-title'>{"[PASSWORD]"}</div>
                            密码
                        </div>
                        <div className='text-nav'>
                            <div className='text-nav-title'>{"[GENERIC_RPY]"}</div>
                            generic仓库
                        </div>
                        <div className='text-nav'>
                            <div className='text-nav-title'>{"[FILE_NAME]"}</div>
                            拉取的文件名称
                        </div>
                        <div className='text-nav'>
                            <div className='text-nav-title'>{"[OUTPUT_FILE]"}</div>
                            下载文件的位置（地址/文件名称）
                        </div>
                    </div>
                </Fragment>||
                type==='Docker'&&
                <Fragment>
                    <div className='push-details-title'>请在命令行执行以下命令进行拉取：</div>
                    <div className='nav-style'>
                        {`docker pull ${serverIp}/[REPOSITORY-NAME]/[LIBRARY-NAME]:[VERSION]`}
                    </div>
                    <div className='text-style'>
                        <div>替换文本：</div>
                        <div className='text-nav'>
                            <div className='text-nav-title'>{"[REPOSITORY-NAME]"}</div>
                            制品库名字
                        </div>
                        <div className='text-nav'>
                            <div className='text-nav-title'>{"[LIBRARY-NAME]"}</div>
                            制品名字
                        </div>
                        <div className='text-nav'>
                            <div className='text-nav-title'>{"[VERSION]"}</div>
                            版本
                        </div>
                    </div>
                </Fragment>||
                type==='Helm'&&
                helm()
            }

        </div>
    )
}
export default PullDetails
