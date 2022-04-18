/**
 * @name: dmRoleDetail
 * @author: mahai
 * @date: 2021-07-14 15:54
 * @description：dmRoleDetail
 * @update: 2021-07-14 15:54
 */
import React,{useState, useEffect, useRef} from 'react';
import { useTranslation } from 'react-i18next';
import {Col, Row, Tabs} from "antd";
import BreadCrumb from "../../../../common/breadCrumb/breadCrumb";
import {Axios} from 'doublekit-core-ui';
import DmRolePeople from "./dmRolePeople";

import DomainRolePromise from "./dmRoleDetailPromiss";
import './dmRoleDetail.scss';

const { TabPane } = Tabs;

const DmRoleDetail = props => {
    const {t} = useTranslation();
    const {roleDetailParams, clickBreadcrumb, domainId, match} = props;
    const [roleDetail, setRoleDetail] = useState({});
    const routes = [{
        click: clickBreadcrumb,
        breadcrumbName: '角色管理 '
    }, {
        path: '/projectRole/feature',
        breadcrumbName: '角色详情'
    }];


    // TODO 处理组件卸载 不做数据处理
    const mounted = useRef(null);
    useEffect(() => {
        mounted.current = true
        if(roleDetailParams.id) getRoleDetail(roleDetailParams.id);
        return () => mounted.current = false
    },[roleDetailParams])

    // TODO 角色详情
    const getRoleDetail = id => {
        const formData = new FormData();
        formData.append('id', id)
        Axios.post('/dmPrjRole/findDmPrjRole', formData, match.params.tenant).then(res => {
            if (!res.code && mounted.current) {
                setRoleDetail(res.data)
            }
        })
    }

    return(
        <div className={'projectRole-role-detail'}>

            <Row justify={'center'}>
                <Col xl={{span: 20}} lg={{span: 24}} xxl={{span:16}}>
                    <BreadCrumb routes={routes}/>
                    <div className={'projectRole-role-detail-container'}>
                        <Row>
                            <Col span={6}>
                                <div className={'projectRole-role-detail-item'}>
                                    <label>{t('privilege-role.roleName')}:</label>
                                    &nbsp;&nbsp;<span>{roleDetail.role && roleDetail.role.name}</span>
                                </div>

                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <div className={'projectRole-role-detail-item'}>
                                    <label>{t('privilege-role.roleDesc')}:</label>
                                    &nbsp;&nbsp;<span>{roleDetail.role && roleDetail.role.desc}</span>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <div className="card-container">
                                    <Tabs
                                        type="card"
                                        defaultActiveKey={roleDetailParams.type}
                                    >
                                        <TabPane tab={t('privilege-role.people')} key="people">
                                            <DmRolePeople
                                                {...props}
                                                group={roleDetailParams.group}
                                                roleDetail={roleDetailParams}
                                                domainId={domainId}
                                            />
                                        </TabPane>
                                        <TabPane tab={t('privilege-role.promise')} key="promise">
                                            <DomainRolePromise {...props} group={roleDetailParams.group} roleDetail={roleDetailParams}/>
                                        </TabPane>
                                    </Tabs>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    )

}


export default DmRoleDetail;
