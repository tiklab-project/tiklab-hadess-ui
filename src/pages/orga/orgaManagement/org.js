/**
 * @name: org
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：组织中心添加系统组织载体
 * @update: 2021-05-06 15:19
 */

import React, {useEffect, useState, useRef, useCallback} from 'react';
import {observer, inject} from "mobx-react";
import {Col, Row} from "antd";
import OrgTree from './components/tree';
import {BreadCrumb} from "../../../common";
import OraDetailOrgName from "./components/deltailsOrg";
import {Axios} from 'doublekit-core-ui';
import {ORG_STORE} from "./store/orgaStore";
import './org.scss'
const OrgContent = (props) => {
    const {orgStore, selectMenu, match} = props;
    const {treeData, selectData, getTree, selectTreeOrgDetail} = orgStore;
    const [orgaId, setOrgaId] = useState('')
    const [pageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [tableData, setTableData] = useState([]);
    const crumbRoutes = [
        {
            disabled:true,
            breadcrumbName: '组织管理',
        },
        {
            path: 'first',
            breadcrumbName: '组织详情',
        },
    ];
    // TODO 处理组件卸载 不做数据处理
    const mounted = useRef(null);
    // TODO 初始化 组织树的数据
    useEffect(() => {
        mounted.current = true
        initAllTree()
        return () => mounted.current = false
    }, [])

    const initAllTree = () => {
        Axios.post( 'orga/findOrgaTree', {}, match.params.tenant).then(res=>{
            if (!res.code && mounted.current) {
                onSelectTree({orgaId:res.data.orgaId})
                getTree([res.data])
                setOrgaId(res.data.orgaId)
            }
        })
    }
    // TODO 获取所有的树的数据
    const getAllTree = () => {
        Axios.post('orga/findOrgaTree',{}, match.params.tenant).then(res=>{
            if (!res.code) {
                getTree([res.data])
            }
        })
    }

    // TODO 分页获取关联组织用户数据
    const getOrgaUser = useCallback((data, currentPage) => {
        const params = {
            pageParam: {
                currentPage,
                pageSize
            },
            ...data
        }
        Axios.post( 'userOrga/findUserOrgaPage', params,  match.params.tenant).then(res => {
            if (!res.code) {
                setTotal(res.data.totalRecord)
                setTableData(res.data.dataList)
            }
        })
    }, [])

    // TODO 选中树的数据
    const onSelectTree = data => {
        let formData = new FormData()
        formData.append('id', data.orgaId)
        Axios.post('orga/findOrga', formData,  match.params.tenant).then(res => {
            if (!res.code){
                setOrgaId(data.orgaId)
                setCurrentPage(1)
                selectTreeOrgDetail({
                    orgName:res.data.orgaName,
                    parentOrg: res.data.parentOrga ? res.data.parentOrga.orgaName : null
                })
                getOrgaUser({orgaId :data.orgaId }, 1)
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    const onSelectMenu = e => {
        if (typeof selectMenu === 'function') {
            selectMenu(e)
        } else {
            console.error('selectMenu 必须是函数方法')
        }
    }

    // TODO 分页
    const changPage = useCallback(page => {
        setCurrentPage(page)
        getOrgaUser({orgaId }, page)
    }, []);

    return(
        <Row justify={'center'} style={{width:'100%'}}>
            <Col xl={{span:24}} xxl={{span:16}}>
                <div className='org-parent'>
                    <OrgTree treeData={treeData} onSelect={onSelectTree} {...props} getAllTree={getAllTree}/>
                    <div className='org-parent-detail'>
                        <BreadCrumb routes={crumbRoutes}/>
                        <OraDetailOrgName
                            {...props}
                            data={selectData}
                            tableData={tableData}
                            pagination={{
                                current:currentPage,
                                pageSize: pageSize,
                                total: total,
                                onChange: changPage,
                            }}
                            orgId={orgaId}
                            getOrgaUser={getOrgaUser}
                            restTableData = {changPage}
                        />
                    </div>
                </div>
            </Col>
        </Row>


    )
}

export default inject(ORG_STORE)(observer(OrgContent))
