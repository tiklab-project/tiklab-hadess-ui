/**
 * @name: messageStore
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：消息管理的store
 * @update: 2021-05-06 15:19
 */
import { action, observable } from 'mobx';

export class MessageManagementStore {
    // 消息管理的数据
    @observable messageManagementData = [];

    @action
    getMessageManagementData = (data) => {
        this.messageManagementData = data
    }
}
// 消息管理store的常量
export const MESSAGE_MANAGEMENT_STORE = 'messageManagementStore';
