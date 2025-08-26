import React,{useState,useEffect,Fragment} from 'react';
import RepositorySetting from "./RepositorySetting";
import {SettingOutlined} from "@ant-design/icons";
const RepositorySettingNav = (props) => {
    const {match:{params}} = props
    const repositoryId = params.id;      // 仓库id

    let remoteLayerRouter = [
        {
            id:'1',
            title: '仓库信息',
            router:`/repository/${repositoryId}/setting/info`,
        },
        {
            id:'4',
            title: '成员',
            router:`/repository/${repositoryId}/setting/user`,
            icon:   <SettingOutlined className='icon-nav'/>,
            purviewCode: "domain_use",
        },
        {
            id:'5',
            title: '权限',
            router:`/repository/${repositoryId}/setting/role`,
            purviewCode: "domain_permission",
        },
       /* {
            id:'7',
            title: '清理策略',
            router:`/repository/${repositoryId}/setting/clean`,
        },*/
        {
            id:'6',
            title: '制品推送',
            router:`/repository/${repositoryId}/setting/push`,
        }
    ];

    return(
        <RepositorySetting {...props}
                           remoteLayerRouter={remoteLayerRouter}
        />
    )
}
export default RepositorySettingNav
