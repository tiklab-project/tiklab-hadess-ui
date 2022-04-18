import {cn, en} from './index'


// import {message_cn} from 'doublekit-message-ui';
import {privilege_cn} from 'doublekit-privilege-ui';
import {portal_cn} from 'doublekit-frame-ui';


const resources = {
    zh: {
        translation: {...cn, ...privilege_cn, ...portal_cn},
    },
    // en: {
    //     translation: en,
    // },
}
export default resources
