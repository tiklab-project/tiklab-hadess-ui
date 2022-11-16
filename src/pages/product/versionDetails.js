/**
 * @name: ProductDetails
 * @author: limingliang
 * @date: 2022-11-15 16:48
 * @description：产品版本详情
 * @update: 2022-11-15 16:48
 */
import React,{useState} from "react";
import {Drawer} from 'antd'
import {PreviewEditor} from "tiklab-slate-ui";
const VersionDetails = (props) => {
    const {visible, onCancel,versionData} = props;

    return(
        <Drawer
            title="产品版本详情"
            placement='right'
            onClose={onCancel}
            visible={visible}
            width ={600}
            className='locker-top'
        >
            {
                versionData&&
                <div className='space-y-3 mb-12'>
                    <div>产品: {versionData.product.name}</div>
                    <div>版本: {versionData.version}</div>
                    <div>详情:
                        <PreviewEditor value={JSON.parse(versionData.details)}/>
                    </div>
                </div>
            }

        </Drawer>
    )
}
export default VersionDetails