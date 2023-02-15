/**
 * @name: RepositoryCompile
 * @author: limingliang
 * @date: 2022-12-29 10:30
 * @description：复制信息
 * @update: 2022-12-29 10:30
 */
import React, {useState, useEffect} from "react";
import Deploy from "../../../common/components/deployTable";
import "./copy.scss"
import {Button, Modal, Space, Table} from "antd";
import copyService from "../../../service/copy.service";
import CopyCompile from "./copyCompile";
import {ExclamationCircleOutlined} from "@ant-design/icons";
const { confirm } = Modal;
const Copy = (props) => {
    const {match:{params}} = props;
    const [copyList,setCopyList]=useState([])
    const [copy,setCopy]=useState(null)    //复制信息
    const [visible,setVisible]=useState(false)   //编辑弹窗状态
    const [compileType,setCompileType]=useState(null)

    const columns = [
        {
            title: '来源',
            dataIndex: 'source',
            width:'20%',
            render:(text,record)=><div className=''> {text}</div>
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

    //查询复制信息list
    const findCopyList =async () => {
      const param={
          repositoryId:params.id
      }
      const res=await copyService.findRepositoryClusterCfgList(param)
        if (res.code===0){
            setCopyList(res.data)
        }
    }

    //删除制品库弹窗
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

    const deleteCopy =async (id) => {
        const param=new FormData()
        param.append('id',id)
       const res = await copyService.deleteRepositoryClusterCfg(param)
        if (res.code===0){
            await  findCopyList()
        }
    }
    //关闭复制弹窗
    const onCancel = async () => {
        await findCopyList()
        setVisible(false)
    }
    const openCopyCompile =async () => {
        setVisible(true)
        setCompileType("add")
    }
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

                <Deploy type={"copy"} repositoryId={params.id} {...props} />
                <div className='mt-6'>
                    <Table
                        dataSource={copyList}
                        columns={columns}
                        pagination={false}
                    />
                </div>
                <CopyCompile visible={visible} onCancel={onCancel} repositoryId={params.id} copy={copy} compileType={compileType}/>
            </div>
        </div>
    )
}
export default Copy