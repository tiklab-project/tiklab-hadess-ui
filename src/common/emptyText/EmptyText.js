import React from 'react';
import {Empty} from "antd";

/**
 * 无数据渲染
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const EmptyText = props =>{

    const {title,type} = props

    return  <div style={{textAlign:'center' ,color:'#999'}}>
                <Empty image={Empty.PRESENTED_IMAGE_DEFAULT} description={title} />
            </div>
}

export default EmptyText
