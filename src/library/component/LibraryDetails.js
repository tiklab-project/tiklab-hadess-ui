/**
 * @name: LibraryDetails
 * @author: limingliang
 * @date: 2022-12-30 10:30
 * @description：制品详情
 * @update: 2022-12-30 10:30
 */
import React, {useState, useEffect} from "react";
import {Col, Input, Select,Space, Spin} from "antd";
import "./LibraryDetails.scss"
import libraryStore from "../store/LibraryStore";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import {observer} from "mobx-react";
import DetailsTable from "../../common/library/DetailsTable";
const LibraryDetails = (props) => {
    const {match:{params},publicState} = props;
    const {findVersionByLibraryId,libraryVersionData,searchMessage,page,setSearchName,detailsLoad,refresh}=libraryStore


    useEffect(  () => {
        findVersion()
    }, [refresh]);


    //查询版本
    const findVersion = async (versionId) => {
        findVersionByLibraryId(params.libraryId,versionId)
    }



    //跳转
    const goPage = (type) => {
        props.history.push(`/library`)
        if (type==='home'){
            setSearchName(libraryVersionData?.libraryType,searchMessage,page)
        }else if(type==='group'){
            setSearchName(libraryVersionData?.libraryType,libraryVersionData?.groupId,page)
        }else if (type==='name'){
            setSearchName(libraryVersionData?.libraryType,libraryVersionData?.library?.name,page)
        }
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
                <div className='library-details-crumbs'>
                    <LeftOutlined onClick={()=>goPage('home')} style={{color:'#0063FF'}}/>
                    <div className='crumbs-nav-title'>
                        <div>{libraryVersionData?.library?.name}</div>
                        <div>/</div>
                        {
                            libraryVersionData?.libraryType==='maven'&&
                            <>
                                <div>{libraryVersionData?.groupId}</div>
                                <div>/</div>
                            </>
                        }
                        <div>{libraryVersionData?.version}</div>
                    </div>
                </div>
                <DetailsTable {...props} libraryVersionData={libraryVersionData}
                              cuteVersion={findVersion}
                              detailsLoad={detailsLoad}
                              publicState={publicState}

                />
            </Col>
        </div>
    )

}
export  default observer(LibraryDetails)
