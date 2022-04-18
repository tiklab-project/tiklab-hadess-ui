/**
 * @name: index
 * @author: mahai
 * @date: 2021-07-14 14:23
 * @description：index
 * @update: 2021-07-14 14:23
 */
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

export {
    getUser,
    removeUser,
    deleteSuccessReturnCurrenPage
}
