/**
 * @name: featureTree
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：权限中心 功能树
 * @update: 2021-05-06 15:19
 */
import React, {useState, useMemo} from 'react';
import { useTranslation } from 'react-i18next';
import {CaretRightOutlined, CaretDownOutlined} from '@ant-design/icons';
import { Tooltip, Input, Button } from 'antd';
import styles from './featureTree.module.scss';


const CommonFeatureTree = props => {
    const {t} = useTranslation();
    const {defaultExpandedKeys = [], data = [], defaultCurrent = '', onSelect, onDelete, onEdit, classNameTree, addClick, onAddChildrenTree  } = props
    const [expandedTree, setExpandedTree] = useState(defaultExpandedKeys)
    const [clickKey, setClickKey] = useState(defaultCurrent)

    useMemo(()=>{
        setClickKey(defaultCurrent);
    }, [defaultCurrent]);

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
        if (onSelect) {
            if(typeof onSelect === 'function') {
                onSelect(e)
            }
            setClickKey(e.id)
        }
    }

    const deleteItem = item => {
        if (onDelete) {
            if(typeof onDelete === 'function') {
                onDelete(item)
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

    const addFeature = () => {
        addClick(true)
    }

    const addChildren = data => {
        onAddChildrenTree(data.id)
    }

    /**
     * 递归树的数据结构展示
     * @param data
     */
    const loop = (data = []) => {
        return data.map((item, index) => {
            if (item.children && item.children.length) {
                return (
                    <li key={item.id} >
                        <div className={styles['tree-children']}>
                            {
                                isExpandedTree(item.id) ? <CaretDownOutlined onClick={() => setOpenOrClose(item.id)}/> : <CaretRightOutlined onClick={() => setOpenOrClose(item.id)}/>
                            }
                            <div className={clickKey ===item.id ? styles['tree-item-wrap' +
                            ' tree-active'] : styles['tree-item-wrap']}>
                                <span
                                    className={styles['tree-node']}
                                    onClick={() => clickTree(item)}
                                >
                                    <Tooltip placement="top" title={item.name}>{item.name}</Tooltip>
                                </span>
                                <div className={styles['tree-item-action']} >
                                    <span onClick={() =>addChildren(item) }>{t('privilege-add-node')}</span>
                                    <span onClick={() =>editItem(item) } style={{display: item.default ? 'none' : 'inline-block'}}>{t('privilege-common.edit')}</span>
                                    <span onClick={() =>deleteItem(item) } style={{display: item.children && item.children.length ? 'none' : 'inline-block'}}>{t('privilege-common.delete')}</span>
                                </div>
                            </div>
                        </div>
                        <ul className={!isExpandedTree(item.id) ? styles['tree-node-hidden'] : null}>{loop(item.children)}</ul>
                    </li>
                );
            }
            return (
                <li key={item.id}>
                    <div className={styles['tree-item']}>
                        <div
                            className={
                                clickKey ===item.id ?
                                    `${styles['tree-item-wrap' ]} ${styles['tree-active']}`
                                : styles['tree-item-wrap']}>
                            <span
                                className={styles['tree-node']}
                                onClick={() => clickTree(item)}
                            >
                                <Tooltip placement="top" title={item.name}>{item.name}</Tooltip>
                            </span>
                            <div className={styles['tree-item-action']}>
                                <span onClick={() =>editItem(item) } style={{display: item.default ? 'none' : 'inline-block'}}>{t('privilege-common.edit')}</span>
                                <span onClick={() =>deleteItem(item) } style={{display: item.default ? 'none' : 'inline-block'}}>{t('privilege-common.delete')}</span>
                            </div>
                        </div>
                    </div>

                </li>
            )
        })
    }
    return (
        <div className={ `${styles['privilege-tree-wrap']} ${classNameTree}`}>
            <Input placeholder={t('privilege-search')+t('privilege-orga-name')}/>
            <div className={styles['privilege-tree']}>
                <div className={styles['tree']}>
                    {loop(data)}
                </div>
            </div>
            <Button type="primary" onClick={addFeature}>+{t('privilege-add-feature')}</Button>
        </div>
    )
}

export default CommonFeatureTree;
