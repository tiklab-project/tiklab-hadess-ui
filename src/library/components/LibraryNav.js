/**
 * @name: LibraryNav
 * @author: limingliang
 * @date: 2023-08-29 10:30
 * @description：制品左侧导航栏
 * @update: 2023-08-29 10:30
 */
import React from "react";
import Print from "../../common/image/Print";
import "./LibraryNav.scss"
const typeList=[{type:'generic',value:'Generic'},{type:'maven',value:'Maven'},{type:'npm',value:'Npm'},{type:'docker',value:'Docker'},
    {type:'helm',value:'Helm'},{type:'go',value:'Go'}/*,{type:'pypi',value:'Pypi'},{type:'nuget',value:'Nuget'}*/]
const LibraryNav = (props) => {
    const { type,setCurrentPage}=props

    //切换类型
    const choiceType =async (type) => {
        //切换类型初始化分页
        setCurrentPage(1)
        props.history.push(`/library/${type}`)
    }
    return(
        <div className='library-left'>
            <div className='library-left-nav'>
                {   typeList.map(item=>{
                    return(<div key={item.type} className={`${item.type===type?'choice-table-nav':'library-left-item' }  `}>
                        {
                            (item.type==="maven"||  item.type==="npm"||item.type==="generic"||item.type==="docker"||item.type==="helm"||item.type==="go")?
                                <div className={`library-left-item-bar`} onClick={()=>choiceType(item.type)}>
                                    <Print type={item.type} width={20} height={20}/>
                                    <div className={` library-left-item-text`}>{item.value}</div>
                                </div>:
                                <div style={{display:'flex'}} >
                                    <Print type={item.type} width={20} height={20}/>
                                    <div className={`library-left-item-text`} >{item.value}</div>
                                </div>
                        }
                    </div>)
                })}
            </div>
        </div>
    )
}
export default LibraryNav
