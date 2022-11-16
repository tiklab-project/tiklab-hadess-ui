/**
 * @name: Details
 * @author: limingliang
 * @date: 2021-08-09 16:48
 * @description：会员详情
 * @update: 2021-08-09 16:48
 */
import React, {useState, useEffect} from "react";
import {Breadcrumb, Row, Col, Input, Button, Table, Form,Upload,Modal } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import productService from "../../../service/product.service";
import {getUser} from "../../../utils";
import {withRouter} from "react-router";
const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 15 },
};

const MemberDetails = props => {
    const [memberData,setMemberData]=useState('')
    const members=props.history.location.params
    useEffect(async ()=>{
        if(members){
            sessionStorage.setItem("members", JSON.stringify(members));
        }
        setMemberData( JSON.parse(sessionStorage.getItem("members")))
    },[])
    return (
        <div className=' member'>
            <Breadcrumb separator="/" className=' member-title'>
                <Breadcrumb.Item  href='#/index/member'>会员管理</Breadcrumb.Item>
                <Breadcrumb.Item href="">会员详情</Breadcrumb.Item>
            </Breadcrumb>
            <div  className='member-data '>
                <p>会员名称:  {memberData.name}</p>
                <p>会员邮箱: {memberData.email}</p>
                <p>手机号： {memberData.phone}</p>
                <p>认证方式:   {memberData.memberType===1 ?'内部':'第三方'}</p>
            </div>
        </div>
    )
};

export default withRouter(MemberDetails)
