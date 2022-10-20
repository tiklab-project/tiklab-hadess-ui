/**
 * @name: product.service
 * @author: mahai
 * @date: 2021-08-10 15:00
 * @description：订阅管理
 * @update: 2021-08-10 15:00
 */
import {Axios} from 'tiklab-core-ui';

export const findSubscribePageApi = '/subscribe/findSubscribePage';
export const deleteSubscribeApi = '/subscribe/deleteSubscribe';
export const updateSubscribeApi = '/subscribe/updateSubscribe';
export const findSubscribeListApi = '/subscribe/findSubscribeList';
export const findSubscribeApi = '/subscribe/findSubscribe';  //通过id查询

export const findSubscribeRecordListApi = '/subscribeRecord/findSubscribeRecordList';  //条件查询订阅记录
class SubscribeService {
    constructor() {
    }

    // 分页查询订阅
    async findSubscribePageService(data){
        const response = await Axios.post(findSubscribePageApi, data)
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

    async findSubscribe(data){
        const response = await Axios.post(findSubscribeApi, data)
        return response
    }

    async findSubscribeRecordList(data){
        const response = await Axios.post(findSubscribeRecordListApi, data)
        return response
    }

}
const subscribeService = new SubscribeService();
export default subscribeService
