

import zhCnTrans from "./cn/translation.json";
import {eam_cn} from "thoughtware-eam-ui/es/utils";
import {message_cn} from "thoughtware-message-ui/es/utils";
import { user_cn } from "thoughtware-user-ui/es/utils";
import {privilege_cn} from "thoughtware-privilege-ui/es/utils"
import pluginManage_cn from "thoughtware-plugin-manager-ui/es/utils/language"

const resources = {
    zh: {
        translation: {...zhCnTrans,
            ...eam_cn,
            ...message_cn,
            ...user_cn,
            ...privilege_cn,
            ...pluginManage_cn,
        },
    }
    // en: {
    //     translation: en,
    // },
}
export default resources
