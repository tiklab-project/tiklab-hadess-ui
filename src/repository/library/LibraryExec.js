/**
 * @name: LibraryExec
 * @author: limingliang
 * @date: 2022-12-30 10:30
 * @description：制品执行
 * @update: 2022-12-30 10:30
 */

import React,{useState,useEffect} from 'react';
import "./LibraryExec.scss"
import {Button, Divider, Dropdown, Popconfirm, Radio, Space, Tooltip} from 'antd';
import {EllipsisOutlined} from "@ant-design/icons";
const LibraryExec = (props) => {

    const {library,deleteLibrary}=props
    const [cloneVisible,setCloneVisible] = useState(false) //执行弹窗

    //删除操作
    const deleteExec= (library) => {
        setCloneVisible(false)
    }

    const handDropdown = (value) => {
        setCloneVisible(value)
    }


    const cloneMenu = (
        <div className='library-menu'>
                <div className='library-menu-style' onClick={deleteExec}>
                    <Popconfirm
                        title="你确定删除吗"
                        onConfirm={()=>deleteLibrary(library.id)}
                        okText="确定"
                        cancelText="取消"
                        placement="topRight"
                    >
                       删除
                    </Popconfirm>
                </div>
        </div>
    )
    return(
        <Dropdown
            overlay={cloneMenu}
            trigger={['click']}
            placement={'bottomRight'}
            visible={cloneVisible}
            onVisibleChange={handDropdown}
        >
            <div  onClick={()=>setCloneVisible(!cloneVisible)}>
                <EllipsisOutlined style={{fontSize:16}}/>
            </div>
        </Dropdown>
    )
}
export default LibraryExec
