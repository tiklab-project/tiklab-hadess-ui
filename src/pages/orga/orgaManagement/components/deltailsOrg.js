/**
 * @name: detailOrgName
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：组织中心系统组织
 * @update: 2021-05-06 15:19
 */

import React, {useState, useCallback, useMemo} from 'react';
import {Row, Col, Input, Tabs, Button, Table, Space} from 'antd'

import {useTranslation} from "react-i18next";
import UserSelect from "./userSelect";
import {Axios} from 'doublekit-core-ui';
import './deltailsOrg.scss';
const { TabPane } = Tabs;





const OraDetailOrgName = props => {
    const {data, tableData, pagination, orgId, getOrgaUser, restTableData, match} = props;

    const useMemoPagination = useMemo(() => pagination, [pagination]);
    const useMemoData = useMemo(() => data, [data]);
    const useMemoTableData = useMemo(() => tableData, [tableData]);
    const useMemoOrgId = useMemo(() => orgId, [orgId]);

    const [visible, setVisible] = useState(false);
    const {t}=useTranslation();
    const columns = [
        {
            title: t('orga-table.name'),
            dataIndex:['user', 'name'],
            // key: 'name',
        },
        {
            title: t('orga-table.account'),
            dataIndex:['orga', 'orgaName'],
            // key: 'account',
        },
        {
            title: t('orga-table.orgaName'),
            dataIndex:['orga', 'parentOrga', 'orgaName'],
            // key: 'org',
        },
        {
            title: t('orga-table.type'),
            dataIndex:['user', 'userType'],
            // key: 'userType',
            render: text => {
                switch (text) {
                    case 2:
                        return t('orga-table.thirdparty')
                    case 1 :
                        return t('orga-table.internal')
                    default:
                        return '--'
                }
            }
        },
        {
            title: t('orga-common.action'),
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={()=> deleteUser(record.id)}>{t('orga-common.delete')}</a>
                </Space>
            ),
        },
    ]

    // TODO 删除系统用户
    const deleteUser = useCallback(id => {
        const formData = new FormData();
        formData.append('id', id)
        Axios.post( 'userOrga/deleteUserOrga', formData,  match.params.tenant).then(res => {
            if (!res.code) {
                restTableData(1)
            }
        })
    }, []);
    // TODO 打开系统用户列表
    const openUserList = useCallback(() => {
        setVisible(true)
    }, []);


    return(
        <div className={'org-detail'}>
            <Row>
                <Col span={12}>
                    <div className={'org-detail-item'}>
                        <label>{t("orga-label.orgaName")}:</label>
                        <Input value={useMemoData.orgName} disabled/>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <div className={'org-detail-item'}>
                        <label>{t("orga-label.parentOrg")}:</label>
                        <Input value={useMemoData.parentOrg} disabled/>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <div className="card-container">
                        <Tabs type="card">
                            <TabPane tab={t("orga-label.user")} key="1">
                                <Row justify="space-between">
                                   <Col span={6} >
                                       <Input placeholder={t("orga-label.searchUser")}/>
                                   </Col>
                                   <Col span={6} >
                                       <div style={{display:'flex', justifyContent: 'flex-end'}}>
                                           <Button type="primary" onClick={openUserList}>+{t("orga-label.addUser")}</Button>
                                       </div>

                                   </Col>
                               </Row>
                                <Row>
                                    <Col span={24}>
                                        <div className={'org-detail-table'}>
                                            <Table

                                                columns={columns}
                                                dataSource={useMemoTableData}
                                                pagination={useMemoPagination}
                                                rowKey={res => res.id}
                                                tableLayout="fixed"
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </TabPane>
                        </Tabs>
                    </div>
                </Col>
            </Row>
            <UserSelect
                {...props}
                orgId={useMemoOrgId}
                visible={visible}
                onCancel={() => setVisible(false)}
                getOrgaUser={getOrgaUser}
            />
        </div>
    )
}


export default OraDetailOrgName
