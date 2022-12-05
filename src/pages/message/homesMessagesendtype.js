/**
 * @name: HomesMessageSendType
 * @author: limingliang
 * @date: 2022-08-09 14:30
 * @description：设置消息发送方式
 * @update: 2021-08-09 14:30
 */
import React from "react";
import {MessageSendType} from 'tiklab-message-ui';

const HomesMessageSendType = (props) => {
    return (
        <MessageSendType isBase={true}  prefixApi={'ocs'}/>
    )
}
export default HomesMessageSendType;