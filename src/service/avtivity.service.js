/**
 * @name: activity.service
 * @author: liminliang
 * @date: 2022-06-13 15:00
 * @description：活动管理
 * @update: 2022-06-13 15:00
 */

import {Axios} from 'doublekit-core-ui';
import {likeFindCategoryListTreeApi} from "./document.service";

export const findActivityPageApi = '/activity/findActivityPage';  //分页查询活动列表
export const createActivityApi = '/activity/createActivity';  //创建活动主表
export const updateActivityApi = '/activity/updateActivity';  //修改活动主表
export const deleteActivityApi = '/activity/deleteActivity';  //删除活动主表

export const createDiscountApi = '/discount/createDiscount';  //创建折扣活动
export const updateDiscountApi = '/discount/updateDiscount';  //修改折扣活动

export const createFullReductionApi = '/fullReduction/createFullReduction';  //创建满减活动
export const updateFullReductionApi = '/fullReduction/updateFullReduction';  //修改满减活动

export const findAllActivityTypeApi = '/activityType/findAllActivityType';  //分页查询活动列表

export const createRollApi = '/roll/createRoll';  //创建卷主表
export const findRollPageApi = '/roll/findRollPage';  //条件分页查询卷主表
export const deleteRollApi = '/roll/deleteRoll';  // 删除
export const updateRollApi = '/roll/updateRoll';  // 修改

export const findCashVolumePageApi = '/cashVolume/findCashVolumePage';  //条件分页查询现金卷
export const findMergeCashVolumePageApi = '/cashVolume/findMergeCashVolumePage';  //合并条件分页查询现金卷
export const createCashVolumeApi = '/cashVolume/createCashVolume';  //创建现金卷活动
export const updateCashVolumeApi = '/cashVolume/updateCashVolume';  //修改现金卷活动

class ActivityService {
    constructor() {
    }

    async findActivityPage(data){
        const authAccount = await Axios.post(findActivityPageApi, data)
        return authAccount
    }

    async findAllActivityType(){
        const authAccount = await Axios.post(findAllActivityTypeApi)
        return authAccount
    }
    async createActivity(data){
        const authAccount = await Axios.post(createActivityApi,data)
        return authAccount
    }
    async updateActivity(data){
        const authAccount = await Axios.post(updateActivityApi,data)
        return authAccount
    }
    async deleteActivity(data){
        const authAccount = await Axios.post(deleteActivityApi,data)
        return authAccount
    }



    async createRoll(data){
        const authAccount = await Axios.post(createRollApi,data)
        return authAccount
    }
    async findRollPage(data){
        const authAccount = await Axios.post(findRollPageApi,data)
        return authAccount
    }
    async deleteRoll(data){
        const authAccount = await Axios.post(deleteRollApi,data)
        return authAccount
    }

    async updateRoll(data){
        const authAccount = await Axios.post(updateRollApi,data)
        return authAccount
    }

    async findCashVolumePage(data){
        const authAccount = await Axios.post(findCashVolumePageApi,data)
        return authAccount
    }
    async findMergeCashVolumePage(data){
        const authAccount = await Axios.post(findMergeCashVolumePageApi,data)
        return authAccount
    }
    async createCashVolume(data){
        const authAccount = await Axios.post(createCashVolumeApi,data)
        return authAccount
    }
    async updateCashVolume(data){
        const authAccount = await Axios.post(updateCashVolumeApi,data)
        return authAccount
    }


    async createDiscount(data){
        const authAccount = await Axios.post(createDiscountApi,data)
        return authAccount
    }
    async updateDiscount(data){
        const authAccount = await Axios.post(updateDiscountApi,data)
        return authAccount
    }

    async createFullReduction(data){
        const authAccount = await Axios.post(createFullReductionApi,data)
        return authAccount
    }
    async updateFullReduction(data){
        const authAccount = await Axios.post(updateFullReductionApi,data)
        return authAccount
    }
}

const activityService=new ActivityService();
export default activityService
