/**
 * @name: Copy
 * @author: limingliang
 * @date: 2022-12-29 10:30
 * @description：复制信息
 * @update: 2022-12-29 10:30
 */
import React, {useState, useEffect} from "react";
import "./Copy.scss"
import {Button, Modal, Space, Table} from "antd";
import copyService from "../api/CopyApi";
import CopyAddEdit from "./CopyAddEdit";
import {ExclamationCircleOutlined} from "@ant-design/icons";
const { confirm } = Modal;
const Copy = (props) => {
    const {match:{params}} = props;
    //复制信息列表
    const [copyList,setCopyList]=useState([])
    //复制的信息
    const [copy,setCopy]=useState(null)
    //复制编辑弹窗状态
    const [visible,setVisible]=useState(false)
    //编辑类型 add、update
    const [compileType,setCompileType]=useState(null)

    const columns = [
        {
            title: '来源',
            dataIndex: 'source',
            width:'20%',
            render:(text)=><div className=''> {text}</div>
        },
        {
            title: '地址',
            dataIndex: 'url',
            width:'50%',
        },
        {
            title: '操作',
            key: 'activity',
            width:'10%',
            render: (text, record) => (
                <Space size="useState" className='space-x-4 text-blue-500 cursor-pointer'>
                    <div onClick={()=>updateAgency(record)}>配置</div>
                    <div onClick={()=>openDeletePop(record)}>删除</div>
                </Space>
            )
        },
    ];

    useEffect(async () => {
        await findCopyList()
    }, []);

    /**
     * 查询复制信息列表
     */
    const findCopyList =async () => {
      const param={
          repositoryId:params.id
      }
      const res=await copyService.findRepositoryClusterCfgList(param)
        if (res.code===0){
            setCopyList(res.data)
        }
    }

    /**
     * 删除制品库复制信息弹窗
     */
    const openDeletePop =async (agency) => {
        confirm({
            title: '是否确认删除该复制配置',
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',

            onOk() {
                deleteCopy(agency.id)
            },
            onCancel() {
            },
        });
    }

    /**
     * 删除复制信息
     * @param id 复制id
     */
    const deleteCopy =async (id) => {
        const param=new FormData()
        param.append('id',id)
       const res = await copyService.deleteRepositoryClusterCfg(param)
        if (res.code===0){
            await  findCopyList()
        }
    }
    /**
     * 关闭复制编辑弹窗
     * @param id 复制id
     */
    const onCancel = async () => {
        await findCopyList()
        setVisible(false)
    }
    /**
     * 打开创建复制信息弹窗
     */
    const openCopyCompile =async () => {
        setVisible(true)
        setCompileType("add")
    }
    /**
     * 编辑创建复制信息弹窗
     * @param value 选中的复制信息
     */
    const updateAgency =async (value) => {
        setCopy(value)
        setCompileType('update')
        setVisible(true)
    }
    return(
        <div className='copy'>
            <div className='copy-width'>
                <div className='flex justify-between'>
                    <div className=' copy-title' >配置</div>
                    <div className='mt-3'>
                        <Button type="primary" htmlType="submit" onClick={openCopyCompile}>
                            + 配置复制
                        </Button>
                    </div>
                </div>

               {/* <Deploy type={"copy"} repositoryId={params.id} {...props} />*/}
                <div className='mt-6'>
                    <Table
                        dataSource={copyList}
                        columns={columns}
                        pagination={false}
                    />
                </div>
                <CopyAddEdit visible={visible} onCancel={onCancel} repositoryId={params.id} copy={copy} compileType={compileType}/>
            </div>
        </div>
    )
}
export default Copy
