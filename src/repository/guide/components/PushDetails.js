/**
 * @name: PullDetails
 * @author: limingliang
 * @date: 2022-12-27 10:30
 * @description：推送信息
 * @update: 2022-12-27 10:30
 */
import React,{Fragment} from "react";
import "./PushDetails.scss"
import {getUser} from "thoughtware-core-ui";
const PushDetails = (props) => {
    const {type,serverIp}=props


    const helm = () => {
      return(
          <Fragment>
              <div className='push-details-title '>推送打包后的 Chart</div>
              <div className='nav-style'>
                  {`curl [repositoryPath] -F "file=@[CHART_NAME]-[VERSION].tgz" -u ${getUser().name}:[password]`}
              </div>
          </Fragment>
      )
    }

    return(
        <div className='push-details '>
            {
                type==='Maven'&&
                <Fragment>
                    <div className='push-details-title '>请将以下配置添加到您的 pom.xml 文件中：</div>
                    <div className='nav-style'>
                        <div>{"<distributionManagement>"}</div>
                        <div className='nav-left-20 display'>{"<repository>"}</div>
                        <div className=' nav-left-40'> {"<!--必须与配置凭证中 settings.xml 的 id 一致-->"} </div>
                        <div className='nav-left-40 display'>
                            {"<id> [LOCAL库名称] </id>"}
                        </div>
                        <div className='nav-left-40 display'>
                            {"<name> [LOCAL库名称] </name>"}
                        </div>
                        <div className='nav-left-40 display'>
                            {"<url> [仓库URL] </url>"}
                        </div>
                        <div className='nav-left-20 display'>{"</repository>"}</div>
                        <div>{"</distributionManagement>"}</div>
                    </div>
                    <div className='text-style'>
                        <div>替换文本：</div>
                        <div className='text-nav'>
                            <div className='text-nav-title'>{"[LOCAL库名称]"}</div>
                            替换您的本地库名称
                        </div>
                        <div className='text-nav'>
                            <div className='text-nav-title'>{"[仓库URL]"}</div>
                            替换您本地库的地址
                        </div>
                    </div>
                </Fragment>||
                type==='npm'&&
                <Fragment>
                  <div>
                     <div className='push-details-title'>1.初始化您的 package.json：</div>
                      <div className='nav-style' >
                          <div >{"{"}</div>
                          <div className='nav-left-20'>
                              <div>{"name:[PACKAGE_NAME]"}</div>
                              <div>{"version:[VERSION]"}</div>
                              <div>{"description:''"}</div>
                              <div>{"main:'index.js'"}</div>
                              <div>{"author:''"}</div>
                              <div>{"license:'MIT'"}</div>
                          </div>
                          <div >{"}"}</div>
                      </div>
                      <div className='nav-top'>
                          <div className='push-details-title'>2.推送您的 npm 包：</div>
                          <div className='nav-style' >
                              <div className='nav-style-details'>
                                  {"npm publish --registry=[NPM_LOCAL_URL]"}
                              </div>
                          </div>
                      </div>
                  </div>
                    <div className='text-style'>
                        <div>替换文本：</div>
                        <div className='text-nav'>
                            <div className='text-nav-title'>{"[NPM_LOCAL_URL]"}</div>
                            替换您npm本地库的地址
                        </div>
                    </div>
                </Fragment>||
                type==='Generic'&&
                <Fragment>
                    <div className='push-details-title '>请在命令行执行以下命令进行制品推送</div>
                    <div className='nav-style' >
                        <div className={'nav-style-details'}>{`curl -T [LOCAL_FILE] -u [USER_NAME]:[PASSWORD] "${node_env? base_url:window.location.origin}/generic/[GENERIC_RPY]/[FILE_NAME]?version=[VERSION]`}</div>
                    </div>
                    <div className='text-style'>
                        <div className=''>替换文本：</div>
                        <div className='text-nav'>
                            <div className='text-nav-title'>{"[LOCAL_FILE]"}</div>
                             本地文件地址(全路经)
                        </div>
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
                            本地文件名称
                        </div>
                        <div className='text-nav'>
                            <div className='text-nav-title'>{"[VERSION]"}</div>
                            版本
                        </div>
                    </div>
                </Fragment>||
                type==='Docker'&&
                <Fragment>
                    <div className='push-details-title'>1.请在命令行执行以下命令给本地镜像打标签：</div>
                    <div className='nav-style' >
                        <div className='nav-style-details'>{`docker tag [TAG] ${serverIp}/[REPOSITORY-NAME]/[LIBRARY-NAME]:[VERSION]`}</div>
                    </div>
                    <div className='guide-top'>
                        <div className='push-details-title'>2.请在命令行执行以下命令进行推送：</div>
                        <div className='nav-style' >
                            <div className='nav-style-details '>{`docker push ${serverIp}/[REPOSITORY-NAME]/[LIBRARY-NAME]:[VERSION]`}</div>
                        </div>
                    </div>
                    <div className='text-style'>
                        <div>替换文本：</div>
                        <div className='text-nav'>
                            <div className='text-nav-title'>{"[TAG]"}</div>
                            本地镜像 tag
                        </div>
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
export default PushDetails
