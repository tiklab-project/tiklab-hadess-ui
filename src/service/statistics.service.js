/**
 * @name: product.service
 * @author: mahai
 * @date: 2021-08-10 15:00
 * @description：统计
 * @update: 2021-08-10 15:00
 */
import {Axios} from 'tiklab-core-ui';

export const statisticsByDateApi = '/statistics/statisticsByDate';
export const statisticsByWeekApi = '/statistics/statisticsByWeek';   //月统计
export const statisticsByMonthApi = '/statistics/statisticsByMonth';   //月统计
class StatisticsService {
    constructor() {
    }
    //日统计
    async memberStatisticsService(data){
        const response = await Axios.post(statisticsByDateApi, data)
        return response
    }
    //周统计
    async statisticsByWeek(data){
        const response = await Axios.post(statisticsByWeekApi, data)
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
