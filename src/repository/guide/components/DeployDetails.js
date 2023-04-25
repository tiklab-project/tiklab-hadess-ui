/**
 * @name: DeployDetails
 * @author: limingliang
 * @date: 2022-12-27 10:30
 * @description：配置凭证详情
 * @update: 2022-12-27 10:30
 */
import React from "react";
import {getUser} from "tiklab-core-ui";
import "./Details.scss"
const DeployDetails = (props) => {
    const {type}=props

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
                    <div className='guide-top'>
                        <div>替换文本：</div>
                        <div className='ref-line-20 guide-top-10'>[PASSWORD] 替换您的账号密码</div>
                        <div className='ref-line-20 guide-top-10'>[REPOSITORY-NAME] 替换您的制品库名称</div>
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
                    <div className='guide-top'>
                        <div>替换文本：</div>
                        <div className='ref-line-20 guide-top-10'>[NPM_GROUP_URL] 替换您npm组合库的地址</div>
                    </div>
                </>

          }

      </div>
    )
}
export default DeployDetails
