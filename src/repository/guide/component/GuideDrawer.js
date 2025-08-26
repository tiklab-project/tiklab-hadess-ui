/**
 * @name: GuideDrawer
 * @author: limingliang
 * @date: 2022-12-27 10:30
 * @description：指引选择
 * @update: 2022-12-27 10:30
 */
import React,{useEffect,useState,Fragment} from "react";
import {Drawer, Select} from 'antd'
import './GuideDrawer.scss'
import npm from "../../../assets/images/img/npm.png"
import docker from "../../../assets/images/img/docker.png"
import generic from "../../../assets/images/img/generic.png"
import pypi from "../../../assets/images/img/pypi.png"
import nuget from "../../../assets/images/img/nuget.png"
import go from "../../../assets/images/img/go.png"
import helm from "../../../assets/images/img/helm.png"
import Print from "../../../common/image/Print";
import Breadcrumb from "../../../common/breadcrumb/Breadcrumb";
import {CloseOutlined} from "@ant-design/icons";
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router";
import BasicsDown from "../../../common/downSelect/BasicsDown";
const typeList=[ {value: 'Maven', label: 'maven'}, {value: 'Npm', label: 'npm'}, {value: 'Docker', label: 'docker'}, {value: 'Generic', label: 'generic'},
    {value: 'Helm', label: 'helm'}, {value: 'Go', label: 'go'},{value:'Pypi',label:'pypi'},{value:'Composer', label: 'composer'},{value:'Nuget', label: 'nuget'}]

const GuideDrawer = props => {
    const {visible, setDrawerVisible,repositoryStore} = props;
    const {findRepositoryList}=repositoryStore

    const [detailsType,setDetailsType]=useState("type")
    const [type,setType]=useState("maven")
    const [repositoryList,setRepositoryList]=useState([])
    const [repository,setRepository]=useState()


    //仓库选择下拉的状态
    const [rpyVisible,setRpyVisible]=useState(false)

    useEffect(async () => {
        getRepository(type)
    }, []);

    /**
     * 切换制品库
     * @param type
     */
    const cuteType =async (type) => {
        setType(type)
        setDetailsType("content")
        getRepository(type)
        setRepository(null)
    }

    const goBack = () => {
        setDetailsType("type")
    }

    //关闭弹窗
    const close = () => {
        setDetailsType("type")
        setDrawerVisible(false)
    }

    const cuteRepository = (value) => {
        setRepository(value)
    }

    //查询仓库
    const getRepository = (type,name) => {
        findRepositoryList({
            name:name,
            findType:"like",
            type:type,
        }).then(res=>{
            console.info("data",res.data)
            setRepositoryList(res.data)
        })
    }
    //搜索仓库
    const searchRepository = (value) => {
        getRepository(type,value)
    }


    const goGuide = () => {
        props.history.push(`/repository/${repository.id}/guide`)
    }


    return(
        <Drawer
            title={detailsType==='type'?<Breadcrumb  firstItem={"操作指引"}/>:<Breadcrumb  firstItem={"操作指引"}  goBack={goBack}/>}
            placement='right'
            closable={false}
            onClose={close}
            visible={visible}
            width  ={'600'}

            extra={
                <CloseOutlined style={{cursor:'pointer'}} onClick={close} />
            }
        >

            <div className={'guide-drawer drop-down'}>
                <div className='guide-drawer-tab'>
                    <div>类型</div>
                    <div className='guide-type'>
                        {
                            typeList.map(item=>{
                                return(
                                    <div key={item.value} className={`border-style ${type===item.label&&' type-opt '}`} onClick={()=>cuteType(item.label)}>
                                        <Print type={item.label} width={40} height={40}/>
                                        <div className='border-text'>{item.value}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='guide-drawer-tab'>
                    <div>仓库选择</div>
                    <div className='guide-drawer-repository'>
                        <BasicsDown
                            visible={rpyVisible}
                            setVisible={setRpyVisible}
                            dataList={repositoryList}
                            cuteValue={cuteRepository}
                            value={repository?.name}
                            size={'lager'}
                            type={'repository'}
                        />
                        <div className='button' onClick={goGuide} >
                            前往指引
                        </div>
                    </div>

                </div>
            </div>
        </Drawer>
    )

}
export default withRouter(inject('repositoryStore')(observer(GuideDrawer)))
