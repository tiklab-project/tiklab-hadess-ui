/**
 * @name: activity.service
 * @author: liminliang
 * @date: 2022-06-13 15:00
 * @description：活动管理
 * @update: 2022-06-13 15:00
 */
import {Axios} from 'tiklab-core-ui';
export const createBlogsApi = '/blogs/createBlogs';      //创建博客
export const deleteBlogsApi = '/blogs/deleteBlogs';     //删除博客
export const findBlogsPageApi = '/blogs/findBlogsPage'; //条件分页查询
export const updateBlogsApi = '/blogs/updateBlogs';     //修改博客
export const findBlogByIdApi = '/blogs/findBlogs';  //通过id 查询

class BlogService {
    constructor() {
    }
    async createBlogs(data){
        const authAccount = await Axios.post(createBlogsApi, data)
        return authAccount
    }
    async deleteBlogs(data){
        const authAccount = await Axios.post(deleteBlogsApi, data)
        return authAccount
    }
    async findBlogsPage(data){
        const authAccount = await Axios.post(findBlogsPageApi, data)
        return authAccount
    }
    async updateBlogs(data){
        const authAccount = await Axios.post(updateBlogsApi, data)
        return authAccount
    }
    async findBlogById(data){
        const authAccount = await Axios.post(findBlogByIdApi, data)
        return authAccount
    }

}

const blogService=new BlogService();
export default blogService