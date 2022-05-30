/**
 * @name: product.service
 * @author: mahai
 * @date: 2021-08-10 15:00
 * @description：订阅管理
 * @update: 2021-08-10 15:00
 */
import {Axios} from 'doublekit-core-ui';

export const findSubscribePageApi = '/subscribe/findSubscribePage';
export const createSubscribeApi = '/subscribe/createSubscribe';
export const deleteSubscribeApi = '/subscribe/deleteSubscribe';
export const findAllSubscribeApi = '/subscribe/findAllSubscribe';
export const updateSubscribeApi = '/subscribe/updateSubscribe';

export const findSubscribeListApi = '/subscribe/findSubscribeList';
class SubscribeService {
    constructor() {
    }

    // 分页查询订阅
    async findSubscribePageService(data){
        const response = await Axios.post(findSubscribePageApi, data)
        return response
    }
    // 查询所有订阅
    async findAllSubscribeService(){
        const response = await Axios.post(findAllSubscribeApi)
        return response
    }
    // 添加订阅
    async createSubscribeService(data){
        const response = await Axios.post(createSubscribeApi, data)
        return response
    }
    // 编辑订阅
    async updateSubscribeService(data){
        const response = await Axios.post(updateSubscribeApi, data)
        return response
    }
    // 删除订阅
    async deleteSubscribeService(data){
        const response = await Axios.post(deleteSubscribeApi, data)
        return response
    }

    async findSubscribeList(data){
        const response = await Axios.post(findSubscribeListApi, data)
        return response
    }

}
const subscribeService = new SubscribeService();
export default subscribeService
