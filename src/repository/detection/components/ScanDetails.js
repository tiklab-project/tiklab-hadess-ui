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
import {Table} from "antd";
import Page from "../../../common/page/Page";
const holeIconList=[{type:"severity",title:"C"},{type:"high",title:"H"},{type:"middle",title:"M"},{type:"low",title:"L"}]
const ScanDetails = (props) => {
    const {match:{params}} = props;

    const {findScanRecord,findScanRecordByGroup,scanRecord}=scanRecordStore
    const {findHaveHoleRelyTreeList,scanRelyList,findScanRelyPage}=scanRelyStore

    const [openRely,setOpenRely]=useState([])  //打开的第一层依赖
    const [openSecondRely,setOpenSecondRely]=useState([])//打开的第二层依赖
    const [optNav,setOptNav]=useState('')  //选中的nav
    const [optType,setOptType]=useState()   //选中的类型

    const [optData,setOptData]=useState(null)   //选中的依赖内容
    const [optionIcon,setOptionIcon]=useState([])  //选中的漏洞图标
    const [state,setState]=useState(false)

    const [tableType,setTableType]=useState("hole")

    const [findScanRelyList,setFindScanRelyList]=useState([])  //依赖列表
    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()

    useEffect(async () => {
        if (params.type==='one'){
            findScanRecord(params.scanRecordId)
            findHaveHoleRelyTreeList({scanRecordId:params.scanRecordId}).then(res=>{
                if (res.code===0){
                    setOptType("rely")
                    setOptData(res.data[0])
                    setOpenRely([res.data[0].id])
                    setOptNav(res.data[0].id)

                    const data=res.data&&res.data.filter(a=>a.scanRelyList.length>0)
                    if (data.length>0){
                        setState(true)
                    }
                }
            })
        }else {
            findScanRecordByGroup(params.scanRecordId)
        }
    }, []);

    const columns = [
        {
            title: '依赖名称',
            dataIndex: 'relyName',
            key:"relyName",
            width:'20%',
        },
        {
            title: '版本',
            dataIndex: 'relyVersion',
            key:"relyVersion",
            width:'20%',

        },
    /*    {
            title: '许可证',
            dataIndex: 'relyLicenses',
            key:"relyLicenses",
            width:'10%',
        },*/
        {
            title: '依赖方式',
            dataIndex: 'relyType',
            key:"relyType",
            width:'10%',
            render:(text,record)=><div>{text==='direct'?"直接依赖":"间接依赖"}</div>
        },
    ];



    //跳转上页
    const goBack = () => {
        props.history.go(-1)
    }

    //切换类型
    const cuteTab = (value) => {
        if (value==='relyOn'){
            findScanRely(currentPage)
        }
        setTableType(value)
    }

    //分页
    const changPage = (value) => {
        setCurrentPage(value)
        findScanRely(value)
    }

    //查询依赖列表
    const findScanRely = (currentPage) => {
        findScanRelyPage({scanRecordId:params.scanRecordId,pageParam:{currentPage:currentPage, pageSize:15}}).then(res=>{
            if (res.code===0){
                setFindScanRelyList(res.data.dataList)
                setTotalPage(res.data.totalPage)
            }
        })
    }


    //打开第一层依赖
    const openRelyNav = (item) => {
        setOptData(item)
        setOptType("rely")
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
    const holeIcon = (hole,size) => {
      return(
          <div>
              {
                  hole.holeLevel===1&& <HoleBtn type={'severity'} title={'C'} size={size}/>||
                  hole.holeLevel===2&& <HoleBtn type={'high'} title={'H'} size={size}/>||
                  hole.holeLevel===3&& <HoleBtn type={'middle'} title={'M'} size={size}/>||
                  hole.holeLevel===4&& <HoleBtn type={'low'} title={'L'} size={size}/>
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

    return(
        <div className='scanDetails'>
            <div className='scanDetails-width'>
                <div className='scanDetails-head-style'>
                    <Breadcrumb firstItem={"扫描列表"} secondItem={"漏洞详情"} goBack={goBack}/>
                </div>

                <div className='scanDetails-data-style'>
                    <div className='scanDetails-border-style'>
                        <div className='scanDetails-library-border'>
                            <div className='scanDetails-library-desc'>依赖数量</div>
                            <div className='scanDetails-library-num relyOn-num'>{scanRecord.relyNum}</div>
                        </div>
                        <div className='scanDetails-hole-border'>
                            <div className='scanDetails-hold-style'>
                                <div className='scanDetails-hole-desc'>严重漏洞</div>
                                <div className='scanDetails-hole-num scanDetails-hole-red'>{scanRecord.holeSeverity}</div>
                            </div>
                            <div className='scanDetails-hold-style'>
                                <div className='scanDetails-hole-desc'>高危漏洞</div>
                                <div className='scanDetails-hole-num scanDetails-hole-dired'>{scanRecord.holeHigh}</div>
                            </div>
                            <div className='scanDetails-hold-style'>
                                <div className='scanDetails-hole-desc'>中危漏洞</div>
                                <div className='scanDetails-hole-num scanDetails-hole-yellow'>{scanRecord.holeMiddle}</div>
                            </div>
                            <div className='scanDetails-hold-style'>
                                <div className='scanDetails-hole-desc'>低危漏洞</div>
                                <div className='scanDetails-hole-num scanDetails-hole-blue'>{scanRecord.holeLow}</div>
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
                                          scanRelyList&&scanRelyList.length>0&&scanRelyList.map(item=>{
                                              return(
                                                  <div key={item.id} className='scanDetails-hole-title-nav' >
                                                      <div className={`flex-style ${optNav===item.id&&'opt-title-nav'}`} onClick={()=>openRelyNav(item)}>
                                                          <div>{holeTitleIcon(openRely,item.id)}</div>
                                                          <div>{item.relyName}</div>
                                                      </div>
                                                      {
                                                          (openRely.length>0&&openRely.filter(a=>a===item.id).length>0)
                                                          &&item.scanHoleList.map(hole=>{
                                                              return(
                                                                  <div key={hole.id} className='hole-second-title-nav' onClick={()=>openHole(hole)}>
                                                                      <div className='hole-title-nav-style'>
                                                                          {holeIcon(hole,"small")}
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
                                                                          &&second.scanHoleList.map(hole=>{
                                                                              return(
                                                                                  <div key={hole.id} className='hole-second-title-nav' onClick={()=>openHole(hole)}>
                                                                                      <div className='hole-title-nav-style'>
                                                                                          {holeIcon(hole,"small")}
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
                              </div>
                              <div className='scanDetails-hole-desc-details'>
                                  {
                                      optData &&
                                      <Fragment>
                                          {  optType==='rely' ?
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
                                              </div>:
                                              <div className='hole-desc-style'>
                                                  <div className='hole-name-nav'>
                                                      {holeIcon(optData,"large")}
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
                                  dataSource={findScanRelyList}
                                  rowKey={record=>record.id}
                                  pagination={false}
                              />
                              {
                                  (totalPage>1)?
                                      <Page pageCurrent={currentPage} changPage={changPage} totalPage={totalPage}/>:null
                              }
                          </div>
                    }

                </div>
            </div>
        </div>
    )
}
export default observer(ScanDetails)
