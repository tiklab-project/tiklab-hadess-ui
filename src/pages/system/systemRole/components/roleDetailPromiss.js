/**
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：系统角色详情权限列表
 * @update: 2021-05-06 15:19
 */
import React, {useState, useEffect} from 'react';
import { Checkbox } from 'antd';
import {Axios} from 'doublekit-core-ui';
const CheckboxGroup = Checkbox.Group;


const RolePromise = props => {
    const {roleDetail, group,match} = props;

    const [checkBoxData, setCheckBoxData] = useState([])
    const [checkBoxGroup, setCheckBoxGroup] = useState({})
    // TODO 用户删除checkbox。 通过checkobx id 查找对应的 删除id
    const [deleteCheckListObj, setDeleteCheckListObj] = useState({})
    useEffect(() => {
        if (roleDetail) {
            getAllFunction()
        }
    }, [roleDetail])


    // TODO 获取所有的权限数据
    const getAllFunction = () => {
        Axios.post('/function/findFunctionList', {
            group
        }, match.params.tenant).then(res => {
            if (!res.code) {
                const data = handelNodeConstructorFunction(res.data)
                setCheckBoxData(data.result)
                setCheckBoxGroup(data.resultChild)
                getRoleByPromise(roleDetail.id, true, data.result, data.resultChild)
            }
        })
    }

    // TODO 临时设置处理数据层级关系的
    const handelNodeConstructorFunction = data => {
        const parents = data.map(item => {
            return !item.parentFunction && {value:item.id, label: item.name}
        }).filter(Boolean)
        const children = data.map(item => {
            return item.parentFunction && item.parentFunction.id && {value:item.id, label: item.name , parent:item.parentFunction.id}
        }).filter(Boolean)

        let result = []
        let resultChild = {}
        parents.forEach(item => {
            const id = item.value;
            const items = children.filter(item => item.parent === id)
            result.push({
                value:item.value,
                label: item.label,
                indeterminate:false,
                checkedList:[],
                checkAll:false,
            })
            resultChild[item.value] = items
        })
        return {result, resultChild}
    }

    // TODO 构造权限数据结构
    const handelData = data => {
        const children = data.filter(item => item.function && item.function.parentFunction).map(item => {
            return {
                parentID: item.function.parentFunction.id,
                id: item.function.id
            }
        });
        // TODO 获取 parentFunction 为null 且踢出 parent 中数据
        const parent = data.filter(item => !item.function.parentFunction).map(item => {
            return item.function.id
        });
        // TODO 构造 {parentId:[存在权限的id，包含父集id]}
        let checkedIdObj = {}
        parent.forEach(parentID => {
            const data = children.map(item => {
                if (item.parentID === parentID) {
                    return item.id
                }
            }).filter(Boolean);
            checkedIdObj[parentID] = [...data, parentID]
        })
        return checkedIdObj
    }

    /**
     * 获取角色的权限
     * @param id 角色id
     * @param init 是否是初始话
     * @param data 父数据
     * @param dataGroup 子数据
     */
    const getRoleByPromise = (id, init=false, data=[], dataGroup={}) => {
        const params = {
            roleId: id
        }
        Axios.post('roleFunction/findRoleFunctionList', params, match.params.tenant).then(res => {
            if (!res.code) {
                const checkedListObj = handelData(res.data)
                // 存放可以上删除的所有id 对象
                const deleteObj = res.data.reduce((prv,cur) => {
                    prv[cur.function.id] = cur.id
                    return prv
                }, {})
                const checkData = init ? data : checkBoxData;
                const checkDataGroup = init ? dataGroup : checkBoxGroup;
                const newCheckBoxData = checkData.map(item => {
                    const checkedList = checkedListObj[item.value] ? checkedListObj[item.value] : [];
                    // 判断是不是单个没有子集
                    const hasChild = checkDataGroup[item.value].length === 0;

                    let isCheckAll = checkedList.length === checkDataGroup[item.value].length + 1 && checkedList.length !==0;
                    let isIndeterminate = isCheckAll ? !isCheckAll : !!checkedList.length && checkedList.length < checkDataGroup[item.value].length +1
                    if (hasChild && checkedList.length === 1) {
                        isCheckAll = true
                        isIndeterminate = false
                    }
                    return {
                        ...item,
                        checkedList:checkedList ,
                        indeterminate: isIndeterminate,
                        // indeterminate: !!checkedList.length && checkedList.length < checkDataGroup[item.value].length,
                        checkAll: isCheckAll
                    }
                })
                setDeleteCheckListObj(deleteObj)
                setCheckBoxData(newCheckBoxData)
            }
        })
    }



    const onChangeItem = (id, list) => {
        addOrDeleteCheckId(id, list)
    };

    // TODO 判断是是删除或者新增那个id
    const addOrDeleteCheckId = (id, list) => {
        const newList = list;
        const olderLister = checkBoxData.filter(item => item.value === id )[0].checkedList
        const isDelete = newList.length < olderLister.length;
        let ids = isDelete ? handelArray(olderLister, newList) : handelArray(newList, olderLister);
        // debugger
        if (isDelete) {
            if (olderLister.length > 2) {
                const childrenDelId = ids.filter(item => item !== id)
                childrenDelId.map((id, index) => {
                    deletePromise(id, index + 1 === childrenDelId.length)
                })
            } else {
                const deleteIDs = Array.from(new Set(newList.length === 0 ? [id, ...ids] : ids));
                deleteIDs.map((id, index) => {
                    deletePromise(id, index + 1 === deleteIDs.length)
                })
            }
        } else {
            const IDs = olderLister.length === 0 ? [id, ...ids] : ids;
            IDs.map((id, index) => {
                addPromise(id, index + 1 === IDs.length)
            })
        }
    }

    /**
     * 取2个数组差异
     * 必须array1.length > array2.length
     * @param array1
     * @param array2
     */
    const handelArray = (array1, array2) => {
        let data=[]
        for (let i =0; i< array1.length; i ++ ) {
            const item1 = array1[i]
            if (!array2.some(id => id === item1) || array2.length === 0) {
                data.push(item1)
            }
        }
        return data
    }

    // TODO 勾选全部
    const onCheckAllChange = (id, e) => {
        const checkedKeys = Object.keys(deleteCheckListObj);
        // TODO 判断 checkedKeys 是否存在 父id
        const hasParentID = checkedKeys.includes(id);
        // TODO 在 checkedKeys 找出子集id
        // TODO 已经勾选上的数据
        const childCheckedID = checkedKeys.filter(item => checkBoxGroup[id].some(boxID => boxID.value === item));
        let handelIds = checkBoxGroup[id].filter(item => {
            if (!childCheckedID.some(key => key === item.value)) {
                return item
            }
        });
        let checked = hasParentID && checkBoxGroup[id].length === 0 ? false :  checkBoxGroup[id].length === handelIds.length;
        // TODO 如何 checkedKeys 中没有 父的id 代表 全选 新增
        if (!hasParentID) {
            checked = true;
            handelIds = checkBoxGroup[id]
        }
        /**
         * 全选
         * 1. 原本已有的 剔除
         * 2. 原本没有
         */
        if (checked) {
            if (!checkedKeys.includes(id)) {
                handelIds = [...handelIds, {value:id}]
            }
            if(handelIds.length > 0) {
                handelIds.map((item, index) => {
                    addPromise(item.value, index + 1 === handelIds.length)
                })
            } else {
                addPromise(id, true)
            }

        } else {
            if (checkedKeys.includes(id)) {
                const deleteId = childCheckedID.map(id => {
                    return {
                        value:id
                    }
                })
                handelIds = [...deleteId, {value:id}]
            }
            if(handelIds.length > 0) {
                handelIds.map((item, index) => {
                    deletePromise(item.value, index + 1 === handelIds.length)
                })
            } else {
                deletePromise(id, true)
            }
        }
    };
    // TODO 添加权限
    const addPromise = (id, flag=true) => {
        const postParams = {
            role: {
                id:roleDetail.id
            },
            function:{
                id
            }
        }
        Axios.post('roleFunction/createRoleFunction', postParams, match.params.tenant).then(res => {
            if(flag) getRoleByPromise(roleDetail.id)
        })
    }
    // TODO 删除权限
    const deletePromise = (id,flag=true) => {
        const deleteId = deleteCheckListObj[id]
        const formData = new FormData()
        formData.append('id', deleteId)
        Axios.post('roleFunction/deleteRoleFunction', formData, match.params.tenant).then(res => {
            if(flag) getRoleByPromise(roleDetail.id)
        })
    }
    return(
        <>
            {
                checkBoxData.map(item => {
                    return (
                        <div key={item.value}>
                            <Checkbox indeterminate={item.indeterminate} onChange={(e) => onCheckAllChange(item.value, e)} checked={item.checkAll} >
                                {item.label}
                            </Checkbox>
                            <br/>
                            &nbsp; &nbsp; &nbsp; &nbsp;
                            <CheckboxGroup options={checkBoxGroup[item.value]} value={item.checkedList} onChange={(list) => onChangeItem(item.value, list)} />
                        </div>
                    )
                })
            }
        </>
    )
}

export default RolePromise
