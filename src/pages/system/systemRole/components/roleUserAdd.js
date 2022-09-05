/**
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：添加系统角色用户
 * @update: 2021-05-06 15:19
 */
import React, {useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import {Modal, Form, Input, Button, Col, Row, Table} from 'antd';
import {Axios} from 'tiklab-core-ui';
const AddRoleUser = props => {
    const {t} = useTranslation();
    const {visible, onCancel, id='', addSelectedRowKeys, userIDWidthId,match} = props;
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
        getUser(params);
    }, [params])

    useEffect(() => {
        setSelectedRowKeys(addSelectedRowKeys)
    }, [addSelectedRowKeys])

    /**
     * 获取角色用户
     * @param params
     */
    const getUser = (params) => {
        Axios.post('user/findUserPage', params, match.params.tenant).then(res=>{
            if (!res.code) {
                setCount(res.data.totalRecord)
                setUsers(res.data.dataList)
            }
        })
    }

    const handleOk = () => {
        handleCancel()
    };


    /**
     * 关闭对话框重置数据
     */
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
            title:  t("privilege-role.org"),
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

    /**
     * 选中表格一列数据keys
     * @param selectedRowKeys
     */
    const onSelectChange = (selectedRowKeys) => {
        setSelectedRowKeys(selectedRowKeys)
    };

    const onSelectKey = key => {
       const isDelete = selectedRowKeys.some(item => item === key.id);
       let url = 'roleUser/deleteRoleUser';
       let params;
        if (isDelete) {
            params = new FormData();
            params.append('id', userIDWidthId[key.id]);
        } else {
            params = {
                role:{id},
                user:{id:key.id}
            }
            url = 'roleUser/createRoleUser'
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

        >
            <Row>
                <Col span={24}>
                    <Form
                        layout="inline"
                        onFinish={onSearch}
                    >
                        <Form.Item
                            name="name"
                            label={t("privilege-user" )}
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

export default AddRoleUser
