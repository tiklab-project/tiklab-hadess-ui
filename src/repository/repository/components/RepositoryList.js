/**
 * @name: RepositoryList
 * @author: limingliang
 * @date: 2022-12-27 10:30
 * @description：制品库列表
 * @update: 2022-12-27 10:30
 */
import React, {useState, useEffect} from "react";
import './RepositoryList.scss'
import { Table, Dropdown, Menu, Tooltip} from "antd";
import ListIcon from "../../../common/repositoryIcon/Listicon";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
import {SettingOutlined} from "@ant-design/icons";
import Breadcrumb from "../../../common/breadcrumb/Breadcrumb";
import GuideDrawer from "../../guide/components/GuideDrawer";
const RepositoryList = (props) => {
    const {repositoryStore}=props
    const {findRepositoryList,addRepositoryType,setRepositoryTypeNull}=repositoryStore
    //制品库类型
    const [repositoryType,setRepositoryType]=useState('local')

    const [repositoryList,setRepositoryList]=useState([])
    //操作指引弹窗状态
    const [drawerVisible,setDrawerVisible]=useState(false)



    const columns = [
        {
            title: '制品库名称',
            dataIndex: 'name',
            width:'30%',
            render:(text,record)=>(
                <div className='repository-flex'>
                    <ListIcon text={record?.name}/>
                    <div className='repository-name text-color' onClick={()=>goRepositoryDetails(record)}>
                        {text}
                        {
                            record.category===1&&
                            <div>
                                <span className='name-text-type'>{ "示例仓库"}</span>
                            </div>

                        }

                    </div>
                </div>
                )

        },
        {
            title: '类型',
            dataIndex: 'type',
            width:'10%',
        },
        {
            title: '制品数量',
            dataIndex: 'libraryNum',
            width:'10%',

        },
          {
            title: '地址',
            dataIndex: 'repositoryUrl',
            width:'25%',
              render: (text, record) => (
                  <>
                      {
                          filedState(record)
                      }
                  </>)
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
                <Tooltip title='设置'>
                    <span className='repository-tables-set' onClick={()=>goDeploy(record)}>
                        <SettingOutlined className='actions-se'/>
                    </span>
                </Tooltip>

            )
        },
    ];

    useEffect(async () => {
        let res;
      if (addRepositoryType){
          setRepositoryType(addRepositoryType)
          res=await findRepositoryList(addRepositoryType)
      }else {
          res=  await  findRepositoryList(repositoryType)
      }
        setRepositoryList(res.data)

    }, [repositoryType]);


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
        setRepositoryTypeNull()
        setRepositoryType(value)
    }


    /**
     * 跳转添加制品库
     * @param  type （local、remote、group）
     */
    const goRepositoryAdd=async (type)=>{
        props.history.push(`/index/repository/add/${type}`)
    }

    /**
     * 跳转配置界面
     */
    const goDeploy =async (value) => {
        props.history.push(`/index/repository/${value.id}/setting/repositoryInfo`)
    }

    /**
     * 字段过长省略
     * @param text
     */
    const filedState = (record) => {
        return(
            record?.repositoryUrl?.length>30?
                <Tooltip placement="right" title={record.repositoryUrl}>
                    <div style={{
                        width: 200,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                    }}>{record.repositoryUrl}</div>
                </Tooltip>
                :
                <div>{record.repositoryUrl}</div>
        )
    }

    /**
     * 制品库
     */
    const SystemTypes=() => (
        <Menu>
            <Menu.Item onClick={()=>goRepositoryAdd('local')}>
               本地库Local
            </Menu.Item>
            <Menu.Item onClick={()=>goRepositoryAdd('remote')}>
                远程库Remote
            </Menu.Item>
            <Menu.Item onClick={()=>goRepositoryAdd('group')}>
                组合库Group
            </Menu.Item>
        </Menu>
    );
    return(
        <div className='repository'>
            <div className='repository-width'>
                <div className='repository-head-style'>
                    <Breadcrumb firstItem={'制品库'}/>
                    <div className='repository-flex'>

                        <div className='guide-button'  onClick={()=>setDrawerVisible(true)} >
                            操作指引
                        </div>
                        <Dropdown overlay={()=>SystemTypes()} >
                            <div className='add-button' >
                                +新建制品库
                            </div>
                        </Dropdown>
                    </div>
                </div>

                <div className='repository-flex '>
                   <div className={`${repositoryType==='local'&& ' choose-type '}  repository_tab`} onClick={()=>cuteType("local")}>本地库</div>
                   <div className={`${repositoryType==='remote'&& ' choose-type '}  repository_tab`} onClick={()=>cuteType("remote")}>远程库</div>
                   <div className={`${repositoryType==='group'&& ' choose-type '}  repository_tab`} onClick={()=>cuteType("group")}>组合库</div>
                </div>
                <div className='repository-table '>
                    <Table
                        dataSource={repositoryList}
                        columns={columns}
                        pagination={false}
                    />
                </div>
            </div>
            <GuideDrawer setDrawerVisible={setDrawerVisible} visible={drawerVisible} />

        </div>
    )
}
export default withRouter(inject('repositoryStore')(observer(RepositoryList)))
