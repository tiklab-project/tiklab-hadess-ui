/**
 * @name: ScanDetails
 * @author: limingliang
 * @date: 20230-09-18 16:51
 * @description：扫描详情
 * @update: 2023-09-18 16:51
 */
import React,{useState,useEffect,Fragment} from 'react';
import "./ScanDetails.scss"
import Breadcrumb from "../../../common/breadcrumb/Breadcrumb";
import scanRelyStore from "../store/ScanRelyStore";
import {observer} from "mobx-react";
import {DownOutlined, RightOutlined} from "@ant-design/icons";
import Hole from "../../../assets/images/img/hole.png";
import Repair from "../../../assets/images/img/repair.png";
import Licence from "../../../assets/images/img/licence.png";

import HoleBtn from "../../../common/btn/HoleBtn";
import scanRecordStore from "../store/ScanRecordStore";
import {Col, Table} from "antd";
import Page from "../../../common/page/Page";
import ScanLibraryStore from "../store/ScanLibraryStore";
import RelyOnDrawer from "./RelyOnDrawer";
import ScanPlayStore from "../store/ScanPlayStore";
import EmptyText from "../../../common/emptyText/EmptyText";
const holeIconList=[{type:"severity",title:"C"},{type:"high",title:"H"},{type:"middle",title:"M"},{type:"low",title:"L"}]
const ScanDetails = (props) => {
    const {match:{params}} = props;

    const {findScanRecord,findHaveHoleRelyTreeList}=scanRecordStore
    const {findScanLibraryPage}=ScanLibraryStore
    const {findScanPlay}=ScanPlayStore

    const [openRely,setOpenRely]=useState([])  //打开的第一层依赖
    const [openSecondRely,setOpenSecondRely]=useState([])//打开的第二层依赖
    const [optNav,setOptNav]=useState('')  //选中的nav
    const [optType,setOptType]=useState()   //选中的类型

    const [optData,setOptData]=useState(null)   //选中的依赖内容
    const [optionIcon,setOptionIcon]=useState([])  //选中的漏洞图标

    const [tableType,setTableType]=useState("hole")
    const [scanRecordData,setScanRecordData]=useState('') //右侧详情

    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()
    const [pageSize]=useState(15)
    const [totalRecord,setTotalRecord]=useState()

    const [scanRecordList,setScanRecordList]=useState([])   //扫描记录list
    const [scanLibraryList,setScanLibraryList]=useState([])   //扫描的制品list
    const [drawerVisible,setDrawerVisible]=useState(false)  //扫描的制品的依赖
    const [choiceScanLibrary,setChoiceScanLibrary]=useState('')   //打开扫描制品依赖的扫描制品

    const [scanPlay,setScanPlay]=useState()  //扫描计划
    const [scanRecord,setScanRecord]=useState(null)  //扫描记录
    // 日志滚动条
    const [isActiveSlide,setIsActiveSlide] = useState(true);


    useEffect(async () => {
        findScanRecord(params.recordId).then(res=>{

            if (res.code===0){
                findScanPlay(res.data.scanPlayId).then(playRes=>{
                    setScanPlay(playRes.data)
                })
                setScanRecord(res.data)

                if (res.data.scanResult==='success'){
                    findHaveHoleRelyTreeList(res.data.scanGroup).then(res=>{
                        if (res.code===0) {
                            setScanRecordList(res.data)
                            setOptType("library")
                            setOptData(res.data[0])
                            setOpenRely([res.data[0].id])
                            setOptNav(res.data[0].id)
                            findScanRecord(res.data[0].id).then(res => {
                                setScanRecordData(res.data)
                            })
                        }
                    })
                }
            }
        })

    }, []);

    const columns = [
        {
            title: '制品名称',
            dataIndex: ['library','name'],
            key:"name",
            width:'20%',
            render: (text,record) =><div className='text-color' onClick={()=>openLibraryRely(record)}>{text}</div>
        },
        {
            title: '版本',
            dataIndex:['library','newVersion'],
            key:"newVersion",
            width:'30%',

        },
        {
            title: '依赖数',
            dataIndex: 'relyNum',
            key:"relyNum",
            width:'10%',
        },
    ];

    //打开制品的依赖
    const openLibraryRely = (value) => {
        setChoiceScanLibrary(value)
        setDrawerVisible(true)
    }


    //跳转上页
    const goBack = () => {
        props.history.go(-1)
    }

    //切换类型
    const cuteTab = (value) => {
        if (value==='relyOn'){
            getScanLibraryList(currentPage)

            //findScanRely(currentPage)
        }
        setTableType(value)
    }

    //分页
    const changPage = (value) => {
        setCurrentPage(value)
        //findScanRely(value)
    }


    //分页查询扫描制品
    const getScanLibraryList =async (currentPage) => {
        const res=await  findScanLibraryPage({repositoryId:params.id,scanPlayId:scanRecord.scanPlayId,generalRecordId:params.recordId,
            pageParam:{currentPage:currentPage, pageSize:pageSize}})
        if (res.code === 0) {
            setScanLibraryList(res.data.dataList)
            setTotalPage(res.data.totalPage)
            setTotalRecord(res.data.totalRecord)
        }
    }

    //刷新查询
    const refreshFind = () => {
        getScanLibraryList(currentPage)
    }

    //打开第一层依赖
    const openRelyNav = (item,type) => {
        setOptData(item)
        setOptType(type)
        setOptNav(item.id)
        if (openRely.length>0){
            const relyId=openRely.filter(a=>a===item.id)
            if (relyId.length>0){
                setOpenRely(openRely.filter(a=>a!==item.id))
            }else {
                setOpenRely(openRely.concat(item.id))
            }
        }else {
            setOpenRely([item.id])
        }
        if (type==='library'){
            findScanRecord(item.id).then(res=>{
                res.code===0&&setScanRecordData(res.data)
            })
        }
    }
    //打开第二层依赖
    const openSecondRelyNav = (value) => {
        setOptType("rely")
        setOptData(value)
        setOptNav(value.id)
       // findScanHoleList({libraryId:value.id})
        if (openSecondRely.length>0){
            const relyId=openSecondRely.filter(a=>a===value.id)
            if (relyId.length>0){
                setOpenSecondRely(openSecondRely.filter(a=>a!==value.id))
            }else {
                setOpenSecondRely(openSecondRely.concat(value.id))
            }
        }else {
            setOpenSecondRely([value.id])
        }
    }

    //点击漏洞
    const openHole = (value) => {
        setOptData(value)
        setOptType("hole")
        setOptNav(value.id)
    }

    //选择漏洞图标
    const onClickIcon = (value) => {
        if (optionIcon.length>0){
            const holeValue=optionIcon.filter(a=>a===value)
            if (holeValue.length>0){
                setOptionIcon(optionIcon.filter(a=>a!==value))
            }else {
                setOptionIcon(optionIcon.concat(value))
            }
        }else {
            setOptionIcon([value])
        }
    }

    //漏洞等级图标
    const holeIcon = (holeLevel,size) => {
      return(
          <div>
              {
                  holeLevel===1&& <HoleBtn type={'severity'} title={'C'} size={size}/>||
                  holeLevel===2&& <HoleBtn type={'high'} title={'H'} size={size}/>||
                  holeLevel===3&& <HoleBtn type={'middle'} title={'M'} size={size}/>||
                  holeLevel===4&& <HoleBtn type={'low'} title={'L'} size={size}/>
              }
          </div>
      )
    }


    //依赖title图标
    const holeTitleIcon = (value,optId) => {
        return(
            <Fragment>
                {
                    (value.length>0&&value.filter(a=>a===optId).length>0)?
                        <DownOutlined className='icon-style'/>
                        :<RightOutlined className='icon-style'/>

                }
            </Fragment>
        )
    }



    //日志
    const renderPressLog = () => {
        const dataImport=document.getElementById("data-import")
        if(dataImport && isActiveSlide){
            dataImport.scrollTop = dataImport.scrollHeight
        }
        return    scanRecord&&scanRecord.log || '暂无日志'
    }

    return(
        <div className='scanDetails hadess-data-width'>
            <Col
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "20", offset: "2" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <div className='scanDetails-head-style'>
                    <Breadcrumb firstItem={scanPlay?.playName} secondItem={"扫描报告"} thirdItem={scanRecord?.scanGroup} goBack={goBack}/>
                </div>

                {
                    scanRecord?.scanResult==='success'&&
                    <Fragment>
                        <div className='scanDetails-data-style'>
                            <div className='scanDetails-border-style'>
                                <div className='scanDetails-library-border'>
                                    <div className='scanDetails-library-desc'>依赖数量</div>
                                    <div className='scanDetails-library-num relyOn-num'>{scanRecord?.relyNum}</div>
                                </div>
                                <div className='scanDetails-hole-border'>
                                    <div className='scanDetails-hold-style'>
                                        <div className='scanDetails-hole-desc'>严重漏洞</div>
                                        <div className='scanDetails-hole-num scanDetails-hole-red'>{scanRecord?.holeSeverity}</div>
                                    </div>
                                    <div className='scanDetails-hold-style'>
                                        <div className='scanDetails-hole-desc'>高危漏洞</div>
                                        <div className='scanDetails-hole-num scanDetails-hole-dired'>{scanRecord?.holeHigh}</div>
                                    </div>
                                    <div className='scanDetails-hold-style'>
                                        <div className='scanDetails-hole-desc'>中危漏洞</div>
                                        <div className='scanDetails-hole-num scanDetails-hole-yellow'>{scanRecord?.holeMiddle}</div>
                                    </div>
                                    <div className='scanDetails-hold-style'>
                                        <div className='scanDetails-hole-desc'>低危漏洞</div>
                                        <div className='scanDetails-hole-num scanDetails-hole-blue'>{scanRecord?.holeLow}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='scanDetails-hole-style'>
                            <div className='scanDetails-hole-title'>
                                <div className={`${tableType==='hole'&& ' choose-scanDetails-type '}`} onClick={()=>cuteTab("hole")}>
                                    漏洞依赖
                                </div>
                                <div className={`${tableType==='relyOn'&& ' choose-scanDetails-type '}`} onClick={()=>cuteTab("relyOn")}>
                                    所有依赖
                                </div>
                            </div>
                            {
                                tableType==='hole'?
                                    <div className='scanDetails-hole-desc'>
                                        <div className='scanDetails-hole-desc-title'>
                                            <div className='scanDetails-icon-style'>
                                                {
                                                    holeIconList.map(item=>{
                                                        return(
                                                            <div key={item.type} className={(optionIcon.length>0&&optionIcon.filter(a=>a===item.type).length>0)?'option-icon icon-style-option':"icon-style-no"} onClick={()=>onClickIcon(item.type)}>
                                                                <HoleBtn type={item.type} title={item.title} size={"large"} />
                                                            </div>
                                                        )
                                                    })
                                                }

                                            </div>
                                            <div className='scanDetails-title-style'>
                                                {
                                                    ( scanRecordList&&scanRecordList?.length>0)&&scanRecordList.map(scanRely=>{
                                                        return(
                                                            <div key={scanRely.id} className='scan-record-title-nav'>
                                                                <div className={`flex-style ${optNav===scanRely?.id&&'opt-title-nav'}`} onClick={()=>openRelyNav(scanRely,'library')}>
                                                                    {
                                                                        scanRely.library&&
                                                                        <>
                                                                            <div>{holeTitleIcon(openRely,scanRely.id)}</div>
                                                                            <div>{scanRely.library.name}</div>
                                                                        </>
                                                                    }
                                                                </div>
                                                                {
                                                                    scanRely.scanRelyList&&scanRely.scanRelyList.length>0&&(openRely.filter(a=>a===scanRely.id).length>0)&&scanRely.scanRelyList.map(item=>{
                                                                        return(
                                                                            <div key={item.id} className='scanDetails-hole-title-nav' >
                                                                                <div className={`flex-style ${optNav===item.id&&'opt-title-nav'}`} onClick={()=>openRelyNav(item,'rely')}>
                                                                                    <div>{holeTitleIcon(openRely,item.id)}</div>
                                                                                    <div>{item.relyName}</div>
                                                                                </div>
                                                                                {
                                                                                    (openRely.length>0&&openRely.filter(a=>a===item.id).length>0)
                                                                                    &&item.scanResultList.map(hole=>{
                                                                                        return(
                                                                                            <div key={hole.id} className='hole-second-title-nav' onClick={()=>openHole(hole)}>
                                                                                                <div className='hole-title-nav-style'>
                                                                                                    {holeIcon(hole.holeLevel,"small")}
                                                                                                    <div className={`flex-style ${optNav===hole.id&&'opt-title-nav'}`}>{hole.holeName}</div>
                                                                                                </div>
                                                                                            </div>
                                                                                        )
                                                                                    })
                                                                                }
                                                                                {
                                                                                    (openRely.length>0&&openRely.filter(a=>a===item.id).length>0)&& item.scanRelyList.map(second=>{
                                                                                        return(
                                                                                            <div key={second.id} className=' hole-second-title-nav'  >
                                                                                                <div className={`flex-style ${optNav===second.id&&'opt-title-nav'}`} onClick={()=>openSecondRelyNav(second)}>
                                                                                                    <div>{holeTitleIcon(openSecondRely,second.id)}</div>
                                                                                                    <div>{second.relyName}</div>
                                                                                                </div>
                                                                                                {
                                                                                                    (openSecondRely.length>0&&openSecondRely.filter(a=>a===second.id).length>0)
                                                                                                    &&second.scanResultList.map(hole=>{
                                                                                                        return(
                                                                                                            <div key={hole.id} className='hole-second-title-nav' onClick={()=>openHole(hole)}>
                                                                                                                <div className='hole-title-nav-style'>
                                                                                                                    {holeIcon(hole.holeLevel,"small")}
                                                                                                                    <div className={`flex-style ${optNav===hole.id&&'opt-title-nav'}`}>{hole.holeName}</div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        )
                                                                                                    })
                                                                                                }
                                                                                            </div>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        )
                                                    })

                                                }
                                            </div>
                                        </div>
                                        <div className='scanDetails-hole-desc-details'>
                                            {
                                                optData &&
                                                <Fragment>
                                                    {
                                                        optType==='library' &&
                                                        <div className='library-dec-style'>
                                                            <div className='library-dec-head-name'>{optData.library.name}</div>
                                                            <div className=' library-dec-nav-style'>
                                                                <div className='library-dec-title'>扫描时长:</div>
                                                                <div>{scanRecordData.scanTimeLong}</div>
                                                            </div>
                                                            <div className=' library-dec-nav-style'>
                                                                <div className='library-dec-title'>依赖数:</div>
                                                                <div>{scanRecordData.relyNum}个</div>
                                                            </div>
                                                            <div className=' library-dec-nav-style'>
                                                                <div className='library-dec-title'>漏洞:</div>
                                                                <div className='library-dec-icon-style'>
                                                                    <div className='library-dec-icon-nav'>
                                                                        <div className='library-dec-icon-display'>
                                                                            {holeIcon(1,"small")}
                                                                            <div className='library-dec-icon-text'>严重:</div>
                                                                        </div>
                                                                        <div className='library-dec-text'>{scanRecordData.holeSeverity}</div>
                                                                    </div>
                                                                    <div className='library-dec-icon-nav'>
                                                                        <div className='library-dec-icon-display'>
                                                                            {holeIcon(2,"small")}
                                                                            <div className='library-dec-icon-text'> 高危:</div>
                                                                        </div>
                                                                        <div className='library-dec-text'>{scanRecordData.holeHigh}</div>
                                                                    </div>
                                                                    <div className='library-dec-icon-nav'>
                                                                        <div className='library-dec-icon-display'>
                                                                            {holeIcon(3,"small")}
                                                                            <div className='library-dec-icon-text'> 中危:</div>
                                                                        </div>
                                                                        <div className='library-dec-text'>{scanRecordData.holeMiddle}</div>
                                                                    </div>
                                                                    <div className='library-dec-icon-nav'>
                                                                        <div className={'library-dec-icon-display'}>
                                                                            {holeIcon(4,"small")}
                                                                            <div className='library-dec-icon-text'>低危:</div>
                                                                        </div>
                                                                        <div className='library-dec-text'>{scanRecordData.holeLow}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>||
                                                        optType==='rely' &&
                                                        <div className='rely-dec-style'>
                                                            <div className='rely-dec-head-name'>{optData.relyName}</div>
                                                            <div className=' rely-dec-nav-style'>
                                                                <div className='rely-dec-nav-15'>
                                                                    <div className='rely-dec-title'>发布厂商:</div>
                                                                    <div>{optData.relyVendor}</div>
                                                                </div>
                                                                <div className='rely-dec-nav-15'>
                                                                    <div className='rely-dec-title-40'>版本:</div>
                                                                    <div>{optData.relyVersion}</div>
                                                                </div>
                                                            </div>
                                                            <div className='rely-dec-nav-10'>
                                                                <div className='rely-dec-title'>所属语言:</div>
                                                                <div>{optData.relyLanguage}</div>
                                                            </div>
                                                            <div className='rely-dec-nav-10'>
                                                                <div className='rely-dec-title'>依赖类型:</div>
                                                                <div>{optData.relyType==='direct'?"直接依赖":"间接依赖"}</div>
                                                            </div>
                                                            <div className='rely-dec-nav-10'>
                                                                <div className='rely-dec-title'>组件位置:</div>

                                                            </div>
                                                            <div>{optData.relyPath}</div>
                                                            <div className='rely-dec-nav-15 rely-dec-licenses'>
                                                                <div className='rely-dec-licenses-style'>
                                                                    <img  src={Licence}  style={{width:25,height:25,cursor:'pointer'}}/>
                                                                    <div >许可证:</div>
                                                                </div>
                                                                <div>{optData.relyLicenses}</div>
                                                            </div>
                                                        </div>||
                                                        optType==='hole'&&
                                                        <div className='hole-desc-style'>
                                                            <div className='hole-name-nav'>
                                                                {holeIcon(optData.holeLevel,"large")}
                                                                <div className='hole-name'>{optData.holeName}</div>
                                                            </div>
                                                            <div className='hole-nav hole-code-style'>
                                                                {optData?.holeCwe&& <div className='hole-code'>{optData?.holeCwe}</div>}
                                                                {optData?.holeCve&& <div className='hole-code'>{optData?.holeCve}</div>}
                                                                {optData?.holeCnnvd&& <div className='hole-code'>{optData?.holeCnnvd}</div>}
                                                                {optData?.holeCnvd&& <div className='hole-code'>{optData?.holeCnvd}</div>}
                                                                {optData?.holeXmirror&& <div className='hole-code'>{optData?.holeXmirror}</div>}
                                                            </div>
                                                            <div className='hole-releaseTime'>发布时间: {optData?.releaseTime}</div>
                                                            <div className='hole-nav'>
                                                                <div className='hole-name-nav'>
                                                                    <img  src={Hole}  style={{width:25,height:25,cursor:'pointer'}}/>
                                                                    <div className='hole-name'>漏洞描述</div>
                                                                </div>
                                                                <div className=''>{optData.holeDesc}</div>
                                                            </div>
                                                            <div className='hole-nav'>
                                                                <div className='hole-name-nav'>
                                                                    <img  src={Repair}  style={{width:25,height:25,cursor:'pointer'}}/>
                                                                    <div className='hole-name'>修复建议</div>
                                                                </div>
                                                                <div className=''>{optData.repairSuggest}</div>
                                                            </div>
                                                        </div>
                                                    }
                                                </Fragment>

                                            }
                                        </div>
                                    </div>:
                                    <div className='margin-top'>
                                        <Table
                                            columns={columns}
                                            dataSource={scanLibraryList}
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
                            }
                            <RelyOnDrawer visible={drawerVisible} setVisible={setDrawerVisible} scanRecordId={params.recordId} scanLibrary={choiceScanLibrary}/>
                        </div>
                    </Fragment>||
                    ( scanRecord?.scanResult==='fail'||scanRecord?.scanResult==='run')&&
                    <Fragment>
                        <div className='scanDetails-fail'>
                            <div>运行状态：</div>
                            <div className='fail-result'>失败</div>
                        </div>
                        <div className='fail-log-style'>
                            <div className='fail-log'>扫描日志</div>
                            <div className="scan-log-bottom">
                                <div className='scan-detail-log'
                                     id='data-import'
                                     onWheel={()=>setIsActiveSlide(false)}>
                                    { renderPressLog() }
                                </div>

                            </div>
                        </div>
                    </Fragment>
                }
            </Col>
        </div>
    )
}
export default observer(ScanDetails)
