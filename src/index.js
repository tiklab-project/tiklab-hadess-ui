
import React,{ useState} from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import enableAxiosCE from 'tiklab-enable-axios-ce'
import {orgStores} from "tiklab-user-ui/es/store";
import {privilegeStores} from "tiklab-privilege-ui/es/store";
import { ConfigProvider } from 'antd';
import { Provider } from 'mobx-react';
import routes from './routers'
import {stores} from './stores'
import './common/language/i18n';
import "./assets/font-icon/iconfont";

import './App.scss';
import './common/styles/tailwind.css';
import {useTranslation} from "react-i18next";
import zhCN from 'antd/es/locale/zh_CN';
import {PluginProvider} from "tiklab-plugin-core-ui";

enableAxiosCE()
const App = () => {
    // 注册所有插件
    let allStore = {
        ...stores,
        ...privilegeStores,
        ...orgStores,
    };

    const {i18n} = useTranslation();

    const [viable,setViable] = useState(true);

    const [pluginData,setPluginData] = useState({
        routes,
        pluginStore:[],
        languageStore:[]
    });
    const resources = {
        zh: {
            translation: {},
        },
    }
    return (
        <PluginProvider store={pluginData}>
            <Provider {...allStore}>
                <ConfigProvider locale={zhCN}>
                    <HashRouter>
                        {renderRoutes(routes)}
                    </HashRouter>
                </ConfigProvider>
            </Provider>
        </PluginProvider>

    );
};
ReactDOM.render(<App />, document.getElementById('root'));
if (module.hot) {
    module.hot.accept();
}


