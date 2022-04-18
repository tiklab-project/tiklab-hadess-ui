
import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import {observer, inject} from "mobx-react";
import {Table, Col, Row, Button, Input, Space} from "antd";
import {useTranslation} from "react-i18next";
import {Axios} from 'doublekit-core-ui';
import {BreadCrumb} from "../../../common";
import AddDomainUser from "./components/addUser";
import {DOMAIN_USER_STORE} from "./store/domainUserStore";
import './domainUser.scss';

const PrivilegeDomainUser = props => {
    const {domainId, domainUserStore, match} = props;
    const {getDomainUser, deleteDomainUser, privilegeDomainUsers} = domainUserStore
    const {t}=useTranslation();


    const crumbRoutes = [
        {
            disabled:true,
            breadcrumbName: '成员管理 ',
        },
        {
            path: 'first',
            breadcrumbName: '成员列表',
        },
    ];
    const columns = [
        {
            title: t('orga-table.surname'),
            dataIndex: ['user','name'],
            key: 'name',
            // sorter:{
            //     multiple:1
            // },
        },
        {
            title: t('orga-table.phone'),
            dataIndex: ['user','phone'],
            key: 'phone',
            // width:'15%',
            // sorter:{
            //     multiple:2
            // },
        },
        {
            title: t('orga-table.email'),
            dataIndex: ['user','email'],
            key: 'email',
            // width:'15%',
            // sorter:{
            //     multiple:3
            // },
        },
        {
            title: t('orga-table.org'),
            dataIndex: ['user','org'],
            key: 'org',
            width:'20%',
        },
        {
            title: t('orga-table.type'),
            dataIndex: ['user','userType'],
            key: 'userType',
            width:'15%',
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
        },

        {
            title: t('orga-common.action'),
            key: 'action',
            width:'10%',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => onDeleteTableRow(record.id)}>{t('orga-common.delete')}</a>
                </Space>
            ),
        },
    ];

    const [visible, setVisible] = useState(false);
    const [inputValue, setInputValue] = useState('')
    const [pageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const [params, setParams] = useState({
        domainId,
        pageParam: {
            pageSize: pageSize,
            currentPage: currentPage,
        }
    })

    // TODO 处理组件卸载 不做数据处理
    const mounted = useRef(null);
    useEffect(() => {
        mounted.current = true
        getDomainUsers(params);
        return () => {
            mounted.current = false
        }
    }, [params])

    // TODO 获取项目域的用户数据
    const getDomainUsers = params => {
        Axios.post( '/dmUser/findDmUserPage', params, match.params.tenant).then(res => {
            if (!res.code && mounted.current) {
                setCount(res.data.totalRecord)
                getDomainUser(res.data.dataList)
            }
        })
    }

    const searchUser = e => {

    }
    // TODO 删除表格一行数据
    const onDeleteTableRow = id => {
        const formData = new FormData()
        formData.append('id', id)
        Axios.post('/dmUser/deleteDmUser', formData, match.params.tenant).then(res => {
            if (!res.code) {
                deleteDomainUser(id)
                const minCurrentPageCount = pageSize * (currentPage-1) + 1;
                if (count-1 < minCurrentPageCount) {
                    setCurrentPage(currentPage === 1 ? 1 : (currentPage-1))
                    setParams({
                        pageParam: {
                            pageSize: pageSize,
                            currentPage: currentPage === 1 ? 1 : (currentPage-1),
                        }
                    })
                }
                setCount(count-1)

            }
        })
    }

    /**
     * 处理表格排序分页方法
     * @param pagination
     * @param filters
     * @param sorter
     */
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
    // TODO 添加项目域用户
    const cancelAddDomainUser = useCallback(() => {
        setVisible(false)
        getDomainUsers(params)
    }, []);

    return (
        <div className={'privilege-domain-user'}>
            <Row justify={'center'}>
                <Col xl={{span: 20}} lg={{span: 24}} xxl={{span:16}}>

                    <BreadCrumb routes={crumbRoutes}/>
                    <div className={'privilege-domain-user-container'}>
                        <Row>
                            <Col span={6}>
                                <Input
                                    placeholder={t('orga-label.searchUserPhoneEmail')}
                                    value={inputValue}
                                    onChange={ (e) => setInputValue(e.target.value)}
                                    onPressEnter={(e) => searchUser(e)}
                                />
                            </Col>
                            <Col span={18}>
                                <div className={'privilege-domain-user-btn'}>
                                    <Button onClick={() => setVisible(true)}>+{t('orga-label.addUser')}</Button>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Table

                                    columns={columns}
                                    dataSource={privilegeDomainUsers}
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
            {
                useMemo(() => <AddDomainUser
                    {...props}
                    domainId={domainId}
                    visible={visible}
                    params={params}
                    onCancel={cancelAddDomainUser}
                />, [visible])
            }
        </div>
    )

}



const UserManagement = props => {
    return(
        <div>
            <PrivilegeDomainUser {...props} domainId={'111'}/>
        </div>
    )
};
export default inject(DOMAIN_USER_STORE)(observer(UserManagement))




