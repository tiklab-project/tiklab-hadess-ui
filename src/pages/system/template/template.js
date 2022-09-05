/**
 * @name: template
 * @author: mahai
 * @date: 2021-05-06 15:52
 * @description：消息模板
 * @update: 2021-05-06 15:52
 */


import React, {useState, useEffect} from 'react';
import {inject, observer} from 'mobx-react';
import {useTranslation} from "react-i18next";

import {Col, Row, Table, Button, Input, Space} from "antd";
import {Axios} from 'tiklab-core-ui';
import {BreadCrumb} from "../../../common";
import {deleteSuccessReturnCurrenPage} from "../../../utils";
import AddMessageTemplate from "./components/addMessageTemplate";

import {MESSAGE_TEMPLATE_STORE} from "./store/messageTemplateStore";
import './messageTemplate.scss';

const breadcrumb = [{
    disabled:true,
    breadcrumbName: '消息模板管理 '
}, {
    path: 'list',
    breadcrumbName: '消息模板列表'
}];
const MessageTemplate = props => {
    const {t} = useTranslation()
    const {messageTemplateStore, match, ...res} = props;
    const {getMessageTemplateData, messageTemplateData} = messageTemplateStore;
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
    const columns = [
        {
            title: t('message-template-name'),
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: t('message-template-modal-ID'),
            dataIndex: 'id',
            key: 'code',
        },
        {
            title: t('message-template-title'),
            dataIndex: 'title',
            key: 'title',
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

    useEffect(() => {
        getData(params)
    }, [params]);

    // TODO 获取消息模板数据
    const getData = params => {
        Axios.post('/messageTemplate/findMessageTemplatePage', params, match.params.tenant).then(res => {
            if (!res.code) {
                setCount(res.data.totalRecord)
                getMessageTemplateData(res.data.dataList)
            }
        })
    }

    // TODO 删除消息模板
    const onDelete = id => {
        const formData = new FormData();
        formData.append('id', id)
        Axios.post( '/messageTemplate/deleteMessageTemplate', formData, match.params.tenant).then(res => {
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
    // TODO 编辑消息模板
    const onEdit = data => {
        setVisible(true);
        setData(data)
    }
    // TODO 搜索消息模板
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
    // TODO 消息模板表格分页以及排序等功能的方法
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
    // TODO 打开添加消息模板的组件
    const addMessageTemplate = () => {
        setVisible(true)
    }
    // TODO 关闭添加消息模板的组件
    const onModalCancel = () => {
        setData(null);
        setVisible(false);
        getData(params)
    }
    return(
        <div id='message-template'>
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
                            <div className={'message-template-btn'}>
                                <Button onClick={addMessageTemplate}>
                                    +{t("message-template-addtemplate")}
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Table
                                dataSource={messageTemplateData}
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
            <AddMessageTemplate
                visible={visible}
                editdata={data}
                onCancel={() => onModalCancel()}
            />
        </div>
    )
};

export default inject(MESSAGE_TEMPLATE_STORE)(observer(MessageTemplate))
