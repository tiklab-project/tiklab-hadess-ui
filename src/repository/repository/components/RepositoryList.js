/**
 * @name: RepositoryList
 * @author: limingliang
 * @date: 2022-12-27 10:30
 * @description：制品库列表
 * @update: 2022-12-27 10:30
 */
import React, {useState, useEffect} from "react";
import './Repository.scss'
import {Space, Table, Dropdown, Menu} from "antd";
import RepositoryAdd from "./RepositoryAdd";
import repositoryService from "../api/RepositoryApi";
import GuideType from "../../guide/components/GuideType";
import GuideDetails from "../../guide/components/GuideDetail";
import Profile from "tiklab-eam-ui/es/profile";
const RepositoryList = (props) => {
    //制品库类型
    const [repositoryType,setRepositoryType]=useState('local')
    //制品库列表
    const [repositoryList,setRepositoryList]=useState([])
    //选择的制品库数据
    const [repository,setRepository]=useState(null)

    //创建制品库弹窗
    const [visible,setVisible]=useState(false)
    //创建制品库选择创建类型
    const [createType,setCreateType]=useState()

    //操作指引弹窗状态
    const [drawerVisible,setDrawerVisible]=useState(false)
    //单个制品库操作指引弹窗状态
    const [detailsDrawerVisible,setDetailsDrawerVisible]=useState(false)
    //操作指引抽屉-制品库列表
    const [typeRepositoryList,setTypeRepositoryList]=useState([])

    const columns = [
        {
            title: '制品库名称',
            dataIndex: 'name',
            width:'15%',
            render:(text,record)=>(
                <div className='space-x-1 flex'>
                    <Profile/>
                    <div className='text-blue-500 cursor-pointer ' onClick={()=>goRepositoryDetails(record)}>
                        {text}
                    </div>
                </div>
                )

        },
        {
            title: '类型',
            dataIndex: 'type',
            width:'5%',
        },
      /*  {
            title: '地址',
            dataIndex: 'repositoryUrl',
            width:'15%',

        },*/
        {
            title: '制品数量',
            dataIndex: 'libraryNum',
            width:'10%',

        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            width:'10%',
        },
        {
            title: '操作',
            key: 'activity',
            width:'10%',
            render: (text, record) => (
                <Space size="useState" className='space-x-4 text-blue-500 cursor-pointer'>
                    <div onClick={()=>openDetailsDrawer(record)} >操作指引</div>
                    <div onClick={()=>goDeploy(record)}>设置</div>
                </Space>
            )
        },
    ];

    useEffect(async () => {
        await findRepository(repositoryType)
    }, []);

    /**
     * 通过制品库类型查询
     * @param  repositoryType 制品库类型 （local、remote、group）
     */
    const findRepository =async (repositoryType) => {
      const param={
          repositoryType:repositoryType
      }
        const res =  await repositoryService.findRepositoryList(param)
        if (res.code===0){
            setRepositoryList(res.data)
        }
    }
    /**
     * 打开指引-条件查询制品库
     * @param  type 制品库类型 maven、npm
     * @param  value 当前制品库
     */
    const findRepositoryList =async (type,value) => {
      const param={
          type:type
      }
     const res = await repositoryService.findRepositoryList(param)
        if (res.code===0){
            setTypeRepositoryList(res.data)
            if (value){
                setRepository(value)
            }else {
                setRepository(res.data[0])
            }
        }
    }

    /**
     * 跳转制品库详情
     * @param  value 当前制品库
     */
    const goRepositoryDetails =async (value) => {
        props.history.push(`/index/repository/${value.id}/libraryList`)
    }

    /**
     * 切换制品库类型
     * @param  value （local、remote、group）
     */
    const cuteType =async (value) => {
        setRepositoryType(value)
        await findRepository(value)
    }

    /**
     * 打开创建制品库弹窗
     * @param  value （local、remote、group）
     */
    const openVisible = (value) => {
        setCreateType(value)
      setVisible(true)
    }
    /**
     * 关闭创建制品库弹窗
     * @param  value （local、remote、group）
     */
    const onCancel =async () => {
        setVisible(false)
        await findRepository(repositoryType)
    }


    /**
     * 打开操作指引抽屉
     */
    const openDrawer = () => {
      setDrawerVisible(true)
    }
    /**
     * 关闭操作指引抽屉
     */
    const onClose = () => {
        setDrawerVisible(false);
    };
    /**
     * 工具类型跳转指引详情
     * @param type  制品库类型
     */
    const goDetails =async (type) => {
        await findRepositoryList(type)
        onClose()
        setDetailsDrawerVisible(true)
    }


    /**
     * 打开单个制品库操作指引抽屉
     * @param value  制品库
     */
    const openDetailsDrawer = async (value) => {
       await findRepositoryList(value.type,value)
        setDetailsDrawerVisible(true)
    }
    /**
     * 关闭单个制品库操作指引抽屉
     */
    const closeDetailsDrawer = () => {
        setDetailsDrawerVisible(false);
    };

    /**
     * 跳转配置界面
     */
    const goDeploy =async (value) => {
        props.history.push(`/index/repository/${value.id}/setting/repositoryInfo`)
    }
    /**
     * 制品库
     */
    const SystemTypes=() => (
        <Menu>
            <Menu.Item onClick={()=>openVisible('local')}>
               本地库Local
            </Menu.Item>
            <Menu.Item onClick={()=>openVisible('remote')}>
                远程库Remote
            </Menu.Item>
            <Menu.Item onClick={()=>openVisible('group')}>
                组合库Group
            </Menu.Item>
        </Menu>
    );
    return(
        <div className='repository '>
            <div className=' max-w-screen-xl mx-auto'>
                <div className='flex justify-between'>
                    <div className='title'>制品库</div>
                    <div className='flex space-x-2'>
                        <div className='px-2 py-1 border rounded-md cursor-pointer' onClick={openDrawer}>操作指引</div>
                      {/*  <div className='px-2 py-1 border rounded-md bg-blue-500 text-white cursor-pointer' onClick={openVisible}>
                            +制品库
                        </div>*/}
                        <Dropdown overlay={()=>SystemTypes()}  >
                            <div className='px-2 py-1 border rounded-md bg-blue-500 text-white cursor-pointer' >
                                +制品库
                            </div>
                        </Dropdown>
                    </div>
                </div>

                <div className='flex space-x-8  '>
                   <div className={`${repositoryType==='local'&& ' choose_type '}  repository_tab`} onClick={()=>cuteType("local")}>本地库</div>
                   <div className={`${repositoryType==='remote'&& ' choose_type '}  repository_tab`} onClick={()=>cuteType("remote")}>远程库</div>
                   <div className={`${repositoryType==='group'&& ' choose_type '}  repository_tab`} onClick={()=>cuteType("group")}>组合库</div>
                </div>
                <div className='mt-6'>
                    <Table
                        dataSource={repositoryList}
                        columns={columns}
                        pagination={false}
                    />
                </div>
            </div>
            <RepositoryAdd visible={visible} onCancel={onCancel} createType={createType}/>
            <GuideType onClose={onClose} visible={drawerVisible} goDetails={goDetails}/>
            <GuideDetails onClose={closeDetailsDrawer} visible={detailsDrawerVisible} repository={repository} repositoryList={typeRepositoryList}/>
        </div>
    )
}
export default RepositoryList
