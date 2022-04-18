/**
 * @name: index
 * @author: mahai
 * @date: 2021-07-28 16:17
 * @description：订阅
 * @update: 2021-07-28 16:17
 */
import React, {useState, useEffect} from "react";
import {Button, Col, Input, Row, Space, Table} from 'antd'
import {BreadCrumb} from "../../common";
import '../system/projectSystemRole/projectRole.scss';
import AddSubscribe from "./add";

const routes = [{
    disabled:true,
    breadcrumbName: '服务订阅管理 '
}, {
    path: '/setting/subscribe',
    breadcrumbName: '服务订阅列表'
}];
const Subscribe = props => {
    const [pageSize] = useState(10);
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [tableData, setTableData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [editData, setEditData] = useState(null);
    let InitParams = {
        pageParam: {
            pageSize: pageSize,
            currentPage: currentPage,
        }
    }
    const [params, setParams] = useState(InitParams);

    const columns = [
        {
            title: '服务名称',
            dataIndex: 'name',
        },
        {
            title: '服务订阅状态',
            dataIndex: 'status',
        },
        {
            title: '服务订阅状态',
            dataIndex: 'status',
        },
        {
            title: '服务订阅时间',
            dataIndex: 'status',
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={()=> onEdit(record)}>编辑</a>
                    <a onClick={()=> onDelete(record.id)}>删除</a>
                </Space>
            ),
        },
    ]

    const onEdit = (data) => {
    }

    const onDelete = async (id) => {
    }

    const onSearch = e => {
        setParams({
            name:e.target.value,
            pageParam: {
                pageSize: pageSize,
                currentPage: 1
            }
        })
        setCurrentPage(1)
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

    const onAddSubscribe = () => {
        setVisible(true)
    }
    const onCloseSubscribe = () => {
        setVisible(false);
        setEditData(null)
    }

    return(
        <div className={'privilege-domain'}>
            <Row justify={'center'}>
                <Col xl={{span: 20}} lg={{span: 24}} xxl={{span:16}}>
                    <BreadCrumb routes={routes}/>

                    <div className={'privilege-domain-container'}>
                        <Row>
                            <Col span={6}>
                                <Input placeholder={'搜索名称'}  onPressEnter={e => onSearch(e)}/>
                            </Col>
                            <Col span={18}>
                                <div className={'privilege-domain-btn'}>
                                    <Button type="primary" onClick={onAddSubscribe}>
                                        +添加服务订阅
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '16px'}}>
                            <Col span={24}>
                                <Table
                                    columns={columns}
                                    dataSource={tableData}
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
            <AddSubscribe visible={visible} onCancel={onCloseSubscribe} editData={editData}/>
        </div>
    )
};
export default Subscribe
