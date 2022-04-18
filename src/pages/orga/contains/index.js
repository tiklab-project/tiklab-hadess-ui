import React, {useState, useEffect}  from 'react';
import {renderRoutes} from 'react-router-config';
import {orgaMenuData} from "../../../utils/staticConfig";
import {pluginConfig, plugins,} from 'doublekit-plugin-ui';
import MenuList from "../../../common/menu/menu";


const Orga = props => {

    const onSelectMenu = e => {
        const key = e.key;
        const PluginMenus = pluginConfig('pluginNav').filter(item => item.extraProps).map(item => {
            return {
                key: item.id,
                router:'/' + item.router.mount  + item.router.router
            }
        })
        let links = [{
            key:'1',
            router: '/orga/dashbord'
        },{
            key:'2',
            router: '/orga/user'
        },{
            key:'3',
            router: '/orga/peojectpeople'
        }].concat(PluginMenus)

        OrgaOnSelectMenuSwitch(props.history, key, links)
    }

    const OrgaOnSelectMenuSwitch = (history, key, links) => {
        const index = links.findIndex(item => item.key === key)
        history.push(links[index].router)
    }

    // 显示导航菜单demo
    const [menuData, setMenuData] = useState(orgaMenuData);

    useEffect(() => {
        const PluginMenus = pluginConfig('pluginNav').filter(item => item.extraProps)
        console.info("查询PluginMenus",PluginMenus)
        const data = PluginMenus.map(item => {
            return {
                id:item.id,
                key: item.id,
                title: item.extraProps.title
            }
        })
        setMenuData(orgaMenuData.concat(data))
    }, [plugins]);
    return (
        <div style={{display: 'flex',height: '100%'}}>
            <MenuList
                data={menuData}
                onSelectMenu={onSelectMenu}
                defaultSelectedKeys={['2']}
            />
            <div style={{width:'100%'}}>
                {renderRoutes(props.route.routes)}
            </div>
        </div>
    )
}
export default Orga;
