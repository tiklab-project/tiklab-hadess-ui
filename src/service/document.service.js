/**
 * @name: document.service
 * @author: liminliang
 * @date: 2022-01-20 15:00
 * @description：文档管管理
 * @update: 2022-01-20 15:00
 */

import {Axios} from 'tiklab-core-ui';
import {findOrderApi} from "./order.service";
import {data} from "autoprefixer";

export const createRepositoryApi = '/repository/createRepository';  //创建空间
export const findRepositoryPageApi = '/repository/findRepositoryPage';  //查询空间
export const findAllRepositoryApi = '/repository/findAllRepository';  //查询空间
export const deleteRepositoryApi = '/repository/deleteRepository';  //删除空间
export const updateRepositoryApi = '/repository/updateRepository';  //修改空间

export const findCategoryListTreeApi = '/category/findCategoryListTree';  //查询目录树
export const likeFindCategoryListTreeApi = '/category/likeFindCategoryListTree';  //模糊查询目录树
export const findChildrenCategoryApi = '/category/findChildrenCategory';  //查询目录及子目录
export const deleteCategoryApi = '/category/deleteCategory';  //删除目录
export const createCategoryApi = '/category/createCategory';  //创建目录

export const createDocumentApi = '/document/createDocument';  //创建文档
export const updateDocumentApi = '/document/updateDocument';  //修改文档
export const deleteDocumentApi = '/document/deleteDocument';  //删除文档

export const findDocumentApi = '/document/findDocument';  //通过id查询文档
export const findCommentTreePageApi = '/comment/findCommentTreePage';  //通过文档id分页查询评论树
export const createCommentApi = '/comment/createComment';  //创建评论
export const deleteCommentApi = '/comment/deleteComment';  //删除评论
class DocumentService {
    constructor() {
    }

    async createRepository(data){
        const response = await Axios.post(createRepositoryApi, data)
        return response
    }
    async findRepositoryPage(data){
        const response = await Axios.post(findRepositoryPageApi,data)
        return response
    }
    async findAllRepository(){
        const response = await Axios.post(findAllRepositoryApi)
        return response
    }
    async deleteRepository(data){
        const response = await Axios.post(deleteRepositoryApi,data)
        return response
    }
    async updateRepository(data){
        const response = await Axios.post(updateRepositoryApi,data)
        return response
    }

    async findCategoryListTree(data){
        const response = await Axios.post(findCategoryListTreeApi,data)
        return response
    }
    async findChildrenCategory(data){
        debugger
        const response = await Axios.post(findChildrenCategoryApi,data)
        return response
    }
    async createCategory(data){
        const response = await Axios.post(createCategoryApi,data)
        return response
    }
    async createDocument(data){
        const response = await Axios.post(createDocumentApi,data)
        return response
    }
    async updateDocument(data){
        const response = await Axios.post(updateDocumentApi,data)
        return response
    }
    async findDocument(data){
        const response = await Axios.post(findDocumentApi,data)
        return response
    }
        async findCommentTreePage(data){
            const response = await Axios.post(findCommentTreePageApi,data)
            return response
        }
    async createComment(data){
        const response = await Axios.post(createCommentApi,data)
        return response
    }
    //删除评论
    async deleteComment(data){
        const response = await Axios.post(deleteCommentApi, data)
        return response
    }
    async deleteCategory(data){
        const response = await Axios.post(deleteCategoryApi, data)
        return response
    }
    async deleteDocument(data){
        const response = await Axios.post(deleteDocumentApi, data)
        return response
    }
    //  模糊查询目录树
    async likeFindCategoryListTree(data){
        const authAccount = await Axios.post(likeFindCategoryListTreeApi, data)
        return authAccount
    }
}

const documentService=new DocumentService();
export default documentService