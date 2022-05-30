/**
 * @name: layout
 * @author: mahai
 * @date: 2021-05-21 16:53
 * @description：layout
 * @update: 2021-05-21 16:53
 */

import React ,{Fragment}from 'react';
import { verifyUserHOC, EAM_STORE } from "doublekit-eam-ui";
import {inject, observer} from 'mobx-react'
import {renderRoutes} from "react-router-config";
import {getUser} from "../utils";
const HeaderConfig = [
   /* {
        to:'/',
        title:'首页',
        key: '/'
    },*/{
        to:`/setting`,
        title:'运营管理',
        key: '/setting'
    },
    {
        to:`/system`,
        title:'系统管理',
        key: '/system'
    },
];

const SaasLayout = props => {

    const changeCurrentLink = item => {
        if (item==='/logout'){
            props.history.push(item)
        }else {
            props.history.push(item.to)
        }

    }
    const renderRouter = () => {

        if (HeaderConfig) {
            return (
                <div defaultValue='/setting' className={'flex h-14  '}>
                    {
                        HeaderConfig.map(item => {
                            return <div key={item.key} className='py-4 px-3 cursor-pointer' onClick={ () => changeCurrentLink(item)} > {item.title}</div>
                        })
                    }
                </div>
            )
        }
    }
    return (
        <Fragment>
            <header className='flex border-b'>
                <div className='flex w-4/5'>
                    <div className='font-extrabold italic text-3xl w-40 pl-12 pt-2 '>oms</div>
                    {renderRouter()}
                </div>
                <div className='flex py-4 w-1/5 justify-end pr-12 '>
                    <div className='border border-gray-200 bg-blue-400 px-4 py-2 cursor-pointer' onClick={()=>changeCurrentLink('/logout')}>
                        退出
                    </div>
                </div>
            </header>
            <div stye={{display: 'flex',height: '100%'}}>
                <div style={{width:'100%'}}>
                    {renderRoutes(props.route.routes)}
                </div>
            </div>
        </Fragment>

    )
};

export default verifyUserHOC(inject(EAM_STORE)(observer(SaasLayout)))
