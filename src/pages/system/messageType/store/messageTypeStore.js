/**
 * @name: messageTypeStore
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：消息类型的store
 * @update: 2021-05-06 15:19
 */
import { action, observable } from 'mobx';

export class MessageTypeStore {
    // 消息类型的数据
    @observable messageTypeData = [];

    @action
    getMessageTypeData = (data) => {
        this.messageTypeData = data
    }
}
// 消息类型store的常量
export const MESSAGE_TYPE_STORE = 'messageTypeStore';
