/**
 * @name: LibrarySelect
 * @author: limingliang
 * @date: 2022-12-30 10:30
 * @description：制品查询
 * @update: 2022-12-30 10:30
 */

import React,{useState,useEffect} from 'react';
import "./LibrarySelect.scss"
import {Button, Divider, Dropdown, Radio, Space} from 'antd';
import moreCon from "../../assets/images/img/moreCon.png";
import Btn from "../../common/btn/Btn";
const LibrarySelect = (props) => {
    const {version,setVersion,findLibraryVersionType}=props

    const [cloneVisible,setCloneVisible] = useState(false)

    const onChange = (e) => {
        setVersion(e.target.value);
    };

    const onFinish = () => {
        findLibraryVersionType()
        setCloneVisible(false)
    }

    const cloneMenu = (
        <div className='select-menu'>
            <div className='select-item'>
                <div className='select-title'>版本</div>
                <Radio.Group onChange={onChange} value={version}>
                    <Space direction="vertical">
                        <Radio value={"new"}>最新版本(默认)</Radio>
                        <Radio value={'all'}>全部版本</Radio>
                    </Space>
                </Radio.Group>
            </div>
            <div className='select-exec'>

                <Btn onClick={()=>setCloneVisible(false)} title={'取消'} isMar={true}/>
                <Btn onClick={onFinish} title={'确定'} type={'primary'}/>
            </div>
        </div>
    )

    return(
        <Dropdown
            overlay={cloneMenu}
            trigger={['click']}
            placement={'bottomRight'}
            visible={cloneVisible}
            onVisibleChange={visible=>setCloneVisible(visible)}
        >
            <div  onClick={()=>setCloneVisible(!cloneVisible)}>
                <img  src={moreCon}  style={{width:30,height:30}} />
            </div>
        </Dropdown>
    )
}
export default LibrarySelect
