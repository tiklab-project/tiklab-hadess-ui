/**
 * @name: GuideContent
 * @author: limingliang
 * @date: 2022-12-27 10:30
 * @description：指引详情
 * @update: 2022-12-27 10:30
 */
import React, {useEffect,useState} from "react";
import {Drawer,Select} from 'antd'
const { Option } = Select;
import './GuideTable.scss'
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
import Voucher from "./Voucher";
const publicTable=[{key:"deploy",value:"配置凭证"},{key:"push",value:"推送"},{key:"pull",value:"拉取"}]
const GuideTable = (props) => {
    const {type} = props;
    const [table,setTable]=useState('deploy')

    const [tables,setTables]=useState([])
    const [serverIp,setServerIp]=useState('')  //docker 不需要带http或者https

    useEffect(async () => {
        if (type==='Generic'){
            setTables(publicTable.filter(a=>a.key!=="deploy"))
            setTable("push")
        }else {
            setTables(publicTable)
        }
        const path=node_env? base_url:window.location.origin
        setServerIp(path.substring(path.indexOf("//")+2))

    }, []);

    const cuteTable =async (value) => {
      setTable(value)
    }


    return(
           <div className='guide-detail'>
               <div className='guide-details-flex'>
                   <div className='guide-type-table'>
                       <div className='border-img-center'>
                           <img  src={type==='Maven'&&mvn||type==="npm"&&npm||type==='Docker'&&docker||type==='Generic'&&generic||
                           type==='PyPI'&&pypi||type==='Helm'&&helm||type==='NuGet'&&nuget||type==='Go'&&go
                           }  style={{width:40,height:40}}/>
                       </div>
                       <div className='guide-type-table-text'>{type}</div>
                   </div>
               </div>
               <div className='guide-dec-type '>
                   <div className='guide-details-flex '>
                       {
                           tables.map(item=>{
                               return(
                                   <div className={`${table===item.key&&" choose_type"} guide-type-title`} onClick={()=>cuteTable(item.key)}>{item.value}</div>
                               )
                           })
                       }

                   </div>
                   {
                       table==="deploy"&& <Voucher type={type} serverIp={serverIp}/>||
                       table==="pull"&& <PullDetails type={type} serverIp={serverIp}/>||
                       table==="push"&&<PushDetails type={type} serverIp={serverIp}/>
                   }
               </div>
           </div>

    )
}
export default GuideTable
