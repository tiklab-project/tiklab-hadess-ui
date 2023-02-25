/**
 * @name: xpack 制品库左侧导设置-导航栏
 * @author: limingliang
 * @date: 2023-02-17 16:51
 * @description：setting
 * @update: 2023-02-17 16:51
 */
import React,{useState,useEffect} from 'react';
import {renderRoutes} from 'react-router-config'
const LayerSetup = (props) => {
    const repositoryId = props.match.params.id;      // 当前选中路由
    const [type,setType]=useState('1')   //左侧导航览类型


    let layerRouter = [
        {
            key:'1',
            title: '制品信息',
            router:`/index/repository/${repositoryId}/setting/repositoryInfo`,
        },
        {
            key:'2',
            title: '代理',
            router:`/index/repository/${repositoryId}/setting/agency`,
        },
        {
            key:'3',
            title: '复制',
            router:`/index/repository/${repositoryId}/setting/copy`,
        },
        {
            key:'4',
            title: '权限',
            router:`/index/repository/${repositoryId}/setting/programDomainRole`,
        }];

    //切换类型
    const cuteType =async (value) => {
        setType(value.key)
        props.history.push(value.router)
    }

    return(
        <div className='setting'>
            <div className={'layer-nav'}>
                <div className='layer-title layer-nav-char'>设置</div>
                {layerRouter?.map(item=>{
                    return(
                        <div key={item.key} className={`${type===item.key&&' layer-choice-table'}  py-3 cursor-pointer hover:bg-gray-200 `} onClick={()=>cuteType(item)} >
                            <div className='layer-nav-char'>
                                {item.title}
                            </div>
                        </div>
                    )
                })
                }
            </div>
            <div  className={'setting_right_height'}>
                {renderRoutes(props.route.routes)}
            </div>
        </div>
    )
}
export default LayerSetup
