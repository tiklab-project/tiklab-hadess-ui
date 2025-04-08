/**
 * @name: LibraryTableNav
 * @author: limingliang
 * @date: 2023-09-04 16:53
 * @description：左侧抽屉table切换
 * @update: 2023-09-04 16:53
 */
import React,{useEffect} from 'react';
import "./LibraryTableNav.scss"
const LibraryTableNav = (props) => {
    const {tableType,setTableType,libraryVersionData}=props


    return(
        <div className='library-details-tab'>
            <div className={`${tableType==='info'&& ' choose-library-type '}  library-tab-nav`} onClick={()=>setTableType("info")}>制品信息</div>
            {
                libraryVersionData.libraryType!=="docker"&&<div className={`${tableType==='file'&& ' choose-library-type '}  library-tab-nav`} onClick={()=>setTableType("file")}>
                    文件
                    <div className='library-tab-num'>{libraryVersionData?.fileNum}</div>
                </div>
            }
            {
                libraryVersionData.libraryType==="docker"&&
                <div className={`${tableType==='layers'&& ' choose-library-type '}  library-tab-nav`} onClick={()=>setTableType("layers")}>
                    镜像历史
                </div>
            }
            {
                libraryVersionData.libraryType==="docker"&&
                <div className={`${tableType==='manifest'&& ' choose-library-type '}  library-tab-nav`} onClick={()=>setTableType("manifest")}>
                    manifest
                </div>
            }
            <div className={`${tableType==='history'&& ' choose-library-type '}  library-tab-nav`} onClick={()=>setTableType("history")}>
                版本
                <div className='library-tab-num'>{libraryVersionData?.versionNum}</div>
            </div>
        </div>
    )
}
export default LibraryTableNav
