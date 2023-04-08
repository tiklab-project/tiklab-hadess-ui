/**
 * @name: PullDetails
 * @author: limingliang
 * @date: 2022-12-27 10:30
 * @description：拉取信息
 * @update: 2022-12-27 10:30
 */
import React from "react";
const PullDetails = (props) => {
    const {type}=props
    return(
        <div className='guide-details '>
            {
                type==='Maven'&&
                <>
                    <div className='guide-details-title '>请将以下配置添加到您的 pom.xml 文件中：</div>
                    <div className='guide-details-back'>
                        <div>{"<distributionManagement>"}</div>
                        <div className='ref-line'>{"<repository>"}</div>
                        <div className='ref-line'>
                            <div className=' ref-line-20 '>{"<id>"}</div>
                            <div>[LOCAL库名称]</div>
                            <div>{"</id>"}</div>
                        </div>
                        <div className='ref-line'>
                            <div className=' ref-line-20 '>{"<name>"}</div>
                            <div>[LOCAL库名称]</div>
                            <div>{"</name>"}</div>
                        </div>
                        <div className='ref-line'>
                            <div className=' ref-line-20 '>{"<url>"}</div>
                            <div>[本地库URL]</div>
                            <div>{"</url>"}</div>
                        </div>
                        <div className='ref-line'>{"</repository>"}</div>
                        <div>{"</distributionManagement>"}</div>
                    </div>

                    <div className='guide-top'>
                        <div>替换文本：</div>
                        <div className='ref-line-20 guide-top-10'>[LOCAL库名称] 替换您的本地库名称</div>
                        <div className='ref-line-20 guide-top-10'>[URL] 替换您本地库的地址</div>
                    </div>
                </>||
                type==='npm'&&
                <>
                  <div className='guide-top'>
                     <div>1.初始化您的 package.json：</div>
                      <div className='guide-details-back ref-line-top' >
                          <div >{"{"}</div>
                          <div className='ref-line-20'>
                              <div>{"name:<PACKAGE_NAME>"}</div>
                              <div>{"version:<VERSION>"}</div>
                              <div>{"description:''"}</div>
                              <div>{"main:'index.js'"}</div>
                              <div>{"author:''"}</div>
                              <div>{"license:'MIT'"}</div>
                          </div>
                          <div >{"}"}</div>
                      </div>
                      <div className='guide-top'>
                          <div>2.推送您的 npm 包：</div>
                          <div className='guide-details-back ref-line-top' >
                              <div>
                                  {"npm publish --registry=[NPM_LOCAL_URL]"}
                              </div>
                          </div>
                      </div>
                  </div>
                    <div className='guide-top'>
                        <div>替换文本：</div>
                        <div className='ref-line-20 guide-top-10'>[NPM_LOCAL_URL] 替换您npm本地库的地址</div>
                    </div>
                </>
            }
        </div>
    )
}
export default PullDetails
