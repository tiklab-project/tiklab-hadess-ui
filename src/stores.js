import {EAM_STORE, EamStore} from "tiklab-eam-ui/es/store";
//import {SLATE_STORE, SlateStore} from 'tiklab-slate-ui'
import {SLATE_STORE,SlateStore} from "./slateStore"
import {DomainRoleStore, PRIVILEGE_DOMAIN_ROLE_STORE} from 'tiklab-privilege-ui/es/store'
import {messageModuleStores} from 'tiklab-message-ui/es/store';

import {orgStores} from "tiklab-user-ui/es/store";


function createStores() {
    return {
        ...messageModuleStores,
        ...orgStores,
        [PRIVILEGE_DOMAIN_ROLE_STORE]: new DomainRoleStore(),
        [EAM_STORE]: new EamStore(),
        [SLATE_STORE]: new SlateStore(),
    };
}

const stores = createStores();



export {
    stores,
};

