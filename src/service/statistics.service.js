/**
 * @name: product.service
 * @author: mahai
 * @date: 2021-08-10 15:00
 * @description：统计
 * @update: 2021-08-10 15:00
 */
import {Axios} from 'doublekit-core-ui';

export const statisticsByDateApi = '/statistics/statisticsByDate';
export const statisticsByMonthApi = '/statistics/statisticsByMonth';   //月统计
class StatisticsService {
    constructor() {
    }
    //会员统计
    async memberStatisticsService(data){
        const response = await Axios.post(statisticsByDateApi, data)
        return response
    }
    //月统计
    async statisticsByMonth(data){
        const response = await Axios.post(statisticsByMonthApi, data)
        return response
    }

}
const statisticsService =new StatisticsService()
export default statisticsService
