/**
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：项目角色详情
 * @update: 2021-05-06 15:19
 */
import React,{useState, useEffect, useRef} from 'react';
import { useTranslation } from 'react-i18next';
import {Col, Row, Tabs} from "antd";

import {Axios} from 'tiklab-core-ui';
import ProjectRolePeople from "./projectRoleDetailPeople";
import ProjectRolePromise from "./projectRoleDetailPromiss";
import {BreadCrumb} from "../../../../common";
import './projectRoleDetail.scss';


const { TabPane } = Tabs;

const ProjectRoleDetail = props => {
    const {roleDetailParams, clickBreadcrumb, match} = props;
    const {t} = useTranslation();
    const [roleDetail, setRoleDetail] = useState({});
    const routes = [{
        click: clickBreadcrumb,
        breadcrumbName: '角色管理 '
    }, {
        path: '/privilege/feature',
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
        Axios.post('/prjRole/findPrjRole', formData, match.params.tenant).then(res => {
            if (!res.code && mounted.current) {
                setRoleDetail(res.data)
            }
        })
    }

    return(
        <div className={'privilege-role-detail'}>

            <Row justify={'center'}>
                <Col xl={{span: 20}} lg={{span: 24}} xxl={{span:16}}>
                    <BreadCrumb routes={routes}/>
                    <div className={'privilege-role-detail-container'}>
                        <Row>
                            <Col span={6}>
                                <div className={'privilege-role-detail-item'}>
                                    <label>{t('privilege-role.roleName')}:</label>
                                    &nbsp;&nbsp;<span>{roleDetail.name}</span>
                                </div>

                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <div className={'privilege-role-detail-item'}>
                                    <label>{t('privilege-role.roleDesc')}:</label>
                                    &nbsp;&nbsp;<span>{roleDetail.desc}</span>
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
                                            <ProjectRolePeople
                                                {...props}
                                                group={roleDetailParams.group}
                                                roleDetail={roleDetailParams}
                                            />
                                        </TabPane>
                                        <TabPane tab={t('privilege-role.promise')} key="promise">
                                            <ProjectRolePromise {...props} group={roleDetailParams.group} roleDetail={roleDetailParams}/>
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


export default ProjectRoleDetail;
