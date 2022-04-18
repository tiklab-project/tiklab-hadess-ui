/**
 * @name: userMessage
 * @author: mahai
 * @date: 2021-05-06 15:56
 * @description：用户信息
 * @update: 2021-05-06 15:56
 */
/**
 * @name: myMessage
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：我的消息的载体
 * @update: 2021-05-06 15:19
 */

import React, {useEffect, useState} from 'react';
import {inject, observer} from 'mobx-react';
import {useTranslation} from "react-i18next";
import {Col, Row, Tabs, Pagination} from "antd";

import './myMessage.scss';
import {Axios} from 'doublekit-core-ui';
import {getUser} from '../../../utils'
import {USER_MESSAGE_STORE} from "./store/myMessageStore";
import SiteTemplate from "../template/components/siteTemplate";

const { TabPane } = Tabs;

const UserMessage = props => {
    const { t } = useTranslation();
    const {userMessageStore, match,...res} = props;
    const user = getUser();
    const {userMessageNum, setMessageNum} = userMessageStore;
    const [taskCount, setTaskCount] = useState(0);
    const [currentTask, setCurrentTask] = useState(1);
    const [taskData, setTaskData] = useState([]);
    const [taskParams] = useState({
        pageParam: {
            pageSize: 10,
            currentPage: currentTask,
        }
    });

    const [tabData, setTabData] = useState([])
    const [tabId, setTabId] = useState('')
    useEffect(() => {
        setMessageNum(60)
    },[userMessageNum]);


    useEffect(() => {
        getTabs()
    }, []);

    // TODO 获取 Tab 的分类标签
    const getTabs = () => {
        Axios.post( '/messageType/findMessageTypeList', {}, match.params.tenant).then(res => {
            if (!res.code) {
                setTabData(res.data)
                if (user.ticket) {
                    setTabId(res.data[0].id)
                    getTaskList({...taskParams, receiver:user.ticket, msgTypeId: res.data[0].id})
                }
            }
        })
    }

    // TODO 获取任务代办数据
    const getTaskList = params => {
        Axios.post('/messageDispatchItem/findMessageDispatchItemPage', params, match.params.tenant).then(res => {
            if (!res.code) {
                setTaskData(res.data.dataList)
                setTaskCount(res.data.totalRecord)
            }
        })
    }

    // TODO 处理任务分页数据获取
    const onChangeTaskPage = (page) => {
        setCurrentTask(page)
        if (user.ticket) {
            const params = {
                pageParam: {
                    pageSize: 10,
                    currentPage: page,
                },
                receiver:user.ticket,
                msgTypeId: tabId
            }
            getTaskList(params)
        }
    }
    // TODO 切换tab标签方法
    const changeTabs = e => {
        if (user.ticket) {
            setCurrentTask(1)
            setTabId(e)
            const params = {
                pageParam: {
                    pageSize: 10,
                    currentPage: 1
                },
                receiver:user.ticket,
                msgTypeId: e
            }
            getTaskList(params)
        }
    }
    return(
        <div id='user-message'>
            <Row justify={'center'} style={{width:'100%'}}>
                <Col xl={{span: 20}} lg={{span: 24}} xxl={{span:16}}>
                    <Row className='mymessage'>
                        <Col>
                            <label >{t('message-mymessage')}:</label>
                        </Col>
                    </Row>
                    <div className="message-card-container">
                        <Tabs
                            type="card"
                            onChange={changeTabs}
                        >

                            {
                                tabData.map(item => {
                                    return (
                                        <TabPane tab={item.name} key={item.id}>
                                            {
                                                taskData.map(item => {
                                                    const {data = ''} = item.message;
                                                    let jsonData = {
                                                        title:item.messageTemplate.title,
                                                        status:item.status,
                                                        receiveTime:item.receiveTime
                                                    }
                                                    return (
                                                        <Row  key={item.id}>
                                                            <Col span={24}>
                                                                <SiteTemplate
                                                                    title={jsonData.title}
                                                                    status={jsonData.status}
                                                                    replaceData={JSON.parse(data)}
                                                                    content={item.messageTemplate.content}
                                                                    receiveTime={jsonData.receiveTime}
                                                                    messageLink={item.messageTemplate.link}
                                                                    id={item.id}
                                                                    {...props}
                                                                />
                                                            </Col>
                                                        </Row>
                                                    )
                                                })
                                            }
                                            <Row justify={'center'}>
                                                <Col>
                                                    <Pagination current={currentTask} onChange={onChangeTaskPage} total={taskCount} />
                                                </Col>
                                            </Row>
                                        </TabPane>
                                    )
                                })
                            }

                        </Tabs>
                    </div>
                </Col>
            </Row>
        </div>
    )
};

export default inject(USER_MESSAGE_STORE)(observer(UserMessage))
