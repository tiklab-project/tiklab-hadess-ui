/**
 * @name: LibraryPush
 * @author: limingliang
 * @date: 2023-7-19 10:30
 * @description：推送中央仓库
 * @update: 2023-07-19 10:30
 */
import React, {useState, useEffect} from "react";
import {Space, Table, Tooltip, message, Popconfirm, Input} from "antd";
import "./PushCenter.scss"
import BreadcrumbContent from '../../../../common/breadcrumb/Breadcrumb';
import LibraryStore from "../../../../library/store/LibraryStore";
import PushCenterStore from "../store/PushCenterStore";
import {inject, observer} from "mobx-react";
import {
    DeleteOutlined,
    LoadingOutlined,
    PlayCircleOutlined,
    SearchOutlined, SyncOutlined
} from "@ant-design/icons";
import Btn from "../../../../common/btn/Btn";
import LibraryOption from "./LibraryOption";
import {withRouter} from "react-router";
import Page from "../../../../common/page/Page";
const LibraryPush = (props) => {
    const {match:{params},repositoryStore} = props;
    const {libraryList,findNotPushLibraryList}=LibraryStore
    const {pushCentralWare,pushResult,findPushLibraryList,findPushLibraryPage,createPushLibrary,deletePushLibrary,refresh}=PushCenterStore
    const {findRepository}=repositoryStore
    const [repository,setRepository]=useState(null)
    const [PushLibrary,setPushLibrary]=useState([])   //推送版本
    const [pushLibraryList,setPushLibraryList]=useState([])

    const [addVisible,setAddVisible]=useState(false)

    const [searchName,setSearchName]=useState('')
    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()

    useEffect(  async () => {

      await findNotPushLibraryList({repositoryId:params.id})
       await findPushList(currentPage)

    }, [refresh]);

    const columns=[
        {
            title: '制品名称',
            dataIndex: ['library','name'],
            width:'40%',
        },
        {
            title: '最近推送时间',
            dataIndex: 'lastPushTime',
            width:'20%',
            render:(text)=><div>{text?text:<div className='push-text-gray'>{"未推送"}</div>}</div>
        },
        {
            title: '最近推送状态',
            dataIndex: 'lastPushResult',
            width:'20%',
            render:(text)=><div>{text?(text==="fail"?<div className='push-text-read'>{"失败"}</div>:<div className='push-text-green'>{"成功"}</div>):
                (<div className='push-text-gray'>{"未推送"}</div>)}</div>
        },
        {
            title: '执行状态',
            dataIndex: 'execState',
            width:'10%',
            render:(text)=>(
                <div>
                    {
                        text==="waite"&&<div className='push-text-read'>{"等待中"}</div>||
                        text==="exec"&&<div className='push-text-green'>{"执行中"}</div>||
                        text==="end"&&<div className='push-text-gray'>{"已结束"}</div>
                    }
                </div>
            )
        },
        {
            title: '操作',
            key: 'activity',
            width:'10%',
            render: (text, record) => {
                const stateInfo = PushLibrary.filter(a=>a.id===record.id)
                return(
                    <Space size="useState" >
                        <Tooltip title={"删除"} className='push-operate'>
                            <Popconfirm
                                placement="topRight"
                                title="你确定删除吗"
                                onConfirm={()=>deletePushLibrary(record.id)}
                                okText="确定"
                                cancelText="取消"
                            >
                        <span style={{cursor:"pointer"}}>
                            <DeleteOutlined />
                        </span>
                            </Popconfirm>
                        </Tooltip>
                        <div className='push-operate push-operate-left'>
                            {
                                (stateInfo && stateInfo[0]?.state) ?
                                    <SyncOutlined spin/>:
                                    <Tooltip title='推送'>
                                        <PlayCircleOutlined className='remote-icon'
                                                            onClick={() => pushCenter(record)}/>
                                    </Tooltip>
                            }
                        </div>
                    </Space>
                )}
        },
    ]


    //查询推的的制品列表
    const findPushList =async (page) => {
        const pushRes=await  findPushLibraryPage({pageParam:{currentPage:page, pageSize:30},
            repositoryId:params.id,libraryName:searchName});
        if (pushRes.code===0){
            setPushLibraryList(pushRes.data.dataList)
            setTotalPage(pushRes.data.totalPage)
        }
    }

    //分页
    const changPage =async (value) => {
        setCurrentPage(value)
      await  findPushList(value)
    }

    //输入制品名称
    const onInputName = (e) => {
        setSearchName(e.target.value)
    }
    //搜索
    const onSearch = async () => {
        await  findPushList(1)
    }
    //推送中央仓库
    const pushCenter =async (value) => {
       // setPushLibrary(PushLibrary.concat({id:value.id,state:true}))

        const res=await pushCentralWare(value.id)
        if (res.code===0&&res.data==="ok"){
            await timeTask(value.repositoryId)
        }
    }


    //定时任务
    const timeTask =async (value) => {
        let timer=setInterval(()=>{
            pushResult(value).then(res=>{
                if (res.code===0){
                    if (res.data.length>0){
                        setPushLibraryList(res.data)
                    }else {
                        clearInterval(timer)
                    }
                } else {
                    updatePushVersion(value)
                    clearInterval(timer)
                }
            })
        },2000)
    }


    const updatePushVersion = (value) => {
        const newArray = PushLibrary.map(function(info) {
            if (info.id === value) {
                info.stat = false; // 替换状态
            }
            return info;
        });
         findPushLibraryList(params.id)
        setPushLibrary(newArray)
    }


    return(
        <div className='xpack-setting-width push'>
            <div className='push-up'>
                <BreadcrumbContent firstItem={'推送'}/>
               {/* <Button type="primary" htmlType="submit" >
                     配置信息
                </Button>*/}
                <Btn   type={'primary'}
                       title={'添加推送'}
                       onClick={()=> setAddVisible(true)}/>
            </div>
            <div className='push-search'>
                <Input placeholder={'名称'} value={searchName}  onChange={onInputName}
                       onPressEnter={onSearch}    size='middle' style={{ width: 200 }}   prefix={<SearchOutlined/>} />
            </div>
            <div className='push-table'>
                <Table
                    rowKey = {record => record.id}
                    dataSource={pushLibraryList}
                    columns={columns}
                    pagination={false}
                />
                <Page pageCurrent={currentPage} changPage={changPage} totalPage={totalPage}/>
            </div>

            <LibraryOption {...props} addVisible={addVisible} setAddVisible={setAddVisible}
                           libraryList={libraryList} findNotPushLibraryList={findNotPushLibraryList}
                           createPushLibrary={createPushLibrary}/>
        </div>

    )
}
export default  withRouter(inject('repositoryStore')(observer(LibraryPush)))
