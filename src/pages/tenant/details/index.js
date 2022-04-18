/**
 * @name: Details
 * @author: limingliamg
 * @date: 2021-08-09 16:48
 * @description：租户详情
 * @update: 2021-08-09 16:48
 */
import React, {useState, useEffect} from "react";
import {Breadcrumb, Row, Col, Input, Button, Table, Form, Upload, Space, Switch} from "antd";
import { UploadOutlined } from '@ant-design/icons';
import userService from "../../../service/user.service"
import {withRouter} from "react-router";
const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 20 },
};

const Details = props => {
    const [tenantData,setTenantData]=useState('')
    const [tableData,setTableData]=useState()
    const [tenantDetails,setTenantDetails]=useState()
    const tenants=props.history.location.params

    const columns = [
        {
            title: '姓名',
            dataIndex:['member','name'],
        },
        {
            title: '手机号',
            dataIndex: ['member','phone'],
        },
        {
            title: '邮箱',
            dataIndex: ['member','email'],
        },

    ];
    useEffect(async ()=>{
        if (tenants){
            sessionStorage.setItem("tenants", JSON.stringify(tenants));
        }
        await getTenantMember()
    },[])

    const getTenantMember=async ()=>{
        const tenantData=JSON.parse(sessionStorage.getItem("tenants"));
        setTenantData(tenantData)
        const param={
            tenantId:tenantData.id
        }
      const pre=await userService.findTenantMemberService(param)
        if (pre.code===0){
            setTableData(pre.data)
        }
    }

    return (
        <section className='w-full flex flex-row'>
            <div className=' w-full p-6  max-w-screen-xl m-auto'>
                <Breadcrumb separator=">" className='border-b border-solid pb-4'>
                    <Breadcrumb.Item  href='#/setting/tenant'>租户管理</Breadcrumb.Item>
                    <Breadcrumb.Item href="">{tenantData.name}</Breadcrumb.Item>
                </Breadcrumb>
                {
                    JSON.parse(sessionStorage.getItem("tenants"))
                    && <Form
                            {...layout}
                            name="nest-messages"
                            className='mt-6'>
                            <Form.Item label="租户名称">
                                {tenantData.name}
                            </Form.Item>
                            <Form.Item label="域名地址">
                                {tenantData.domainUrl}
                            </Form.Item>
                            <Form.Item label="创建用户">
                                {JSON.parse(sessionStorage.getItem("tenants")).master.name}
                            </Form.Item>
                            <div className='p-9'>
                                <h4 className='text-lg p-4'>租户成员:</h4>
                                <Table
                                    dataSource={tableData}
                                    columns={columns}
                                    rowKey={record => record.id}
                                    pagination={false}
                                />
                            </div>
                        </Form>
                }

            </div>

        </section>
    )
};

export default withRouter(Details)
