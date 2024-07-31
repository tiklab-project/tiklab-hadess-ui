
import React,{ useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { enableAxios } from 'thoughtware-core-ui'
import {orgStores} from "thoughtware-user-ui/es/store";
import {privilegeStores} from "thoughtware-privilege-ui/es/store";
import { ConfigProvider } from 'antd';
import { Provider } from 'mobx-react';
import routes from './routers'
import {stores} from './stores'
import './common/language/i18n';
import "./assets/font_icon/iconfont";
import "./assets/images/index"
import './index.scss';
import {useTranslation} from "react-i18next";
import zhCN from 'antd/es/locale/zh_CN';
import {pluginLoader,PluginProvider} from "thoughtware-plugin-core-ui";
import resources from "./common/language/Resources";
enableAxios()
const App = () => {
    // 注册所有插件
    let allStore = {
        ...stores,
        ...privilegeStores,
        ...orgStores,
    };
    const {i18n} = useTranslation();

    const [visible,setVisible] = useState(true);

    const [pluginData,setPluginData] = useState({
        routes,
        pluginStore:[],
        languageStore:[]
    });

    useEffect(() => {
        pluginLoader(routes,resources,i18n).then(res => {
            setPluginData(res)
            setVisible(false)
        })
    }, [])


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


