/**
 * @name: PlugDetails
 * @author: limingliang
 * @date: 2022-10-20 14:48
 * @description：插件详情
 * @update: 2022-10-20 14:48
 */

import React, {useState, useEffect} from "react";
import plugService from "../../service/plug.service";
import {Breadcrumb, Row, Col, Button, Table, Form, Modal, Space, Descriptions} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";
const { confirm } = Modal;
import './plug.scss'
const Details = (props) => {
    const {match:{params}} = props;
    const [plugData,setPlugData]=useState('')
    const [plugVersionData,setPlugVersionData]=useState([])
    const columns = [
        {
            title: '名字',
            dataIndex: 'plugIn',
        },
        {
            title: '版本号',
            dataIndex:'version',
        },
        {
            title: '大小',
            dataIndex:  'plugSize',
        },
        {
            title: '描述',
            dataIndex: 'des',
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={()=> deletePop(record)}>删除</a>
                </Space>
            ),
        },

    ];
    useEffect(async ()=>{
        await findPlug(params)

    },[])

    //通过id查询插件
    const findPlug=async (params)=>{
        const param = new FormData()
        param.append("id",params.plugId)
        const res=await plugService.findArtifact(param)
        if (res.code===0){
            setPlugData(res.data)
        }
        await findPlugVersion(params.plugId)
    }
    //通过插件id查询插件版本
    const findPlugVersion=async (plugId)=>{
        const param={
            artifactId:plugId
        }
        const res= await plugService.findArtifactVersionList(param);
        if (res.code===0){
            setPlugVersionData(res.data)
        }
    }

    //删除弹窗
    const deletePop=async (data)=>{
        confirm({
            title: '确认删除该版本',
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                deletePlugVersion(data)
            },
            onCancel() {
            },
        });
    }
    //删除插件版本
    const deletePlugVersion =async (data)=>{
        const param=new FormData();
        param.append('id',data.id)
        const res=await plugService.deleteArtifactVersion(param)
        if (res.code===0){
            setPlugVersionData( plugVersionData.filter(item=>item.id!==data.id))
        }
    }

    const goCompileVersion = (plugData) => {
        props.history.push(`/index/plug/compileVersion/${plugData.id}`);
    }

    return(
        <div className=' w-full mt-4 max-w-full max-w-screen-xl  m-auto plug'>
            <div className='col-md-9 '>
                <Breadcrumb separator="/" className=' plug-title'>
                    <Breadcrumb.Item href='#/index/plugList'>插件列表</Breadcrumb.Item>
                    <Breadcrumb.Item href=""> 插件详情</Breadcrumb.Item>
                </Breadcrumb>
                <div className='plug-data'>
                    <div className='text-sm font-medium'>插件信息</div>
                    <Descriptions  className='pt-2'>
                        <Descriptions.Item label="插件名称">{plugData.name}</Descriptions.Item>
                        <Descriptions.Item label="插件类型">{plugData.type}</Descriptions.Item>
                        <Descriptions.Item  label="创建时间"> {plugData.createTime}</Descriptions.Item>
                        <Descriptions.Item label="插件描述">  {plugData.des}</Descriptions.Item>
                    </Descriptions>
                </div>

                <div className='plug-data'>
                    <Row gutter={[16, 16]} >
                        <Col span={6}>
                            <h4 className='text-sm  font-medium'>插件版本</h4>
                        </Col>
                        <Col span={10} offset={8} className='flex justify-end'>
                            <Button type="primary" onClick={()=>goCompileVersion(plugData)} >添加版本</Button>
                        </Col>
                    </Row>
                    <Table
                        dataSource={plugVersionData}
                        columns={columns}
                        rowKey={record => record.id}
                        pagination={false}
                    />
                </div>
            </div>
        </div>
    )
}
export default Details