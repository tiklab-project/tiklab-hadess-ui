/**
 * @name: DeployStore
 * @author: liminliang
 * @date: 2023-03-15 15:00
 * @description：代理信息、复制信息store
 * @update: 2023-03-15 15:00
 */

import {action} from "mobx";
import {Axios} from "tiklab-core-ui";

export class DeployStore{

    /**
     * 查询所有制品库
     * @param value
     */
    @action
    createRepositoryRemoteProxy=async ()=>{
        const res = await Axios.post("/repositoryRemoteProxy/createRepositoryRemoteProxy")
        if (res.code===0){
            this.repositoryAllList=res.data
        }
    }
}
export const DEPLOY_STORE = "deployStore";
