/**
 * @name: OmsMessageSendType
 * @author: limingliang
 * @date: 2022-08-09 14:30
 * @description：设置消息发送方式
 * @update: 2021-08-09 14:30
 */
import React from "react";
import {MessageSendType} from 'tiklab-message-ui';

const OmsMessageSendType = (props) => {
    return (
        <MessageSendType {...props} bgroup={"hadess"}/>
    )
}
export default OmsMessageSendType;
