import {createContext} from 'react'
import {orgStores} from "thoughtware-user-ui/es/store"
import {privilegeStores} from "thoughtware-privilege-ui/es/store"
import {REPOSITORY_STORE, RepositoryStore} from "./repository/repository/store/repositoryStore";


function createStores() {
    return {
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

