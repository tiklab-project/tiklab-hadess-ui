/**
 * @name: RepositoryList
 * @author: limingliang
 * @date: 2022-12-27 10:30
 * @description：制品库列表
 * @update: 2022-12-27 10:30
 */
import React, {useState, useEffect} from "react";
import './Repository.scss'
import {Space, Table, Tag, Dropdown, Menu, Image} from "antd";
import RepositoryAdd from "./RepositoryAdd";
import repositoryService from "../api/RepositoryApi";
import GuideType from "../../guide/components/GuideType";
import GuideDetails from "../../guide/components/GuideDetail";
import Profile from "tiklab-eam-ui/es/profile";
const RepositoryList = (props) => {
    const [repositoryType,setRepositoryType]=useState('local')
    const [repositoryList,setRepositoryList]=useState([])  //制品库list
    const [repository,setRepository]=useState(null)
    const [typeRepositoryList,setTypeRepositoryList]=useState([])   //指引详情抽屉的制品库list

    const [visible,setVisible]=useState(false)   //创建弹窗状态
    const [createType,setCreateType]=useState()   //创建选择的类型
    const [drawerVisible,setDrawerVisible]=useState(false)   //类型选择抽屉状态
    const [detailsDrawerVisible,setDetailsDrawerVisible]=useState(false)   //指引详情抽屉状态
    const [currentPage,setCurrentPage]=useState(1) //当前页
    const [pageSize]=useState(10)
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

    //分页查询制品库
    const findRepository =async (repositoryType) => {
      const param={
          repositoryType:repositoryType
      }
        const res =  await repositoryService.findRepositoryList(param)
        if (res.code===0){
            setRepositoryList(res.data)
        }
    }
    //条件查询制品库
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

    //跳转制品库详情
    const goRepositoryDetails =async (value) => {
        props.history.push(`/index/repository/${value.id}/libraryList`)
    }

    //切换类型
    const cuteType =async (value) => {
        setRepositoryType(value)
        await findRepository(value)
    }

    const onCancel =async () => {
      setVisible(false)
       await findRepository(repositoryType)
    }
    const openVisible = (value) => {
        setCreateType(value)
      setVisible(true)
    }


    //打开选择抽屉
    const openDrawer = () => {
      setDrawerVisible(true)
    }
    //关闭选择抽屉
    const onClose = () => {
        setDrawerVisible(false);
    };
    //跳转指引详情
    const goDetails =async (type) => {
        await findRepositoryList(type)
        onClose()
        setDetailsDrawerVisible(true)
    }


    //打开指引详情抽屉
    const openDetailsDrawer = async (value) => {
       await findRepositoryList(value.type,value)
        setDetailsDrawerVisible(true)
    }
    //关闭指引详情抽屉
    const closeDetailsDrawer = () => {
        setDetailsDrawerVisible(false);
    };

    //跳转配置
    const goDeploy =async (value) => {
        props.history.push(`/index/repository/${value.id}/setting/repositoryInfo`)
    }

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
