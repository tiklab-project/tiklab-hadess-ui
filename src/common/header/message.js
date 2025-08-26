/**
 * @name: Message
 * @author: limingliang
 * @date: 2022-11-12 16:53
 * @description：消息
 * @update: 2022-11-12 16:53
 */

import React, { useState, useRef,useEffect } from 'react';
import {Button, Drawer, Tabs, Space, Tooltip, Divider} from 'antd';
import './message.scss'
import {
    BellOutlined,
    CloseOutlined,
    DeleteOutlined,
    LoadingOutlined,
    MessageOutlined
} from "@ant-design/icons";
import MessageStore from "./store/MessageStore";
import {getUser} from "tiklab-core-ui";
const Message = (props) => {
    const {visible,setVisible,unread,setUnread,translateX} = props
    const {findMessageItemPage,updateMessageItem,deleteMessageItem}=MessageStore

    const [isLoading,setIsLoading] = useState(false)
    const [selected,setSelected] = useState(0)

    const [messageList,setMessageList]=useState([])
    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()
    const [pageSize]=useState(5)

    const [state,setState]=useState("")

    useEffect(() => {
        selected===2? getMessage(1):getMessage(1,selected)
    }, [visible])

    const tabs = [
        {
            id:2,
            title:'全部',
        },
        {
            id:0,
            title:'未读',
        },
        {
            id:1,
            title:'已读',
        }
    ]

    /**
     * 删除消息通知
     * @param e
     * @param item
     */
    const delMessage = (e,item) =>{
        deleteMessageItem(item.id).then(res=>{
            if (res.code===0){

                const a=messageList.filter(a=>a.id!==item.id)
                setMessageList(a)
                if (item.status===0){
                    setUnread(unread-1)
                }

            }
        })
        //屏蔽父层点击事件
        e.stopPropagation()
    }

    const onClose = () => {
        setVisible(false);
        setCurrentPage(1)
    };

    //关闭消息抽屉
    const closeMsg = () => {
        setVisible(false)
        setMessageList([])
    }

    //消息跳转
    const goHref = item => {
        //未消息修改为已读
        if (item.status===0){
            updateMessageItem({...item,status:1})
        }
        const path= item.link.substring(item.link.indexOf("#")+1)
        props.history.push(path)
        closeMsg()
    }

    //查询消息
    const getMessage = (currentPage,status,type) => {
        findMessageItemPage({ pageParam:{currentPage:currentPage,pageSize:pageSize},
            bgroup:"hadess",receiver:getUser().userId,sendType:'site',status:status})
            .then(res=>{
                if (res.code===0){
                    if (messageList&&messageList.length>0&&type==='more'){
                        setMessageList(messageList.concat(res.data.dataList))
                    }else {
                        setMessageList(res.data.dataList)
                    }
                    status===0&&setUnread(res.data.totalRecord)
                    setTotalPage(res.data.totalPage)
                    setIsLoading(false)
                }
            })
    }

    /**
     * 切换消息类型
     * @param item
     */
    const changMessage = item => {
        setState('')
        setCurrentPage(1)
        item.id===2? getMessage(1):getMessage(1,item.id)
        setSelected(item.id)
    }

    /**
     * 加载更多消息
     */
    const moreMessage = () =>{
        setState("more")
        setIsLoading(true)
        selected===2? getMessage(currentPage+1,null,'more'):
            getMessage(currentPage+1,selected,'more')
        setCurrentPage(currentPage+1)

    }

    const renderTabs = item => {
        return   <div key={item.id} className={`title-item ${item.id===selected?'title-select':null}`} onClick={()=>changMessage(item)}>
            {item.title}
            {
                item.id === 0 &&
                <span className={`messageModal-screen-tab ${0< 100 ?null:'messageModal-screen-much'}`}>
                            {unread}
                        </span>
            }
        </div>
    }

    // 渲染消息列表
    const renderMessageList = messageList =>{
        return messageList && messageList.map((item,index)=>{
            const data = JSON.parse(item.data)
            return(
                <div
                    key={index}
                    className={`message-item ${item.status===1 ? 'message-read':''}`}
                    onClick={()=>goHref(item)}
                >
                    <div className='message-item-left'>
                        <div className="message-user-icon">{getUser()?.nickname.slice(0, 1).toUpperCase()}</div>
                        <div className='message-item-center'>
                            <div className='message-item-user'>
                                <div>
                                    <Space>
                                     <span className='user-title'>{item.sendUser&&item.sendUser.nickname?
                                         item.sendUser.nickname:
                                         item.sendUser.name}
                                     </span>
                                        <span className='user-title'>{item.messageType.name}</span>
                                        <span className='user-time'>{item.sendTime}</span>
                                    </Space>
                                    <div className='user-data'>{data.message}</div>
                                </div>

                                <Tooltip title={'删除'}>
                                    <div onClick={e=>delMessage(e,item)} className={`message-hidden`}>
                                        <DeleteOutlined />
                                    </div>
                                </Tooltip>
                            </div>
                            <div dangerouslySetInnerHTML={{__html: item.content}}/>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return visible&&<Drawer
        closable={false}
        placement='left'
        onClose={onClose}
        visible={visible}
        maskStyle={{background:'transparent'}}
        contentWrapperStyle={visible?{transform:`translateX(${translateX})`,width:450,height:'calc(100%)'}:{}}
        className='custom-message'
    >
        <div className='messageModal'>
            <div className='messageModal-up'>
                <div className='messageModal-up-title'>
                    <span className='messageModal-up-icon'><BellOutlined/></span>
                    <span>消息</span>
                </div>
                <div className='messageModal-up-close' onClick={closeMsg}>
                    <CloseOutlined />
                </div>
            </div>
            <div className='messageModal-content'>
                <div className='messageModal-title'>
                    {
                        tabs.map(item=>renderTabs(item))
                    }
                </div>
                <div className='messageModal-list'>
                    {
                        renderMessageList(messageList)
                    }
                    {
                        currentPage===totalPage&&state==='more'&&
                        <Divider plain>{"没有更多了 🤐"}</Divider>
                    }
                    {
                        totalPage===0&&
                        <div>
                            {/* <EmptyText
                                    title={emptyTitle}
                                />*/}
                        </div>
                    }
                    {
                        currentPage<totalPage && !isLoading &&
                        <div
                            className='messageModal-more'
                            onClick={()=>moreMessage()}
                        >
                            加载更多...
                        </div>
                    }
                    {
                        isLoading &&
                        <div className='messageModal-more'>
                            <LoadingOutlined/>
                        </div>
                    }
                </div>
            </div>
        </div>
    </Drawer>



}
export default Message
