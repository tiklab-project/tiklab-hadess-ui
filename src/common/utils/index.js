/**
 * @name: index
 * @author: mahai
 * @date: 2021-07-14 14:23
 * @description：index
 * @update: 2021-07-14 14:23
 */
import React from "react";
import Cookies from 'js-cookie'

const getUser = () => {
    return Cookies.getJSON()
}

const removeUser = () => {
    const host = window.location.host;
    const hostDomain = host.split('.').slice(-2).join('.')
    Cookies.remove('name', {path:'/', domain:hostDomain});
    Cookies.remove('email', {path:'/', domain:hostDomain});
    Cookies.remove('phone', {path:'/', domain:hostDomain});
    Cookies.remove('ticket', {path:'/', domain:hostDomain});
    Cookies.remove('userId', {path:'/', domain:hostDomain});
}


const deleteSuccessReturnCurrenPage = (total, pageSize, current) => {
    const maxCurrentCount = current * pageSize;
    const minCurrentCount = (current - 1) * pageSize + 1;
    if (total >= maxCurrentCount) {
        return current
    }
    if (total <= minCurrentCount) {
        return current === 1 ? 1 : current - 1
    }
    return current

}

const formatSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;  // 1 KB = 1024 B
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];  // 单位列表
    const i = Math.floor(Math.log(bytes) / Math.log(k));  // 确定单位的索引
    const value = bytes / Math.pow(k, i);  // 按照单位大小进行转换
    return value.toFixed(2) + ' ' + sizes[i];
}




export {
    getUser,
    removeUser,
    deleteSuccessReturnCurrenPage,
    formatSize,
}
