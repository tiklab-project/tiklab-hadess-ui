/**
 * @name: LibraryList
 * @author: limingliang
 * @date: 2022-12-30 10:30
 * @description：制品列表
 * @update: 2022-12-30 10:30
 */
import React, {useState, useEffect} from "react";
import './LibraryList.scss'
import {Col, Input, Select, Spin} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
const { Option } = Select;
import libraryStore from "../store/LibraryStore";
import Page from "../../common/page/Page";
import LibraryTable from "./LibraryTable";
import Breadcrumb from "../../common/breadcrumb/Breadcrumb";
import LibraryNav from "./LibraryNav";
import LibrarySelect from "../../common/library/LibrarySelect"

const LibraryList = (props) => {
    const {repositoryStore,match:{params}}=props
    const {findRepositoryList}=repositoryStore
    const {findLibraryListByCondition}=libraryStore

    //搜索的制品名字
    const [name,setName]=useState(null)
    //搜索的制品版本
    const [version,setVersion]=useState(null)

    //搜索的制品group
    const [groupId,setGroupId]=useState(null)

    //所有的制品库列表
    const [repositoryList,setRepositoryList]=useState([])
    //选择的制品库
    const [repositoryId,setRepositoryId]=useState(null)
    //制品列表
    const [libraryList,setLibraryList]=useState([])
    //制品类型
    const [type,setType]=useState()

    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()
    const [totalRecord,setTotalRecord]=useState()

    const [openState,setOpenState]=useState(false)

    const [versionType,setVersionType]=useState("new")   //版本类型
    const [sort,setSort]=useState(null)   //排序


    useEffect(async () => {
        if (params.type){
            await findLibraryByCondition({libraryType:params.type},1,name)
            await findRepository(params.type)
            setType(params.type)
            setName(null)
            setVersion(null)
            setGroupId(null)
            setRepositoryId("all")
        }
    }, [params.type]);

    /**
     * 查询所有的制品库
     */
    const findRepository = async (type) => {
        const res=await findRepositoryList({type:type})
        if (res.code===0){
            const  all=[{id:'all',name:"全部"}]
            setRepositoryList(all.concat(res.data))
        }
    }

    /**
     * 查询制品列表
     * @param  type 制品类型
     * @param  repositoryId 制品库id
     */
    const findLibraryByCondition = async (data,currentPage,sort,name) => {
        setOpenState(true)
        const param={
            ...data,
            name:name,
            newVersion:version,
            groupId:groupId,
            pageParam:{
                currentPage:currentPage,
                pageSize:15,
            },
            sort:sort,
            versionType:versionType
        }
        const res=await findLibraryListByCondition(param)
        setOpenState(false)
        if (res.code===0){
            setLibraryList(res.data.dataList)
            setTotalPage(res.data.totalPage)
            setTotalRecord(res.data.totalRecord)
        }
    }


    /**
     * 输入搜索制品名称
     * @param  e 输入的制品名称
     */
    const onInputName =async (e) => {
        const value = e.target.value
        if (value){
            setName(value)
        }else {
            setName(null)
            setCurrentPage(1)
            findLibraryByCondition({libraryType:type,repositoryId:repositoryId==='all'?null:repositoryId},1,sort)
        }
    }
    /**
     * 制品名称搜索
     */
    const onSearch = async () => {
        setCurrentPage(1)
        setRepositoryId("all")
        await  findLibraryByCondition({libraryType:type},1,sort,name)
        await findRepository()
    }

    /**
     * 输入搜索制品版本
     * @param  e 输入的制品版本
     */
    const onInputVersion = (e) => {
        const value = e.target.value
        value?setVersion(value):setVersion(null)
        if (value===''){
            setCurrentPage(1)
            findLibraryListByCondition({
                libraryType:type,
                repositoryId:repositoryId==='all'?null:repositoryId,
                name:name,
                groupId:groupId,
                pageParam:{
                    currentPage:currentPage,
                    pageSize:15,
                },
                sort:sort,
                versionType:versionType
            }).then(res=>{
                if (res.code===0){
                    setLibraryList(res.data.dataList)
                    setTotalPage(res.data.totalPage)
                    setTotalRecord(res.data.totalRecord)
                }
            })
        }
    }
    /**
     * 输入搜索制品groupId
     * @param  e 输入的制品groupId
     */
    const onInputGroup =async (e) => {
        const value = e.target.value
        value?setGroupId(value):setGroupId(null)
        if (value===''){
            setCurrentPage(1)
            findLibraryListByCondition({
                libraryType:type,
                repositoryId:repositoryId==='all'?null:repositoryId,
                name:name,
                newVersion:version,
                pageParam:{
                    currentPage:currentPage,
                    pageSize:15,
                },
                sort:sort,
                versionType:versionType
            }).then(res=>{
                if (res.code===0){
                    setLibraryList(res.data.dataList)
                    setTotalPage(res.data.totalPage)
                    setTotalRecord(res.data.totalRecord)
                }
            })
        }
    }
    /**
     * 制品版本搜索
     */
    const onSearchVersion = async () => {
        if (repositoryId!=='all'){
            await  findLibraryByCondition({libraryType:type,repositoryId:repositoryId},1,sort,name)
        }else {
            await  findLibraryByCondition({libraryType:type},1,sort,name)
        }
    }
    /**
     * 制品版本搜索
     */
    const onSearchGroup = async () => {
        setCurrentPage(1)
        if (repositoryId!=='all'){
            await  findLibraryByCondition({libraryType:type,repositoryId:repositoryId},1,sort,name)
        }else {
            await  findLibraryByCondition({libraryType:type},1,sort,name)
        }
    }

    /**
     * 通过制品库类型查询
     * @param value 制品类型
     */
    const cuteRepository =async (value) => {
        setRepositoryId(value)
        setCurrentPage(1)
        if (value==='all'){
            await findLibraryByCondition({libraryType:type},1,sort,name)
        }else {
            await findLibraryByCondition({libraryType:type,repositoryId:value},1,sort,name)
        }
    }

    //分页
    const changPage =async (value) => {
        setCurrentPage(value)
        if (repositoryId==='all'){
            await  findLibraryByCondition({libraryType:type},value,sort,name)
        }else {
            await  findLibraryByCondition({libraryType:type,repositoryId:repositoryId},value,sort,name)
        }

    }

    const onChange = (pagination, filters, sorter, extra) => {
        let  param;
        if(repositoryId==='all'){
             param={
                libraryType:type,
            }
        }else {
            param={
                libraryType:type,
                repositoryId:repositoryId
            }
        }
        //降序
        if (sorter.order==='descend'){
            setSort("desc")
            findLibraryByCondition (param,currentPage,"desc",name)
        }
        //升序
        if (sorter.order==='ascend'){
            setSort("asc")
            findLibraryByCondition (param,currentPage,"asc",name)
        }
        if (!sorter.order){
            setSort(null)
            findLibraryByCondition (param,currentPage,null,name)
        }
    }

    // 通过版本类型查询制品
    const findLibraryVersionType = () => {
        setCurrentPage(1)
        findLibraryByCondition({libraryType:params.type},1,sort,name)
    }

    //刷新查询
    const refreshFind = () => {
        if (repositoryId!=='all'){
            findLibraryByCondition({libraryType:type,repositoryId:repositoryId},currentPage,sort,name)
        }else {
            findLibraryByCondition({libraryType:type},currentPage,sort,name)
        }

    }


    return(
        <div className='drop-down library'>
            <LibraryNav {...props}  type={type} setCurrentPage={setCurrentPage}/>
            <div className='library-right'>
                <Col
                    sm={{ span: "24" }}
                    md={{ span: "24" }}
                    lg={{ span: "24" }}
                    xl={{ span: "22", offset: "1" }}
                    xxl={{ span: "18", offset: "3" }}
                >
                    <Spin  spinning={openState} >
                        <div className={'library-right-data'}>
                            <div className='library-data-width'>
                                <Breadcrumb  firstItem={"制品"}/>
                                <div className='library-search-nav'>
                                    <div className='library-nav'>
                                        <Input allowClear placeholder={'搜索名称'} value={name}  onChange={onInputName}
                                               onPressEnter={onSearch}    size='middle' style={{ width: 190 }}
                                               prefix={<SearchOutlined className='input-icon'/>}
                                               className=' input-style'/>
                                        <Input allowClear placeholder={'搜索版本'} value={version}  onChange={onInputVersion}
                                               onPressEnter={onSearchVersion}    size='middle' style={{ width: 190 }}
                                               prefix={<SearchOutlined/>} className=' input-style'/>
                                        {
                                            type==='maven'&&
                                            <Input allowClear placeholder={'搜索制品组名'} value={groupId}  onChange={onInputGroup}
                                                   onPressEnter={onSearchGroup}    size='middle' style={{ width: 190 }}   prefix={<SearchOutlined/>} className=' input-style'/>
                                        }

                                        <Select  defaultValue={repositoryId}   style={{width: 190}}  onChange={cuteRepository}  placeholder='制品库' className='input-style'>
                                            {repositoryList.map(item=>{
                                                return(
                                                    <Option  key={item.id} value={item.id}>
                                                        {item.name}
                                                    </Option>
                                                )
                                            })}
                                        </Select>
                                    </div>
                                    <div className='icon-style'>
                                        <LibrarySelect version={versionType} setVersion={setVersionType} findLibraryVersionType={findLibraryVersionType}/>
                                    </div>
                                </div>

                                <div className='library-table xpack-table'>
                                    <LibraryTable {...props}  libraryList={libraryList} libraryType={type}
                                                  versionType={versionType} onChange={onChange} sort={sort}/>
                                    <Page pageCurrent={currentPage}
                                          changPage={changPage}
                                          totalPage={totalPage}
                                          totalRecord={totalRecord}
                                          refresh={refreshFind}
                                    />
                                </div>
                            </div>
                        </div>
                    </Spin >
                </Col>

            </div>
        </div>
    )
}
export default withRouter(inject('repositoryStore')(observer(LibraryList)))


