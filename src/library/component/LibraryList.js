/**
 * @name: LibraryList
 * @author: limingliang
 * @date: 2022-12-30 10:30
 * @description：制品列表
 * @update: 2022-12-30 10:30
 */
import React, {useState, useEffect, useRef} from "react";
import './LibraryList.scss'
import {Col,Tooltip, Spin} from "antd";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
import libraryStore from "../store/LibraryStore";
import Breadcrumb from "../../common/breadcrumb/Breadcrumb";
import Page from "../../common/page/Page";
import LibraryTable from "../../common/library/LibraryTable";
import {SpinLoading} from "../../common/loading/Loading";
import LibraryDropdown from "../../common/downSelect/LibraryDropdown";
import SearchInput from "../../common/input/SearchInput";
import sortDesc from "../../assets/images/img/sortDesc.png"
import sortAsc from "../../assets/images/img/sortAsc.png"
const LibraryList = (props) => {
    const {repositoryStore,match:{params}}=props
    const {findLibraryListByCond,searchMessage,libraryType,setLibraryType,
        libraryLoad,page,setDetailsType,setSearchName,refresh,deleteLibrary}=libraryStore

    //制品列表
    const [libraryList,setLibraryList]=useState([])
    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()
    const [totalRecord,setTotalRecord]=useState()

    //搜索信息
    const [searchInfo,setSearchInfo]=useState('')
    const [placeholder,setPlaceholder]=useState('搜索名字、组名、版本')

    //切换类型状态
    const [visible,setVisible]=useState(false)

    const [sort,setSort]=useState("asc")

    useEffect(async () => {
        if (!libraryType){
            setLibraryType("maven")
            await findLibraryByCondition("maven",page)
        }else if (libraryType||searchMessage){
            await findLibraryByCondition(libraryType,page,searchMessage)
            setSearchInfo(searchMessage)
            setCurrentPage(page)
        }else {
            await findLibraryByCondition(libraryType,page)
        }
    }, [sort,refresh]);




    /**
     * 查询制品列表
     * @param  type 制品类型
     * @param  repositoryId 制品库id
     */
    const findLibraryByCondition = async (libraryType,currentPage,searchInfo) => {
        const param={
            libraryType:libraryType,
            searchName:searchInfo,
            pageParam:{
                currentPage:currentPage,
                pageSize:15,
            },
            sort:sort
        }
        const res=await findLibraryListByCond(param)
        if (res.code===0){
            setLibraryList(res.data.dataList)
            setTotalPage(res.data.totalPage)
            setTotalRecord(res.data.totalRecord)
        }
    }

    //输入搜索的信息
    const onInputName = (e) => {
        const value=e.target.value
        setSearchInfo(value)
        if (value===''){
            setCurrentPage(1)
            findLibraryByCondition(libraryType,1)
        }

    }
    const onSearch = () => {
        setCurrentPage(1)
        findLibraryByCondition(libraryType,1,searchInfo)
    }

    //切换类型
    const cuteLibraryType = (value) => {
        setLibraryType(value)
        if (value==='maven'){
            setPlaceholder("搜索名字、组名、版本")
        }else {
            setPlaceholder("搜索名字、版本")
        }
        setCurrentPage(1)
        setLibraryType(value)
        findLibraryByCondition(value,1,searchInfo)
    }


    const refreshFind = () => {
        findLibraryByCondition(libraryType,currentPage,searchInfo)
    }
    //分页查询
    const changPage = (value) => {
        setCurrentPage(value)
        findLibraryByCondition(libraryType,value,searchInfo)
    }

    //跳转详情
    const goDetails = (library) => {
        setSearchName(libraryType,searchInfo,currentPage)
        props.history.push(`/library/${library.id}/details`)
    }
    //跳转详情的类型
    const goDetailsType = (library,type) => {
        setSearchName(libraryType,searchInfo,currentPage)
        setDetailsType(type)
        props.history.push(`/library/${library.id}/details`)

    }


    const down = useRef();
    return(
        <div className='library hadess-data-width'>
            <Col
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "20", offset: "2" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <Breadcrumb  firstItem={"搜索"}/>
                <div className='library-data-style'>
                    <div className='library-head-style'>
                        <div className='library-head-Select' ref = {down}>
                            <LibraryDropdown
                                visible={visible}
                                setVisible={setVisible}
                                libraryType={libraryType}
                                cuteLibraryType={cuteLibraryType}
                                down = {down}
                                type={"library"}
                            />

                            <SearchInput
                                placeholder={placeholder}
                                onChange={onInputName}
                                onPressEnter={onSearch}
                                defaultValue={searchMessage}
                                type={'library'}
                            />
                        </div>
                        {
                            sort==='asc'?
                                <Tooltip placement="top" title={"升序"}>
                                    <img  src={sortAsc}  style={{width:22,height:22}} className='library-head-icon' onClick={()=>setSort("desc")}/>
                                </Tooltip>:
                                <Tooltip placement="top" title={"降序"}>
                                    <img  src={sortDesc}  style={{width:22,height:22}} className='library-head-icon' onClick={()=>setSort("asc")}/>
                                </Tooltip>
                        }
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
                                  pageType={"library"}
                            />
                        </>: <SpinLoading type="table"/>
                    }
                </div>
            </Col>
        </div>
    )
}
export default withRouter(inject('repositoryStore')(observer(LibraryList)))


