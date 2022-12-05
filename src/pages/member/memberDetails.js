/**
 * @name: Details
 * @author: limingliang
 * @date: 2021-08-09 16:48
 * @description：会员详情
 * @update: 2021-08-09 16:48
 */
import React from "react";
import {Drawer} from 'antd'
const MemberDetails = props => {
    const {visible, onClose,memberData} = props;
    return(
        <Drawer
            title="会员详情"
            placement='right'
            onClose={onClose}
            visible={visible}
            width  ={'700'}
            className='locker-top'
        >
            {memberData&&
                <div className=' member-details space-y-3'>
                    <div className='flex'>
                        <div className='left-nav'>会员名称:</div>
                        <span>{memberData?.nickName}</span>
                    </div>
                    <div className='flex'>
                        <div className='left-nav'>手机号:</div>
                        <span>{memberData?.phone}</span>
                    </div>
                    <div className='flex'>
                        <div className='left-nav'>会员邮箱:</div>
                        <span>{memberData?.email}</span>
                    </div>
                    <div className='flex'>
                        <div className='left-nav'>认证方式:</div>
                        <span>{memberData?.memberType===1 ?'内部':'第三方'}</span>
                    </div>
                </div>
            }

        </Drawer>
    )
};

export default MemberDetails
