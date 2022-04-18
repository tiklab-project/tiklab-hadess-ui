/**
 * @name: projectFeatureStore
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：权限中心 项目域下的功能store
 * @update: 2021-05-06 15:19
 */
import { action, observable} from 'mobx';

export class PrivilegeProjectFeatureStore {
    // 项目域下的功能数据
    @observable privilegeProjectTreeData = [];

    @action
    getDmPrivilegeTree = (data) => {
        this.privilegeProjectTreeData = data
    }

    @action
    addDmFeature = data => {
        this.privilegeProjectTreeData.push(data)
    }

    @action
    addDmChildrenFeature = (data, id) =>{
        this.privilegeProjectTreeData = this.privilegeProjectTreeData.map(item => {
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
    deleteDmFeature = deleteData => {
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
        loop(this.privilegeProjectTreeData,result);
        this.privilegeProjectTreeData = result
    }

    @action
    editDmFeature = editData => {
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
        loop(this.privilegeProjectTreeData, result)
        this.privilegeProjectTreeData = result
    }

}
// 项目域下的功能的store 常量
export const PRIVILEGE_PROJECT_FEATURE_STORE = 'privilegeProjectFeatureStore';

