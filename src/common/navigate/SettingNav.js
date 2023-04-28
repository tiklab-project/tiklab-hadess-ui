/**
 * @name: setting
 * @author: limingliang
 * @date: 2021-05-21 16:51
 * @description：setting
 * @update: 2021-05-21 16:51
 */
import React,{useState} from 'react';
import {renderRoutes} from 'react-router-config'
import MenuList from "../menu/menu";
import './RepositoryNav.scss'
import {CopyOutlined, MessageOutlined, TeamOutlined} from "@ant-design/icons";
const SettingNav = props => {
    const {menuData,onSelectMenu,openKey}=props
    return (
        <div className='setting'>
            <div className={'left-nav left-nav-system-width'}>
                <MenuList
                    data={menuData}
                    onSelectMenu={onSelectMenu}
                    defaultSelectedKeys={[openKey]}
                />
            </div>

            <div  className={'setting_right_height'}>
                {renderRoutes(props.route.routes)}
            </div>
        </div>
    )
};
export default SettingNav
