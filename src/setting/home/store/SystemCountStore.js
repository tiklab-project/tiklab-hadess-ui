import {observable,action} from 'mobx';
import {message} from 'antd';
import {Axios, getUser} from 'tiklab-core-ui';

export class SystemCountStore {

    //数量
    @observable
    systemCount=''

    /**
     * 系统设置汇总
     * @param value
     * @returns {Promise<void>}
     */
    @action
    collectCount = async () =>{
        const data = await Axios.post('/systemCount/collectCount')
        return data
    }

    @action
    findUseLicence = async () =>{
        const data = await Axios.post('/licence/findUseLicence')

        return data
    }
}

const systemCountStore=new SystemCountStore()
export default  systemCountStore
