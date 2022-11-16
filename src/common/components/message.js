/**
 * @name: Message
 * @author: limingliang
 * @date: 2022-11-12 16:53
 * @description：消息
 * @update: 2022-11-12 16:53
 */

import React, { useState, useRef,useEffect } from 'react';
import { Button, Drawer, Tabs, Space } from 'antd';
import './message.scss'
const Message = (props) => {
    const { open, setOpen, homeStore } = props;
    const todoMessageList = useRef()
    const [placement, setPlacement] = useState('left');
    const [messageList,setMessageList]=useState([])  //所有消息list
    const [unReadMessageList,setUnReadMMessageList]=useState([])  //未读消息list
    const [readMessageList,setReadMMessageList]=useState([])  //已读消息list

    useEffect(() => {
        if (open) {
            findMessageDispatchItemPage()
        }

    }, [open])


    const findMessageDispatchItemPage = () => {

    }


    const onClose = () => {
        setOpen(false);
    };

    const onChange = (e) => {
        setPlacement(e.target.value);
    };
    return(
        <div>
            <Drawer
                title="消息"
                placement={"right"}
                closable={true}
                onClose={onClose}
                visible={open}
                key={placement}
                className="frame-header-drawer"
               /* mask={false}*/
                destroyOnClose={true}
                width = {375}
            >
                <div className="message-content">
                    <Tabs defaultActiveKey="1" onChange={onChange}>

                        <Tabs.TabPane tab="所有" key="1">
                            <div className="message-box" ref={todoMessageList}>
                                {
                                    messageList && messageList.length > 0 && messageList.map(item => {
                                        return <div className="message-list" key={item.id} >
                                            <div
                                                dangerouslySetInnerHTML={{__html: item.messageTemplate.content}}
                                            />
                                        </div>
                                    })
                                }
                            </div>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="未读" key="2">
                            <div className="message-box" ref={todoMessageList}>
                                {
                                    messageList && messageList.length > 0 && messageList.map(item => {
                                        return <div className="message-list" key={item.id} >
                                            <div
                                                dangerouslySetInnerHTML={{__html: item.messageTemplate.content}}
                                            />
                                        </div>
                                    })
                                }
                            </div>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="已读" key="3">
                            <div className="message-box" ref={todoMessageList}>
                                {
                                    messageList && messageList.length > 0 && messageList.map(item => {
                                        return <div className="message-list" key={item.id} >
                                            <div
                                                dangerouslySetInnerHTML={{__html: item.messageTemplate.content}}
                                            />
                                        </div>
                                    })
                                }
                            </div>
                        </Tabs.TabPane>
                    </Tabs>
                </div>
            </Drawer>
        </div>
    )
}
export default Message