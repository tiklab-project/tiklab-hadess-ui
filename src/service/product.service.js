/**
 * @name: product.service
 * @author: mahai
 * @date: 2021-08-10 15:00
 * @description：产品管理
 * @update: 2021-08-10 15:00
 */
import {Axios} from 'doublekit-core-ui';


export const findProductPageApi = '/product/findProductPage';
export const findChargeProductListApi = '/product/findChargeProductList';  //查询收费的产品

export const createProductApi = '/product/createProduct';
export const deleteProductApi = '/product/deleteProduct';
export const findAllProductApi = '/product/findAllProduct';
export const updateProductApi = '/product/updateProduct';
export const updateSortApi = '/product/updateSort';

export const findAllProductTypeApi = '/productType/findAllProductType';

//添加项目版本
export const createProductVersionApi = '/productVersion/createProductVersion';
//通过条件查询
export const findProductVersionListApi = '/productVersion/findProductVersionList';

export const deleteProductVersionApi = '/productVersion/deleteProductVersion';  //删除产品版本

class ProductService {
    constructor() {
    }


    // 排序
    async updateSortService(data){
        const response = await Axios.post(updateSortApi, data)
        return response
    }

    async findChargeProductList(){
        const response = await Axios.post(findChargeProductListApi)
        return response
    }
    // 分页查询产品
    async findProductPageService(data){
        const response = await Axios.post(findProductPageApi, data)
        return response
    }
    // 查询所有产品
    async findAllProductApiService(){
        const response = await Axios.post(findAllProductApi)
        return response
    }
    // 添加产品
    async createProductService(data){
        const response = await Axios.post(createProductApi, data)
        return response
    }
    // 编辑产品
    async updateProductService(data){
        const response = await Axios.post(updateProductApi, data)
        return response
    }
    // 删除产品
    async deleteProductService(data){
        const response = await Axios.post(deleteProductApi, data)
        return response
    }

    //添加项目版本
    async createProductVersion(data){
        const response = await Axios.post(createProductVersionApi, data)
        return response
    }
    //条件查询项目版本
    async findProductVersionList(data){
        const response = await Axios.post(findProductVersionListApi, data)
        return response
    }
    //条件所有类型
    async findAllProductTypeService(data){
        const response = await Axios.post(findAllProductTypeApi, data)
        return response
    }




    async deleteProductVersion(data){
        const response = await Axios.post(deleteProductVersionApi, data)
        return response
    }
}
const productService = new ProductService()
export default productService
