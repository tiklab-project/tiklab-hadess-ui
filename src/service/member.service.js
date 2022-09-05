/**
 * @name: product.service
 * @author: liminliang
 * @date: 2021-08-10 15:00
 * @description：会员管理
 * @update: 2021-08-10 15:00
 */
import {Axios} from 'tiklab-core-ui';

export const findMemberPageApi = '/member/findMemberPage';

export const updateMemberApi = '/member/updateMember';

class MemberService {
    constructor() {
    }

    // 通过条件分页查询会员
    async findMemberPage(data){
        const response = await Axios.post(findMemberPageApi, data)
        return response
    }

    // 修改会会员
    async updateMember(data){
        const response = await Axios.post(updateMemberApi, data)
        return response
    }

}

const memberService=new MemberService();
export default memberService