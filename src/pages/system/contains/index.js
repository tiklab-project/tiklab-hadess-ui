import React from 'react';
import {renderRoutes} from 'react-router-config';
import {systemMenuData, onSystemMenu} from "../../../utils/staticConfig";
import MenuList from "../../../common/menu/menu";


const System = props => {

    const onSelectMenu = e => {
        const key = e.key;
        onSystemMenu(props.history, key)
    }

    return (
        <div style={{    display: 'flex',height: '100%'}}>
            <MenuList
                data={systemMenuData}
                onSelectMenu={onSelectMenu}
                defaultSelectedKeys={['1-1']}
                defaultOpenKeys={['1']}
            />
            <div style={{width:'100%'}}>
                {renderRoutes(props.route.routes)}
            </div>

        </div>
    )
}
export default System;
