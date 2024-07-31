
/**
 * @name: ScanScheme
 * @author: limingliang
 * @date: 2023-11-08 14:30
 * @description：扫描方案
 * @update: 2023-11-08 14:30
 */
import React,{useState,useEffect} from 'react';
import "./ScanScheme.scss"
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import Btn from "../../../common/btn/Btn";
import {StopOutlined} from "@ant-design/icons";
import {Col,Table} from "antd";
import {observer} from "mobx-react";
import Page from "../../../common/page/Page";
import ScanSchemeStore from "../store/ScanSchemeStore";
import ScanSchemeEditPop from "./ScanSchemeEditPop";
import DeleteExec from "../../../common/delete/DeleteExec";
import {PrivilegeButton} from 'thoughtware-privilege-ui';
import EmptyText from "../../../common/emptyText/EmptyText";
const ScanScheme = (props) => {
    const {findScanSchemePage,deleteScanScheme,createScanScheme,fresh}=ScanSchemeStore


    const [scanSchemeList,setScanSchemeList]=useState([])   //扫描方案列表
    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()
    const [pageSize]=useState(15)
    const [totalRecord,setTotalRecord]=useState()

    const [editVisible,setEditVisible] = useState(false)    //编辑扫描方案弹窗状态

    useEffect(()=>{
        getScanSchemePage(currentPage);
    },[fresh])

    const columns = [
        {
            title: '名称',
            dataIndex: 'schemeName',
            key: 'schemeName',
            width:'30%',
            ellipsis:true,
            render:(text,record)=><div className='text-color' onClick={()=>goSchemeDetails(record)}>{text}</div>
        },
        {
            title: '语言',
            dataIndex: 'language',
            key: 'language',
            width:'20%',
            ellipsis:true,
        },
        {
            title: '类型',
            dataIndex: 'schemeType',
            key: 'schemeType',
            width:'20%',
            ellipsis:true,
            render:(text)=>text==='default'?<div>默认方案</div>:<div>自定义</div>
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width:'20%',
            ellipsis:true,

        },

        {
            title:'操作',
            dataIndex: 'action',
            key: 'action',
            width:'10%',
            render:(text,record)=>(
                <div>
                    {
                        record.schemeType!=='default'?
                            <PrivilegeButton  code={"hadess_scan_delete"} key={'hadess_scan_delete'} >
                                <DeleteExec value={record} deleteData={deleteScanScheme} title={'确认删除'} />
                            </PrivilegeButton> :
                            <StopOutlined style={{color:'#cccccc'}} />
                    }
                </div>

            )
        }
    ]

    //分页查询扫描方案
    const getScanSchemePage = (currentPage) => {
        findScanSchemePage({pageParam:{currentPage:currentPage, pageSize:pageSize}}).then(res=>{
            if (res.code===0){
                setScanSchemeList(res.data.dataList)
                setTotalPage(res.data.totalPage)
                setTotalRecord(res.data.totalRecord)
            }
        })
    }
    //分页查询
    const changPage = (current) => {
        setCurrentPage(current)
        getScanSchemePage(current)
    }
    //刷新查询
    const refreshFind = () => {
        getScanSchemePage(currentPage)
    }

    //跳转扫描方案详情
    const goSchemeDetails = (value) => {
        props.history.push(`/setting/scanHole/${value.id}`)
    }

    return(
        <div className='scanScheme hadess-data-width'>
            <Col sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "22", offset: "1" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <div className='scanScheme-up'>
                    <BreadcrumbContent firstItem={'扫描方案'}/>
                    <PrivilegeButton  code={"hadess_scan_add"} key={'hadess_scan_add'} >
                        <Btn
                            type={'primary'}
                            title={'创建方案'}
                            onClick={()=> setEditVisible(true)}
                        />
                    </PrivilegeButton>
                </div>
                <div className='scanScheme-table'>
                    <Table
                        bordered={false}
                        columns={columns}
                        dataSource={scanSchemeList}
                        rowKey={record=>record.id}
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

                <ScanSchemeEditPop editVisible={editVisible} setEditVisible={setEditVisible} createScanScheme={createScanScheme}/>

            </Col>
        </div>
    )
}
export default observer(ScanScheme)
