/**
 * @name: DeployTable
 * @author: limingliang
 * @date: 2022-12-29 16:53
 * @description：配置-table切换
 * @update: 2022-11-12 16:53
 */
import React from 'react';
import "./deployTable.scss"
const DeployTable = (props) => {
    const {type,repositoryId}=props
    const cuteTable = (value) => {
        if (value==='compile'){
            props.history.push(`/index/repository/${repositoryId}/compile`)
        }
        if (value==="agency"){
            props.history.push(`/index/repository/${repositoryId}/agency`)
        }
        if (value==='copy'){
            props.history.push(`/index/repository/${repositoryId}/copy`)
        }

    }
    return(
        <div className='flex space-x-8 deploy'>
            <div className={`${type==='compile'&& ' choose_deploy_type '}  deploy_tab`} onClick={()=>cuteTable("compile")}>详情</div>
            <div className={`${type==='agency'&& ' choose_deploy_type '}  deploy_tab`} onClick={()=>cuteTable("agency")}>代理信息</div>
            <div className={`${type==='copy'&& ' choose_deploy_type '}  deploy_tab`} onClick={()=>cuteTable("copy")}>复制信息</div>
        </div>
    )
}
export default DeployTable