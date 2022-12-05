import {cn, en} from './index'


import {message_cn} from 'tiklab-message-ui/es/_utils';
import {orga_cn} from "tiklab-user-ui/es/_utils"
import {privilege_cn} from 'tiklab-privilege-ui/es/_utils';
import {eam_cn} from 'tiklab-eam-ui/es/_utils';


const resources = {
    zh: {
        translation: {...cn, ...privilege_cn, ...eam_cn,...message_cn,...orga_cn},
    },
    // en: {
    //     translation: en,
    // },
}
export default resources
