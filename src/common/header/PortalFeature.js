import React,{useState} from 'react'
import {BaseModal,HeaderDropdown} from "tiklab-licence-ui/es/commons";
import {disableFunction} from "tiklab-core-ui";
import vipLight from '../../assets/images/img/vip-light.png';
import vipDark from '../../assets/images/img/vip-dark.png';
import "./PortalFeature.scss";


const featureList = [
    {
        "id": "23rfsd",
        "productType": {
            "id": "hadess",
            "code": null,
            "typeName": null
        },
        "type": "ee",
        "name": "hadess-企业版",
        "price": "45",
        "version": "V1.0.2",
        "createTime": "2024-01-31 16:17:04.831",
        "modelList": [
            {
                "id": "ea5a5e1a18e0",
                "comparisonId": "23rfsd",
                "name": "制品扫描模块：制品扫描、自定义扫描方案",
                "sort": 1,
                "createTime": "2024-06-06 16:47:04.477",
                "children": []
            },
            {
                "id": "0e2f94669409",
                "comparisonId": "23rfsd",
                "name": "登陆模块：企业微用户登陆、Ldap用户登陆",
                "sort": 1,
                "createTime": "2024-06-06 16:47:14.029",
                "children": []
            },
            {
                "id": "e4d241d927a8",
                "comparisonId": "23rfsd",
                "name": "用户模块：企业微信用户管理、Ladp用户管理",
                "sort": 3,
                "createTime": "2024-06-06 15:38:59.27",
                "children": []
            },
            {
                "id": "b3625378edf9",
                "comparisonId": "23rfsd",
                "name": "消息模块：支持企业微信机器人消息",
                "sort": 5,
                "createTime": "2024-06-06 16:46:05.417",
                "children": []
            }
        ],
        "resourcesList": [
            {
                "id": "a322220f7750",
                "comparisonId": "23rfsd",
                "key": "日志保存时长",
                "values": "不限制",
                "sort": 1,
                "createTime": "2024-05-24 21:33:24.677"
            }
        ],
        "customerList": [
            {
                "id": "5d7b6fce037b",
                "comparisonId": "23rfsd",
                "key": null,
                "values": "在线工单支持",
                "sort": 1,
                "createTime": "2024-05-24 21:31:46.152"
            },
            {
                "id": "e04416ccf931",
                "comparisonId": "23rfsd",
                "key": null,
                "values": "应用专属群聊",
                "sort": 1,
                "createTime": "2024-05-24 21:47:30.283"
            },
            {
                "id": "f598b162b535",
                "comparisonId": "23rfsd",
                "key": null,
                "values": "7*24 小时智能客服",
                "sort": 3,
                "createTime": "2024-05-24 21:31:50.003"
            },
            {
                "id": "7a071a8826c8",
                "comparisonId": "23rfsd",
                "key": null,
                "values": "企业微信专属客服",
                "sort": 3,
                "createTime": "2024-05-24 21:47:05.908"
            },
            {
                "id": "db71d603bf70",
                "comparisonId": "23rfsd",
                "key": null,
                "values": "提供私有化专属技术支持",
                "sort": 5,
                "createTime": "2024-05-24 21:31:39.672"
            }
        ]
    },
    {
        "id": "5943ed320311",
        "productType": {
            "id": "hadess",
            "code": null,
            "typeName": null
        },
        "type": "ce",
        "name": "hadess-社区版",
        "price": "0",
        "version": "V1.0.1",
        "createTime": "2024-01-31 16:17:04.831",
        "modelList": [
            {
                "id": "a60761d7b46b",
                "comparisonId": "5943ed320311",
                "name": "制品库模块",
                "sort": 1,
                "createTime": "2024-05-15 17:24:43.587",
                "children": []
            },
            {
                "id": "0109635eeb65",
                "comparisonId": "5943ed320311",
                "name": "制品模块",
                "sort": 2,
                "createTime": "2024-05-15 17:27:29.225",
                "children": []
            },
            {
                "id": "fccb13075e48",
                "comparisonId": "5943ed320311",
                "name": "安全模块",
                "sort": 3,
                "createTime": "2024-06-06 17:35:59.952",
                "children": []
            },
            {
                "id": "41802f09163a",
                "comparisonId": "5943ed320311",
                "name": "用户模块基础功能",
                "sort": 4,
                "createTime": "2024-06-06 16:36:13.017",
                "children": []
            },
            {
                "id": "1d9203cd1e37",
                "comparisonId": "5943ed320311",
                "name": "权限模块",
                "sort": 5,
                "createTime": "2024-06-06 16:36:23.681",
                "children": []
            },
            {
                "id": "32ea572b28b2",
                "comparisonId": "5943ed320311",
                "name": "登录模块基础功能",
                "sort": 6,
                "createTime": "2024-06-06 16:36:35.371",
                "children": []
            },
            {
                "id": "c3f79274c236",
                "comparisonId": "5943ed320311",
                "name": "消息模块基础功能",
                "sort": 7,
                "createTime": "2024-06-06 16:36:59.928",
                "children": []
            },
            {
                "id": "8d25f5d92ee8",
                "comparisonId": "5943ed320311",
                "name": "安全模块",
                "sort": 8,
                "createTime": "2024-05-15 19:27:43.813",
                "children": []
            }
        ],
        "resourcesList": [
            {
                "id": "e75bb359be2f",
                "comparisonId": "5943ed320311",
                "key": "日志保存时长",
                "values": "7天",
                "sort": 1,
                "createTime": "2024-05-24 21:45:41.554"
            }

        ],
        "customerList": [
            {
                "id": "ae46ddaea9b5",
                "comparisonId": "5943ed320311",
                "key": null,
                "values": "应用群聊",
                "sort": 1,
                "createTime": "2024-05-24 21:46:21.094"
            },
            {
                "id": "d8a0e3c3f297",
                "comparisonId": "5943ed320311",
                "key": null,
                "values": " 在线工单支持",
                "sort": 2,
                "createTime": "2024-05-24 21:45:48.686"
            }
        ]
    },
    {
        "id": "2a4627413bef",
        "productType": {
            "id": "hadess",
            "code": null,
            "typeName": null
        },
        "type": "cloud-free",
        "name": "hadess-线上免费版",
        "price": "0",
        "version": null,
        "createTime": "2024-03-26 10:56:04.821",
        "modelList": [
            {
                "id": "4de5ac3e4f82",
                "comparisonId": "2a4627413bef",
                "name": "制品库模块",
                "sort": 1,
                "createTime": "2024-06-06 17:37:53.805",
                "children": []
            },
            {
                "id": "b0ee2641065b",
                "comparisonId": "2a4627413bef",
                "name": "制品模块",
                "sort": 1,
                "createTime": "2024-06-06 17:38:05.709",
                "children": []
            },
            {
                "id": "d4dec01bf8ba",
                "comparisonId": "2a4627413bef",
                "name": "制品扫描模块",
                "sort": 1,
                "createTime": "2024-06-06 17:38:31.542",
                "children": []
            },
            {
                "id": "cdfcb08ac4af",
                "comparisonId": "2a4627413bef",
                "name": "权限模块",
                "sort": 5,
                "createTime": "2024-06-06 17:37:19.538",
                "children": []
            },
            {
                "id": "96b65325e830",
                "comparisonId": "2a4627413bef",
                "name": "消息模块基础功能",
                "sort": 5,
                "createTime": "2024-06-06 17:37:42.532",
                "children": []
            },
            {
                "id": "f63219245a7e",
                "comparisonId": "2a4627413bef",
                "name": "安全模块",
                "sort": 6,
                "createTime": "2024-06-06 17:38:39.197",
                "children": []
            }
        ],
        "resourcesList": [
            {
                "id": "2f725fe9b265",
                "comparisonId": "2a4627413bef",
                "key": "制品库容量",
                "values": "5G",
                "sort": 1,
                "createTime": "2024-05-24 21:34:08.378"
            }
        ],
        "customerList": [
            {
                "id": "c407a30afea7",
                "comparisonId": "2a4627413bef",
                "key": null,
                "values": " 应用群聊",
                "sort": 1,
                "createTime": "2024-05-24 21:47:58.861"
            },
            {
                "id": "b387e7441531",
                "comparisonId": "2a4627413bef",
                "key": null,
                "values": "在线工单支持",
                "sort": 2,
                "createTime": "2024-05-24 21:34:26.146"
            }
        ]
    },
    {
        "id": "a6305e348d38",
        "productType": {
            "id": "hadess",
            "code": null,
            "typeName": null
        },
        "type": "cloud-pay",
        "name": "hadess-线上付费版",
        "price": "15",
        "version": null,
        "createTime": "2024-03-26 10:56:24.921",
        "modelList": [
            {
                "id": "de43fa452d82",
                "comparisonId": "a6305e348d38",
                "name": "消息模块：企业微信消息通知",
                "sort": 0,
                "createTime": "2024-05-14 19:58:16.736",
                "children": []
            }
        ],
        "resourcesList": [
            {
                "id": "e8446c127003",
                "comparisonId": "a6305e348d38",
                "key": "制品库容量",
                "values": "50GB",
                "sort": 1,
                "createTime": "2024-05-24 21:49:26.74"
            },
        ],
        "customerList": [
            {
                "id": "1ffa06d84300",
                "comparisonId": "a6305e348d38",
                "key": null,
                "values": "在线工单支持",
                "sort": 1,
                "createTime": "2024-05-24 21:50:16.754"
            },
            {
                "id": "99fe659d3771",
                "comparisonId": "a6305e348d38",
                "key": null,
                "values": " 应用专属群聊",
                "sort": 1,
                "createTime": "2024-05-24 21:50:22.987"
            },
            {
                "id": "5e6c868c6a1a",
                "comparisonId": "a6305e348d38",
                "key": null,
                "values": "7*24 小时智能客服",
                "sort": 1,
                "createTime": "2024-05-24 21:50:29.408"
            },
            {
                "id": "adca0c1863d5",
                "comparisonId": "a6305e348d38",
                "key": null,
                "values": "企业微信专属客服",
                "sort": 1,
                "createTime": "2024-05-24 21:50:35.928"
            },
            {
                "id": "11114078b610",
                "comparisonId": "a6305e348d38",
                "key": null,
                "values": "提供私有化专属技术支持",
                "sort": 1,
                "createTime": "2024-06-06 15:43:36.466"
            }
        ]
    }
]

