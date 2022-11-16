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
                <div className='space-y-2'>
                    <p>会员名称:  {memberData?.nickName}</p>
                    <p>会员邮箱: {memberData?.email}</p>
                    <p>手机号： {memberData?.phone}</p>
                    <p>认证方式:   {memberData?.memberType===1 ?'内部':'第三方'}</p>

                </div>
            }

        </Drawer>
    )
};

export default MemberDetails
