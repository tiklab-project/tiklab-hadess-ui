import {createContext} from 'react'
import {messageModuleStores} from 'tiklab-message-ui/es/store';
import {orgStores} from "tiklab-user-ui/es/store"
import {privilegeStores} from "tiklab-privilege-ui/es/store"
import {REPOSITORY_STORE, RepositoryStore} from "./repository/repository/store/repositoryStore";


function createStores() {
    return {
        ...messageModuleStores,
        ...orgStores,
        ...privilegeStores,
        [REPOSITORY_STORE]:new RepositoryStore(),
    };
}

const stores = createStores();

const storeContext = createContext(stores)

export {
    stores,
    storeContext
};

