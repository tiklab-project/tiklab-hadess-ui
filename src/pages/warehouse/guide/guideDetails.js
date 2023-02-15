/**
 * @name: GuideDetails
 * @author: limingliang
 * @date: 2022-12-27 10:30
 * @description：指引详情
 * @update: 2022-12-27 10:30
 */
import React, {useState, useEffect} from "react";
import {Drawer,Select} from 'antd'
const { Option } = Select;
import './guide.scss'
const GuideDetails = (props) => {
    const {visible, onClose,repository,repositoryList} = props;
    const [table,setTable]=useState('deploy')
    const handleChange =async () => {

    }


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
           <div className='space-y-14 guide'>
               <div className='flex space-x-3'>
                   <div className={`border w-24 py-6 rounded-md cursor-pointer`} >
                       <div className='flex-row text-center '>Maven</div>
                   </div>
                   <div className='space-y-2'>
                       <div>制品库</div>
                       <Select
                           defaultValue={repository?.id}
                           style={{width: 150}}
                           onChange={handleChange}
                       >
                           {
                               repositoryList?.map(item=>{
                                   return(
                                       <Option key={item.id} value={item.id}>{item.name}</Option>
                                   )
                               })
                           }
                       </Select>
                   </div>
               </div>
               <div className='space-y-6'>
                   <div className='flex space-x-8'>
                       <div className={`${table==="deploy"&&" choose_type"} guide_tab`} onClick={()=>cuteTable('deploy')}>配置凭证</div>
                       <div className={`${table==="push"&&" choose_type"} guide_tab`} onClick={()=>cuteTable('push')}>推送</div>
                       <div className={`${table==="pull"&&" choose_type"} guide_tab`} onClick={()=>cuteTable('pull')}>拉取</div>
                   </div>
                   <div>请将下面配置添加到您的setting.xml文件中</div>
                   <div className='bg-gray-200'>
                       {
                         "<!-- 一般情况 maven 的通用 settings.xml 在 .m2 文件夹下, 项目内 settings.xml 也可以进行设置，优先级更高 -->"+
                         "<setting>"+
                           "<!-- omitted xml -->"+
                           "<!-- 请妥善保管好您的配置，不要随意分享给他人 -->"+
                           "  <servers>"+
                           "  <server>"+
                            "  <id>yundianzhilian-yundianzhilian-tianqiong</id>"+
                           "    <username>lmingl@yeah.net</username>"+
                           "    <password>[PASSWORD]</password>"+
                           "  </server>"+
                           "   </servers>"+
                           " </setting>"
                       }
                   </div>
               </div>

           </div>
        </Drawer>
    )
}
export default GuideDetails