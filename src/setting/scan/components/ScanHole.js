
/**
 * @name: ScanHole
 * @author: limingliang
 * @date: 2023-11-08 14:30
 * @description：方案里面的扫描漏洞
 * @update: 2023-11-08 14:30
 */
import React,{useState,useEffect} from 'react';
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import Btn from "../../../common/btn/Btn";
import {Col, Input, Table} from "antd";
import Page from "../../../common/page/Page";
import ScanHoleStore from "../store/ScanHoleStore";
import "./ScanHole.scss"
import ScanHoleAddDrawer from "./ScanHoleAddDrawer";
import ScanHoleDetailsDrawer from "./ScanHoleDetailsDrawer";
import ScanSchemeStore from "../store/ScanSchemeStore";
import {observer} from "mobx-react";
import DeleteExec from "../../../common/delete/DeleteExec";
import {SearchOutlined} from "@ant-design/icons";
import DownSelect from "../../../common/downSelect/DownSelect";
import {PrivilegeButton} from 'tiklab-privilege-ui';
import EmptyText from "../../../common/emptyText/EmptyText";
const leveList=[{key:1,value:"严重漏洞"},{key:2,value:"高危漏洞"},{key:3,value:"中危漏洞"},{key:4,value:"低危漏洞"}]
const ScanHole = (props) => {
    const {match:{params}} = props;
    const {findSchemeHolePage,deleteScanSchemeHoleByCond,fresh}=ScanHoleStore
    const {findScanScheme}=ScanSchemeStore

    const [scanScheme,setScanScheme]=useState('')
    const [scanHoleList,setScanHoleList]=useState([])
    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()
    const [pageSize]=useState(15)
    const [totalRecord,setTotalRecord]=useState()

    const [addDrawerVisible,setAddDrawerVisible]=useState(false)  //添加扫描漏洞状态
    const [deDrawerVisible,setDeDrawerVisible]=useState(false)  //添加扫描漏洞状态

    const [holeDetails,setHoleDetails]=useState('')
    const [columnList,setCloumnList]=useState([])

    const [levelList,setLevelList]=useState([])  //选择查询的等级list
    const [levelVisible,setLevelVisible]=useState(false) // 等级搜索的下拉弹窗状态
    const [holeName,setHoleName]=useState()  //漏洞名称

    useEffect(()=>{
        getScanHolePage(1);
        findScanScheme(params.schemeId).then(res=>{
            setScanScheme(res.data)
            getCloumn(res.data)
        })
    },[fresh])


    const getCloumn = (hole) => {
        if (hole.schemeType==='default'){
            setCloumnList(columns)
        }else {
            setCloumnList( columns.concat({
                title:'操作',
                dataIndex: 'action',
                key: 'action',
                width:'10%',
                render:(text,record)=>{
                    return(
                        <PrivilegeButton  code={"hadess_scan_hole_delete"} key={'hadess_scan_hole_delete'} >
                            <DeleteExec value={record} deleteData={deleteScanSchemeHoleByCond}
                                        title={"确认删除"} type={'schemeHole'} schemeId={params.schemeId} />
                        </PrivilegeButton >
                    )
                }
            }))
        }

    }

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
            width:'30%',
            ellipsis:true,
        },
        {
            title: '漏洞等级',
            dataIndex: 'holeLevel',
            key: 'holeLevel',
            width:'10%',
            ellipsis:true,
            render:(text)=>text===1&&<div className='text-red'>严重漏洞</div>||
                text===2&&<div className='text-dired'>高危漏洞</div>||
                text===3&&<div className='text-yellow'>中危漏洞</div>||
                text===4&&<div className='text-blue'>低危漏洞</div>
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width:'15%',
            ellipsis:true,

        }
    ]

    //获取扫描漏洞
    const getScanHolePage = (currentPage,levelList) => {
        findSchemeHolePage({scanSchemeId:params.schemeId,
                                    holeLevelList:levelList,
                                    holeName:holeName,
                                    pageParam:{currentPage:currentPage,pageSize:pageSize}}).then(res=>{
            if (res.code===0){
                setScanHoleList(res.data.dataList)
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

    //分页查询
    const changPage = (current) => {
        setCurrentPage(current)
        getScanHolePage(current)
    }

    //刷新查询
    const refreshFind = () => {
        getScanHolePage(currentPage)
    }

    //添加漏洞状态
    const setAddVisible = () => {
        setAddDrawerVisible(true)
    }

    //输入漏洞名称
    const onInputName = (e) => {
        setHoleName(e.target.value)
    }
    //条件查询
    const onSearch = () => {
        setCurrentPage(1)
        getScanHolePage(1)
    }

    //漏洞等级查询
    const selectLevel = (value) => {
        setCurrentPage(1)
        setLevelList(value)
        getScanHolePage(1,value)
    }

    /**
     * 跳转到上一级路由
     */
    const goBack = () => {
        props.history.go(-1)
    }
    return(
        <div className='scanHole hadess-data-width'>
            <Col sm={{ span: "24" }}
                 md={{ span: "24" }}
                 lg={{ span: "24" }}
                 xl={{ span: "22", offset: "1" }}
                 xxl={{ span: "18", offset: "3" }}
            >
                <div className='scanHole-up'>
                    <BreadcrumbContent firstItem={'方案漏洞'} goBack={goBack}/>
                    {
                        scanScheme&&scanScheme.schemeType!=='default'&&
                        <PrivilegeButton  code={"hadess_scan_hole_add"} key={'system_scan_hole_add'} >
                            <Btn
                                type={'primary'}
                                title={'添加漏洞'}
                                onClick={()=> setAddVisible(true)}
                                />
                         </PrivilegeButton>

                    }
                </div>
                <div className='scanHole-find'>
                  <DownSelect visible={levelVisible}
                                setVisible={setLevelVisible}
                                dataList={leveList}
                                setNav={selectLevel}
                                nav={levelList}
                                title={"等级"}
                    />
                    <Input placeholder={'漏洞名称'} value={holeName} onChange={onInputName}
                           onPressEnter={onSearch}    size='middle' style={{ width: 190 }}   prefix={<SearchOutlined/>}/>

                </div>
                <div className='scanHole-table'>
                    <Table
                        bordered={false}
                        columns={columnList}
                        dataSource={scanHoleList}
                        rowKey={record=>record.id}
                        pagination={false}
                        locale={{emptyText: <EmptyText title={"暂无方案"}/>}}
                        /*  locale={{emptyText: <EmptyText title={'暂无方案'}/>}}*/
                    />
                    <Page pageCurrent={currentPage}
                          changPage={changPage}
                          totalPage={totalPage}
                          totalRecord={totalRecord}
                          refresh={refreshFind}
                    />
                </div>
            </Col>
            <ScanHoleAddDrawer visible={addDrawerVisible}
                               setVisible={setAddDrawerVisible}
                               schemeId={params.schemeId}
                               scanScheme={scanScheme}
            />

            <ScanHoleDetailsDrawer visible={deDrawerVisible}
                                   setVisible={setDeDrawerVisible}
                                   hole={holeDetails}
            />
        </div>
    )
}
export default observer(ScanHole)
