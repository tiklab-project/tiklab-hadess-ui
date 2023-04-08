import {EAM_STORE, EamStore} from "tiklab-eam-ui/es/store";
//import {SLATE_STORE, SlateStore} from 'tiklab-slate-ui'
import {SLATE_STORE,SlateStore} from "./slateStore"
import {messageModuleStores} from 'tiklab-message-ui/es/store';

import {orgStores,privilegeStores} from "tiklab-user-ui/es/store"
import {REPOSITORY_STORE, RepositoryStore} from "./repository/repository/store/repositoryStore";


function createStores() {
    return {
        ...messageModuleStores,
        ...orgStores,
        ...privilegeStores,
        [EAM_STORE]: new EamStore(),
        [SLATE_STORE]: new SlateStore(),
        [REPOSITORY_STORE]:new RepositoryStore(),
    };
}

const stores = createStores();



export {
    stores,
};

