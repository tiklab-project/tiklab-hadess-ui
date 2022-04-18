/**
 * @name: essageSendTypeStore
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：消息发送的类型的数据管理
 * @update: 2021-05-06 15:19
 */
import { action, observable } from 'mobx';

export class MessageSendTypeStore {
    // 消息发送的类型的数据
    @observable messageSendTypeData = [];

    @action
    getMessageSendTypeData = (data) => {
        this.messageSendTypeData = data
    }
}
// 消息发送的类型的store 的常量
export const MESSAGE_SEND_TYPE_STORE = 'messageSendTypeStore';
