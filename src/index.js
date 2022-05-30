
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import { privilegeStores } from 'doublekit-privilege-ui';
import { useLoadLanguage} from 'doublekit-plugin-manage';

import { Provider } from 'mobx-react';
import routes from './routers'
import resources from './common/language/resources';

import './common/language/i18n';
import "./assets/font-icon/iconfont";
import {stores} from './stores'
import './App.scss';
import './tailwind.css';
const App = () => {
    // 注册所有插件
    let allStore = {
        ...stores,
        ...privilegeStores
    };

    useLoadLanguage(resources, method, plugin_url, 'zh')


    return (
        <Provider {...allStore}>
            <HashRouter>
                {renderRoutes(routes)}
            </HashRouter>
        </Provider>
    );
};
ReactDOM.render(<App />, document.getElementById('root'));
if (module.hot) {
    module.hot.accept();
}


