/**
 * @name: workService
 * @author: mahai
 * @date: 2021-06-28 15:31
 * @description：workService
 * @update: 2021-06-28 15:31
 */
import {Axios} from 'doublekit-core-ui';

class WorkService {
    /**
     *
     * @param data
     * @returns {Promise<*>}
     */
    createWorkAppLink = async (data,tenant) => {
        const appData = await Axios.post('/workAppLink/createWorkAppLink', tenant);
        return appData;
    };

    // 获取所有应用数据
    getWorkList = async (tenant) => {
        const appData = await Axios.post('/workAppLink/findWorkAppLinkList', {}, tenant);
        if (!appData.code) {
            return appData.data;
        }
        return [];
    };

    findWorkByID = async (id,tenant) => {
        const formData = new FormData();
        formData.append('id', id);
        const appData = await Axios.post('/workAppLink/findWorkAppLink', formData, tenant);
        if (!appData.code) {
            return appData.data;
        }
        return {};
    };

    deleteWorkByID = async (id,tenant) => {
        const formData = new FormData();
        formData.append('id', id);

        const appData = await Axios.post('/workAppLink/deleteWorkAppLink', formData, tenant);
        return appData;
    };

    updateWork = async (data,tenant) => {
        const updateData = await Axios.post('/workAppLink/updateWorkAppLink', data, tenant);
        return updateData;
    };

}
export default new WorkService()
