/**
 * @name: Librarys
 * @author: limingliang
 * @date: 2022-12-30 10:30
 * @description：制品列表
 * @update: 2022-12-30 10:30
 */
import React, {useState, useEffect} from "react";
import './LibraryList.scss'
import {Input, Select, Space, Table} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import repositoryService from "../../service/repository.service";
import libraryService from "../../service/library.service";
const { Option } = Select;
const options=[{value: 'all', label: '全部类型'}, {value: 'maven', label: 'maven'}, {value: 'npm', label: 'npm'}]
const LibraryList = (props) => {

    const [name,setName]=useState(null)
    const [version,setVersion]=useState(null)
    const [repositoryList,setRepositoryList]=useState([])   //查询所有制品库list
    const [repository,setRepository]=useState(null)

    const [libraryList,setLibraryList]=useState([])        //查询制品列表

    const [type,setType]=useState()

    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            width:'10%',
            render:(text,record)=><div className='text-blue-500 cursor-pointer' onClick={()=>goLibraryDetails(record)}> {text}</div>
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
        await findLibraryList()
    }, []);

    //查询制品库
    const findRepository =async () => {
       const res=await repositoryService.findAllRepository()
        if (res.code===0){
            const  all=[{id:'all',name:"全部制品库"}]
            setRepositoryList(all.concat(res.data))
        }
    }
    debugger
    //查询制品列表
    const findLibraryList = async (type,repositoryId) => {
        const param={
            repositoryId:repositoryId,
            libraryType:type,
            name:name,
            newVersion:version
        }
       const res = await libraryService.findLibraryList(param)
        if (res.code===0){
            setLibraryList(res.data)
        }
    }
    //跳转制品详情
    const goLibraryDetails =async (value) => {
        const param={
            libraryId: value.id
        }
        //通过制品库的id查询最新版本
        const res= await libraryService.findLibraryNewVersion(param)
        if (res.code===0){
            props.history.push(`/index/library/librarySurvey/${res.data.id}`)
        }
    }


    const onInputName =async (e) => {
        const value = e.target.value
        if (value){
            setName(value)
        }else {
            setName(null)
        }


    }
    const onSearch = async () => {
        await  findLibraryList(type,repository)
    }

    const onInputVersion = (e) => {
        const value = e.target.value
        if (value){
            setVersion(value)
        }else {
            setVersion(null)
        }

    }
    const onSearchVersion = async () => {
        await  findLibraryList(type,repository)
    }

    //切换类型
    const cuteType =async (value) => {
        if (value==='all'){
            await findLibraryList(null,repository)
            setType(null)
        }else {
            await findLibraryList(value,repository)
            setType(value)
        }
    }
    //切换制品库
    const cuteRepository =async (value) => {
        if (value==='all'){
            setRepository(null)
            await findLibraryList(type)
        }else {
            setRepository(value)
            await findLibraryList(type,value)
        }
    }
    return(
       <div className='library'>
           <div className='library-width'>
               <div className='library-title'>制品</div>
               <div className='mt-5'>
                   <div className=' space-x-12'>
                       <Input placeholder={'名称'} value={name}  onChange={onInputName}
                              onPressEnter={onSearch}    size='middle' style={{ width: 200 }}   prefix={<SearchOutlined/>} className='text-gray-400'/>
                       <Input placeholder={'Version'} value={version}  onChange={onInputVersion}
                              onPressEnter={onSearchVersion}    size='middle' style={{ width: 200 }}   prefix={<SearchOutlined/>} className='text-gray-400'/>
                       <Select    style={{width: 200}}  onChange={cuteType} options={options} placeholder='类型'/>
                       <Select    style={{width: 200}}  onChange={cuteRepository}  placeholder='制品库'>
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
               <div className='mt-4'>
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
export default LibraryList


