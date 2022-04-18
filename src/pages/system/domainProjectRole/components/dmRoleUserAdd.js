/**
 * @name: dmRoleUserAAdd
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：权限中心 项目域下的添加用户角色
 * @update: 2021-05-06 15:19
 */
import React, {useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import {Modal, Form, Input, Button, Col, Row, Table} from 'antd';
import {Axios} from 'doublekit-core-ui';

const AddDomainRoleUser = props => {
    const {t} = useTranslation();

    const {visible, onCancel, id='', addSelectedRowKeys, userIDWidthId, domainId,match} = props;
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [users, setUsers] = useState([]);
    const [pageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);

    let initParams = {
        domainId,
        pageParam: {
            pageSize: pageSize,
            currentPage: currentPage
        }
    }
    const [params, setParams] = useState(initParams)

    useEffect(() => {
        getUser(params);
    }, [params])

    useEffect(() => {
        setSelectedRowKeys(addSelectedRowKeys)
    }, [addSelectedRowKeys])

    // TODO 获取项目域的用户
    const getUser = (params) => {
        Axios.post('dmUser/findDmUserPage', params, match.params.tenant).then(res=>{
            if (!res.code) {
                setCount(res.data.totalRecord)
                setUsers(res.data.dataList.map(item => item.user))
            }
        })
    }

    const handleOk = () => {
        handleCancel()
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
    };

    const onSearch = values => {

    }

    const columns = [
        {
            title: t("privilege-role.name"),
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            ellipsis:true
        },
        {
            title: t("privilege-role.phone"),
            dataIndex: 'phone',
            key: 'phone',
            width: '20%',
            ellipsis:true
        },
        {
            title: t("privilege-role.email"),
            dataIndex: 'email',
            key: 'email',
            width: '20%',
            ellipsis:true
        },
        {
            title: t("privilege-role.org"),
            dataIndex: 'org',
            key: 'org',
            width: '20%',
            ellipsis:true
        },
        {
            title:  t("privilege-role.type"),
            dataIndex: 'userType',
            key: 'userType',
            width: '10%',
            ellipsis:true,
            render: text => {
                switch (text) {
                    case 2:
                        return t("privilege-role.thirdparty")
                    case 1 :
                        return t("privilege-role.internal")
                    default:
                        return '--'
                }
            }
        }
    ];
    const onSelectChange = (selectedRowKeys) => {

        setSelectedRowKeys(selectedRowKeys)
    };

    // TODO 选择角色权限的key来创建和删除用户权限
    const onSelectKey = key => {
        const isDelete = selectedRowKeys.some(item => item === key.id)
        let url = 'prjRoleUser/deletePrjRoleUser';
        let params;
        if (isDelete) {
            params = new FormData();
            params.append('id', userIDWidthId[key.id]);
        } else {
            params = {
                role:{id},
                user:{id:key.id}
            }
            url = 'prjRoleUser/createPrjRoleUser'
        }
        Axios.post(url, params, match.params.tenant)
    }
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        onSelect: onSelectKey
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
            title={t("privilege-select-user" )}
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
                            label={t('privilege-user')}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                {t("privilege-search")}
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

export default AddDomainRoleUser