/**
 * 应用管理产品特性
 * @param props
 * @constructor
 */
const PortalFeature = props =>{

    const isVip = disableFunction();

    const [visible,setVisible] = useState(false);

    const onOk = () =>{
        if(version==='cloud'){
            window.open(`https://work.tiklab.net/#/enterprise/application/eas`)
        } else {
            window.open(`https://tiklab.net/account/subscribe/apply/eas`)
        }
        onCancel()
    }

    const onCancel = () =>{
        setVisible(false)
    }

    const featureHtml = type => {
        let item = featureList.find(li => li.type === type);
        return (
            <div className='feature-item'>
                <div className='feature-item-header'>
                    <div className='header-title'>
                        {type==='ce' && '社区版'}
                        {type==='ee' && '企业版'}
                        {type==='cloud-free' && '免费版' }
                        {type==='cloud-pay' && '专业版' }
                    </div>
                    <div className='header-desc'>
                        {type==='ce' && '适用于个人和小型团队快速部署和使用。'}
                        {type==='ee' && '适用于大型组织和企业的复杂需求。'}
                        {type==='cloud-free' && '适用于个人和小型团队快速部署和使用。' }
                        {type==='cloud-pay' && '适用于大型组织和企业的复杂需求。' }
                    </div>
                </div>
                <div className='feature-item-body'>
                    <div className='feature-item-body-model'>
                        <div className='feature-item-body-title'>
                            <span>功能</span>
                            {
                                type==='cloud-pay' &&
                                <span className='feature-item-body-title-ex'>
                                    包含免费版所有功能
                                </span>
                            }
                        </div>
                        <div>
                            {
                                item?.modelList?.map(model=>(
                                    <div key={model.id} className='feature-model-item'>
                                        <div className='feature-item-body-icon'></div>
                                        <div className='feature-model-item-name'>{model.name}</div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className='feature-item-body-resources'>
                        <div className='feature-item-body-title'>资源</div>
                        <div>
                            {
                                item?.resourcesList?.map(resources=>{
                                    return (
                                        <div key={resources.id} className='feature-resources-item'>
                                            <div className='feature-item-body-icon'></div>
                                            <div className='feature-resources-item-key'>{resources?.key}：</div>
                                            <div className='feature-resources-item-values'>{resources?.values}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='feature-item-body-customer'>
                        <div className='feature-item-body-title'>服务</div>
                        <div>
                            {
                                item?.customerList?.map(customer=>{
                                    return (
                                        <div key={customer.id} className='feature-customer-item'>
                                            <div className='feature-item-body-icon'></div>
                                            <div className='feature-customer-item-value'>{customer?.values}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )

    }

    return (
        <HeaderDropdown
            visible={visible}
            setVisible={setVisible}
            type={'applink'}
            tooltip={isVip ? (version==='cloud' ? '免费版' :'社区版') :  (version==='cloud' ? '专业版' :'企业版')}
            Icon={<img src={isVip ? vipDark : vipLight} alt={"vip"} width={21} height={21}/>}
        >
            <BaseModal
                width={700}
                title={"版本功能"}
                okText={'订阅'}
                visible={visible}
                onOk={onOk}
                onCancel={onCancel}
            >
                <div className='application-feature-modal'>
                    {featureHtml(version==='cloud'?'cloud-free':'ce')}
                    {featureHtml(version==='cloud'?'cloud-pay':'ee')}
                </div>
            </BaseModal>
        </HeaderDropdown>
    )
}

export default PortalFeature
