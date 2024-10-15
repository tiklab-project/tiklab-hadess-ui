
import React,{ useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { enableAxios } from 'tiklab-core-ui'
import {orgStores} from "tiklab-user-ui/es/store";
import {privilegeStores} from "tiklab-privilege-ui/es/store";
import { ConfigProvider } from 'antd';
import { Provider } from 'mobx-react';
import routes from './routers'
import {stores} from './stores'
import './common/language/i18n';
import "./assets/font_icon/iconfont";
import "./assets/images/index"
import './index.scss';
import zhCN from 'antd/es/locale/zh_CN';
enableAxios()
const App = () => {
    // 注册所有插件
    let allStore = {
        ...stores,
        ...privilegeStores,
        ...orgStores,
    };

    return (
        <Provider {...allStore}>
            <ConfigProvider locale={zhCN}>
                <HashRouter>
                    { renderRoutes(routes)}
                </HashRouter>
            </ConfigProvider>
        </Provider>

    );
};
ReactDOM.render(<App />, document.getElementById('root'));
if (module.hot) {
    module.hot.accept();
}


