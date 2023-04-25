/**
 * @name: LibraryList
 * @author: limingliang
 * @date: 2022-12-30 10:30
 * @description：制品列表
 * @update: 2022-12-30 10:30
 */
import React, {useState, useEffect} from "react";
import './LibraryList.scss'
import {Input, Select, Table} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
const { Option } = Select;
const options=[{value: 'all', label: '全部类型'}, {value: 'maven', label: 'maven'}, {value: 'npm', label: 'npm'}]
const LibraryList = (props) => {
    const {libraryStore,repositoryStore}=props
    const {findAllRepository}=repositoryStore
    const {findLibraryList,findLibraryNewVersion}=libraryStore

    //搜索的制品名字
    const [name,setName]=useState(null)
    //搜索的制品版本
    const [version,setVersion]=useState(null)
    //所有的制品库列表
    const [repositoryList,setRepositoryList]=useState([])
    //选择的制品库
    const [repository,setRepository]=useState(null)
    //制品列表
    const [libraryList,setLibraryList]=useState([])
    //制品列表
    const [type,setType]=useState()

    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            width:'10%',
            render:(text,record)=><div className='library-name' onClick={()=>goLibraryDetails(record)}> {text}</div>
        },
        {
            title: '类型',
            dataIndex: 'libraryType',
            width:'10%',

        },
        {
            title: '所属制品库',
            dataIndex: ["repository",'name'],
            width:'10%',

        },
        {
            title: '版本',
            dataIndex: 'newVersion',
            width:'10%',

        }
    ];

    useEffect(async () => {
        await findRepository()
        await findLibraryByCondition()
    }, []);

    /**
     * 查询所有的制品库
     */
    const findRepository = async () => {
        const res=await findAllRepository()
        if (res.code===0){
            const  all=[{id:'all',name:"全部制品库"}]
            setRepositoryList(all.concat(res.data))
        }
    }

    /**
     * 查询制品列表
     * @param  type 制品类型
     * @param  repositoryId 制品库id
     */
    const findLibraryByCondition = async (type,repositoryId) => {
        const param={
            repositoryId:repositoryId,
            libraryType:type,
            name:name,
            newVersion:version
        }

        const res=await findLibraryList(param)
        if (res.code===0){
            setLibraryList(res.data)
        }
    }

    /**
     * 跳转制品详情
     * @param  value 选择的制品数据
     */
    const goLibraryDetails =async (value) => {
        const res=await findLibraryNewVersion(value.id)
        if (res.code===0){
            props.history.push(`/index/library/librarySurvey/${res.data.id}`)
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
        await  findLibraryByCondition(type,repository)
    }

    /**
     * 输入搜索制品版本
     * @param  e 输入的制品版本
     */
    const onInputVersion = (e) => {
        const value = e.target.value
        if (value){
            setVersion(value)
        }else {
            setVersion(null)
        }
    }
    /**
     * 制品版本搜索
     */
    const onSearchVersion = async () => {
        await  findLibraryByCondition(type,repository)
    }

    /**
     * 制品类型切换
     * @param value 制品类型
     */
    const cuteType =async (value) => {
        if (value==='all'){
            await findLibraryByCondition(null,repository)
            setType(null)
        }else {
            await findLibraryByCondition(value,repository)
            setType(value)
        }
    }
    /**
     * 通过制品库类型查询
     * @param value 制品类型
     */
    const cuteRepository =async (value) => {
        if (value==='all'){
            setRepository(null)
            await findLibraryByCondition(type)
        }else {
            setRepository(value)
            await findLibraryByCondition(type,value)
        }
    }
    return(
       <div className='library'>
           <div className='library-width'>
               <div className='library-title'>制品</div>
               <div className='library-nav'>
                   <div className=' '>
                       <Input placeholder={'名称'} value={name}  onChange={onInputName}
                              onPressEnter={onSearch}    size='middle' style={{ width: 200 }}   prefix={<SearchOutlined/>} className=' input-style'/>
                       <Input placeholder={'Version'} value={version}  onChange={onInputVersion}
                              onPressEnter={onSearchVersion}    size='middle' style={{ width: 200 }}   prefix={<SearchOutlined/>} className=' input-style'/>
                       <Select    style={{width: 200}}  onChange={cuteType} options={options} placeholder='类型' className='input-style'/>
                       <Select    style={{width: 200}}  onChange={cuteRepository}  placeholder='制品库' className='input-style'>
                           {repositoryList.map(item=>{
                               return(
                                   <Option  key={item.id} value={item.id}>
                                       {item.name}
                                   </Option>
                               )
                           })}
                       </Select>
                   </div>
               </div>
               <div className='library-table'>
                   <Table
                       dataSource={libraryList}
                       columns={columns}
                       pagination={false}
                   />
               </div>
           </div>
       </div>
    )
}
export default withRouter(inject('libraryStore','repositoryStore')(observer(LibraryList)))


