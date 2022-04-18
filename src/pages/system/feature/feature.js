/**
 * @name: feature
 * @author: mahai
 * @date: 2021-05-06 15:15
 * @description：系统级别 功能模块
 * @update: 2021-05-06 15:15
 */
import React, {useState, useEffect, useCallback, useMemo, useRef} from 'react';
import {observer, inject} from "mobx-react";
import {Col, Row} from "antd";
import {Axios} from 'doublekit-core-ui';
import {CommonFeatureTree, AddTree} from '../../../common'
import {PRIVILEGE_SYSTEM_STORE} from "./store/systemFeatureStore";

import FeatureDetail from "./components/featureDetail";
import './feature.scss'


const PrivilegeSystemFeature = props => {
    const {privilegeSystemStore, match} = props;
    const {privilegeSystemTreeData, getPrivilegeTree} = privilegeSystemStore;
    const [parentId, setParentId] = useState('');
    const [visible, setVisible] = useState(false);
    const [editData, setEditData] = useState({});
    const [selectData, setSelectData] = useState({});
    const [defaultTreeSelect, setTreeSelect] = useState('');

    // TODO 处理组件卸载 不做数据处理
    const mounted = useRef(null);
    useEffect(() => {
        mounted.current = true
        getInitTreeData();
        return () => mounted.current = false
    }, [])



    const pageParam= {
        pageSize: 99999,
        currentPage: 1,
    }
    // TODO 获取树的数据
    const getInitTreeData = () => {
        Axios.post('function/findFunctionList', pageParam, match.params.tenant).then(res => {
            if (!res.code && mounted.current) {
                const data = handelNodeConstructor(res.data)
                getPrivilegeTree(data);
                if (data.length>0) {
                    setSelectData(data[0])
                    setTreeSelect(data[0].id)
                } else {
                    setSelectData({})
                    setTreeSelect('')
                }
            }
        })
    }

    // TODO 获取树的数据
    const getTreeData = () => {
        Axios.post('function/findFunctionList', pageParam, match.params.tenant).then(res => {
            if (!res.code) {
                const data = handelNodeConstructor(res.data)
                getPrivilegeTree(data);
                if (data.length>0) {
                    const updateData = data.filter(item => item.id === defaultTreeSelect)
                    if (updateData.length>0) setSelectData(updateData[0])
                }
            }
        })
    }

    // TODO 临时设置处理数据层级关系的
    const handelNodeConstructor = data => {
        const parents = data.map(item => {
            return !item.parentFunction && item
        }).filter(Boolean)
        const children = data.map(item => {
            return item.parentFunction && item.parentFunction.id && item
        }).filter(Boolean)

        let result = []
        parents.forEach(item => {
            const id = item.id;
            const items = children.filter(item => item.parentFunction.id === id)
            result.push({
                ...item,
                children:items
            })
        })
        return result
    }

    // TODO 选中树的数据
    const onSelectTree = useCallback(data => {
        let formData = new FormData()
        setSelectData(data)
        setTreeSelect(data.id)
        formData.append('id', data.id)
    }, []);

    // TODO 添加功能子集
    const onAddChildrenTree = useCallback(id => {
        setParentId(id)
        setVisible(true)
    }, []);

    // TODO 取消添加功能
    const cancelAdd = useCallback(() => {
        setParentId('')
        setEditData({})
        setVisible(false)
        getTreeData()
    }, [])

    // TODO 编辑功能
    const onEditTree = useCallback(item =>{
        setEditData(item)
        setVisible(true)
    }, []);

    // TODO 删除功能
    const onDeleteFeature = useCallback(item =>{
        const formData = new FormData()
        formData.append('id', item.id);
        Axios.post('function/deleteFunction', formData, match.params.tenant).then(res => {
            if (!res.code) {
                getInitTreeData()
            }
        })
    }, []);
    return (
        <div className={'privilege'}>
            <Row justify={'center'} className={'privilege-wrap'}>
                <Col xl={{span:24}} xxl={{span:16}}>
                    <div className={'privilege-parent'}>
                        {
                            useMemo(() => <CommonFeatureTree
                                data={privilegeSystemTreeData}
                                onSelect={onSelectTree}
                                {...props}
                                addClick={setVisible}
                                onDelete={onDeleteFeature}
                                onEdit={onEditTree}
                                onAddChildrenTree={onAddChildrenTree}
                                defaultCurrent={defaultTreeSelect}
                            />, [privilegeSystemTreeData])
                        }

                        <FeatureDetail {...props} data={selectData}/>
                    </div>
                </Col>
            </Row>

            {
                useMemo(() =>
                        <AddTree
                            {...props}
                            editData={editData}
                            visible={visible}
                            cancelAdd={cancelAdd}
                            parentId={parentId}
                            urlType={'system'}
                        />,
                    [visible]
                )
            }
        </div>

    )
}


export default inject(PRIVILEGE_SYSTEM_STORE)(observer(PrivilegeSystemFeature))

