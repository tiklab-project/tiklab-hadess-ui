/**
 * @name: tree
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：组织中心添加系统组织树行目录
 * @update: 2021-05-06 15:19
 */

import React, {useState} from 'react';
import {observer} from "mobx-react";
import { useTranslation } from 'react-i18next';
import {Input, Button} from "antd";
import {DarthTree} from "../../../../common";
import {Axios} from 'doublekit-core-ui';
import AddOrg from './orgAdd'
import './tree.scss'



const OrgTree = props => {
    const  {classNameTree, treeData, onSelect, orgStore, getAllTree, match} = props;
    const {deleteTree} = orgStore;

    const { t } = useTranslation();
    const [visible, setVisible] = useState(false);
    const [editData, setEditData] = useState({});
    const [isEdit, setEdit] = useState(false);

    const loop = (data, newData=[]) => {
        data.forEach(item => {
            newData.push(
                {
                    orgaId:item.orgaId,
                    orgaName: item.orgaName,
                }
            )
            if (item.children && item.children.length > 0) {
                return loop(item.children, newData)
            }
        })
        return newData
    }

    // TODO 新增组织
    const onAddOrg = () => {
        const tree = loop(treeData)
        setVisible(true)
    }
    // TODO 取消新增组织
    const cancelAddOrg = () => {
        setVisible(false)
        setEditData({})
        setEdit(false)
    }
    // TODO 删除组织
    const onDeleteTree = data => {
        let formData = new FormData()
        formData.append('id', data.orgaId)
        Axios.post('orga/deleteOrga', formData, match.params.tenant).then(res => {
            if (!res.code) {
                deleteTree(data.orgaId)
            }
        })
    }
    // TODO 编辑组织
    const onEditTree = data => {
        let formData = new FormData()
        formData.append('id', data.orgaId)
        Axios.post('orga/findOrga', formData, match.params.tenant).then(res => {
            if (!res.code){
                const tree = loop(treeData)
                setEditData(res.data)
                setEdit(true)
                setVisible(true)
            }
        })
    }
    return(
        <div className={`orga-tree-wrap ${classNameTree}`}>
            <Input placeholder={t("orga-common.search")+t("orga-common.orga")+t("orga-common.name")}/>
            <div className={'orga-tree-wrap-tree'}>
                <DarthTree
                    data={treeData}
                    onSelect={onSelect}
                    defaultExpandedKeys={['key1', 'key1-2']}
                    onDelete = {onDeleteTree}
                    onEdit = {onEditTree}
                />
            </div>
            <Button type="primary" onClick={onAddOrg}>+{t("orga-common.add")+t("orga-common.orga")}</Button>
            <AddOrg
                {...props}
                visible={visible}
                cancelAddOrg={cancelAddOrg}
                editData={editData}
                isEdit={isEdit}
                getAllTree={getAllTree}
                rawDataTree={treeData}
            />
        </div>
    )
}


export default observer(OrgTree)
