
/**
 * @name: HoleList
 * @author: limingliang
 * @date: 2023-11-08 14:30
 * @description：漏洞列表
 * @update: 2023-11-08 14:30
 */
import React,{useState,useEffect} from 'react';
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import "./HoleList.scss"
import {Col, Input, Popconfirm, Select, Table, Tooltip} from "antd";
import Page from "../../../common/page/Page";
import {DeleteOutlined, SearchOutlined} from "@ant-design/icons";
import ScanHoleStore from "../store/ScanHoleStore";
import {observer} from "mobx-react";
import ScanHoleDetailsDrawer from "./ScanHoleDetailsDrawer";
import HoleEditPop from "./HoleEditPop";
import DownSelect from "../../../common/downSelect/DownSelect";
import EmptyText from "../../../common/emptyText/EmptyText";
import SearchInput from "../../../common/input/SearchInput";
const leveList=[{key:1,value:"严重漏洞"},{key:2,value:"高危漏洞"},{key:3,value:"中危漏洞"},{key:4,value:"低危漏洞"}]
const languageList=[{key:'java',value:"Java"},{key:"node",value:"Node.js"}]
const HoleList = (props) => {
    const {findScanHolePage,createScanHole,deleteScanHole,fresh}=ScanHoleStore

    const [holeList,setHoleList]=useState()
    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()
    const [pageSize]=useState(15)
    const [totalRecord,setTotalRecord]=useState()

    const [deDrawerVisible,setDeDrawerVisible]=useState(false)  //添加扫描漏洞状态
    const [holeDetails,setHoleDetails]=useState('')

    const [editVisible,setEditVisible]=useState(false)    //编辑漏洞弹窗状态


    const [holeName,setHoleName]=useState(null)  //搜索的漏洞名字

    const [levelList,setLevelList]=useState([])  //选择查询的等级list
    const [levelVisible,setLevelVisible]=useState(false) // 等级搜索的下拉弹窗状态

    const [language,setLanguage]=useState()  //选择查询的语言
    const [languageVisible,setLanguageVisible]=useState(false)  // 语言搜索的下拉弹窗状态

    const [sort,setSort]=useState(null)  //排序


    useEffect(()=>{
        getScanHolePage(currentPage);
    },[fresh])

    const columns = [
        {
            title: '漏洞名称',
            dataIndex: 'holeName',
            key: 'holeName',
            width:'30%',
            ellipsis:true,
            render:(text,record)=><div className='text-color' onClick={()=>openScanHoleDetails(record)}>{text}</div>
        },
        {
            title: '漏洞编号',
            dataIndex: 'holeNumber',
            key: 'holeNumber',
            width:'35%',
            ellipsis:true,
        },
        {
            title: '语言',
            dataIndex: 'language',
            key: 'language',
            width:'10%',
            ellipsis:true,
        },
        {
            title: '产品',
            dataIndex: 'product',
            key: 'product',
            width:'15%',
            ellipsis:true,
        },
        {
            title: '漏洞等级',
            dataIndex: 'holeLevel',
            key: 'holeLevel',
            width:'10%',
            ellipsis:true,
            sorter: (a, b) => a.holeLevel - b.holeLevel,
            render:(text)=>text===1&&<div className='text-red'>严重漏洞</div>||
                text===2&&<div className='text-dired'>高危漏洞</div>||
                text===3&&<div className='text-yellow'>中危漏洞</div>||
                text===4&&<div className='text-blue'>低危漏洞</div>
        },
       /* {
            title:'操作',
            dataIndex: 'action',
            key: 'action',
            width:'10%',
            render:(text,record)=>(
                <Tooltip title={"移除"}>
                    <Popconfirm
                        placement="topRight"
                        title="你确定移除吗"
                            onConfirm={()=>deleteScanHole(record.id)}
                        okText="确定"
                        cancelText="取消"
                    >
                        <span style={{cursor:"pointer"}}>
                            <DeleteOutlined />
                        </span>
                    </Popconfirm>
                </Tooltip>
            )
        }*/
    ]


    //分页查询漏洞
    const getScanHolePage = (currentPage,levelList,language,sort) => {
        findScanHolePage({holeLevelList:levelList,language:language,holeName:holeName,sort:sort,
            pageParam:{currentPage:currentPage, pageSize:pageSize}}).then(res=>{
            if (res.code===0){
                setHoleList(res.data.dataList)
                setTotalPage(res.data.totalPage)
                setTotalRecord(res.data.totalRecord)
            }
        })
    }


    //打开漏洞详情
    const openScanHoleDetails = (value) => {
        setHoleDetails(value)
        setDeDrawerVisible(true)
    }

    //分页查询漏洞
    const changPage = (value) => {
        setCurrentPage(value)
        getScanHolePage(value,levelList,language,sort)
    }
    //刷新查询
    const refreshFind = () => {
        getScanHolePage(currentPage,levelList,language,sort)
    }

    //漏洞等级查询
    const selectLevel = (value) => {
        setCurrentPage(1)
        setLevelList(value)
        getScanHolePage(1,value,language,sort)
    }

    //语言查询
    const selectLanguage = (value) => {
        setCurrentPage(1)
        setLanguage(value)
        getScanHolePage(1,levelList,value,sort)
    }


    //添加漏洞名称
    const onInputHole = (e) => {
        const value=e.target.value
        setHoleName(value)
        if (value===''){
            setCurrentPage(1)
            findScanHolePage({holeLevelList:levelList,language:language,sort:sort,
                pageParam:{currentPage:1, pageSize:pageSize}}).then(res=>{
                if (res.code===0){
                    setHoleList(res.data.dataList)
                    setTotalPage(res.data.totalPage)
                    setTotalRecord(res.data.totalRecord)
                }
            })
        }
    }
    //搜索漏洞
    const onSearchHole = () => {
        setCurrentPage(1)
        getScanHolePage(1,levelList,language)
    }

    //排序
    const onChangeSort = (pagination, filters, sorter, extra) => {

        //降序
        if (sorter.order==='descend'){
            setSort("desc")
            getScanHolePage(currentPage,levelList,language,"desc")
        }
        //升序
        if (sorter.order==='ascend'){
            setSort("asc")
            getScanHolePage(currentPage,levelList,language,"asc")
        }
        if (!sorter.order){
            setSort(null)
            getScanHolePage(currentPage,levelList,language)
        }
    }




    return(
        <div className='hole hadess-data-width'>
            <Col sm={{ span: "24" }}
                 md={{ span: "24" }}
                 lg={{ span: "24" }}
                 xl={{ span: "22", offset: "1" }}
                 xxl={{ span: "18", offset: "3" }}
            >
                <div className='hole-up'>
                    <BreadcrumbContent firstItem={'漏洞列表'} />
                    {/* <Btn
                        type={'primary'}
                        title={'添加漏洞'}
                        onClick={()=> openHoleEdit(true)}
                    />*/}
                </div>
                <div className='hole-search-style'>
                    <SearchInput
                        placeholder={'漏洞名称'}
                        onChange={onInputHole}
                        onPressEnter={onSearchHole}
                    />

                    <DownSelect visible={languageVisible}
                                setVisible={setLanguageVisible}
                                dataList={languageList}
                                setNav={selectLanguage}
                                nav={language}
                                type={'multiple'}
                                title={"语言"}
                    />

                    <DownSelect visible={levelVisible}
                                setVisible={setLevelVisible}
                                dataList={leveList}
                                setNav={selectLevel}
                                nav={levelList}
                                title={"等级"}
                    />



                    {/*<Select   allowClear  style={{width: 130}}  onChange={cuteLevel}  placeholder={"漏洞等级"} className='input-style'>
                        {leveList.map(item=>{
                            return(
                                <Option  key={item.key} value={item.key}>
                                    {item.value}
                                </Option>
                            )
                        })}
                    </Select>*/}



                    {/*     <Select   allowClear  style={{width: 130}}  onChange={cuteLanguage}  placeholder={"语言"} className='input-style'>
                        {languageList.map(item=>{
                            return(
                                <Option  key={item.key} value={item.key}>
                                    {item.value}
                                </Option>
                            )
                        })}
                    </Select>*/}

                </div>
                <div className='hole-table'>
                    <Table
                        bordered={false}
                        columns={columns}
                        dataSource={holeList}
                        rowKey={record=>record.id}
                        onChange={onChangeSort}
                        pagination={false}
                        locale={{emptyText: <EmptyText title={"暂无数据"}/>}}
                    />
                    <Page pageCurrent={currentPage}
                          changPage={changPage}
                          totalPage={totalPage}
                          totalRecord={totalRecord}
                          refresh={refreshFind}
                    />


                </div>
            </Col>

            <ScanHoleDetailsDrawer visible={deDrawerVisible} setVisible={setDeDrawerVisible} hole={holeDetails}/>
            <HoleEditPop editVisible={editVisible} setEditVisible={setEditVisible} createScanHole={createScanHole}/>
        </div>
    )
}
export default observer(HoleList)
