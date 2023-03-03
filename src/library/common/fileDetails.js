/**
 * @name: FileDetails
 * @author: limingliang
 * @date: 2022-12-30 10:30
 * @description：文件详情抽屉
 * @update: 2022-12-30 10:30
 */
import React  from "react";
import {Descriptions, Drawer, Space, Table} from 'antd'
import './fileDetails.scss'
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
                <div className='space-y-3 file-details'>
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
                        <div className='space-y-3'>
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

                        <VerticalAlignBottomOutlined className='text-blue-500 text-xl cursor-pointer font-medium' />

                    </div>
                    {
                        fileDetail?.repository.type==="Maven"&&
                        <div className='pt-4'>
                            <div className='text-base font-normal'>Usage</div>
                            <div className='text-gray-400'>Insert this snippet into your pom.xml</div>
                            <div className='mt-2 bg-gray-100 py-2 pl-2'>
                                <div>{"<dependency>"}</div>
                                <div className='flex pl-6'>
                                    <div>{"<groupId>"}</div>
                                    <div>{mavenData?.groupId}</div>
                                    <div>{"</groupId>"}</div>
                                </div>
                                <div className='flex pl-6'>
                                    <div>{"<artifactId>"}</div>
                                    <div>{mavenData?.artifactId}</div>
                                    <div>{"</artifactId>"}</div>
                                </div>
                                <div className='flex pl-6'>
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
                        <div className='pt-4'>
                            <div className='text-base font-normal'>Usage</div>
                            <div className='text-gray-400'>Install runtime dependency</div>
                            <div className='mt-2 bg-gray-100 py-2 pl-2'>
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
