/**
 * @name: Btn
 * @author: limingliang
 * @date: 2023-03-16 10:30
 * @description：按钮
 * @update: 2023-03-16 10:30
 */
import React from 'react';
import {Space} from 'antd';
import './Btn.scss';
const Btn = (props) => {
    const {icon,type,title,onClick,isMar} = props

    return (
        <div
            className={`xcode-btn ${type?`xcode-btn-${type}`:''} ${isMar?'xcode-btn-mar':''}`}
            onClick={onClick}
        >
            <Space>
                {
                    icon &&  <span className='xcode-btn-icon'>{icon}</span>
                }
                {title}
            </Space>
        </div>
    )

}
export default Btn