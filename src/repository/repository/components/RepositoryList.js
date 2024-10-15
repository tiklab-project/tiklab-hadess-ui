/**
 * @name: RepositoryList
 * @author: limingliang
 * @date: 2022-12-27 10:30
 * @description：制品库列表
 * @update: 2022-12-27 10:30
 */
import React, {useState, useEffect} from "react";
import './RepositoryList.scss'
import {Table, Dropdown, Menu, Tooltip, Col, Select} from "antd";
const { Option } = Select;
import ListIcon from "../../../common/repositoryIcon/Listicon";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
import {SearchOutlined, SettingOutlined} from "@ant-design/icons";
import Breadcrumb from "../../../common/breadcrumb/Breadcrumb";
import GuideDrawer from "../../guide/components/GuideDrawer";
import Page from "../../../common/page/Page";
import EmptyText from "../../../common/emptyText/EmptyText";
import {SpinLoading} from "../../../common/loading/Loading";
import SearchInput from "../../../common/input/SearchInput";
import LibraryDropdown from "../../../common/downSelect/LibraryDropdown";
import BasicsDown from "../../../common/downSelect/BasicsDown";
const categoryList=[
    {value: 'local', label: '本地库'},
    {value: 'remote', label: '远程库'},
    {value: 'group', label: '组合库'}
]
const RepositoryList = (props) => {
    const {repositoryStore,publicState}=props
    const {findRepositoryPage,addRepositoryType,setRepositoryTypeNull}=repositoryStore

    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()
    const [pageSize]=useState(10)
    const [totalRecord,setTotalRecord]=useState()

    const [repositoryList,setRepositoryList]=useState([])


    //操作指引弹窗状态
    const [drawerVisible,setDrawerVisible]=useState(false)

    const [repositoryName,setRepositoryName]=useState()
    const [isLoading,setIsLoading]=useState(false)

    const [columns,setColumns]=useState([])


    const [type,setType]=useState()
    //仓库类型下拉打开状态
    const [typeVisible,setTypeVisible]=useState(false)

    //制品库类别
    const [category,setCategory]=useState()
    const [categoryLabel,setCategoryLabel]=useState()
    //仓库种类下拉打开状态
    const [categoryVisible,setCategoryVisible]=useState(false)

    const baseColumns = [
        {
            title: '制品库名称',
            dataIndex: 'name',
            width:'25%',
            ellipsis:true,
            render:(text,record)=>{
                return <span className='repository-name' onClick={()=>goRepositoryDetails(record)}>
                            <ListIcon text={record?.name}
                                      colors={record.color}
                                      type={"common"}
                            />
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
            render:(text,record)=>  <div className='repository-tables-nav'>{text}</div>
        },
        {
            title: '种类',
            dataIndex: 'repositoryType',
            ellipsis:true,
            width:'10%',
            render:(text,record)=>  <div>
                {
                    text==='remote'&&'远程库'||
                    text==='local'&&'本地库'||
                    text==='group'&&'组合库'
                }
            </div>
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
            width:'25%',
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

    ];

    useEffect(async () => {
        if (!publicState){
          baseColumns.push( {
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
            },)
        }
        setColumns(baseColumns)
    }, [publicState]);

    useEffect(async () => {
      if (addRepositoryType){
          setCategory(addRepositoryType)
          getRepositoryPage(1,addRepositoryType,type,repositoryName)
      }else {
          setCurrentPage(1)
          setCategory(category)
          getRepositoryPage(1,category,type,repositoryName)
      }

    }, [category,type]);



    //分页查询仓库
    const getRepositoryPage = (currentPage,category,type,name) => {
        setIsLoading(true)
        findRepositoryPage({ repositoryType:category,
                            name:name,
                            findType:"like",
                            type:type,
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
        props.history.push(`/repository/${value.id}/library`)
    }

    /**
     * 切换制品库类型
     * @param  value （local、remote、group）
     */
    const cuteType =async (value) => {
        setRepositoryTypeNull()
        setCategory(value)
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
        props.history.push(`/repository/${value.id}/setting/info`)
    }

    //添加仓库名字
    const onInputName = (e) => {
        const value=e.target.value
        setRepositoryName(value)
        if (value===''){
            getRepositoryPage(1,category,type)
        }
    }
    //条件查询
    const onSearch = () => {
        getRepositoryPage(1,category,type,repositoryName)
    }

    //分页查询
    const changPage = (value) => {
        setCurrentPage(value)
        getRepositoryPage(value,category,type,repositoryName)
    }

    //刷新查询
    const refreshFind = () => {
        getRepositoryPage(currentPage,category,type,repositoryName)
    }

    //切换仓库版本
    const cuteRpyCategory = (data) => {
        if (data){
            setCategory(data.value)
            setCategoryLabel(data.label)
        }else {
            setCategory()
            setCategoryLabel()
        }
    }
    //切换仓库类型
    const cuteRpyType = (value) => {
        setType(value)
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
        <div className='drop-down repository hadess-data-width'>
            <Col sm={24} md={24} lg={{ span: 24 }} xl={{ span: "20", offset: "2" }} xxl={{ span: "18", offset: "3" }}>
                <div className='repository-head-style'>
                    <Breadcrumb firstItem={'制品库'}/>
                    {
                       !publicState&&
                        <div className='repository-flex'>
                            <div className='guide-button'  onClick={()=>setDrawerVisible(true)} >
                                操作指引
                            </div>
                            <Dropdown overlay={()=>SystemTypes()} >
                                <div className='add-button' >
                                    新建制品库
                                </div>
                            </Dropdown>
                        </div>
                    }
                </div>

                <div className='repository-filter'>
                    <div>
                        <SearchInput
                            placeholder={'搜索制品库名称'}
                            onChange={onInputName}
                            onPressEnter={onSearch}
                        />
                    </div>
                    <LibraryDropdown
                        visible={typeVisible}
                        setVisible={setTypeVisible}
                        libraryType={type}
                        cuteLibraryType={cuteRpyType}
                        type={"repository"}
                    />
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
