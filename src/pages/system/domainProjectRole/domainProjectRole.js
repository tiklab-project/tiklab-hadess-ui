/**
 * @name: domainProjectRole
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：项目角色管理(自)
 * @update: 2021-05-06 15:19
 */
import React, {useState, useEffect, useRef} from 'react';
import {observer, inject} from "mobx-react";
import { useTranslation } from 'react-i18next';
import {Table, Col, Row, Input} from "antd";
import {Axios} from 'doublekit-core-ui';
import DmRoleDetail from "./components/dmRoleDetail";
import {PRIVILEGE_DOMAIN_ROLE_STORE} from "../store/domainRole";
import {BreadCrumb} from '../../../common';
import './domainRole.scss';


/**
 * 项目限 ------- 项目角色管理 文件
 * @param props
 * @returns {*}
 * @constructor
 */
const PrivilegeDomainRole = props => {
    const {t} = useTranslation();

    const {privilegeDomainRoleStore, domainId, match} = props;
    const {getDomainRoles, privilegeDomainRole} = privilegeDomainRoleStore;
    const [pageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const [roleProjectDetail, setProjectRoleDetail] = useState(null);
    const [showProjectRoleDetail, setShowProjectRoleDetail] = useState(false);

    let InitParams = {
        domainId,
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
            dataIndex: ['role', 'name'],
            render: (text,recode) => {
                return <a onClick={() => onProjectRoleDetail(recode.id, recode.group,'people', recode.role.id)}>{text}</a>
            }
        },
        {
            title: t("privilege-role.roleDesc"),
            dataIndex: ['role', 'desc'],
        },
        {
            title: t("privilege-role.people"),
            dataIndex: 'people',
            render: (text,recode) => {
                return <a onClick={() => onProjectRoleDetail(recode.id, recode.group,'people', recode.role.id)}>{text}</a>
            }
        },
        {
            title: t("privilege-role.promise"),
            dataIndex: 'promise',
            render: (text,recode) => {
                return <a onClick={() => onProjectRoleDetail(recode.id, recode.group,'promise', recode.role.id)}>{text}</a>
            }
        },
        {
            title: t("privilege-role.type"),
            dataIndex: ['role', 'group'],
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
                // return <Space size="middle">
                //     <a onClick={() => onEditRole(recode)}>编辑</a>
                //     {
                //         !userProduction && <a onClick={() => onDeleteRole(recode.id)}>删除</a>
                //     }
                // </Space>
            }
        },
    ];

    /**
     * @param id 项目id
     * @param group 'system' || 'custom'
     * @param type 类型是 'people' || 'promise'
     * @param roleId 角色id
     *  获取角色详情
     */
    const onProjectRoleDetail = (id, group, type, roleId) => {
        setProjectRoleDetail({
            id,
            group,
            type,
            roleId
        });
        setShowProjectRoleDetail(true)
    }



    const getRole = (params) => {
        Axios.post('dmPrjRole/findDmPrjRolePage', params, match.params.tenant).then(res => {
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


    // TODO 搜索角色
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
                showProjectRoleDetail ?
                    <DmRoleDetail
                        roleDetailParams={roleProjectDetail}
                        clickBreadcrumb ={setShowProjectRoleDetail}
                        domainId={domainId}
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
                                    </Row>
                                    <Row>
                                        <Col span={24}>
                                            <Table

                                                columns={columns}
                                                dataSource={privilegeDomainRole}
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
                    </div>
            }
        </>
    )
}


export default inject(PRIVILEGE_DOMAIN_ROLE_STORE)(observer(PrivilegeDomainRole))
