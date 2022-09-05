/**
 * @name: product.service
 * @author: liminliang
 * @date: 2021-08-10 15:00
 * @description：订单管理
 * @update: 2021-08-10 15:00
 */
import {Axios} from 'tiklab-core-ui';

export const findOrderPageApi = '/order/findAdminOrderPage';
export const findOrderListApi = '/order/findOrderList';
export const findOrderApi = '/order/findOrder';
export const deleteOrderApi='/order/deleteOrder';
export const createOrderApi='/order/createOrder';
export const updateOrderApi='/order/updateOrder';

export const findOrderProductListApi='/orderProduct/findOrderProductList';

export const findPaymentPageApi='/payment/findPaymentPage';   //条件分页查询支付记录
export const verifyPublicTraApi='/payment/verifyPublicTra';   //确认对公转账

class ProductService {
    constructor() {
    }

    // 通过id查询订单
    async findOrder(data){
        const response = await Axios.post(findOrderApi, data)
        return response
    }

    // 分页查询订单
    async findOrderPage(data){
        const response = await Axios.post(findOrderPageApi, data)
        return response
    }
    async findOrderList(data){
        const response = await Axios.post(findOrderListApi, data)
        return response
    }

    //删除订单
    async deleteOrder(data){
        const response = await Axios.post(deleteOrderApi, data)
        return response
    }
    //创建订单
    async createOrder(data){
        const response = await Axios.post(createOrderApi, data)
        return response
    }

    //修改订单
    async updateOrder(data){
        const response = await Axios.post(updateOrderApi, data)
        return response
    }

    //查询订单产品
    async findOrderProductList(data){
        const response = await Axios.post(findOrderProductListApi, data)
        return response
    }

    async findPaymentPage(data){
        const response = await Axios.post(findPaymentPageApi, data)
        return response
    }
    async verifyPublicTra(data){
        const response = await Axios.post(verifyPublicTraApi, data)
        return response
    }
}

const productService=new ProductService();
export default productService