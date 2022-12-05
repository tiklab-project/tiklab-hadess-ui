import {EAM_STORE, EamStore} from "tiklab-eam-ui/es/store";
//import {SLATE_STORE, SlateStore} from 'tiklab-slate-ui'
import {SLATE_STORE,SlateStore} from "./slateStore"
import {DomainRoleStore, PRIVILEGE_DOMAIN_ROLE_STORE} from 'tiklab-privilege-ui/es/store'
import {messageModuleStores} from 'tiklab-message-ui/es/store';

import {orgStores} from "tiklab-user-ui/es/store";


import {AUTH_CONFIG_STORE, AuthConfigStore} from "./pages/authConfig/store/authConfigStore";
function createStores() {
    return {
        ...messageModuleStores,
        ...orgStores,
        [PRIVILEGE_DOMAIN_ROLE_STORE]: new DomainRoleStore(),
        [AUTH_CONFIG_STORE]: new AuthConfigStore(),
        [EAM_STORE]: new EamStore(),
        [SLATE_STORE]: new SlateStore(),
    };
}

const stores = createStores();



export {
    stores,
};

