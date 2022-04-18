/**
 * @name: management
 * @author: mahai
 * @date: 2021-05-06 15:50
 * @description：消息管理
 * @update: 2021-05-06 15:50
 */

import React, {useState, useEffect} from 'react';
import {inject, observer} from 'mobx-react';
import {useTranslation} from "react-i18next";

import {Col, Row, Table, Button, Input, Space} from "antd";
import BreadCrumb from "../../../common/breadCrumb/breadCrumb";
import {deleteSuccessReturnCurrenPage} from "../../../utils";
import SendDetail from "./components/sendDetail";
import ViewMessageModal from "./components/viewMessageModal";
import SendModal from "./components/sendModal";
import {Axios} from 'doublekit-core-ui';
import {MESSAGE_MANAGEMENT_STORE} from "./store/messageStore";
import './message.scss';


const breadcrumb = [{
    disabled:true,
    breadcrumbName: '消息管理 '
}, {
    path: 'list',
    breadcrumbName: '消息列表'
}];


const MessageManagement = props => {

    const { t } = useTranslation();
    const {messageManagementStore, match, ...res} = props;
    const {getMessageManagementData, messageManagementData} = messageManagementStore;
    const [visible, setVisible] = useState(false);
    const [visibleSend, setVisibleSend] = useState(false);
    // 选择接受人弹出框
    const [visibleUser, setVisibleUser] = useState(false);
    const [visibleView, setVisibleView] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [pageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const [params, setParams] = useState({
        pageParam: {
            pageSize: pageSize,
            currentPage: currentPage,
        }
    });
    const [detailId, setDetailId] = useState('')
    const [sendUser, setSendUser] = useState([])

    const [data, setData] = useState({});
    const columns = [
        {
            title: t('message-management-table-columns-title'),
            dataIndex: ['messageTemplate','title'],
            key: 'title',
            render: (text, record) => {
                const {data} = record;
                let title
                if (data) {
                    try {
                        const json = JSON.parse(data);
                        if (json.title) {
                            title = json.title;
                        } else {
                            title = text
                        }
                    } catch (e) {
                        title = text
                    }
                }
                return (
                    <Space size="middle">
                        <a onClick={() => onSendDetail(record.id)}>{title}</a>
                    </Space>
                )
            }
        },

        {
            title: t('message-template-modal-messagetype'),
            // title: t('message-management-table-columns-type'),
            dataIndex: ['messageTemplate', 'msgType', 'name'],
            key: 'type',
        },
        {
            title: t('message-management-table-columns-senduser'),
            dataIndex: ['sender', 'name'],
            key: 'sender',
        },
        {
            title: t('message-management-table-columns-receiving-time'),
            dataIndex: 'receiveTime',
            key: 'receiveTime',
        },
        {
            title: t('message-management-table-columns-receiving-status'),
            dataIndex: 'status',
            key: 'status',
            render:(text, record) => {
                const errorNum =  record.errorNum ? record.errorNum : 0
                return (
                    <div style={{cursor: 'pointer'}} onClick={() => onSendDetail(record.id)}>
                        {errorNum > 0 ? '失败' : '成功'}
                        (
                        <span style={{color:'#0099FF'}}>
                            {record.successNum}
                        </span>
                        {errorNum > 0 && '/'}
                        <span style={{color:'#FF0066'}}>
                            {errorNum > 0 && errorNum}
                        </span>
                        )
                    </div>
                )
            }
        },
        {
            title: t('message-table-action'),
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => onView(record.id)}>{t('message-view')}</a>
                    <a onClick={() => onDelete(record.id)}>{t('message-delete')}</a>
                </Space>
            )
        },
    ]

    useEffect(() => {
        getMessageData(params)
    }, [params]);

    /**
     * 获取消息数据
     * @param params
     */
    const getMessageData = params => {
        Axios.post('/message/findMessagePage', params, match.params.tenant).then(res => {
            if (!res.code) {
                setCount(res.data.totalRecord)
                getMessageManagementData(res.data.dataList)
            }
        })
    }


    /**
     * 删除消息
     * @param id
     */
    const onDelete = id => {
        const formData = new FormData();
        formData.append('id', id);
        Axios.post('/message/deleteMessage', formData, match.params.tenant).then(res => {
            if (!res.code) {
                const page = deleteSuccessReturnCurrenPage(count, pageSize, currentPage);
                const newParams = {
                    ...params,
                    pageParam: {
                        pageSize: pageSize,
                        currentPage:page
                    }
                }
                setCurrentPage(page)
                setParams(newParams)
            }
        })
    }

    /**
     * 预览
     * @param id
     */
    const onView = (id) => {
        const formData = new FormData();
        formData.append('id', id);
        Axios.post('/message/findMessageWithNest', formData, match.params.tenant).then(res => {
            if (!res.code) {
                setVisibleView(true)
                setData(res.data)
            }
        })

    }

    /**
     * 查看详情
     * @param id
     */
    const onSendDetail = id => {
        setVisible(true);
        setDetailId(id)
    }
    /**
     * 搜索消息
     * @param e
     */
    const onSearch = e => {
        const nameSearch = e.target.value;
        setCurrentPage(1);
        const {title, ...rest} = params
        let newParams = {
            ...rest,
            pageParam: {
                pageSize: pageSize,
                currentPage: 1
            }
        }
        if (nameSearch) {
            newParams.title = nameSearch
        }
        setParams(newParams)
    }

    /* 处理表格排序分页方法
    * @param pagination
    * @param filters
    * @param sorter
    */
    const handleTableChange = (pagination, filters, sorter) => {
        let orderParams = []
        setCurrentPage(pagination.current)
        const newParams = {
            ...params,
            orderParams,
            pageParam: {
                pageSize: pageSize,
                currentPage: pagination.current
            }
        }
        setParams(newParams)
    }

    // TODO 打开消息
    const sendMessage = () => {
        setVisibleSend(true)
    }

    // TODO 取消消息后重置属性
    const sendMessageCancel = () => {
        setVisibleSend(false);
        setSendUser([]);
        getMessageData(params)
    }
    // TODO 打开用户对话框
    const onOpenUserModal = () => {
        setVisibleUser(true)
    }
    // TODO 关闭用户对话框
    const onUserCancel= (data) => {
        if (data) {
            setSendUser(sendUser.concat(data))
        }
        setVisibleUser(false)
    }

    // TODO 移除用户
    const removeUser = id => {
        const newUser = sendUser.filter(item => item.id !=id);
        setSendUser(newUser)
    }
    return (
        <div id={'message-management'}>
            <Row justify={'center'} style={{width:'100%'}}>
                <Col xl={{span: 20}} lg={{span: 24}} xxl={{span:16}}>
                    <BreadCrumb
                        routes={breadcrumb}
                    />
                    <Row justify={'space-between'} gutter={[26, 16]}>
                        <Col span={8}>
                            <Input
                                placeholder={t('message-management-search-input')}
                                value={inputValue}
                                onChange={ (e) => setInputValue(e.target.value)}
                                onPressEnter={(e) => onSearch(e)}
                            />
                        </Col>
                        <Col span={8} offset={8}>
                            <div className={'message-management-btn'}>
                                <Button onClick={sendMessage}>
                                    +{t("message-send")}
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Table
                                dataSource={messageManagementData}
                                columns={columns}

                                rowKey={r => r.id}
                                tableLayout="fixed"
                                pagination={{
                                    current:currentPage,
                                    pageSize: pageSize,
                                    total: count,
                                }}
                                onChange={(pagination, filters, sorter) => handleTableChange(pagination, filters, sorter)}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <ViewMessageModal
                visible = {visibleView}
                data={data}
                onCancel={()=>setVisibleView(false)}
            />
            <SendDetail
                visible = {visible}
                onCancel={()=>setVisible(false)}
                id={detailId}
            />
            <SendModal
                visible = {visibleSend}
                onCancel={sendMessageCancel}
                userTable={sendUser}
                userVisible = {visibleUser}
                onUserCancel={onUserCancel}
                onOpenUserModal={onOpenUserModal}
                removeUser={removeUser}
            />
        </div>
    )
};



export default inject(MESSAGE_MANAGEMENT_STORE)(observer(MessageManagement))
