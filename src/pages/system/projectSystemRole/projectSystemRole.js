/**
 * @name: projectSystemRole
 * @author: mahai
 * @date: 2021-05-06 15:17
 * @description：项目系统角色
 * @update: 2021-05-06 15:17
 */


import React, {useState, useEffect, useCallback, useRef} from 'react';
import {observer, inject} from "mobx-react";
import {Axios} from 'tiklab-core-ui';
import { useTranslation } from 'react-i18next';
import {Table, Col, Row, Input, Space, Button} from "antd";
import {BreadCrumb, RoleAdd} from '../../../common';
import ProjectRoleDetail from './components/projectRoleDetail'
import {PRIVILEGE_PROJECT_ROLE_STORE} from "./store/projectRoleStore";
import './projectRole.scss';
const PrivilegeProjectRole = props => {
    const {t} = useTranslation();

    const {privilegeProjectRoleStore, group='system', match} = props;
    const {getDomainRoles, privilegeProjectRole} = privilegeProjectRoleStore;
    const [visible, setVisible] = useState(false);
    const [editData, setEditData] = useState({});
    const [pageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const [roleDomainDetail, setDomainRoleDetail] = useState(null);
    const [showDomainRoleDetail, setShowDomainRoleDetail] = useState(false);

    let InitParams = {
        group,
        scope:1,
        pageParam: {
            pageSize: pageSize,
            currentPage: currentPage,
        }
    }
    const [params, setParams] = useState(InitParams);

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
                return <a onClick={() => onDomainRoleDetail(recode.id, recode.group,'people')}>{text}</a>
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
                return <a onClick={() => onDomainRoleDetail(recode.id, recode.group,'people')}>{text}</a>
            }
        },
        {
            title: t("privilege-role.promise"),
            dataIndex: 'promise',
            render: (text,recode) => {
                return <a onClick={() => onDomainRoleDetail(recode.id, recode.group,'promise')}>{text}</a>
            }
        },
        {
            title: t("privilege-role.type"),
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
                        recode.group === 'custom' && <a onClick={() => onEditRole(recode)}>{t("privilege-common.edit")}</a>
                    }

                    {
                        !userProduction && <a onClick={() => onDeleteRole(recode.id)}>{t("privilege-common.delete")}</a>
                    }
                </Space>
            }
        },
    ];

    // TODO 项目域的角色详情
    const onDomainRoleDetail = (id,group, type) => {
        setDomainRoleDetail({
            id,
            group,
            type
        });
        setShowDomainRoleDetail(true)
    }

    // TODO 删除角色
    const onDeleteRole = id => {
        let formData = new FormData()
        formData.append('id', id)
        Axios.post('prjRole/deletePrjRole', formData, match.params.tenant).then(res => {
            if (!res.code) getRole(params)
        })
    }
    // TODO 编辑角色
    const onEditRole = item => {
        setEditData(item)
        setVisible(true)
    }

    // TODO 获取角色
    const getRole = (params) => {
        Axios.post('prjRole/findPrjRolePage', params, match.params.tenant).then(res => {
            if (!res.code && mounted.current) {
                getDomainRoles(res.data.dataList)
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

    // TODO 关闭对话框重置数据
    const cancel = useCallback(() => {
        setEditData({})
        setVisible(false)
        getRole(params)
    }, [visible]);

    // TODO 打开添加角色的对话框
    const addrole = () => {
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
                showDomainRoleDetail ?
                    <ProjectRoleDetail
                        roleDetailParams={roleDomainDetail}
                        clickBreadcrumb ={setShowDomainRoleDetail}
                    />
                    :
                    <div className={'privilege-domain'}>
                        <Row justify={'center'}>
                            <Col xl={{span: 20}} lg={{span: 24}} xxl={{span:16}}>
                                <BreadCrumb routes={routes}/>
                                <div className={'privilege-domain-container'}>
                                    <Row>
                                        <Col span={6}>
                                            <Input placeholder={t('privilege-common.please-input')+t('privilege-role.roleName')}  onPressEnter={e => onSearchRole(e)}/>
                                        </Col>
                                        <Col span={18}>
                                            <div className={'privilege-domain-btn'}>
                                                <Button onClick={addrole}>
                                                    +{t('privilege-role.addRole')}
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={24}>
                                            <Table

                                                columns={columns}
                                                dataSource={privilegeProjectRole}
                                                rowKey={r => r.id}
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
                        <RoleAdd
                            visible={visible}
                            cancel={cancel}
                            editData={editData}
                            group={group}
                            urlType={'project'}
                        />
                    </div>
            }
        </>
    )
}


export default inject(PRIVILEGE_PROJECT_ROLE_STORE)(observer(PrivilegeProjectRole))
