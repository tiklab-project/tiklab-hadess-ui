/**
 * @name: messageType
 * @author: mahai
 * @date: 2021-05-06 15:55
 * @description：消息类型
 * @update: 2021-05-06 15:55
 */
import React, {useState, useEffect} from 'react';
import {inject, observer} from 'mobx-react';
import {useTranslation} from "react-i18next";

import {Col, Row, Table, Button, Input, Space} from "antd";
import {Axios} from 'doublekit-core-ui';
import {BreadCrumb} from "../../../common";
import {deleteSuccessReturnCurrenPage} from "../../../utils";
import AddMessageService from "./components/addMessageService";

import {MESSAGE_TYPE_STORE} from "./store/messageTypeStore";
import './messageType.scss'

const breadcrumb = [{
    disabled:true,
    breadcrumbName: '消息业务类型管理 '
}, {
    path: 'list',
    breadcrumbName: '消息业务类型列表'
}];
const MessageType = props => {
    const { t } = useTranslation();
    const {match}=props;
    const columns = [
        {
            title: t('doublekit-message-service-name'),
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: t('doublekit-message-service-desc'),
            dataIndex: 'desc',
            key: 'desc',
        },
        {
            title: t('message-table-action'),
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => onEdit(record)}>{t('message-edit')}</a>
                    <a onClick={() => onDelete(record.id)}>{t('message-delete')}</a>
                </Space>
            )
        },
    ];
    const {messageTypeStore, ...res} = props;
    const {messageTypeData, getMessageTypeData} = messageTypeStore;

    const [inputValue, setInputValue] = useState('');
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState(null);
    const [pageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const [params, setParams] = useState({
        pageParam: {
            pageSize: pageSize,
            currentPage: currentPage,
        }
    });

    useEffect(() => {
        getMessageServiceList(params)
    }, [params]);

    // TODO 获取消息类型
    const getMessageServiceList = params => {
        Axios.post( '/messageType/findMessageTypePage', params, match.params.tenant).then(res => {
            if (!res.code) {
                setCount(res.data.totalRecord)
                getMessageTypeData(res.data.dataList)
            }
        })
    }
    // TODO 删除消息类型
    const onDelete = id => {
        const formData = new FormData();
        formData.append('id', id)
        Axios.post( '/messageType/deleteMessageType', formData,  match.params.tenant).then(res => {
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
    // TODO 编辑消息类型
    const onEdit = data => {
        setVisible(true);
        setData(data)
    }
    // TODO 取消消息类型对话框
    const onModalCancel = () => {
        setData(null)
        setVisible(false)
        getMessageServiceList(params)
    }
    // TODO 搜索消息类型
    const onSearch = e => {
        const nameSearch = e.target.value;
        setCurrentPage(1);
        const {name, ...rest} = params
        let newParams = {
            ...rest,
            pageParam: {
                pageSize: pageSize,
                currentPage: 1
            }
        }
        if (nameSearch) {
            newParams.name = nameSearch
        }
        setParams(newParams)
    }
    // TODO 新增消息类型
    const addMessageService = () => {
        setVisible(true)
    }
    // TODO 消息类型表格数据处理
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

    return (
        <div id='message-service'>
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
                            <div className={'message-service-btn'}>
                                <Button onClick={addMessageService}>
                                    +{t("message-service-addtype")}
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Table
                                dataSource={messageTypeData}
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
            <AddMessageService
                visible={visible}
                editdata={data}
                onCancel={onModalCancel}
            />
        </div>
    )
}
export default inject(MESSAGE_TYPE_STORE)(observer(MessageType))
