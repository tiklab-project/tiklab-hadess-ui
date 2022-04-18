/**
 * @name: myMessageStore
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：消息类型的store
 * @update: 2021-05-06 15:19
 */
import { action, observable } from 'mobx';

export class UserMessageStore {
    // 用户消息的数量
    @observable userMessageNum = 0;
    @action
    setMessageNum = num => {
        this.userMessageNum = num
    }
}
// 用户消息的 store 常量
export const USER_MESSAGE_STORE = 'userMessageStore';
