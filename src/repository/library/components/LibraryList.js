/**
 * @name: LibraryList
 * @author: limingliang
 * @date: 2022-12-30 10:30
 * @description：制品列表
 * @update: 2022-12-30 10:30
 */
import React, {useState, useEffect} from "react";
import "./LibraryList.scss"
import {Col, Input} from "antd";
import Breadcrumb from "../../../common/breadcrumb/Breadcrumb";
import {PrivilegeProjectButton} from "tiklab-privilege-ui";
import Btn from "../../../common/btn/Btn";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
import SearchInput from "../../../common/input/SearchInput";
import {SearchOutlined} from "@ant-design/icons";
import LibraryTable from "../../../common/library/LibraryTable";
import libraryStore from "../../../library/store/LibraryStore";
import Page from "../../../common/page/Page";
import LibraryUpload from "../LibraryUpload";
import {SpinLoading} from "../../../common/loading/Loading";
const { Search } = Input;
const LibraryList = (props) => {
    const {repositoryStore,match:{params},publicState} = props;
    const {findRepository,repositoryData}=repositoryStore
    const {findLibraryListByRepository,searchMessage,libraryLoad,setDetailsType,refresh,  deleteLibrary}=libraryStore

    const [name,setName]=useState(null)   //搜索的名称
    const [groupId,setGroupId]=useState(null)  //搜索的groupId
    const [version,setVersion]=useState(null)    //搜索的版本

    //制品列表
    const [libraryList,setLibraryList]=useState([])
    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()
    const [totalRecord,setTotalRecord]=useState()

    const [visible,setVisible]=useState(false)
    const [uploadState,setUploadState]=useState(false)  //推送状态

    useEffect(async () => {
        if (searchMessage){
            await findLibraryList(1,searchMessage)
        }else {
            await findLibraryList(1)
        }
    }, [uploadState,refresh]);


    useEffect(async () => {
        await findLibraryList(currentPage,name)
    }, [refresh]);

    //通过条件查询制品
    const findLibraryList =async (currentPage,name) => {
        findLibraryListByRepository({ pageParam:{currentPage:currentPage, pageSize:15},
            repositoryId:params.id,
            name:name,
            groupId:groupId,
            newVersion:version,
        }).then(res=>{
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
                repositoryId:params.id,
                groupId:groupId,
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
    const onInputGroupId =async (e) => {
        const value = e.target.value
        setGroupId(value)
        if (value===''){
            setCurrentPage(1)
            findLibraryListByRepository({ pageParam:{currentPage:1, pageSize:15},
                repositoryId:params.id,
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
                repositoryId:params.id,
                name:name,
            }).then(res=>{
                if (res.code===0){
                    setLibraryList(res.data.dataList)
                    setTotalPage(res.data.totalPage)
                    setTotalRecord(res.data.totalRecord)
                }
            })
        }
    }

    const onSearch = () => {
          findLibraryList(1,name)
    }

    //刷新查询
    const refreshFind = () => {
        findLibraryList(currentPage,name)
    }

    //分页
    const changPage = (value) => {
        setCurrentPage(value)
        findLibraryList(value,name)
    }

    //跳转详情
    const goDetails = (value) => {
        props.history.push(`/repository/${params.id}/library/${value.id}`)
    }

    const goDetailsType = (library,type) => {
        setDetailsType(type)
        props.history.push(`/library/${library.id}/details`)
    }


    return(
        <div className='rpy-library hadess-data-width'>
            <Col
                sm={{ span: "22" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "20", offset: "2" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <div className='rpy-library-head-nav'>
                    <Breadcrumb firstItem={"制品"}/>
                    {
                        (repositoryData?.repositoryType==="local"&&(repositoryData?.type==="maven"||repositoryData?.type==="generic"))&&
                       /* <PrivilegeProjectButton code={"library_rpy_upload"} domainId={params.id} >
                            <Btn   type={'primary'}
                                   title={'上传制品'}
                                   onClick={()=> setVisible(true)}
                            />
                        </PrivilegeProjectButton>*/
                        <Btn   type={'primary'}
                        title={'上传制品'}
                        onClick={()=> setVisible(true)}
                        />
                    }
                </div>
                <div className={'rpy-library-search'}>
                    <SearchInput
                        placeholder={'搜索名称'}
                        onChange={onInputName}
                        onPressEnter={onSearch}
                    />
                    {repositoryData?.type==="maven"&&
                        <div className={'library-flex'}>
                            <SearchInput
                                placeholder={'搜索组名'}
                                onChange={onInputGroupId}
                                onPressEnter={onSearch}
                            />
                        </div>
                    }
                    <div >
                        <SearchInput
                            placeholder={'搜索版本'}
                            onChange={onInputVersion}
                            onPressEnter={onSearch}
                        />
                    </div>
                </div>
                {
                    libraryLoad?<>
                        <LibraryTable libraryList={libraryList}
                                      goDetails={goDetails}
                                      goDetailsType={goDetailsType}
                                      deleteLibrary={deleteLibrary}
                        />
                        <Page pageCurrent={currentPage}
                              changPage={changPage}
                              totalPage={totalPage}
                              totalRecord={totalRecord}
                              refresh={refreshFind}
                        />
                    </>: <SpinLoading type="table"/>
                }


                <LibraryUpload visible={visible}
                               setVisible={setVisible}
                               repositoryId={params.id}
                               type={repositoryData?.type}
                               setUploadState={setUploadState}/>
            </Col>
        </div>
    )

}
export default withRouter(inject('repositoryStore')(observer(LibraryList)))
