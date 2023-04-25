/**
 * @name: PushDetails
 * @author: limingliang
 * @date: 2022-12-27 10:30
 * @description：拉取信息
 * @update: 2022-12-27 10:30
 */
import React from "react";
const PullDetails = (props) => {
    const {type}=props

    return(
        <div className='guide-details'>
            {
                type==='Maven'&&
                <>
                    <div className='guide-details-title'>请将下列配置添加到您的 settings.xml 文件中：</div>
                    <div className='guide-details-back'>
                        <div>{"<settings>"}</div>
                        <div className='ref-line'>{"<mirrors>"}</div>
                        <div className='ref-line'>
                            <div className=' ref-line-20 '>{"<id>"}</div>
                            <div>[local库名称]</div>
                            <div>{"</id>"}</div>
                        </div>
                        <div className='ref-line'>
                            <div className=' ref-line-20 '>{"<name>"}</div>
                            <div>[local库名称]</div>
                            <div>{"</name>"}</div>
                        </div>
                        <div className='ref-line'>
                            <div className=' ref-line-20 '>{"<url>"}</div>
                            <div>[组合库URL]</div>
                            <div>{"</url>"}</div>
                        </div>
                        <div className='ref-line'>
                            <div className='ref-line-20 '>{"<mirrorOf>"}</div>
                            <div>*</div>
                            <div>{"</mirrorOf>"}</div>
                        </div>
                        <div className='ref-line'>{"</mirrors>"}</div>

                        {/*---*/}
                        <div className='ref-line-top'>
                            <div className='ref-line'>{"<profiles>"}</div>
                            <div className='ref-line ref-line-20'>{"<profile>"}</div>
                            <div className='ref-line ref-line-40'>
                                <div >{"<id>"}</div>
                                <div>{"repository profile"}</div>
                                <div >{"<id>"}</div>
                            </div>
                            <div className='ref-line ref-line-40'>{"<repositories>"}</div>
                            <div className='ref-line ref-line-60'>{"<repository>"}</div>
                            <div className='ref-line ref-line-80'>
                                <div>{"<id>"}</div>
                                <div>{"[xpack-maven]"}</div>
                                <div>{"</id>"}</div>
                            </div>
                            <div className='ref-line ref-line-80'>
                                <div>{"<name>"}</div>
                                <div>{"xpack-maven"}</div>
                                <div>{"</name>"}</div>
                            </div>
                            <div className='ref-line ref-line-80'>
                                <div>{"<url>"}</div>
                                <div>{"[组合库地址]"}</div>
                                <div>{"</url>"}</div>
                            </div>
                            <div className='ref-line ref-line-80'>{"<releases>"}</div>
                            <div className='ref-line ref-line-100'>
                                <div>{"<enabled>"}</div>
                                <div>{"true"}</div>
                                <div>{"</enabled>"}</div>
                            </div>
                            <div className='ref-line ref-line-80'>{"</releases>"}</div>
                            <div className='ref-line ref-line-80'>{"<snapshots>"}</div>
                            <div className='ref-line ref-line-100'>
                                <div>{"<enabled>"}</div>
                                <div>{"true"}</div>
                                <div>{"</enabled>"}</div>
                            </div>
                            <div className='ref-line ref-line-80'>{"</snapshots>"}</div>
                            <div className='ref-line ref-line-60'>{"</repository>"}</div>
                            <div className='ref-line ref-line-40'>{"</repositories>"}</div>
                            <div className='ref-line'>{"</profiles>"}</div>
                        </div>
                        <div>{"<settings>"}</div>
                    </div>
                    <div className='guide-top'>
                        <div>替换文本：</div>
                        <div className='ref-line-20 guide-top-10'>[组合库URL] 替换您组合库的地址</div>
                    </div>
                </>||
                type==='npm'&&
                <>
                    <div className='guide-details-title'>命令拉取：</div>
                    <div className='guide-details-back'>
                        {"npm install <PACKAGE>@<VERSION>"}
                    </div>
                </>
            }

        </div>
    )
}
export default PullDetails
