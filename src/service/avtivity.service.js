/**
 * @name: activity.service
 * @author: liminliang
 * @date: 2022-06-13 15:00
 * @description：活动管理
 * @update: 2022-06-13 15:00
 */

import {Axios} from 'tiklab-core-ui';
import {likeFindCategoryListTreeApi} from "./document.service";

export const findActivityPageApi = '/activity/findActivityPage';  //分页查询活动列表
export const createActivityApi = '/activity/createActivity';  //创建活动主表
export const updateActivityApi = '/activity/updateActivity';  //修改活动主表
export const deleteActivityApi = '/activity/deleteActivity';  //删除活动主表

export const createDiscountApi = '/discount/createDiscount';  //创建折扣活动
export const updateDiscountApi = '/discount/updateDiscount';  //修改折扣活动

export const createFullReductionApi = '/fullReduction/createFullReduction';  //创建满减活动
export const updateFullReductionApi = '/fullReduction/updateFullReduction';  //修改满减活动

export const createSubActivityApi = '/subActivity/createSubActivity';  //创建满减活动
export const updateSubActivityApi = '/subActivity/updateSubActivity';  //修改满减活动


export const createCouponApi = '/coupon/createCoupon';  //创建优惠卷主表
export const findCouponPageApi = '/coupon/findCouponPage';  //条件分页查询卷主表
export const deleteCouponApi = '/coupon/deleteCoupon';  // 删除
export const updateCouponApi = '/coupon/updateCoupon';  // 修改

export const findCouponCashAccessPageApi = '/couponCash/findCouponCashAccessPage';  //现金券的领取使用情况

export const findCouponDisAccessPageApi = '/couponDiscount/findCouponDisAccessPage';  //折扣券的领取使用情况


class ActivityService {
    constructor() {
    }

    async findActivityPage(data){
        const authAccount = await Axios.post(findActivityPageApi, data)
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

    async createCoupon(data){
        const authAccount = await Axios.post(createCouponApi,data)
        return authAccount
    }
    async findCouponPage(data){
        const authAccount = await Axios.post(findCouponPageApi,data)
        return authAccount
    }
    async deleteCoupon(data){
        const authAccount = await Axios.post(deleteCouponApi,data)
        return authAccount
    }

    async updateCoupon(data){
        const authAccount = await Axios.post(updateCouponApi,data)
        return authAccount
    }

    async findCouponCashAccessPage(data){
        const authAccount = await Axios.post(findCouponCashAccessPageApi,data)
        return authAccount
    }

    async findCouponDisAccessPage(data){
        const authAccount = await Axios.post(findCouponDisAccessPageApi,data)
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

    async createSubActivity(data){
        const authAccount = await Axios.post(createSubActivityApi,data)
        return authAccount
    }
    async updateSubActivity(data){
        const authAccount = await Axios.post(updateSubActivityApi,data)
        return authAccount
    }
}

const activityService=new ActivityService();
export default activityService
