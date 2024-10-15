/**
 * @name: DeployDetails
 * @author: limingliang
 * @date: 2022-12-27 10:30
 * @description：配置凭证详情
 * @update: 2022-12-27 10:30
 */
import React ,{useState,useEffect}from "react";
import {getUser} from "tiklab-core-ui";
import "./Voucher.scss"
const Voucher = (props) => {
    const {type,serverIp}=props


    const helm = () => {
      return(
          <div>
                <div className='guide-details-title'>添加helm仓库</div>
              <div className='guide-details-back'>
                  {`helm repo add [repositoyName] "${node_env? base_url:window.location.origin}" --username ${getUser().name} --password [password]`}
              </div>
              <div className='replace-data'>
                  <div>替换文本：</div>
                  <div className='replace-data-nav'>
                      <li>{"[repositoyName]: helm仓库的名字"}</li>
                      <li>{"[password]: 你的密码"}</li>
                  </div>
              </div>
          </div>
      )
    }

    return(
      <div className='guide-details'>
          {
              type==="Maven"&&
                <>
                    <div className='guide-details-title'>请将下面配置添加到您的setting.xml文件中</div>
                    <div className='guide-details-back'>
                        <div className='guide-details-explain'>{'<!-- 一般情况 maven 的通用 settings.xml 在 .m2 文件夹下, 项目内 settings.xml 也可以进行设置，优先级更高 -->'}</div>
                        <div>{"<settings>"}</div>
                        <div className='ref-line'>{"<servers>"}</div>
                        <div className='ref-line ref-line-20'>{"<server>"}</div>
                        <div className='ref-line  ref-line-40'>
                            <div>{"<id>"}</div>
                            <div className='ref-line-text'> {"[REPOSITORY-NAME]"} </div>
                            <div>{"</id>"}</div>
                        </div>
                        <div className='ref-line ref-line-40'>
                            <div>{"<username>"}</div>
                            <div>{getUser().name}</div>
                            <div>{"</username>"}</div>
                        </div>
                        <div className='ref-line ref-line-40'>
                            <div>{"<password>"}</div>
                            <div>{"[PASSWORD]"}</div>
                            <div>{"</password>"}</div>
                        </div>
                        <div className='ref-line ref-line-20'>{"</server>"}</div>
                        <div className='ref-line'>{"</servers>"}</div>
                        <div>{"</settings>"}</div>
                    </div>
                    <div className='guide-top text-style'>
                        <div>替换文本：</div>
                        <div className='text-nav'>
                            <div className='text-nav-title'>{"[PASSWORD]"}</div>
                            替换您的账号密码
                        </div>
                        <div className='text-nav'>
                            <div className='text-nav-title'>{"[REPOSITORY-NAME]"}</div>
                            替换您的制品库名称
                        </div>

                    </div>
                </>||
                type==="npm"&&
                <>
                    <div className='guide-top'>1.设置 npm registry 为当前制品库仓库。</div>
                    <div className='guide-details-back guide-top-10'>
                        {"npm config set registry=[NPM_GROUP_URL]"}
                    </div>
                    <div className='guide-top'>
                        <div>2.使用交互式命令行登陆。您的username,您的登陆密码。</div>
                        <div className='guide-details-back guide-top-10'>{"npm login"}</div>
                    </div>
                    <div className='guide-top text-style'>
                        <div>替换文本：</div>
                        <div className='text-nav'>
                            <div className='text-nav-title'>{"[NPM_GROUP_URL]"}</div>
                            替换您npm组合库的地址
                        </div>
                    </div>
                </>||
              type==="Docker"&&
              <>
                  <div className='guide-top'>请在命令行执行一下命令登陆仓库：</div>
                  <div className='guide-details-back guide-top-10'>
                      {`docker login -u [account] -p [password] ${serverIp}`}
                  </div>
                  <div className='guide-top text-style'>
                      <div>替换文本：</div>
                      <div className='text-nav'>
                          <div className='text-nav-title'>{"[account]"}</div>
                          替换您的账号
                      </div>
                      <div className='text-nav'>
                          <div className='text-nav-title'>{"[password]"}</div>
                          替换您的密码
                      </div>
                  </div>
              </>||
              type==="Helm"&&
              helm()
          }

      </div>
    )
}
export default Voucher
