/**
 * @name: projectFeature
 * @author: mahai
 * @date: 2021-05-06 15:15
 * @description：权限功能你中的项目功能模块
 * @update: 2021-05-06 15:15
 */
import React, {useState, useEffect, useMemo, useCallback, useRef} from 'react';
import {observer, inject} from "mobx-react";
import {Col, Row} from "antd";
import {Axios} from 'tiklab-core-ui';
import {CommonFeatureTree, AddTree} from '../../../common'
import DmFeatureDetail from "./components/dmFeatureDetail";
import {PRIVILEGE_PROJECT_FEATURE_STORE} from "./store/projectFeatureStore";
import './projectFeature.scss'



const PrivilegeProjectFeature = props => {
    const {privilegeProjectFeatureStore, match} = props;
    const {privilegeProjectTreeData, getDmPrivilegeTree} = privilegeProjectFeatureStore
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
    }, []);

    const pageParam= {
        pageSize: 99999,
        currentPage: 1,
    }
    // TODO 初始化获取树的数据
    const getInitTreeData = () => {
        Axios.post('prjFunction/findPrjFunctionList', pageParam, match.params.tenant).then(res => {
            if (!res.code && mounted.current) {
                const data = handelNodeConstructor(res.data)
                getDmPrivilegeTree(data);
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
        Axios.post( 'prjFunction/findPrjFunctionList', pageParam, match.params.tenant).then(res => {
            if (!res.code) {
                const data = handelNodeConstructor(res.data)
                getDmPrivilegeTree(data);
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

    // TODO 添加子集结构
    const onAddChildrenTree = useCallback((id) => {
        setParentId(id)
        setVisible(true)
    }, []);

    // TODO 取消添加
    const cancelAdd = useCallback(() => {
        setParentId('')
        setEditData({})
        setVisible(false)
        getTreeData()
    }, [])

    // TODO 编辑树行结构数据
    const onEditTree = useCallback(item =>{
        setEditData(item)
        setVisible(true)
    }, []);

    // TODO 删除项目功能
    const onDeleteFeature = useCallback(item =>{
        const formData = new FormData()
        formData.append('id', item.id)
        Axios.post('prjFunction/deletePrjFunction', formData, match.params.tenant).then(res => {
            if (!res.code) {
                getInitTreeData()
            }
        })
    }, []);

    return (
        <div className={'privilege-dm'}>
            <Row justify={'center'} className={'privilege-dm-wrap'}>
                <Col xxl={{span:16}} xl={{span:24}}>
                    <div className={'privilege-dm-parent'}>
                        {
                            useMemo(() =>
                                    <CommonFeatureTree
                                        data={privilegeProjectTreeData}
                                        onSelect={onSelectTree}
                                        {...props}
                                        addClick={setVisible}
                                        onDelete={onDeleteFeature}
                                        onEdit={onEditTree}
                                        onAddChildrenTree={onAddChildrenTree}
                                        defaultCurrent={defaultTreeSelect}
                                    />,
                                [privilegeProjectTreeData])
                        }
                        <DmFeatureDetail {...props} data={selectData}/>
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
                            urlType={'project'}
                        />,
                    [visible])
            }

        </div>

    )
}


export default inject(PRIVILEGE_PROJECT_FEATURE_STORE)(observer(PrivilegeProjectFeature))
