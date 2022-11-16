/**
 * @name: BlogDetails
 * @author: limingliang
 * @date: 2022-11-08 14:30
 * @description：博客详情
 * @update: 2022-1-08 14:30
 */
import React from "react";
import {Avatar, Drawer, Modal, Space, Table} from 'antd'
import {LikeFilled, LikeOutlined, UserOutlined} from "@ant-design/icons";
import PreviewEditor from "../../common/editSlate/previewEditor";
const BlogDetails = (props) => {
    const {visible, onClose,blogData} = props;
    return(
        <Drawer
            title="博客详情"
            placement='right'
            closable={false}
            onClose={onClose}
            visible={visible}
            width  ={'800'}
            className='locker-top'
        >
            {blogData&&
                <div className='container mx-auto flex flex-col   '>
                    <h1 className='text-3xl cursor-pointer'> {blogData.name}</h1>
                    <div className='flex items-center py-2 space-x-4 text-gray-500'>
                        <Avatar size={30} icon={<UserOutlined />} />
                        <p> {blogData?.member?.name}</p>
                        <p>发表时间：{blogData.createTime}</p>
                        <p >阅读量：{blogData.number}</p>
                        <div className='flex space-x-4 items-center'>
                            {
                                blogData.like
                                    ?<LikeFilled className='text-xl cursor-pointer'    />
                                    :<LikeOutlined className='text-xl cursor-pointer' />
                            }
                            <span>{blogData.likeNumInt}</span>
                        </div >
                    </div>
                    <div className='w-full p-6 max-w-screen-2xl  my-0 my-2' id='slate'>
                        {
                            blogData.details&& <PreviewEditor
                                value={blogData.details}

                            />
                        }
                    </div>
                </div>

            }
        </Drawer>
    )
}
export default BlogDetails