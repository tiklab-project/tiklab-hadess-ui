/**
 * @name: LibraryDetails
 * @author: limingliang
 * @date: 2022-12-30 10:30
 * @description：制品详情
 * @update: 2022-12-30 10:30
 */
import React, {useState, useEffect} from "react";
import {Col, Empty,Typography} from "antd";
import "./LibraryDetails.scss"
import {observer} from "mobx-react";
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import DetailsTable from "../../../common/library/DetailsTable";
import libraryStore from "../../../library/store/LibraryStore";
const LibraryDetails = (props) => {
    const {match:{params},publicState} = props;
    const {findVersionByLibraryId,libraryVersionData,detailsLoad,deleteLibrary,refresh}=libraryStore

    //文件失败
    const [fileState,setFileState]=useState(true)

    useEffect(  () => {
        findVersion()
    }, [refresh]);

    //查询版本
    const findVersion = async (versionId) => {
        findVersionByLibraryId(params.libraryId,versionId).then(res=>{
            //文件不存在
            if (res.code===57404){
                setFileState(false)
            }
        })
    }

    const deleteFile = () => {
        deleteLibrary(params.libraryId).then(res=>{
            res.code===0&&props.history.push(`/repository/${params.id}/library`)
        })
    }

    /**
     * 跳转到上一级路由
     */
    const goBack = () => {
        props.history.go(-1)
    }

    return(
        <div className='library-details hadess-data-width'>
            <Col
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "20", offset: "2" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <BreadcrumbContent className='add-title' firstItem={"制品详情"} goBack={goBack}/>
                {
                    fileState?
                        <DetailsTable {...props} libraryVersionData={libraryVersionData}
                                      cuteVersion={findVersion}
                                      detailsLoad={detailsLoad}
                                      publicState={publicState}
                        />:
                        <div className='library-details-not'>
                            <Empty
                                   description={
                                       <Typography.Text>
                                           制品文件不存在 <a onClick={deleteFile}>删除</a>
                                       </Typography.Text>
                                   }
                            />
                        </div>
                }

            </Col>
        </div>
    )

}
export  default observer(LibraryDetails)
