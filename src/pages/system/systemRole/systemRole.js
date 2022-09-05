/**
 * @name: systemRole
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：系统角色
 * @update: 2021-05-06 15:19
 */

import React, {useState, useEffect, useCallback, useRef} from 'react';
import {observer, inject} from "mobx-react";
import { useTranslation } from 'react-i18next';
import {Table, Col, Row, Input, Space, Button} from "antd";


import RoleDetail from "./components/roleDetail";
import {Axios} from 'tiklab-core-ui';
import {BreadCrumb, RoleAdd} from '../../../common';
import {SYSTEM_ROLE_STORE} from "./store/systemRoleStore";
import './role.scss'



/**
 * 系统级别的 角色
 * @param props
 * @returns {*}
 * @constructor
 */
const PrivilegeSystemRole = props => {
    const {t} = useTranslation();

    const {systemRoleStore, match} = props;
    const {getRoles, privilegeSystemRole} = systemRoleStore;
    const [visible, setVisible] = useState(false);
    const [editData, setEditData] = useState({});
    const [pageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const [roleDetail, setRoleDetail] = useState(null);
    const [showRoleDetail, setShowRoleDetail] = useState(false);
    const [group, setGroup] = useState('');
    let InitParams = {
        pageParam: {
            pageSize: pageSize,
            currentPage: currentPage,
        }
    }
    const [params, setParams] = useState(InitParams)

    // TODO 处理组件卸载 不做数据处理
    const mounted = useRef(null);
    useEffect(() => {
        mounted.current = true
        getRole(params);
        return () => mounted.current = false
    }, [params])

    const routes = [{
        disabled:true,
        breadcrumbName: '角色管理 '
    }, {
        path: 'first',
        breadcrumbName: '角色列表'
    }];
    const columns = [
        {
            title: t("privilege-role.roleName"),
            dataIndex: 'name',
            render: (text,recode) => {
                return <a onClick={() => onRoleDetail(recode.id, recode.group, 'people')}>{text}</a>
            }
        },
        {
            title: t("privilege-role.roleDesc"),
            dataIndex: 'desc',
        },
        {
            title: t("privilege-role.people"),
            dataIndex: 'people',
            render: (text,recode) => {
                return <a onClick={() => onRoleDetail(recode.id, recode.group, 'people')}>{text}</a>
            }
        },
        {
            title: t("privilege-role.promise"),
            dataIndex: 'promise',
            render: (text,recode) => {
                return <a onClick={() => onRoleDetail(recode.id, recode.group, 'promise')}>{text}</a>
            }
        },
        {
            title:  t("privilege-role.type"),
            dataIndex: 'group',
            render: (text,recode) => {
                switch (text) {
                    case 'system':
                        return t("privilege-role.system")
                    case 'custom':
                        return t("privilege-role.custom")
                    default:
                        return t("privilege-role.custom")
                }
            }
        },
        {
            title: t("privilege-common.action"),
            dataIndex: 'action',
            render: (text, recode) => {
                return <Space size="middle">
                    {
                        !userProduction && <a onClick={() => onEditRole(recode)}>{t("privilege-common.edit")}</a>
                    }
                    {
                        !userProduction && <a onClick={() => onDeleteRole(recode.id)}>{t("privilege-common.delete")}</a>
                    }
                </Space>
            }
        },
    ];


    const onRoleDetail = (id, group, type) => {
        setRoleDetail({
            id,
            group,
            type
        });
        setShowRoleDetail(true)
    }
    // TODO 系统的角色详情
    const onDeleteRole = id => {
        let formData = new FormData()
        formData.append('id', id)
        Axios.post('role/deleteRole', formData, match.params.tenant).then(res => {
            if (!res.code) getRole(params)
        })
    }
    // TODO 编辑系统的角色
    const onEditRole = item => {
        setEditData(item)
        setVisible(true)
    }

    // TODO 获取系统角色
    const getRole = (params) => {
        Axios.post('role/findRolePage', params, match.params.tenant).then(res => {
            if (!res.code && mounted.current) {
                getRoles(res.data.dataList)
                setCount(res.data.totalRecord)
            }
        })
    }

    /**
     * @param pagination 分页器
     * @param filters 过滤
     * @param sorter  排序
     * 处理表格中变化的函数方法
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
    // TODO 关闭对话框重置数
    const cancel = useCallback(() => {
        setEditData({})
        setVisible(false)
        getRole(params)
    },[visible]);
    // TODO 打开添加角色的对话框
    const addRole = (type) => {
        setGroup(type)
        setVisible(true)
    }

    const onSearchRole = e => {
        setParams({
            name:e.target.value,
            pageParam: {
                pageSize: pageSize,
                currentPage: 1
            }
        })
        setCurrentPage(1)
    }
    return (
        <>
            {
                showRoleDetail ?
                    <RoleDetail
                        roleDetailParams={roleDetail}
                        clickBreadcrumb ={setShowRoleDetail}
                    />
                    :
                    <div className={'privilege'} >
                        <Row justify={'center'} className={'privilege-wrap'}>
                            <Col xl={{span: 20}} lg={{span: 24}} xxl={{span:16}} className={'role-col'}>
                                <BreadCrumb routes={routes}/>
                                <div className={'privilege-container'}>
                                    <Row>
                                        <Col span={6}>
                                            <Input placeholder={t('privilege-common.please-input')+t('privilege-role.roleName')}
                                                   onPressEnter={e => onSearchRole(e)}/>
                                        </Col>
                                        <Col span={18}>
                                            <div className={'privilege-btn'}>
                                                {
                                                    !userProduction && <Button onClick={() => addRole('system')}>
                                                        +{t('privilege-role.addSystemRole')}
                                                    </Button>
                                                }
                                                <Button onClick={() => addRole('custom')}>+{t('privilege-role.addRole')}</Button>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={24}>
                                            <Table

                                                columns={columns}
                                                dataSource={privilegeSystemRole}
                                                rowKey={r => r.id}
                                                pagination={{
                                                    current: currentPage,
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
                        <RoleAdd
                            visible={visible}
                            cancel={cancel}
                            editData={editData}
                            group={group}
                            urlType={'system'}
                        />
                    </div>
            }
        </>
    )
}


export default inject(SYSTEM_ROLE_STORE)(observer(PrivilegeSystemRole))
