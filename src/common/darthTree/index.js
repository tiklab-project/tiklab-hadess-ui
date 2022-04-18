import React, {useState} from 'react';
import {toJS} from 'mobx';
import { useTranslation } from 'react-i18next';
import {CaretRightOutlined, CaretDownOutlined} from '@ant-design/icons';
import { Tooltip } from 'antd';
import './index.scss';


const DarthTree = props => {
    const {defaultExpandedKeys = [], data = [], defaultCurrent = '', onSelect, onDelete, onEdit,  } = props
    const [expandedTree, setExpandedTree] = useState(defaultExpandedKeys)
    const [clickKey, setClickKey] = useState(defaultCurrent)
    const { t } = useTranslation();

    const isExpandedTree = (key) => {
        return expandedTree.some(item => item ===key)
    }

    const setOpenOrClose = key => {
        if (isExpandedTree(key)) {
            setExpandedTree(expandedTree.filter(item => item !== key))
        } else {
            setExpandedTree(expandedTree.concat(key))
        }
    }

    const clickTree = e => {
        setClickKey(e.id)
        if (onSelect) {
            if(typeof onSelect === 'function') {
                onSelect(e)
            } else  {
                console.error('onSelect 是函数方法')
            }
        }
    }

    const deleteItem = item => {

        if (onDelete) {
            if(typeof onDelete === 'function') {
                onDelete(toJS(item))
            } else  {
                console.error('onDelete 是函数方法')
            }
        }
    }

    const editItem = item => {
        if (onEdit) {
            if(typeof onEdit === 'function') {
                onEdit(item)
            } else  {
                console.error('onEdit 是函数方法')
            }
        }
    }
    const loop = (data = []) => {

        return data.map((item, index) => {
            if (item.children && item.children.length) {
                return (
                    <li key={item.orgaId} >
                        <div className={'tree-children'}>
                            {
                                isExpandedTree(item.orgaId) ? <CaretDownOutlined onClick={() => setOpenOrClose(item.orgaId)}/> : <CaretRightOutlined onClick={() => setOpenOrClose(item.orgaId)}/>
                            }
                            <div className={'tree-item'}>
                                <div className={'tree-item-wrap'}>
                                    <span
                                        className={clickKey === item.orgaId ?  'tree-node' +
                                        ' tree-active' : 'tree-node'}
                                        onClick={() => clickTree(item)}
                                    >
                                        <Tooltip placement="top" title={item.orgaName}>{item.orgaName}</Tooltip>
                                    </span>
                                    <div className={'tree-item-action'} >
                                        <span onClick={() =>editItem(item) } style={{display: item.default ? 'none' : 'inline-block'}}>{t("orga-common.edit")}</span>
                                        <span onClick={() =>deleteItem(item) } style={{display: item.children && item.children.length ? 'none' : 'inline-block'}}>{t("orga-common.delete")}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ul className={!isExpandedTree(item.orgaId) ? 'tree-node-hidden' : null}>{loop(item.children)}</ul>
                    </li>
                );
            }
            return (
                <li key={item.orgaId}>
                    <div className={'tree-item'}>
                        <div className={'tree-item-wrap'}>
                            <span
                                className={clickKey ===item.orgaId ?  'tree-node' +
                                ' tree-active' : 'tree-node'}
                                onClick={() => clickTree(item)}
                            >
                                <Tooltip placement="top" title={item.orgaName}>{item.orgaName}</Tooltip>
                            </span>
                            <div className={'tree-item-action'}>
                                <span onClick={() =>editItem(item) } style={{display: item.default ? 'none' : 'inline-block'}}>{t("orga-common.edit")}</span>
                                <span onClick={() =>deleteItem(item) } style={{display: item.default ? 'none' : 'inline-block'}}>{t("orga-common.delete")}</span>
                            </div>
                        </div>
                    </div>
                </li>
            )
        })
    }

    return(
        <div className={'tree'}>
            {loop(data)}
        </div>
    )
}


export default DarthTree
