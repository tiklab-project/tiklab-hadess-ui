/**
 * @name: BasicsDown
 * @author: limingliang
 * @date: 2024-08-27 10:30
 * @description： 基础下拉查询
 * @update: 2024-08-27 10:30
 */
import React from 'react';
import {Dropdown} from 'antd';
import "./BasicsDown.scss"
import {CloseCircleTwoTone, DownOutlined} from "@ant-design/icons";
const BasicsDown = (props) => {
    const {visible,setVisible,dataList,cuteValue,value,size,type}=props

    //关闭单选
    const onClickLibraryType=(value)=>{
        setVisible(false)
        cuteValue(value)
    }

    const clearValue = (event) => {
        event.stopPropagation();
        event.preventDefault()
        cuteValue()
    }

    //基本的
    const basicsMenu = (
        <div className={ `basics-down-select select-width-${size}`}>
            {
                dataList.map(item=>{
                    return(
                        <div key={item.value} className='down-select-nav' onClick={()=>onClickLibraryType(item)} >
                            <div>{item.label}</div>
                        </div>
                    )})
            }
        </div>
    )
    //仓库的
    const repositoryMenu = (
        <div className={ `basics-down-select select-width-${size}`}>
            {
                dataList.length>0?dataList.map(item=>{
                    return(
                        <div key={item.id} className='down-select-rpy-nav' onClick={()=>onClickLibraryType(item)} >
                            <div className='rpy-nav-name'>{item.name}</div>
                            <div className='rpy-nav-desc'>
                                {item.repositoryType==='remote'&&'远程库'||
                                 item.repositoryType==='local'&&'本地库'||
                                 item.repositoryType==='group'&&'组合库'
                                }
                            </div>
                        </div>
                    )}):
                    <div className='down-select-rpy-non'>没有查询到仓库</div>
            }
        </div>
    )

    return(
        <Dropdown
            overlay={type==='repository'?repositoryMenu:basicsMenu}
            trigger={['click']}
            placement={'bottomLeft'}
            visible={visible}
            onVisibleChange={visible=>setVisible(visible)}
            getPopupContainer={triggerNode => triggerNode.parentElement}
        >

            <div className={`basic-dropdown`}>
                <div className={`select-content select-width-${size}`}>
                    {
                        value?
                            <>
                                <div>{value}</div>
                                {
                                    type==='repository'?
                                        <DownOutlined style={{fontSize:10}} twoToneColor="#52c41a"/>:
                                        <CloseCircleTwoTone twoToneColor="#A9A9A9"  onClick={(e) => clearValue(e)}/>
                                }
                            </>
                            :
                            <>
                                <div>{type==='repository'?"请选择仓库":"种类"}</div>
                                <DownOutlined style={{fontSize:10}} twoToneColor="#52c41a"/>
                            </>

                    }
                </div>
            </div>

        </Dropdown>
    )

}
export default BasicsDown
