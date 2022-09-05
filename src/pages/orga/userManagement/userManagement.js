


import React, {useState, useEffect, useRef, useCallback} from 'react';
import {observer, inject} from "mobx-react";
import {Row, Col, Input, Tabs, Space, Table, Button} from "antd";

import {Axios} from 'tiklab-core-ui';
import {useTranslation} from "react-i18next";

import {BreadCrumb} from "../../../common";
import AddUser from "./components/addUser";
import {USER_STORE} from "./store/userStore";
import './user.scss';

const { TabPane } = Tabs;

const User = props => {
    const {userStore, addUserPromiseCode='', match} = props;
    const {userData, getUserList, editUser, addUser, deleteUser} = userStore
    const {t}=useTranslation();
    const [visible, setVisible] = useState(false);
    const [isEdit, setEdit] = useState(false);
    const [editData, setEditData] = useState({});
    const [pageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const [params, setParams] = useState({
        pageParam: {
            pageSize: pageSize,
            currentPage: currentPage
        }
    });
    const [inputValue, setInputValue] = useState('');


    const mounted = useRef(null);
    useEffect(() => {
        mounted.current = true
        getUser(params);
        return () => mounted.current = false
    }, [params]);

    const getUser = useCallback((params) => {
        Axios.post('user/findUserPage', params, match.params.tenant).then(res=>{
            if (!res.code && mounted.current) {
                setCount(res.data.totalRecord)
                getUserList(res.data.dataList)
            }
        })
    }, []);
    const crumbRoutes = [
        {
            disabled:true,
            breadcrumbName: '用户管理 ',
        },
        {
            path: 'first',
            breadcrumbName: '用户列表',
        },
    ];


    const columns = [
        {
            title: t('orga-table.surname'),
            dataIndex: 'name',
            key: 'name',
            sorter:{
                multiple:1
            },
        },
        {
            title: t('orga-table.phone'),
            dataIndex: 'phone',
            key: 'phone',
            sorter:{
                multiple:2
            },
        },
        {
            title: t('orga-table.email'),
            dataIndex: 'email',
            key: 'email',
            sorter:{
                multiple:3
            },
        },
        {
            title: t('orga-table.org'),
            dataIndex: 'org',
            key: 'org',
        },
        {
            title: t('orga-table.type'),
            dataIndex: 'userType',
            key: 'userType',
            render: text => {
                switch (text) {
                    case 1 :
                        return t('orga-table.internal')
                    case 2:
                        return t('orga-table.thirdparty')
                    default:
                        return '--'
                }
            }
        },

        {
            title: t('orga-common.action'),
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => onEditUser(record)}>{t('orga-common.edit')}</a>
                    <a onClick={() => onDeleteUser(record.id)}>{t('orga-common.delete')}</a>

                </Space>
            ),
        },
    ];

    const onDeleteUser = id => {
        const formData = new FormData();
        formData.append('id', id)
        Axios.post('user/deleteUser', formData, match.params.tenant).then(res => {
            if (!res.code) {
                deleteUser(id)
            }
        })
    }

    const onEditUser = data => {
        let formData = new FormData()
        formData.append('id', data.id)
        Axios.post('user/findUser', formData, match.params.tenant).then(res => {
            if (!res.code) {
                setEditData(res.data)
                setVisible(true)
                setEdit(true)
            }
        })
    }
    const changTab = (key) => {
        console.log(key);
    }
    const searchUser = useCallback(e => {
        setCurrentPage(1)
        let newParams = {
            pageParam: {
                pageSize: pageSize,
                currentPage: 1
            }
        }
        if (e.target.value) {
            newParams = {
                pageParam: {
                    pageSize: pageSize,
                    currentPage: 1
                },
                keyword:e.target.value,
            }
        }
        setParams(newParams)
    }, []);

    // 处理表格分页排序的方法
    const handleTableChange = (pagination, filters, sorter) => {
        let orderParams = []
        setCurrentPage(pagination.current)
        const isArray = Array.isArray(sorter)
        if (isArray) {
            orderParams = sorter.map(item => {
                return {
                    "name":item.field,
                    "sortType":item.order !== undefined ? ( item.order === 'ascend'? 'asc': 'desc') : undefined
                }
            })
        } else {
            if (sorter.field) {
                orderParams.push({
                    "name":sorter.field,
                    "sortType":sorter.order !== undefined ? ( sorter.order === 'ascend'? 'asc': 'desc') : undefined
                })
            }
        }
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
        <div className='user'>
            <Row justify={'center'} style={{width:'100%'}}>
                <Col xl={{span: 20}} lg={{span: 24}} xxl={{span:16}}>
                    <div className='user-detail'>
                        <BreadCrumb routes={crumbRoutes}/>
                        <Row justify="space-between">
                            <Col span={8}>
                                <Input
                                    placeholder={t("orga-label.searchUserAccount")}
                                    value={inputValue}
                                    onChange={ (e) => setInputValue(e.target.value)}
                                    onPressEnter={(e) => searchUser(e)}
                                />
                            </Col>
                            <Col span={8}>
                                <div className={'user-detail-buttons'}>
                                    <Button onClick={() => setVisible(true)}>+{t("orga-label.addUser")}</Button>
                                    {
                                        <Plugin
                                            point='exportUser'
                                            extraProps={{userData, c:1}}
                                        />
                                    }
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Tabs onChange={changTab} type="card">
                                    <TabPane tab={t("orga-tab.all")} key="1">
                                        <Table

                                            columns={columns}
                                            dataSource={userData}
                                            rowKey={record => record.id}
                                            pagination={{
                                                current:currentPage,
                                                pageSize: pageSize,
                                                total: count,
                                            }}
                                            onChange={(pagination, filters, sorter) => handleTableChange(pagination, filters, sorter)}
                                        />
                                    </TabPane>
                                    <TabPane tab={t("orga-tab.in")} key="2">
                                        Content of Tab Pane 2
                                    </TabPane>
                                    <TabPane tab={t("orga-tab.out")} key="3">
                                        Content of Tab Pane 3
                                    </TabPane>
                                </Tabs>
                            </Col>
                        </Row>
                        <AddUser
                            {...props}
                            visible={visible}
                            onCancel={() => setVisible(false)}
                            addUser={addUser}
                            isEdit = {isEdit}
                            data={editData}
                            editUser={editUser}
                            getList={getUser}
                            listParams={params}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    )
}

const UserManagement = props => {
    return(
        <div>
            <User
                {...props}
                domainId={'111'}
                addUserPromiseCode={'111'}
                exportUserPromiseCode={'222'}
            />
        </div>
    )
};

export default inject(USER_STORE)(observer(UserManagement))
