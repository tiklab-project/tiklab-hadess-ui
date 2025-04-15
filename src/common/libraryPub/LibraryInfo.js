import React,{useState,useEffect} from "react";
import OverviewUse from "./OverviewUse";
import "./LibraryInfo.scss"
import {observer} from "mobx-react";
import {Tooltip} from "antd";


const LibraryInfo = (props) => {
    const {libraryVersionData}=props

    const [libraryType,setLibraryType]=useState()

    useEffect(async () => {
        libraryVersionData&& setLibraryType(capitalizeFirstLetter(libraryVersionData?.libraryType))

    }, [libraryVersionData]);

    //将首字母大写
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    /**
     * 省略过长路径
     * @param  value
     */
    const omitFiled=(value)=>{
        return(
            value?.length>30?
                <Tooltip placement="topLeft" title={value}>
                    <div style={{
                        display:"flex",
                        overflow: "hidden",
                        maxWidth:"500px",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                    }} >{value}</div>
                </Tooltip>
                :
                <div  >{value}</div>
        )
    }

    return(
        <div className='library-info'>
            <div className='overview-body-title'>基本信息</div>
            <div className='overview-body'>
                <div className='overview-body-left'>
                    <div className='overview-body-item'>
                        <div className='overview-body-item-title'>名称</div>
                        <div>{libraryVersionData?.library?.name}</div>
                    </div>
                    <div className='overview-body-item'>
                        <div className='overview-body-item-title'>仓库</div>
                        <div>{libraryVersionData?.repository?.name}</div>
                    </div>
                    {
                        libraryVersionData?.libraryType==='maven'&&
                        <div className='overview-body-item'>
                            <div className='overview-body-item-title'>GroupID</div>
                            <div>{libraryVersionData?.groupId}</div>
                        </div>
                    }
                    <div className='overview-body-item'>
                        <div className='overview-body-item-title'>版本</div>
                        <div>{libraryVersionData?.version}</div>
                    </div>
                </div>
                <div className='overview-body-right'>
                    <div className='overview-body-item'>
                        <div className='overview-body-item-title'>类型</div>
                        <div className='overview-body-item-type'>
                            <div className='item-type-text'>{libraryType}</div>
                        </div>
                    </div>
                    <div className='overview-body-item'>
                        <div className='overview-body-item-title'>大小</div>
                        <div>{libraryVersionData?.showSize}</div>
                    </div>
                    {
                        libraryVersionData?.libraryType==='maven'&&
                        <div className='overview-body-item'>
                            <div className='overview-body-item-title'>ArtifactID</div>
                            <div>{libraryVersionData?.artifactId}</div>
                        </div>
                    }
                    <div className='overview-body-item'>
                        <div className='overview-body-item-title'>hash</div>
                        <div>{omitFiled(libraryVersionData?.hash)}</div>
                    </div>
                </div>
            </div>

            <div className='overview-body-title'>使用指南</div>
            <OverviewUse {...props} versionData={libraryVersionData}/>
        </div>
    )
}
export default observer(LibraryInfo)
