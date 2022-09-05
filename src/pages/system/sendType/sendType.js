/**
 * @name: sendType
 * @author: mahai
 * @date: 2021-05-06 15:53
 * @description：消息发送类型
 * @update: 2021-05-06 15:53
 */


import React, {useState, useEffect} from 'react';
import {inject, observer} from 'mobx-react';
import {useTranslation} from "react-i18next";
import {Col, Row, Table, Button, Input, Space} from "antd";
import {BreadCrumb} from "../../../common";
import {deleteSuccessReturnCurrenPage} from "../../../utils";
import {Axios} from 'tiklab-core-ui';

import AddMessageType from "./components/addMessageType";
import {MESSAGE_SEND_TYPE_STORE} from "./store/messageSendTypeStore";
import './messageSendType.scss';


const breadcrumb = [{
    disabled:true,
    breadcrumbName: '消息类型管理 '
}, {
    path: 'list',
    breadcrumbName: '消息类型列表'
}];

const MessageSendType = props => {
    const { t } = useTranslation();
    const columns = [
        {
            title: t('message-type-name'),
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: t('message-type-desc'),
            dataIndex: 'desc',
            key: 'desc',
        },
        {
            title: t('message-table-action'),
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                !userProduction &&
                <Space size="middle">
                    <a onClick={() => onEdit(record)}>{t('message-edit')}</a>
                    <a onClick={() => onDelete(record.id)}>{t('message-delete')}</a>
                </Space>
            )
        },
    ];
    const {messageSendTypeStore,match, ...res} = props;
    const {messageSendTypeData, getMessageSendTypeData} = messageSendTypeStore;
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
        getMessageList(params)
    }, [params]);

    // TODO 获取消息列表
    const getMessageList = (params) => {
        Axios.post( '/messageSendType/findMessageSendTypePage', params, match.params.tenant).then(res => {
            if (!res.code) {
                setCount(res.data.totalRecord)
                getMessageSendTypeData(res.data.dataList)
            }
        })
    }
    // TODO 删除方式消息类型
    const onDelete = id => {
        const formData = new FormData();
        formData.append('id', id)
        Axios.post('/messageSendType/deleteMessageSendType', formData, match.params.tenant).then(res => {
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
    const onEdit = data => {
        setVisible(true);
        setData(data)
    }
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

    // TODO 处理表格数据排序以及分页功能
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

    // TODO 打开添加消息类型的组件
    const addMessageType = () => {
        setVisible(true)
    }

    // TODO 关闭对话框重置方法
    const onModalCancel = () => {
        setData(null)
        setVisible(false)
        getMessageList(params)
    }

    return (
        <div id='message-type'>
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
                            <div className={'message-type-btn'}>
                                <Button onClick={addMessageType}>
                                    +{t("message-type-addtype")}
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Table
                                dataSource={messageSendTypeData}
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
            <AddMessageType
                visible={visible}
                editdata={data}
                onCancel={onModalCancel}
            />
        </div>
    )
};

export default inject(MESSAGE_SEND_TYPE_STORE)(observer(MessageSendType))

