import {cn, en} from './index'


// import {message_cn} from 'doublekit-message-ui';
import {privilege_cn} from 'doublekit-privilege-ui';
import {eam_cn} from 'doublekit-eam-ui';


const resources = {
    zh: {
        translation: {...cn, ...privilege_cn, ...eam_cn},
    },
    // en: {
    //     translation: en,
    // },
}
export default resources
