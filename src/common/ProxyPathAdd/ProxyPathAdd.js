/**
 * @name: ProxyPathAdd
 * @author: limingliang
 * @date: 2024-01-22 10:30
 * @description：代理地址弹窗
 * @update: 2024-01-22 10:30
 */

import React, {useState,useEffect} from "react";
import Btn from "../btn/Btn";
import "./ProxyPathadd.scss"
import {Input, Radio, Table} from "antd";
import {observer} from "mobx-react";
const ProxyPathAdd = (props) => {
    const {visible,setVisible,proxyPathList,setProxyPathList,remoteProxyList,type}=props

    const [addProxy,setAddProxy]=useState([])   //table中选中的代理
    const [selectedRowKeys,setSelectedRowKeys]=useState([])   //table选中的id

    const [rootType,setRootType]=useState("public")
    const [proxyName,setProxyName]=useState('')  //自定义的代理名字
    const [proxyPath,setProxyPath]=useState('')  //自定义的代理地址


    useEffect(async () => {
        setRootType("public")
        setAddProxy([])
        setSelectedRowKeys([])
    }, [visible]);

    const columns = [
        {
            title: '名称',
            dataIndex: 'agencyName',
            key:"agencyName",
            width:'50%',
        },
        {
            title: '地址',
            dataIndex: 'agencyUrl',
            key:"agencyUrl",
            width:'50%',
        },

    ];

    /**
     * 点击行选中或取消
     * @param record
     */
    const onSelectRow = record => {

        if(!disabledOpt(record)){
            // 如果已经选中 -- 取消选中
            if (selectedRowKeys.indexOf(record.id) >= 0) {
                selectedRowKeys.splice(selectedRowKeys.indexOf(record.id), 1)
                addProxy.splice(addProxy.indexOf(record.id),1)
            }
            // 如果没有选中 -- 选中
            else {
                selectedRowKeys.push(record.id)
                addProxy.push({
                    ...record,
                    adminRole: false
                })
            }
            setSelectedRowKeys([...selectedRowKeys])
            setAddProxy([...addProxy])
        }
    }

    /**
     * 手动选择/取消选择所有行的回调
     * @param selected
     * @param selectedRows
     * @param changeRows
     */
    const onSelectAll = (selected,selectedRows,changeRows) => {
        const newArr = changeRows.map(item=>item && item.id).filter(Boolean)
        const newUser = changeRows.map(item=>({...item,adminRole: false})).filter(Boolean)
        let row,proxy
        if(selected){
            row = Array.from(new Set([...selectedRowKeys,...newArr]))
            proxy = Array.from(new Set([...addProxy,...newUser]))
        }
        else {
            row = selectedRowKeys.filter(item=>!newArr.includes(item))
            proxy = addProxy.filter(item=>!newArr.includes(item.id))
        }
        setSelectedRowKeys(row)
        setAddProxy(proxy)
    }


    /**
     * 手动选择/取消选择某行的回调
     * @param record
     */
    const onSelect = record => {
        onSelectRow(record)
    }

    const rowSelection = {
        onSelectAll:onSelectAll,
        onSelect:onSelect,
        // 禁止选择
        getCheckboxProps: (record) => ({
            disabled: disabledOpt(record),
        }),
        selectedRowKeys:selectedRowKeys,
    }

    /**
     * 添加用户
     */
    const onOk = () => {
        if (rootType==='custom'){
            setProxyPathList(proxyPathList.concat([{agencyName:proxyName,agencyUrl:proxyPath,agencyType:type,type:1}]))
        }else {
            // yUserList（已选择） 添加
            setProxyPathList(proxyPathList.concat(addProxy))
        }
        setVisible(false)
    }
    /**
     * 已选中代理
     * @param record
     * @returns {*}
     */
    const disabledOpt = record =>{
        return proxyPathList && proxyPathList.some(item=>item.id===record.id)
    }

    //修改源
    const onChangeRoot = (e) => {
        setAddProxy([])
        setSelectedRowKeys([]);
      setRootType(e.target.value)
    }

    //输入自定义源的名字
    const onChangeName = (e) => {
        setProxyName(e.target.value)
    }

    const onChangePath = (e) => {
        setProxyPath(e.target.value)
    }
    return(
        <div className='proxy-path-add'>
            <div className='proxy-path-add-head'>
                <Radio.Group onChange={onChangeRoot} value={rootType}>
                    <Radio value='public'>公共源</Radio>
                  {/*  <Radio value='custom'>自定义源</Radio>*/}
               </Radio.Group>
            </div>
            <div className='proxy-path-add-top'>
                {
                    rootType==='public'?
                        <Table
                            rowKey={record=> record.id}
                            rowSelection={rowSelection}
                            onRow={record => ({
                                onClick: () => onSelectRow(record)
                            })}
                            columns={columns}
                            dataSource={remoteProxyList}
                            pagination={false}
                            /*locale={{emptyText: <ListEmpty/>}}*/
                        />:
                        <div className=''>
                            <div className='add-custom-nav'>
                                <div className='add-custom-text'>名称</div>
                                <Input placeholder="请输入来源名称" className='add-custom-input' onChange={onChangeName}/>
                            </div>
                            <div className='add-custom-nav'>
                                <div className='add-custom-text'>地址</div>
                                <Input placeholder="请输入来源地址" className='add-custom-input' onChange={onChangePath} />
                            </div>
                        </div>
                }

            </div>
            <div className='proxy-path-add-btn'>
                <Btn onClick={()=>setVisible(false)} title={"取消"} isMar={true}/>
                <Btn onClick={onOk} title={"确定"} type={"primary"}/>
            </div>
        </div>
    )

}
export default observer(ProxyPathAdd)
