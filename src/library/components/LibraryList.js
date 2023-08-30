/**
 * @name: LibraryList
 * @author: limingliang
 * @date: 2022-12-30 10:30
 * @description：制品列表
 * @update: 2022-12-30 10:30
 */
import React, {useState, useEffect} from "react";
import './LibraryList.scss'
import {Input, Select, Spin, Table} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
const { Option } = Select;
const options=[{value: 'maven', label: 'maven'}, {value: 'npm', label: 'npm'}]
import libraryStore from "../store/LibraryStore";
import Page from "../../common/page/Page";
import LibraryTable from "./LibraryTable";
import Breadcrumb from "../../common/breadcrumb/Breadcrumb";
import LibraryNav from "./LibraryNav";

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

    const [openState,setOpenState]=useState(false)


    useEffect(async () => {
        if (params.type){
            await findLibraryByCondition({libraryType:params.type},1)
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
        const res=await findRepositoryList(null,type)
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
    const findLibraryByCondition = async (data,currentPage) => {
        setOpenState(true)
        const param={
            ...data,
            name:name,
            newVersion:version,
            groupId:groupId,
            pageParam:{
                currentPage:currentPage,
                pageSize:15,
            }
        }
        const res=await findLibraryListByCondition(param)
        setOpenState(false)
        if (res.code===0){

            setLibraryList(res.data.dataList)
            setTotalPage(res.data.totalPage)
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
        }
    }
    /**
     * 制品名称搜索
     */
    const onSearch = async () => {
        setCurrentPage(1)
        setRepositoryId("all")
        await  findLibraryByCondition({libraryType:type},1)
        await findRepository()
    }

    /**
     * 输入搜索制品版本
     * @param  e 输入的制品版本
     */
    const onInputVersion = (e) => {
        const value = e.target.value
        value?setVersion(value):setVersion(null)
    }
    /**
     * 输入搜索制品groupId
     * @param  e 输入的制品groupId
     */
    const onInputGroup =async (e) => {
        const value = e.target.value
        value?setGroupId(value):setGroupId(null)
    }
    /**
     * 制品版本搜索
     */
    const onSearchVersion = async () => {
        if (repositoryId!=='all'){
            await  findLibraryByCondition({libraryType:type,repositoryId:repositoryId},1)
        }else {
            await  findLibraryByCondition({libraryType:type},1)
        }
    }
    /**
     * 制品版本搜索
     */
    const onSearchGroup = async () => {
        setCurrentPage(1)
        if (repositoryId!=='all'){
            await  findLibraryByCondition({libraryType:type,repositoryId:repositoryId},1)
        }else {
            await  findLibraryByCondition({libraryType:type},1)
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
            await findLibraryByCondition({libraryType:type},1)
        }else {
            await findLibraryByCondition({libraryType:type,repositoryId:value},1)
        }
    }

    const changPage =async (value) => {
        if (repositoryId==='all'){
            await  findLibraryByCondition({libraryType:type},value)
        }else {
            await  findLibraryByCondition({libraryType:type,repositoryId:repositoryId},value)
        }
        setCurrentPage(value)

    }

    return(
        <div className='library'>
            <LibraryNav {...props}  type={type}/>
            <div className='library-right'>
                <Spin  spinning={openState}>
                    <div className={'library-right-data'}>
                        <div className='library-data'>
                            <Breadcrumb  firstItem={"制品"}/>
                            <div className='library-nav'>
                                <Select  value={repositoryId}   style={{width: 200}}  onChange={cuteRepository}  placeholder='制品库' className='input-style'>
                                    {repositoryList.map(item=>{
                                        return(
                                            <Option  key={item.id} value={item.id}>
                                                {item.name}
                                            </Option>
                                        )
                                    })}
                                </Select>

                                <Input placeholder={'名称'} value={name}  onChange={onInputName}
                                       onPressEnter={onSearch}    size='middle' style={{ width: 200 }}   prefix={<SearchOutlined/>} className=' input-style'/>
                                <Input placeholder={'版本'} value={version}  onChange={onInputVersion}
                                       onPressEnter={onSearchVersion}    size='middle' style={{ width: 200 }}   prefix={<SearchOutlined/>} className=' input-style'/>
                                {
                                    type==='maven'&&
                                    <Input placeholder={'制品组名'} value={groupId}  onChange={onInputGroup}
                                           onPressEnter={onSearchGroup}    size='middle' style={{ width: 200 }}   prefix={<SearchOutlined/>} className=' input-style'/>
                                }
                            </div>
                            <div className='library-table xpack-table'>
                                <LibraryTable {...props}  libraryList={libraryList} libraryType={type}/>
                                {
                                    (totalPage>1)?
                                        <Page pageCurrent={currentPage} changPage={changPage} totalPage={totalPage}/>:null
                                }
                            </div>
                        </div>
                    </div>
                </Spin >
            </div>
        </div>
    )
}
export default withRouter(inject('repositoryStore')(observer(LibraryList)))


