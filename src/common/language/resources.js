

import zhCnTrans from "./cn/translation.json";
import {eam_cn} from "tiklab-eam-ui/es/utils";
import {flow_cn} from "tiklab-flow-ui/es/utils";
import {message_cn} from "tiklab-message-ui/es/utils";
import { user_cn } from "tiklab-user-ui/es/utils";
import {privilege_cn} from "tiklab-privilege-ui/es/utils"

const resources = {
    zh: {
        translation: {...zhCnTrans,
            ...eam_cn,
            ...flow_cn,
            ...message_cn,
            ...user_cn,
            ...privilege_cn,
        },
    }
    // en: {
    //     translation: en,
    // },
}
export default resources
