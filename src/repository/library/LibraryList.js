/**
 * @name: LibraryList
 * @author: limingliang
 * @date: 2022-12-27 10:30
 * @description：制品列表
 * @update: 2022-12-27 10:30
 */
import React, {useState, useEffect} from "react";
import './Library.scss'
import {Input,Col} from "antd";
import { SearchOutlined} from "@ant-design/icons";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
import Page from "../../common/page/Page";
import Breadcrumb from "../../common/breadcrumb/Breadcrumb";
import LibraryTable from "./LibraryTable";
import libraryStore from "../../library/store/LibraryStore";
import Btn from "../../common/btn/Btn";
import LibraryUpload from "./LibraryUpload";
import LibrarySelect from "../../common/library/LibrarySelect"
import {PrivilegeProjectButton} from 'thoughtware-privilege-ui';
const LibraryList = (props) => {
    const {repositoryStore,match:{params}} = props;
    const {findRepository,repositoryData}=repositoryStore
    const {findLibraryListByRepository,refresh}=libraryStore

    const [name,setName]=useState(null)   //搜索的名称
    const [groupId,setGroupId]=useState(null)  //搜索的groupId
    const [version,setVersion]=useState(null)    //搜索的版本
    const [libraryList,setLibraryList]=useState([])  //制品list

    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()
    const [totalRecord,setTotalRecord]=useState()

    const [visible,setVisible]=useState(false)
    const [uploadState,setUploadState]=useState(false)  //推送状态

    const [versionType,setVersionType]=useState("new")   //版本类型
    const [sort,setSort]=useState(null)

    useEffect(async () => {
        await findRepository(params.id)
    }, [params.id]);


    useEffect(async () => {

        await findLibraryList(currentPage,name,sort)
    }, [uploadState,params.id,refresh]);


    //通过条件查询制品
    const findLibraryList =async (currentPage,name,sort) => {

         findLibraryListByRepository({ pageParam:{currentPage:currentPage, pageSize:15},
                versionType:versionType,
                 repositoryId:params.id,
                 name:name,
                 sort:sort,
                 newVersion:version,
                 groupId:groupId}).then(res=>{
                if (res.code===0){
                    setLibraryList(res.data.dataList)
                    setTotalPage(res.data.totalPage)
                    setTotalRecord(res.data.totalRecord)
                }
        })
    }



    //制品名称
    const onInputName =async (e) => {
        const value = e.target.value
        setName(value)
        if (value===''){
            setCurrentPage(1)
            findLibraryListByRepository({ pageParam:{currentPage:1, pageSize:15},
                versionType:versionType,
                repositoryId:params.id,
                sort:sort,
                newVersion:version,
                groupId:groupId}).then(res=>{
                if (res.code===0){
                    setLibraryList(res.data.dataList)
                    setTotalPage(res.data.totalPage)
                    setTotalRecord(res.data.totalRecord)
                }
            })
        }
    }
    const onInputGroupId =async (e) => {
        const value = e.target.value
        setGroupId(value)
        if (value===''){
            setCurrentPage(1)
            findLibraryListByRepository({ pageParam:{currentPage:1, pageSize:15},
                versionType:versionType,
                repositoryId:params.id,
                sort:sort,
                name:name,
                newVersion:version,
              }).then(res=>{
                if (res.code===0){
                    setLibraryList(res.data.dataList)
                    setTotalPage(res.data.totalPage)
                    setTotalRecord(res.data.totalRecord)
                }
            })
        }
    }

    const onInputVersion =async (e) => {
        const value = e.target.value
       setVersion(value)
        if (value===''){
            setCurrentPage(1)
            findLibraryListByRepository({ pageParam:{currentPage:1, pageSize:15},
                versionType:versionType,
                repositoryId:params.id,
                sort:sort,
                name:name,
                groupId:groupId
            }).then(res=>{
                if (res.code===0){
                    setLibraryList(res.data.dataList)
                    setTotalPage(res.data.totalPage)
                    setTotalRecord(res.data.totalRecord)
                }
            })
        }
    }

    //制品名称搜索
    const onSearch = async () => {
        await  findLibraryList(1,name,sort)
    }

    //分页
    const changPage =async (value) => {
        setCurrentPage(value)
        await findLibraryList(value,name,sort)
    }

    //刷新查询
    const refreshFind = () => {
        findLibraryList(currentPage,name,sort)
    }

    //切换全部版本、正式版本查询
    const findLibraryVersionType = () => {
        findLibraryList(1,name,sort)
    }


    //排序查询
    const onChange = (pagination, filters, sorter, extra) => {
        //降序
        if (sorter.order==='descend'){
            setSort("desc")
            findLibraryList (currentPage,name,"desc")
        }
        //升序
        if (sorter.order==='ascend'){
            setSort("asc")
            findLibraryList (currentPage,name,"asc")
        }
        if (!sorter.order){
            setSort(null)
            findLibraryList (currentPage,name)
        }
    }

    return(
        <div className='rpy-library hadess-data-width'>
            <Col
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "20", offset: "2" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <div className='rpy-library-head-nav'>
                    <Breadcrumb firstItem={"制品"}/>
                    {
                        (repositoryData?.repositoryType==="local"&&(repositoryData?.type==="maven"||repositoryData?.type==="generic"))&&
                        <PrivilegeProjectButton code={"library_rpy_upload"} domainId={params.id} >
                            <Btn   type={'primary'}
                                   title={'上传制品'}
                                   onClick={()=> setVisible(true)}
                            />
                        </PrivilegeProjectButton>
                    }
                </div>

                <div className='rpy-library-mt'>
                    <div className='rpy-library-search-nav'>
                        <div className={'library-flex'}>
                            <Input allowClear placeholder={'搜索名称'} value={name}  onChange={onInputName}
                                   onPressEnter={onSearch}    size='middle' style={{ width: 200 }}
                                   prefix={<SearchOutlined  className='input-icon'/>} />
                            {repositoryData?.type==="maven"&&
                                <div className={'library-flex'}>
                                    <Input allowClear placeholder={'搜索组名'} value={groupId}  onChange={onInputGroupId}
                                           onPressEnter={onSearch}    size='middle' style={{ width: 200 }}
                                           prefix={<SearchOutlined className='input-icon'/>}
                                    />
                                </div>
                            }
                            <Input allowClear placeholder={'搜索版本'} value={version}  onChange={onInputVersion}
                                   onPressEnter={onSearch}    size='middle' style={{ width: 200 }}
                                   prefix={<SearchOutlined className='input-icon'/>}
                            />
                        </div>
                        <div className='icon-style'>
                            <LibrarySelect version={versionType} setVersion={setVersionType} findLibraryVersionType={findLibraryVersionType}/>
                        </div>
                    </div>

                    <div className='rpy-library-mt'>
                        <LibraryTable {...props}  libraryList={libraryList}
                                      libraryType={repositoryData?.type}
                                      onChange={onChange}  versionType={versionType}/>
                        <Page pageCurrent={currentPage}
                              changPage={changPage}
                              totalPage={totalPage}
                              totalRecord={totalRecord}
                              refresh={refreshFind}
                        />
                    </div>
                </div>
                <LibraryUpload visible={visible}
                               setVisible={setVisible}
                               repositoryId={params.id}
                               type={repositoryData.type}
                               setUploadState={setUploadState}/>
            </Col>
        </div>
    )
}
export default withRouter(inject('repositoryStore')(observer(LibraryList)))
