import React from 'react';
import {useTranslation} from 'react-i18next';
import {LeftOutlined} from '@ant-design/icons';
import './Breadcrumb.scss';

/**
 * 面包屑
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const BreadcrumbContent = props =>{

    const {firstItem,secondItem,goBack} = props


    return  <div className='xpack-breadcrumb'>
                <div className='xpack-breadcrumb-content'>
                    { goBack && <LeftOutlined onClick={goBack} style={{color:'#0063FF',paddingRight:8}}/>}
                    <span className={secondItem ? 'xpack-breadcrumb-span':''}>
                        {firstItem}
                    </span>
                    {secondItem && <span className='xpack-breadcrumb-secondItem'>/&nbsp;&nbsp;{secondItem}</span>}
                </div>
            </div>
}

export default BreadcrumbContent