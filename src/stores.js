import {EAM_STORE, EamStore} from "doublekit-eam-ui";
//import {SLATE_STORE, SlateStore} from 'doublekit-slate-ui'
import {SLATE_STORE,SlateStore} from "./slateStore"
import {DomainRoleStore, PRIVILEGE_DOMAIN_ROLE_STORE} from "./pages/system/store/domainRole";
import {
    PRIVILEGE_SYSTEM_STORE,
    PrivilegeSystemStore
} from "./pages/system/feature/store/systemFeatureStore";
import {
    PRIVILEGE_PROJECT_FEATURE_STORE,
    PrivilegeProjectFeatureStore
} from "./pages/system/projectFeature/store/projectFeatureStore";
import {SYSTEM_ROLE_STORE, SystemRoleStore} from "./pages/system/systemRole/store/systemRoleStore";
import {
    PRIVILEGE_PROJECT_ROLE_STORE,
    PrivilegeProjectRoleStore
} from "./pages/system/projectSystemRole/store/projectRoleStore";
import {
    MESSAGE_MANAGEMENT_STORE,
    MessageManagementStore
} from "./pages/system/management/store/messageStore";
import {
    MESSAGE_TYPE_STORE,
    MessageTypeStore
} from "./pages/system/messageType/store/messageTypeStore";
import {
    MESSAGE_SEND_TYPE_STORE,
    MessageSendTypeStore
} from "./pages/system/sendType/store/messageSendTypeStore";
import {
    MESSAGE_TEMPLATE_STORE,
    MessageTemplateStore
} from "./pages/system/template/store/messageTemplateStore";
import {
    USER_MESSAGE_STORE,
    UserMessageStore
} from "./pages/system/userMessage/store/myMessageStore";
import {ORG_STORE, OrgStore} from "./pages/orga/orgaManagement/store/orgaStore";
import {
    DOMAIN_USER_STORE,
    DomainUserStore
} from "./pages/orga/projectPeopleManagement/store/domainUserStore";

import {USER_STORE, UserStore} from "./pages/orga/userManagement/store/userStore";
import {AUTH_CONFIG_STORE, AuthConfigStore} from "./pages/authConfig/store/authConfigStore";
function createStores() {
    return {
        [PRIVILEGE_DOMAIN_ROLE_STORE]: new DomainRoleStore(),
        [PRIVILEGE_SYSTEM_STORE]: new PrivilegeSystemStore(),
        [PRIVILEGE_PROJECT_FEATURE_STORE]: new PrivilegeProjectFeatureStore(),
        [SYSTEM_ROLE_STORE]:new SystemRoleStore(),
        [PRIVILEGE_PROJECT_ROLE_STORE]: new PrivilegeProjectRoleStore(),
        [MESSAGE_MANAGEMENT_STORE]: new MessageManagementStore(),
        [MESSAGE_TYPE_STORE]: new MessageTypeStore(),
        [MESSAGE_SEND_TYPE_STORE]: new MessageSendTypeStore(),
        [MESSAGE_TEMPLATE_STORE]: new MessageTemplateStore(),
        [USER_MESSAGE_STORE] : new UserMessageStore(),
        [ORG_STORE]: new OrgStore(),
        [DOMAIN_USER_STORE]: new DomainUserStore(),
        [USER_STORE]: new UserStore(),
        [AUTH_CONFIG_STORE]: new AuthConfigStore(),
        [EAM_STORE]: new EamStore(),
        [SLATE_STORE]: new SlateStore(),
    };
}

const stores = createStores();



export {
    stores,
};

