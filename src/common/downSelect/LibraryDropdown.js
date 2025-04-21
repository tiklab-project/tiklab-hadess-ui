/**
 * @name: LibraryDropdown
 * @author: limingliang
 * @date: 2024-03-06 10:30
 * @description：下拉查询
 * @update: 2024-03-06 10:30
 */
import React,{useState} from 'react';
import {Dropdown} from 'antd';
import "./LibraryDropdown.scss"
import {CloseCircleTwoTone, DownOutlined} from "@ant-design/icons";
import Print from "../image/Print";
import {observer} from "mobx-react";
const typeList=[{type:'generic',value:'Generic'},{type:'maven',value:'Maven'},{type:'npm',value:'Npm'},{type:'docker',value:'Docker'},
    {type:'helm',value:'Helm'},{type:'go',value:'Go'},{type:'pypi',value:'Pypi'},{type:'composer',value:'Composer'}/*,{type:'nuget',value:'Nuget'}*/]
const LibraryDropdown = (props) => {
    const {visible,setVisible,cuteLibraryType,libraryType,type, down}=props

    //关闭单选
    const onClickLibraryType=(value)=>{
        setVisible(false)
        cuteLibraryType(value)
    }

    const clearValue = (event) => {
        event.stopPropagation();
        event.preventDefault()
        cuteLibraryType()
    }

    const cloneMenu = (
        <div className='down-select'>
            {
                typeList.map(item=>{
                    return(
                        <div key={item.type} className='down-select-nav' onClick={()=>onClickLibraryType(item.type)} >
                            <Print type={item.type} width={20} height={20}/>
                           <div>{item.value}</div>
                        </div>
                    )
                })
            }
        </div>
    )


    return(
        <Dropdown
            overlay={cloneMenu}
            trigger={['click']}
            placement={'bottomLeft'}
            visible={visible}
            onVisibleChange={visible=>setVisible(visible)}
           /* getPopupContainer={()=> down.current}*/
            getPopupContainer={triggerNode => triggerNode.parentElement}
        >
            <div className={`library-dropdown  border-${type}`}>
                <div className={`select-content  select-width-${type}`}>
                    {
                        (libraryType||type==='library')?
                            <div className='select-content-nav'>
                                <Print type={libraryType} width={20} height={20}/>
                                <div>{libraryType}</div>
                            </div>:
                            <div>
                                类型
                            </div>
                    }
                    {
                        (!libraryType||type==='library')?
                            <DownOutlined style={{fontSize:10}} twoToneColor="#52c41a"/>:
                            <CloseCircleTwoTone twoToneColor="#A9A9A9"  onClick={(e) => clearValue(e)}/>

                    }
                </div>
            </div>

        </Dropdown>
    )
}
export default observer(LibraryDropdown)
