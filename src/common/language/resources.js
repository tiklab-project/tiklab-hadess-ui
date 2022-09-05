import {cn, en} from './index'


// import {message_cn} from 'tiklab-message-ui';
import {privilege_cn} from 'tiklab-privilege-ui/es/_utils';
import {eam_cn} from 'tiklab-eam-ui/es/_utils';


const resources = {
    zh: {
        translation: {...cn, ...privilege_cn, ...eam_cn},
    },
    // en: {
    //     translation: en,
    // },
}
export default resources
