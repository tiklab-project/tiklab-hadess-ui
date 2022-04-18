/**
 * @name: index
 * @author: limingliang
 * @date: 2022-03-15 14:30
 * @description：server
 * @update: 2022-03-15 14:30
 */

import {Axios} from 'doublekit-core-ui';
export const findWorkOrderPageApi = '/workOrder/findWorkOrderPage';  //条件分页查询工单
export const deleteWorkOrderApi = '/workOrder/deleteWorkOrder';  //删除工单
export const findWorkOrderApi = '/workOrder/findWorkOrder';  //通过id查询
export const updateWorkOrderApi = '/workOrder/updateWorkOrder';  //修改工单

export const findWorkOrderReplyListApi = '/workOrderReply/findWorkOrderReplyList';  //通过工单id查询回复
export const createWorkOrderReplyApi = '/workOrderReply/createWorkOrderReply';  //创建工单回复


class WorkOrderServer {
    constructor() {
    }

    async findWorkOrderPage(data){
        debugger
        const response = await Axios.post(findWorkOrderPageApi, data)
        return response
    }
    async deleteWorkOrder(data){
        const response = await Axios.post(deleteWorkOrderApi, data)
        return response
    }
    async findWorkOrder(data){
        const response = await Axios.post(findWorkOrderApi, data)
        return response
    }
    async findWorkOrderReplyList(data){
        const response = await Axios.post(findWorkOrderReplyListApi, data)
        return response
    }

    async createWorkOrderReply(data){
        const response = await Axios.post(createWorkOrderReplyApi, data)
        return response
    }
    async updateWorkOrder(data){
        const response = await Axios.post(updateWorkOrderApi, data)
        return response
    }

}

const workOrderServer = new WorkOrderServer();
export default workOrderServer