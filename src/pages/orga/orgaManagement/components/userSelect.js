/**
 * @name: userSelect
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：组织中心添加系统组织选择用户到某个组织中
 * @update: 2021-05-06 15:19
 */


import React, {useState, useEffect, memo} from 'react';
import {Modal, Form, Input, Button, Col, Row, Table, message} from 'antd';
import {Axios} from 'doublekit-core-ui';
import {useTranslation} from "react-i18next";

const UserSelect = props => {
    const {t}=useTranslation();
    const {visible, onCancel, orgId, getOrgaUser, match} = props;
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [users, setUsers] = useState([]);
    const [pageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const [params, setParams] = useState({
        pageParam: {
            pageSize: pageSize,
            currentPage: currentPage
        }
    })

    useEffect(() => {
        getUser(params)
    }, [params])

    // TODO 获取所有用户
    const getUser = (params) => {
        Axios.post('user/findUserPage', params, match.params.tenant).then(res=>{
            if (!res.code) {
                setCount(res.data.totalRecord)
                setUsers(res.data.dataList)
            }
        })
    }

    // TODO 获取组织用户
    const getOrgaUsers = () => {
        const params = {orgaId: orgId, pageParam: {pageSize: 9999999, currentPage: 1}}
        return Axios.post( 'userOrga/findUserOrgaList', params, match.params.tenant)
    }

    // TODO 用户和组织关联
    const submit = data => {
        return Axios.post( 'userOrga/createUserOrga', data, match.params.tenant)
    }
    const handleOk = () => {
        getOrgaUsers().then(res => {
            if (!res.code) {
                let haveId = false
                const userIds = res.data.map(item => item.user.id)
                for (let selectId of selectedRowKeys) {
                    if (haveId) break
                    haveId = userIds.some(id => selectId === id)
                }
                if (!haveId) {
                    const promiseAll = selectedRowKeys.map(userId => {
                        return submit({
                            user:{id: userId},
                            orga:{orgaId: orgId}
                        })
                    })
                    Promise.all(promiseAll).then(res => {
                        setParams({
                            pageParam: {
                                pageSize: pageSize,
                                currentPage: 1
                            }
                        })
                        setSelectedRowKeys([])
                        setCurrentPage(1)
                        setCount(0)
                        onCancel()
                        getOrgaUser({orgaId :orgId }, 1)
                    })
                } else {
                    return message.error('存在关联的用户')
                }
            }
        })

    };

    const handleCancel = () => {
        setParams({
            pageParam: {
                pageSize: pageSize,
                currentPage: 1
            }
        })
        setSelectedRowKeys([])
        setCurrentPage(1)
        setCount(0)
        onCancel()
        getOrgaUser({orgaId :orgId }, 1)
    };

    const onSearch = values => {

    }

    const columns = [
        {
            title: t('orga-table.surname'),
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            ellipsis:true
        },
        {
            title: t('orga-table.phone'),
            dataIndex: 'phone',
            key: 'phone',
            width: '20%',
            ellipsis:true
        },
        {
            title: t('orga-table.email'),
            dataIndex: 'email',
            key: 'email',
            width: '20%',
            ellipsis:true
        },
        {
            title: t('orga-table.org'),
            dataIndex: 'org',
            key: 'org',
            width: '20%',
            ellipsis:true
        },
        {
            title: t('orga-table.type'),
            dataIndex: 'userType',
            key: 'userType',
            width: '10%',
            ellipsis:true,
            render: text => {
                switch (text) {
                    case 2:
                        return t('orga-table.thirdparty')
                    case 1 :
                        return t('orga-table.internal')
                    default:
                        return '--'
                }
            }
        }
    ];
    const onSelectChange = selectedRowKeys => {
        setSelectedRowKeys(selectedRowKeys)
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const changPage = page => {
        setCurrentPage(page)
        const params = {
            ...params,
            pageParam: {
                pageSize: pageSize,
                currentPage: page
            }
        }
        setParams(params)
    }
    return(
        <Modal
            title="选择用户"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            closable={false}
            width={800}
            destroyOnClose={true}
        >
            <Row>
                <Col span={24}>
                    <Form
                        layout="inline"
                        onFinish={onSearch}
                        preserve={false}
                    >
                        <Form.Item
                            name="name"
                            label={t('orga-table.name')}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                {t('orga-common.search')}
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <div style={{width:'100%'}}>
                        <Table
                            columns={columns}
                            dataSource={users}
                            rowSelection={rowSelection}
                            rowKey={record => record.id}
                            pagination={{
                                current:currentPage,
                                pageSize: pageSize,
                                total: count,
                                onChange: changPage,
                            }}
                        />
                    </div>
                </Col>
            </Row>
        </Modal>
    )
}
export default memo(UserSelect)
