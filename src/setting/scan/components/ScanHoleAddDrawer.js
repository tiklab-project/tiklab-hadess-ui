
/**
 * @name: ScanHoleAddDrawer
 * @author: limingliang
 * @date: 2023-11-08 14:30
 * @description：添加漏洞抽屉
 * @update: 2023-11-08 14:30
 */
import React,{useState,useEffect,Fragment} from 'react';
import {Drawer, Input, Popconfirm, Select, Space, Table, Tooltip} from 'antd'
import {CloseOutlined, DeleteOutlined, SearchOutlined} from "@ant-design/icons";
import ScanHoleStore from "../store/ScanHoleStore";
import "./ScanHoleAddDrawer.scss"
import DownSelect from "../../../common/downSelect/DownSelect";
import Page from "../../../common/page/Page";
import Btn from "../../../common/btn/Btn";
import EmptyText from "../../../common/emptyText/EmptyText";
const leveList=[{key:1,value:"严重漏洞"},{key:2,value:"高危漏洞"},{key:3,value:"中危漏洞"},{key:4,value:"低危漏洞"}]

const ScanHoleAddDrawer = (props) => {
    const {visible,setVisible,schemeId,scanScheme}=props

    const {findNotScanHolePage,createScanSchemeHole,fresh}=ScanHoleStore

    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()
    const [pageSize]=useState(15)
    const [totalRecord,setTotalRecord]=useState()

    const [holes,setHoles]=useState([])
    const [scanHoleList,setScanHoleList]=useState([])

    const [holeName,setHoleName]=useState(null)  //搜索的漏洞名字

    const [levelList,setLevelList]=useState([])  //选择查询的等级list
    const [levelVisible,setLevelVisible]=useState(false) // 等级搜索的下拉弹窗状态

    const [language,setLanguage]=useState()  //选择查询的语言



    useEffect(()=>{
        if (visible){
            getNotScanHolePage(1)
        }

        if (scanScheme.language==="java"){
            setLanguage('java')
        }
    },[fresh,visible])

    const columns = [
        {
            title: '漏洞名称',
            dataIndex: 'holeName',
            key: 'holeName',
            width:'30%',
            ellipsis:true,
        },
        {
            title: '漏洞编号',
            dataIndex: 'holeNumber',
            key: 'holeNumber',
            width:'40%',
            ellipsis:true,
        },
        {
            title: '产品',
            dataIndex: 'product',
            key: 'product',
            width:'20%',
            ellipsis:true,
        },
        {
            title: '等级',
            dataIndex: 'holeLevel',
            key: 'holeLevel',
            width:'10%',
            ellipsis:true,
            render:(text)=>text===1&&<div className='text-red'>严重漏洞</div>||
                text===2&&<div className='text-dired'>高危漏洞</div>||
                text===3&&<div className='text-yellow'>中危漏洞</div>||
                text===4&&<div className='text-blue'>低危漏洞</div>
        },
    ]


    //获取没有关联的漏洞
    const getNotScanHolePage = (currentPage,levelList) => {
        findNotScanHolePage({scanSchemeId:schemeId,holeLevelList:levelList,language:language,holeName:holeName,
            pageParam:{currentPage:currentPage, pageSize:pageSize}}).then(res=>{
            if (res.code===0){
                setScanHoleList(res.data.dataList)
                setTotalPage(res.data.totalPage)
                setTotalRecord(res.data.totalRecord)
            }
        })
    }


    //分页查询漏洞
    const changPage = (value) => {
        setCurrentPage(value)
        getNotScanHolePage(value,levelList,language)
    }

    //刷新查询
    const refreshFind = () => {
        getNotScanHolePage(currentPage,levelList,language)
    }


    //漏洞等级查询
    const selectLevel = (value) => {
        setCurrentPage(1)
        setLevelList(value)
        getNotScanHolePage(1,value,language)
    }


    //添加漏洞名称
    const onInputHole = (e) => {
        setHoleName(e.target.value)
    }
    //搜索漏洞
    const onSearchHole = () => {
        setCurrentPage(1)
        getNotScanHolePage(1,levelList,language)
    }

    //取消弹窗
    const cancelDrawer = () => {
        setVisible(false)
        setHoleName(null)
        setCurrentPage(1)
        setLevelList([])
        setLanguage(null)
    }


    //选择漏洞
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setHoles(selectedRowKeys)
        }
    };

    //选择
    const onOk = () => {
        createScanSchemeHole({scanSchemeId:schemeId,scanHoleIdList:holes}).then(item=>{
            if (item.code===0){
                cancelDrawer()
            }
        })
    }


    const modalFooter = (
        <div className='hole-table-footer'>
            <Btn onClick={cancelDrawer} title={'取消'} />
            <Btn onClick={onOk} title={'确定'} type={'primary'} isMar={true}/>
        </div>
    )

    return(
        <Drawer
            title={"添加漏洞"}
            placement='right'
            closable={false}
            width={"60%"}
            onClose={cancelDrawer}
            visible={visible}
            footer={modalFooter}
            extra={
                <CloseOutlined style={{cursor:'pointer'}} onClick={cancelDrawer} />
            }
        >
        <div className='hole-add-top'>
            <div className='hole-add-search'>
                <DownSelect visible={levelVisible}
                            setVisible={setLevelVisible}
                            dataList={leveList}
                            setNav={selectLevel}
                            nav={levelList}
                            title={"等级"}
                />
                <Input placeholder={'漏洞名称'}  onChange={onInputHole} value={holeName}
                       onPressEnter={onSearchHole}    size='middle' style={{ width: 200 }}   prefix={<SearchOutlined/>}/>
            </div>

            <div className='hole-table-top'>
                <Table
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    dataSource={scanHoleList}
                    rowKey = {record => record.id}
                    columns={columns}
                    pagination={false}
                    locale={{emptyText: <EmptyText title={"暂无方案"}/>}}
                />
                <Page pageCurrent={currentPage}
                      changPage={changPage}
                      totalPage={totalPage}
                      totalRecord={totalRecord}
                      refresh={refreshFind}
                />
            </div>
        </div>
        </Drawer>
    )
}
export default ScanHoleAddDrawer
