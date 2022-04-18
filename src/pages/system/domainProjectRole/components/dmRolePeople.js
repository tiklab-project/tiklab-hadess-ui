/**
 * @name: dmRolePeople
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：权限中心 项目域下的角色用户
 * @update: 2021-05-06 15:19
 */
import React, {useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import {Axios} from 'doublekit-core-ui';
import {Button, Row, Col, Input, Table, Space} from "antd";
import AddDomainRoleUser from "./dmRoleUserAdd";



const DmRolePeople = props => {
    const {roleDetail, domainId, match} = props;
    const {t} = useTranslation();
    const columns = [
        {
            title: t("privilege-role.name"),
            dataIndex:['user', 'name'],
        },
        {
            title: t("privilege-role.phone"),
            dataIndex:['user', 'phone'],
        },
        {
            title: t("privilege-role.email"),
            dataIndex: ['user', 'email'],
        },
        {
            title:  t("privilege-role.type"),
            dataIndex:['user', 'userType'],
            render: text => {
                switch (text) {
                    case 2:
                        return t("privilege-role.thirdparty")
                    case 1 :
                        return t("privilege-role.internal")
                    default:
                        return '--'
                }
            }
        },

        {
            title: t("privilege-common.action"),
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => onDelete(record.id)}>{t("privilege-common.delete")}</a>
                </Space>
            ),
        },
    ];
    const [data, setData] = useState([])
    const [visible, setVisible] = useState(false)
    const [addSelectedRowKeys, setAddSelectedRowKeys] = useState([]);
    const [userIDWidthId, setUserIDWidthId] = useState({});

    useEffect(() => {
        getFindRoleUserList(roleDetail.roleId);

    }, [roleDetail])

    // TODO 关闭新增角色用户对话框
    const cancelModal = () => {
        setVisible(false)
        getFindRoleUserList(roleDetail.roleId)
    }

    const onAddRoleUser = () => {
        setVisible(true)
    }

    // TODO 获取关联角色的用户列表
    const getFindRoleUserList = id => {
        const params = {
            roleId: id,
        }
        Axios.post('prjRoleUser/findPrjRoleUserList', params, match.params.tenant).then(res => {
            if (!res.code){
                setData(res.data)
                const userIds = res.data.map(item => {
                    return item.user.id
                })

                const userIdWidthId = res.data.reduce((pre, cur)=>{
                    pre[cur.user.id]= cur.id
                    return pre
                },{})
                setAddSelectedRowKeys(userIds)
                setUserIDWidthId(userIdWidthId)
            }
        })
    }

    const onDelete = id => {
        const formData = new FormData();
        formData.append('id', id);
        Axios.post('prjRoleUser/deletePrjRoleUser', formData, match.params.tenant).then(res => {
            if (!res.code) {
                getFindRoleUserList(roleDetail.id)
            }
        })
    }
    return(
        <>
            <Row>
                <Col span={6}>
                    <Input placeholder={t('privilege-search')+t('privilege-user-and-org')}/>
                </Col>
                <Col span={18}>
                    <div className={'privilege-role-detail-btn'}>
                        <Button onClick={() => onAddRoleUser()}>+{t("privilege-add-user")}</Button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                   <Table
                       columns={columns}
                       dataSource={data}

                       rowKey={record => record.id}
                   />
                </Col>
            </Row>
            <AddDomainRoleUser
                {...props}
                visible={visible}
                onCancel={() => cancelModal()}
                id={roleDetail.roleId}
                addSelectedRowKeys={addSelectedRowKeys}
                userIDWidthId={userIDWidthId}
                domainId={domainId}
            />
        </>
    )
}


export default DmRolePeople
