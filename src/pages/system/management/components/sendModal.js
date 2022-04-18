/**
 * @name: sendModal
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：提交消息的弹出框
 * @update: 2021-05-06 15:19
 */

import React from 'react';
import AddUser from "./addUser";
import SendMessage from "./SendMessage";

const SendModal = props => {
    const {visible, onCancel, userTable=[], userVisible, onUserCancel, messageType=[], user=[], onOpenUserModal, removeUser} = props
    return(
        <div>
            <AddUser visible={userVisible} onCancel={onUserCancel} messageType={messageType} user={user}/>
            <SendMessage visible={visible} onCancel={onCancel} userTable={userTable} onOpenUserModal={onOpenUserModal} removeUser={removeUser}/>
        </div>
    )
};
export default SendModal
