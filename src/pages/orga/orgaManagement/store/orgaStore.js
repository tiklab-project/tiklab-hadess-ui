/**
 * @name: orgStore
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：组织中心添加系统组织的store
 * @update: 2021-05-06 15:19
 */
import { action, observable, computed } from 'mobx';

export class OrgStore {
    // 组织树形结构数据
    @observable treeData = [];
    // 选择组织树的一条数据
    @observable selectData = {
        orgName:'',
        parentOrg:''
    }

    @action
    getTree = (data) => {
        this.treeData = data.map(item => {
            return {...item, default: true}
        })
    }

    @action
    selectTreeOrgDetail = (data) => {
        this.selectData = data
    }
    @action
    addTree = (data) => {
        this.treeData = this.treeData.map(item => {
            if (item.children) {
                return {
                    ...item,
                    children:item.children.concat(data)
                }
            } else {
                return {
                    ...item,
                    children:[data]
                }
            }

        })
    }
    @action
    deleteTree = (id) => {
        this.treeData = this.treeData.filter(item => {
            if (item.orgaId !== id) {
                if (item.children && item.children.length > 0) {
                    item.children =  item.children.filter(item => item.orgaId !== id)
                }
                return item
            }
        })
    }
    @action
    editTree = (data) => {
        this.treeData = this.treeData.map(item => {
            if (item.orgaId === data.orgaId) {
                return {
                    ...item,
                    ...data,
                }
            } else  {
                item.children = item.children.map(item => {
                    if (item.orgaId === data.orgaId) {
                        return {
                            ...item,
                            ...data,
                        }
                    } else {
                        return item
                    }
                })
                return item
            }
        })
    }
}
// 系统组织的store 常量
export const ORG_STORE = 'orgStore';

