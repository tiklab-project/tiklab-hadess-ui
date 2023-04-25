import {EAM_STORE, EamStore} from "tiklab-eam-ui/es/store";
//import {SLATE_STORE, SlateStore} from 'tiklab-slate-ui'
import {SLATE_STORE,SlateStore} from "./slateStore"
import {messageModuleStores} from 'tiklab-message-ui/es/store';

import {orgStores,privilegeStores} from "tiklab-user-ui/es/store"
import {REPOSITORY_STORE, RepositoryStore} from "./repository/repository/store/repositoryStore";
import {DEPLOY_STORE,DeployStore} from "./repository/deploy/store/DeployStore"
import {LIBRARY_STORE,LibraryStore} from "./library/store/LibraryStore"

function createStores() {
    return {
        ...messageModuleStores,
        ...orgStores,
        ...privilegeStores,
        [EAM_STORE]: new EamStore(),
        [SLATE_STORE]: new SlateStore(),
        [REPOSITORY_STORE]:new RepositoryStore(),
        [DEPLOY_STORE]:new DeployStore(),
        [LIBRARY_STORE]:new LibraryStore(),

    };
}

const stores = createStores();



export {
    stores,
};

