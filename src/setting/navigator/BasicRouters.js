import React from "react";
import {
    MenuOutlined,
    ProjectOutlined,
} from "@ant-design/icons";



// 基础数据路由
export const BasicRouter = [
    {
        id:"10",
        title:"基础数据",
        icon:<ProjectOutlined />,
        children:[
            {
                id:"/setting/systemFunction",
                title:"系统功能",
                icon:<MenuOutlined />,
            },
            {
                id:"/setting/systemRole",
                title:"系统角色",
                icon: <MenuOutlined />,
            },
            {
                id:"/setting/projectFunction",
                title:"项目功能",
                icon:<MenuOutlined />,
            },
            {
                id:"/setting/projectRole",
                title:"项目角色",
                icon:<MenuOutlined />,
            },

            {
                id:"/setting/logType",
                title:"日志类型",
                icon:<MenuOutlined />,
            },
        ]
    }
]
