/**
 * @name: systemFeature
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：系统功能的store
 * @update: 2021-05-06 15:19
 */
import { action, observable, toJS } from 'mobx';

export class PrivilegeSystemStore {
    // 系统功能树的数据数据
    @observable privilegeSystemTreeData = [];

    @action
    getPrivilegeTree = (data) => {
        this.privilegeSystemTreeData = data
    }

    @action
    addFeature = data => {
        this.privilegeSystemTreeData.push(data)
    }

    @action
    addChildrenFeature = (data, id) =>{
        this.privilegeSystemTreeData = this.privilegeSystemTreeData.map(item => {
            if (item.id===id) {
                return {
                    ...item,
                    children:[data, ...item.children]
                }
            }
            return item
        })
    }

    @action
    deleteFeature = deleteData => {
        let result = [];
        let loop = (data,result) => {
            data.forEach((d,index)=>{
                if (d.id !== deleteData.id) {
                    result.push({
                        ...d,
                        children:[]
                    });
                }
                if(d.children && d.children.length > 0) {
                    loop(d.children,result[index].children);
                }
            })
        }
        loop(this.privilegeSystemTreeData,result);
        this.privilegeSystemTreeData = result
    }

    @action
    editFeature = editData => {
        let result = []
        const loop = (data, result) => {
            data.forEach((item,index) => {
                if (item.id === editData.id) {
                    result.push({
                        ...item,
                        ...editData,
                        children:[]
                    })
                } else {
                    result.push({
                        ...item,
                        children:[]
                    })
                }
                if (item.children && result[index].children) {
                    loop(item.children, result[index].children)
                }
            })
        }
        loop(this.privilegeSystemTreeData, result)
        this.privilegeSystemTreeData = result
    }

}
// 系统功能的store 常量
export const PRIVILEGE_SYSTEM_STORE = 'privilegeSystemStore';

