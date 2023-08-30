/**
 * @name: LibraryList
 * @author: limingliang
 * @date: 2022-12-27 10:30
 * @description：制品列表
 * @update: 2022-12-27 10:30
 */
import React, {useState, useEffect} from "react";
import './Library.scss'
import {Input} from "antd";
import { SearchOutlined} from "@ant-design/icons";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
import Page from "../../common/page/Page";
import Breadcrumb from "../../common/breadcrumb/Breadcrumb";
import LibraryTable from "./LibraryTable";
import libraryStore from "../../library/store/LibraryStore";
const LibraryList = (props) => {
    const {repositoryStore,match:{params}} = props;
    const {findRepository,repositoryData}=repositoryStore
    const {findLibraryListByRepository}=libraryStore

    const [name,setName]=useState(null)   //搜索的名称
    const [groupId,setGroupId]=useState(null)  //搜索的groupId
    const [artifactId,setArtifactId]=useState(null)    //搜索的ArtifactId
    const [version,setVersion]=useState(null)    //搜索的版本
    const [libraryList,setLibraryList]=useState([])  //制品list

    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()

    useEffect(async () => {
        await findLibraryList()
        await findRepository(params.id)
    }, [params.id]);


    //通过条件查询制品
    const findLibraryList =async (currentPage) => {
        const param={
            repositoryId:params.id,
            name:name,
            newVersion:version,
            groupId:groupId,
            artifactId:artifactId,
            pageParam:{
                currentPage:currentPage,
                pageSize:15,
            }
        }
         findLibraryListByRepository(param).then(res=>{
            if (res.code===0){
                setLibraryList(res.data.dataList)
                setTotalPage(res.data.totalPage)
            }
        })
    }

    const onInputName =async (e) => {
        const value = e.target.value
        setName(value)
    }
    const onInputGroupId =async (e) => {
        setGroupId(e.target.value)
    }
    const onInputArtifactId =async (e) => {
      setArtifactId(e.target.value)
    }
    const onInputVersion =async (e) => {
      setVersion(e.target.value)
    }
    const onSearch = async () => {
        await  findLibraryList()
    }

    //分页
    const changPage =async (value) => {
        setCurrentPage(value)
        await findLibraryList(value)
    }
    return(
        <div className='repositoryLibrary'>
            <div className='repository-library-width'>
                <Breadcrumb firstItem={"制品"}/>
                <div className='library-mt'>
                    <div className={'library-flex'}>
                        <Input placeholder={'名称'} value={name}  onChange={onInputName}
                               onPressEnter={onSearch}    size='middle' style={{ width: 200 }}   prefix={<SearchOutlined/>} className=' '/>
                        {repositoryData?.type==="maven"&&
                            <div className={'library-flex'}>
                                <Input placeholder={'Group Id'} value={groupId}  onChange={onInputGroupId}
                                       onPressEnter={onSearch}    size='middle' style={{ width: 200 }}   prefix={<SearchOutlined/>} className='library-border '/>
                                <Input placeholder={'Artifact Id'} value={artifactId}  onChange={onInputArtifactId}
                                       onPressEnter={onSearch}    size='middle' style={{ width: 200 }}   prefix={<SearchOutlined/>} className='library-border '/>

                            </div>
                           }
                        <Input placeholder={'Version'} value={version}  onChange={onInputVersion}
                               onPressEnter={onSearch}    size='middle' style={{ width: 200 }}   prefix={<SearchOutlined/>} className='library-border '/>
                    </div>
                    <div className='library-mt'>
                        <LibraryTable {...props}  libraryList={libraryList} libraryType={repositoryData?.type} repositoryId={repositoryData.id}/>

                        {
                            (totalPage>1)?
                                <Page pageCurrent={currentPage} changPage={changPage} totalPage={totalPage}/>:null
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}
export default withRouter(inject('repositoryStore')(observer(LibraryList)))
