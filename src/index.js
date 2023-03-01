
import React,{useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import enableAxiosCE from 'tiklab-enable-axios-ce'
import { privilegeStores } from 'tiklab-privilege-ui/es/store';
import {PluginProvider} from "tiklab-plugin-ui"
import { createContainer } from 'tiklab-plugin-ui/es/_utils';
import { ConfigProvider } from 'antd';
import {initFetch} from "tiklab-plugin-ui/es/_utils"
import { Provider } from 'mobx-react';
import routes from './routers'
import {stores} from './stores'
import './common/language/i18n';
import "./assets/font-icon/iconfont";

import './App.scss';
import './common/styles/tailwind.css';
import {useTranslation} from "react-i18next";
import zhCN from 'antd/es/locale/zh_CN';
enableAxiosCE()
const App = () => {
    // 注册所有插件
    let allStore = {
        ...stores,
        ...privilegeStores
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
    // useEffect(() => {
    //     initFetch('post', routes, resources, i18n).then(res => {
    //         setPluginData(res)
    //         setViable(false)
    //     })
    //
    // }, []);

    // if (viable) {
    //     return <div>加载中</div>
    // }
    const CounterContainer = createContainer();
    return (
        <CounterContainer.Provider initialState={pluginData}>
            <Provider {...allStore}>
                <ConfigProvider locale={zhCN}>
                    <HashRouter>
                        {renderRoutes(routes)}
                    </HashRouter>
                </ConfigProvider>
            </Provider>
        </CounterContainer.Provider>

    );
};
ReactDOM.render(<App />, document.getElementById('root'));
if (module.hot) {
    module.hot.accept();
}


