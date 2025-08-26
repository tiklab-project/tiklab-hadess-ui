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
    {type:'go',value:'Go'},{type:'pypi',value:'Pypi'},{type:'helm',value:'Helm'},{type:'nuget',value:'Nuget'},{value: 'Composer', type: 'composer'},
    {type: 'conan', value: 'Conan'},
]
const LibraryNav = (props) => {
    const {type}=props

    const choiceType =async (type) => {
        props.history.push(`/library/${type}`)
    }
    return(
        <div className='library-left'>

            <div className='library-left-nav'>
                {   typeList.map(item=>{
                    return(
                        <div key={item.type} className={`library-left-nav-hover ${item.type===type?'choice-table-nav':'library-left-item' }  `} onClick={()=>choiceType(item.type)}>
                        <div className={` library-left-item-bar`} >
                            <Print type={item.type} width={20} height={20}/>
                            <div className={` library-left-item-text`}>{item.value}</div>
                        </div>
                    </div>)
                })}
            </div>
        </div>
    )
}
export default LibraryNav
