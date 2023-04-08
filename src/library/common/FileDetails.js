/**
 * @name: FileDetails
 * @author: limingliang
 * @date: 2022-12-30 10:30
 * @description：文件详情抽屉
 * @update: 2022-12-30 10:30
 */
import React  from "react";
import {Drawer} from 'antd'
import './FileDetails.scss'
import {VerticalAlignBottomOutlined} from "@ant-design/icons";
const FileDetails = (props) => {
    const {visible, onClose,fileDetail,mavenData} = props;
    return(
        <Drawer
            title="文件详情"
            placement='right'
            closable={false}
            onClose={onClose}
            visible={visible}
            width  ={'700'}
            className='locker-top'
        >
            {
                fileDetail&&
                <div className=' file-details'>
                    <div className='nav-table'>
                        <div className='title-text'>制品库:</div>
                        <span>{fileDetail?.repository.name}</span>
                    </div>
                    <div className='nav-table'>
                        <div className='title-text'>类型:</div>
                        <span>{fileDetail?.repository.type}</span>
                    </div>
                    {
                        fileDetail?.repository.type==="Maven"&&
                        <div>
                            <div className='nav-table'>
                                <div className='title-text'>groupId:</div>
                                <span>{mavenData?.groupId}</span>
                            </div>
                            <div className='nav-table'>
                                <div className='title-text'>artifactId:</div>
                                <span>{mavenData?.artifactId}</span>
                            </div>
                        </div>
                    }
                    <div className='nav-table'>
                        <div className='title-text'>版本:</div>
                        <span>{fileDetail?.libraryVersion.version}</span>
                    </div>
                    <div className='nav-table'>
                        <div className='title-text'>大小:</div>
                        <span>{fileDetail.fileSize}</span>
                    </div>
                    <div className='nav-table'>
                        <div className='title-text'>提交人:</div>
                        <span>{"admin"}</span>
                    </div>
                    <div className='nav-table'>
                        <div className='title-text'>创建时间:</div>
                        <span>{fileDetail.createTime}</span>
                    </div>
                    <div className='nav-table'>
                        <div className='title-text'>更新时间:</div>
                        <span>{fileDetail.libraryVersion.updateTime}</span>
                    </div>
                    <div className='nav-table'>
                        <div className='title-text'>最后下载:</div>
                        <span>{fileDetail.createTime}</span>
                    </div>
                    <div className='nav-table'>
                        <div className='title-text'>下载:</div>
                        <VerticalAlignBottomOutlined className='download-icon' />
                    </div>
                    {
                        fileDetail?.repository.type==="Maven"&&
                        <div className='nav-use'>
                            <div className='use-title'>Usage</div>
                            <div className='use-des'>Insert this snippet into your pom.xml</div>
                            <div className='use-table'>
                                <div>{"<dependency>"}</div>
                                <div className='per-line'>
                                    <div>{"<groupId>"}</div>
                                    <div>{mavenData?.groupId}</div>
                                    <div>{"</groupId>"}</div>
                                </div>
                                <div className='per-line'>
                                    <div>{"<artifactId>"}</div>
                                    <div>{mavenData?.artifactId}</div>
                                    <div>{"</artifactId>"}</div>
                                </div>
                                <div className='per-line'>
                                    <div>{"<version>"}</div>
                                    <div>{fileDetail.libraryVersion.version}</div>
                                    <div>{"</version>"}</div>
                                </div>
                                <div>{"<dependency>"}</div>

                            </div>
                        </div>
                    }
                    {
                        fileDetail?.repository.type==="npm"&&
                        <div className='nav-use'>
                            <div className='use-title'>Usage</div>
                            <div className='use-des'>Install runtime dependency</div>
                            <div className='use-table'>
                                npm install {"tiklab-eam-ui@1.0.0"}
                            </div>
                        </div>
                    }

                </div>
            }
        </Drawer>
    )
}
export default FileDetails
