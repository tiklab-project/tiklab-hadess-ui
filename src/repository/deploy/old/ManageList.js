import React, {useEffect, useState} from "react";
import {Col, Row, Form, Modal, Input, Button, Table, Space, Select} from 'antd';
import "../components/Copy.scss"
const ManageList = (props) => {
    const options=[{value: '1', label: '荷叶新村A区'}, {value: '2', label: '荷叶新村b区'}, {value: '3', label: '荷叶新村c区'}]
    const copyList=[
        {path:"荷叶新村A区",transport:"10车",backhoe:"1台",labour:"8人",timeOut:"64小时30分钟",other:"锄头1把、手套8双",time:"2023-08-23"},
        {path:"荷叶新村b区",transport:"8车",backhoe:"1台",labour:"6人",timeOut:"48小时30分钟",other:"锄头1把、手套8双",time:"2023-08-24"},
        {path:"荷叶新村c区",transport:"9车",backhoe:"1台",labour:"10人",timeOut:"80小时",other:"锄头1把",time:"2023-08-25"},

    ]

    const columns = [
        {
            title: '地址',
            dataIndex: 'path',
            width:'20%',
            render:(text)=><div style={{color:"#5D70EA",cursor:"pointer"}}> {text}</div>
        },
        {
            title: '运输',
            dataIndex: 'transport',
            width:'10%',
        },
        {
            title: '挖机',
            dataIndex: 'backhoe',
            width:'10%',
        },
        {
            title: '人工',
            dataIndex: 'labour',
            width:'10%',
        },
        {
            title: '总耗时',
            dataIndex: 'timeOut',
            width:'15%',
        },
        {
            title: '其他消耗',
            dataIndex: 'other',
            width:'15%',
        },
        {
            title: '时间',
            dataIndex: 'time',
            width:'10%',
        },
        {
            title: '操作',
            key: 'activity',
            width:'10%',
            render: (text, record) => (
                <Space size="useState" style={{color:"#5D70EA",cursor:"pointer"}}>
                    <div>修改</div>
                    <div style={{paddingLeft:5}}>删除</div>
                </Space>
            )
        },
    ];


    //table row 选中切换
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {


        }
    };
    return(
        <div className='xpack-setting-width copy'>
            <div className='copy-exe-table' style={{paddingTop:"10px"}}>
                <div className='copy-title' >复制</div>
                <div className='copy-button' style={{display:"flex"}}>
                    <Button type="primary" htmlType="submit">
                        添加
                    </Button>
                    <div style={{paddingLeft:10}}>
                        <Button  htmlType="submit">
                            导出
                        </Button>
                    </div>
                </div>
            </div>

            <div style={{paddingTop:15,display:"flex"}}>
                <Select    style={{width: 200}} defaultValue={"1"}   options={options} placeholder='地址' className='input-style'/>

            </div>

            <div className='copy-table'>
                <Table
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,

                    }}
                    dataSource={copyList}
                    columns={columns}
                    pagination={false}
                />
            </div>
        </div>
    )
}
export default ManageList
