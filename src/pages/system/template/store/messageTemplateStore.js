/**
 * @name: messageTemplateStore
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：消息模板数据管理
 * @update: 2021-05-06 15:19
 */
import { action, observable } from 'mobx';

export class MessageTemplateStore {
    // 消息模板的数据
    @observable messageTemplateData = [];

    @action
    getMessageTemplateData = (data) => {
        this.messageTemplateData = data
    }
}
// 消息模板的store 的常量
export const MESSAGE_TEMPLATE_STORE = 'messageTemplateStore';
