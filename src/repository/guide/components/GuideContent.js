/**
 * @name: GuideContent
 * @author: limingliang
 * @date: 2022-12-27 10:30
 * @description：指引详情
 * @update: 2022-12-27 10:30
 */
import React, {useState} from "react";
import {Drawer,Select} from 'antd'
const { Option } = Select;
import './GuideContent.scss'
import DeployDetails from "./DeployDetails";
import PushDetails from "./PushDetails";
import PullDetails from "./PullDetails";
import mvn from "../../../assets/images/img/mvn.png"
import npm from "../../../assets/images/img/npm.png"
import docker from "../../../assets/images/img/docker.png"
import generic from "../../../assets/images/img/generic.png"
import pypi from "../../../assets/images/img/pypi.png"
import nuget from "../../../assets/images/img/nuget.png"
import go from "../../../assets/images/img/go.png"
import helm from "../../../assets/images/img/helm.png"
const GuideContent = (props) => {
    const {visible, onClose,type} = props;
    const [table,setTable]=useState('deploy')


    const cuteTable =async (value) => {
      setTable(value)
    }

    return(
        <Drawer
            title="操作指引"
            placement='right'
            onClose={onClose}
            visible={visible}
            width  ={'700'}
            className='locker-top'
        >
           <div className='guide-detail'>
               <div className='guide-details-flex'>
                   <div className='guide-type-table'>
                       <div className='border-img-center'>
                           <img  src={type==='Maven'&&mvn||type==="npm"&&npm||type==='Docker'&&docker||type==='Generic'&&generic||
                           type==='PyPI'&&pypi||type==='HeIm'&&helm||type==='NuGet'&&nuget||type==='Go'&&go
                           }  style={{width:40,height:40}}/>
                       </div>
                       <div className='guide-type-table-text'>{type}</div>
                   </div>
               </div>
               <div className='guide-dec-type '>
                   <div className='guide-details-flex '>
                       <div className={`${table==="deploy"&&" choose_type"} guide-type-title`} onClick={()=>cuteTable('deploy')}>配置凭证</div>
                       <div className={`${table==="push"&&" choose_type"} guide-type-title type-title-m`} onClick={()=>cuteTable('push')}>推送</div>
                       <div className={`${table==="pull"&&" choose_type"} guide-type-title`} onClick={()=>cuteTable('pull')}>拉取</div>
                   </div>
                   {
                       table==="deploy"&& <DeployDetails type={type}/>||
                       table==="pull"&& <PullDetails type={type}/>||
                       table==="push"&&<PushDetails type={type}/>
                   }
               </div>
           </div>
        </Drawer>
    )
}
export default GuideContent
