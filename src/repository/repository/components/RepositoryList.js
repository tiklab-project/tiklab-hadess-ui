/**
 * @name: RepositoryList
 * @author: limingliang
 * @date: 2022-12-27 10:30
 * @description：制品库列表
 * @update: 2022-12-27 10:30
 */
import React, {useState, useEffect} from "react";
import './RepositoryList.scss'
import {Table, Dropdown, Menu, Tooltip, Col, Input} from "antd";
import ListIcon from "../../../common/repositoryIcon/Listicon";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
import {SearchOutlined, SettingOutlined} from "@ant-design/icons";
import Breadcrumb from "../../../common/breadcrumb/Breadcrumb";
import GuideDrawer from "../../guide/components/GuideDrawer";
import Page from "../../../common/page/Page";
import {PrivilegeButton} from 'thoughtware-privilege-ui';
import Btn from "../../../common/btn/Btn";
import EmptyText from "../../../common/emptyText/EmptyText";
import {SpinLoading} from "../../../common/loading/Loading";
const RepositoryList = (props) => {
    const {repositoryStore}=props
    const {findRepositoryPage,addRepositoryType,setRepositoryTypeNull}=repositoryStore
    //制品库类型
    const [repositoryType,setRepositoryType]=useState('all')

    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()
    const [pageSize]=useState(10)
    const [totalRecord,setTotalRecord]=useState()

    const [repositoryList,setRepositoryList]=useState([])


    //操作指引弹窗状态
    const [drawerVisible,setDrawerVisible]=useState(false)

    const [repositoryName,setRepositoryName]=useState()
    const [isLoading,setIsLoading]=useState(false)


    const columns = [
        {
            title: '制品库名称',
            dataIndex: 'name',
            width:'30%',
            ellipsis:true,
            render:(text,record)=>{
                return <span className='repository-name' onClick={()=>goRepositoryDetails(record)}>
                            <ListIcon text={record?.name} colors={record.color}/>
                            <span>{text}</span>
                            {
                                record.category===1&&
                                <span className='name-text-type'>{ "示例仓库"}</span>
                            }
                        </span>
            }
        },
        {
            title: '类型',
            dataIndex: 'type',
            ellipsis:true,
            width:'10%',
        },
        {
            title: '制品数量',
            dataIndex: 'libraryNum',
            ellipsis:true,
            width:'10%',

        },
          {
            title: '地址',
            dataIndex: 'repositoryUrl',
            ellipsis:true,
            width:'30%',
            render:(text,record)=>{
                return filedState(record?.repositoryUrl)
            }
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            ellipsis:true,
            width:'15%',
        },
        {
            title: '操作',
            key: 'activity',
            ellipsis:true,
            width:'5%',
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
      if (addRepositoryType){
          setRepositoryType(addRepositoryType)
          getRepositoryPage(1,addRepositoryType,repositoryName)
      }else {
          setCurrentPage(1)
          setRepositoryType(repositoryType)
          getRepositoryPage(1,repositoryType,repositoryName)
      }

    }, [repositoryType]);


    //分页查询租户
    const getRepositoryPage = (currentPage,repositoryType,name) => {
        setIsLoading(true)
        findRepositoryPage({ repositoryType:repositoryType,
                            name:name,
                            findType:"like",
                            pageParam:{currentPage:currentPage, pageSize:pageSize}}).then(res=>{
            setIsLoading(false)
            if (res.code===0){
                setRepositoryList(res.data.dataList)

                setCurrentPage(res.data.currentPage)
                setTotalPage(res.data.totalPage)
                setTotalRecord(res.data.totalRecord)
            }
        })
    }

    /**
     * 跳转制品库详情
     * @param  value 当前制品库
     */
    const goRepositoryDetails =async (value) => {
        props.history.push(`/repository/${value.id}/libraryList`)
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
        props.history.push(`/repository/add/${type}`)
    }

    /**
     * 跳转配置界面
     */
    const goDeploy =async (value) => {
        props.history.push(`/repository/${value.id}/setting/repositoryInfo`)
    }

    //添加仓库名字
    const onInputName = (e) => {
        const value=e.target.value
        setRepositoryName(value)
        if (value===''){
            getRepositoryPage(1,repositoryType)
        }
    }
    //条件查询
    const onSearch = () => {
        getRepositoryPage(1,repositoryType,repositoryName)
    }

    //分页查询
    const changPage = (value) => {
        setCurrentPage(value)
        getRepositoryPage(value,repositoryType,repositoryName)
    }

    //刷新查询
    const refreshFind = () => {
        getRepositoryPage(currentPage,repositoryType,repositoryName)
    }
    /**
     * 字段过长省略
     * @param text
     */
    const filedState = (value) => {
        return(
            value?.length>10?
                <Tooltip placement="rightBottom" title={value}>
                    <div style={{

                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                    }}>{value}</div>
                </Tooltip>
                :
                <div>{value}</div>
        )
    }

    /**
     * 制品库
     */
    const SystemTypes=() => (
        <Menu>
            <Menu.Item onClick={()=>goRepositoryAdd('local')}>
               新建本地库
            </Menu.Item>
            <Menu.Item onClick={()=>goRepositoryAdd('remote')}>
                新建远程库
            </Menu.Item>
            <Menu.Item onClick={()=>goRepositoryAdd('group')}>
                新建组合库
            </Menu.Item>
        </Menu>
    );
    return(
        <div className='repository'>
            <Col sm={24} md={24} lg={{ span: 24 }} xl={{ span: "20", offset: "2" }} xxl={{ span: "18", offset: "3" }}>
                <div className='repository-head-style'>
                    <Breadcrumb firstItem={'制品库'}/>
                    <div className='repository-flex'>
                        <PrivilegeButton  code={"hadess_operate_guide"} key={'hadess_operate_guide'} >
                            <div className='guide-button'  onClick={()=>setDrawerVisible(true)} >
                                操作指引
                            </div>
                        </PrivilegeButton>
                        <PrivilegeButton  code={"hadess_rpy_add"} key={'hadess_rpy_add'} >
                            <Dropdown overlay={()=>SystemTypes()} >
                                <div className='add-button' >
                                    新建制品库
                                </div>
                            </Dropdown>
                         </PrivilegeButton>
                    </div>
                </div>

                <div className='repository-filter'>
                    <div className='repository-flex '>
                        <div className={`${repositoryType==='all'&& ' choose-type '}  repository_tab`} onClick={()=>cuteType("all")}>所有库</div>
                        <div className={`${repositoryType==='local'&& ' choose-type '}  repository_tab`} onClick={()=>cuteType("local")}>本地库</div>
                        <div className={`${repositoryType==='remote'&& ' choose-type '}  repository_tab`} onClick={()=>cuteType("remote")}>远程库</div>
                        <div className={`${repositoryType==='group'&& ' choose-type '}  repository_tab`} onClick={()=>cuteType("group")}>组合库</div>
                    </div>
                    <div>
                        <Input allowClear  placeholder={'搜索制品库名称'} value={repositoryName}  onChange={onInputName}
                               onPressEnter={onSearch}    size='middle' style={{ width: 200 }}
                               prefix={<SearchOutlined className='input-icon'/>} className='library-border '/>
                    </div>
                </div>

                <div className='repository-table '>
                    <Table
                        dataSource={repositoryList}
                        columns={columns}
                        pagination={false}
                        locale={{emptyText: isLoading ?
                                <SpinLoading type="table"/>: <EmptyText title={"暂无仓库数据"}/>}}
                    />
                    <Page pageCurrent={currentPage}
                          changPage={changPage}
                          totalPage={totalPage}
                          totalRecord={totalRecord}
                          refresh={refreshFind}
                    />
                </div>
            </Col>
            <GuideDrawer setDrawerVisible={setDrawerVisible} visible={drawerVisible} />
        </div>
    )
}
export default withRouter(inject('repositoryStore')(observer(RepositoryList)))
