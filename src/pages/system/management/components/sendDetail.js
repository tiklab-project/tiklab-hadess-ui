/**
 * @name: sendDetail
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：消息的发送详情
 * @update: 2021-05-06 15:19
 */

import React,{useEffect, useState} from 'react';

import {Col, Row, Modal, Input, Table, Space, Button} from "antd";
import {useTranslation} from "react-i18next";
import {Axios} from 'doublekit-core-ui';
import './sendDetail.scss'


const SendDetail = props => {
    const { t } = useTranslation();
    const {visible, onCancel, id, match} = props;
    const columns = [
        {
            title: t('message-send-type'),
            dataIndex: ['messageSendType', 'name'],
            key: 'title',
        },
        {
            title: t('message-management-detail-tab-table-title'),
            dataIndex: ['receiver', 'name'],
        },
        {
            title: t('message-management-detail-tab-table-phone'),
            dataIndex: 'receiverContact',
        },
        {
            title: t('message-management-detail-tab-table-sendtime'),
            dataIndex: 'sendtime',
        },
        {
            title: t('message-management-detail-tab-table-receivetime'),
            dataIndex: 'receivetime',
            key: 'receivetime',
        },
        {
            title: t('message-management-detail-tab-table-sendingtime'),
            dataIndex: 'sendingtime',
            key: 'sendingtime',
        },
        {
            title: t('message-management-detail-tab-table-status'),
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: t('message-table-action'),
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a>{t('message-management-detail-tab-table-viewdatail')}</a>
                </Space>
            )
        },
    ]
    const [data, setData] = useState([])
    const [inputValue, setInputValue] = useState('');
    const [pageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const [params, setParams] = useState({
        messageId:id,
        pageParam: {
            pageSize: pageSize,
            currentPage: currentPage,
        }
    });
    useEffect(() => {
        if (id) {
            getDetailList({...params, messageId: id})
        }
    }, [params, id]);

    // TODO 获取发送详情
    const getDetailList = params => {
        Axios.post('/messageDispatchItem/findMessageDispatchItemPage', params, match.params.tenant).then(res => {
            if (!res.code) {
                setCount(res.data.totalRecord)
                setData(res.data.dataList)
            }
        })
    }
    /**
     * 弹窗取消事件
     */
    const handleCancel = () => {
        onCancel()
    };

    // TODO 搜索方法
    const onSearch = e => {
        const nameSearch = e.target.value;
        setCurrentPage(1);
        const {receiverContact, ...rest} = params;
        let newParams = {
            ...rest,
            pageParam: {
                pageSize: pageSize,
                currentPage: 1
            }
        }
        if (nameSearch) {
            newParams.receiverContact = nameSearch
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

    return(
        <Modal
            visible={visible}
            closable={false}
            title={t("message-view-log")}
            width={1200}
            footer={[
                <Button key="submit" type="primary" onClick={handleCancel}>
                    {t("message-close")}
                </Button>,
            ]}

        >
            <Row>
                <Col span={24}>
                    <div className="card-container">
                        <Row gutter={[16,24]}>
                            <Col span={8}>
                                <Input
                                    placeholder={`${t('message-management-detail-tab-table-phone')}`}
                                    value={inputValue}
                                    onChange={ (e) => setInputValue(e.target.value)}
                                    onPressEnter={(e) => onSearch(e)}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Table
                                    dataSource={data}
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
                    </div>
                </Col>
            </Row>
        </Modal>
    )
};


export default SendDetail
