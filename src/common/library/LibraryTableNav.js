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
    const {tableType,setTableType}=props


    return(
        <div className='library-tab'>
            <div className={`${tableType==='survey'&& ' choose-library-type '}  library-tab-nav`} onClick={()=>setTableType("survey")}>概览</div>
            <div className={`${tableType==='file'&& ' choose-library-type '}  library-tab-nav`} onClick={()=>setTableType("file")}>文件</div>
            <div className={`${tableType==='history'&& ' choose-library-type '}  library-tab-nav`} onClick={()=>setTableType("history")}>历史版本</div>
        </div>
    )
}
export default LibraryTableNav
