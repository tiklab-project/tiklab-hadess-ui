import React, {Fragment, useState} from 'react';
import {observer} from "mobx-react";
import { Menu } from 'antd';
import styles from './menu.module.scss';

const { SubMenu } = Menu;

const MenuList = (props) => {
    const {className, onSelectMenu} = props;
    const [selectedKeys, setSelectedKeys] = useState(props.defaultSelectedKeys || [])


    const loop = (data = []) => {
        return data.map((item, index) => {
            if (item.children && item.children.length) {
                return (
                    <SubMenu key={`${item.id}`} title={item.title} icon={item.icon}>
                        {
                            loop(item.children)
                        }
                    </SubMenu>
                );

            }
            return (
                <Fragment key={`${item.id}`}>
                    {item.divider &&  <Menu.Divider/>}
                    <Menu.Item icon={item.icon} key={`${item.id}`}>
                        {
                            item.title
                        }
                    </Menu.Item>
                </Fragment>
            )
        })
    }


    const clickSelect = e => {
        setSelectedKeys([e.key])
        onSelectMenu(e)
    }

    return(
        <div className={`${styles['privilege-header-menu']} ${className}`}>
            <Menu theme='light'
                  mode={'inline'}
                  className={styles["menu-wrap"]}
                  defaultSelectedKeys={props.defaultSelectedKeys}
                  defaultOpenKeys={props.defaultOpenKeys}
                  selectedKeys={selectedKeys}
                  onSelect={clickSelect}
            >
                {loop(props.data)}
            </Menu>
        </div>
    )
}

export default observer(MenuList)
