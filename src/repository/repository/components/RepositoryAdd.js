/**
 * @name: RepositoryAdd
 * @author: limingliang
 * @date: 2022-12-27 10:30
 * @description：添加制品库
 * @update: 2022-12-27 10:30
 */

import React, {useState, useEffect,useRef} from "react";
import {Form, Input, Button, Select, Space, Divider, Dropdown, Menu, Table, Tooltip} from 'antd';
import './RepositoryAdd.scss'
import {
    DeleteOutlined,
    LeftCircleOutlined,
    LockOutlined,
    RightCircleOutlined,
    UnlockOutlined,
} from "@ant-design/icons";
import {getUser} from "thoughtware-core-ui";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
import {Validation} from "../../../common/client/Client";
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import Print from "../../../common/image/Print";
import Btn from "../../../common/btn/Btn";
import RemoteAgencyStore from "../../../setting/remoteAgency/store/RemoteAgencyStore";
import ProxyPathAdd from "../../../common/ProxyPathAdd/ProxyPathAdd";
import {SpinLoading} from "../../../common/loading/Loading";
import EmptyText from "../../../common/emptyText/EmptyText";
const { TextArea } = Input;
const layout = {labelCol: {span: 6}};

const RepositoryAdd = (props) => {
    const [form] = Form.useForm();
    const {match:{params}} = props;

    const {repositoryStore}=props
    const {createRepository,createRepositoryMaven,repositoryAllList,findAllRepository,findLocalAndRemoteRepository ,createRepositoryGroup,createRepositoryRemoteProxy}=repositoryStore
    const {findRemoteProxyList}=RemoteAgencyStore

    //制品库类型
    const [type,setType]=useState('Maven')
    //本地库和远程库列表
    const [repositoryList,setRepositoryList]=useState([])
    //选中的制品库
    const [repository,setRepository]=useState(null)


    //选中的制品库
    const [choiceRepository,setChoiceRepository]=useState(null)
    //选择后的制品库列表
    const [choiceRepositoryList,setChoiceRepositoryList]=useState([])

    //错误信息
    const [errorMessage,setErrorMessage]=useState({})

    const [powerType,setPowerType] = useState("public")  //权限控制
    const [version,setVersion]=useState("Release")   //版本控制
    const [createState,setCreateState]=useState(false)

    const [proxyVisible,setProxyVisible]=useState(false)  //代理地址弹窗状态
    const [proxyPathList,setProxyPathList]=useState([])  //选择后的代理地址
    const [remoteProxyList,setRemoteProxyList]=useState([])  //所有的


    useEffect(async () => {
        await findRepository(type)
        await findAllRepository()
        getRemoteProxyList(type)
    }, []);



    //获取代理list
    const getRemoteProxyList = (agencyType) => {
        const type=agencyType.toLowerCase()
        findRemoteProxyList({agencyType:type}).then(res=>{
            res.code===0&&setRemoteProxyList(res.data)
        })
    }


    /**
     * 本地库和远程库的列表
     * @param type 类型
     */
    const findRepository =async (type) => {
        findLocalAndRemoteRepository(type.toLowerCase()).then(item=>{
            item.code===0&&setRepositoryList(item.data)
        })
    }



    /**
     * 创建制品库提交
     */
    const onFinish =async () => {
        if (params.type==='remote'&&proxyPathList.length===0){
            setErrorMessage({key:"agency",value:'代理地址不能为空'})
        }else {
            form.validateFields().then(async values => {
                const param={
                    name:values.name,
                    type:type,
                    repositoryType:params.type,
                    description:values.description,
                    createUser:getUser().userId,
                    category:2,
                    repositoryUrl:values.name,
                    storage:{
                        id:values.storage
                    },
                    proxyDataList:proxyPathList,

                }
                setCreateState(true)
                const res = await createRepository(param)
                setCreateState(false)
                if (res.code===0){
                    switch (params.type){
                        case "group":
                            await createGroupItems(res.data)
                            break
                        case "local":
                            await createRepositoryMaven({repository:{id:res.data},version:version})
                            break
                    }
                    await goCancel()
                }
            })
        }
    }
    /**
     * 创建组合库关联
     * @param repositoryGroupId 组合库id
     */
    const createGroupItems =async (repositoryGroupId) => {
        choiceRepositoryList.map(items=>{
                createRepositoryGroup({
                    repositoryGroup:{
                        id:repositoryGroupId,
                    },
                    repository:{
                        id:items.id
                    }
                })}
        )
    }

    /**
     * 选择制品库类型
     * @param value 制品库类型  maven、npm...
     */
    const cuteType =async (value) => {
        setProxyPathList([])
        getRemoteProxyList(value)
        setType(value)
        setChoiceRepositoryList([])
       await findRepository(value)
    }
    /**
     * 选中制品库
     * @param item 确认制品库
     */
    const cuteRepository =async (item) => {
        setRepository(item)
    }
    /**
     * 确认制品库
     */
    const chooseRepository =async () => {
        if (repository){
            setRepositoryList(repositoryList.filter(item=>repository?.id!==item.id))
            setChoiceRepositoryList(choiceRepositoryList.concat(repository))
            setRepository(null)
        }
    }

    /**
     * 选中已经确认后的制品库
     * @param  item 选中的制品库
     */
    const cuteChooseRepository =async (item) => {
        setChoiceRepository(item)
    }
    /**
     * 取消已经确认后的制品库
     */
    const cancelRepository =async () => {
        if (choiceRepository){
            setRepositoryList(repositoryList.concat(choiceRepository))
            setChoiceRepositoryList(choiceRepositoryList.filter(item=>choiceRepository?.id!==item.id))
            setChoiceRepository(null)
        }
    }


    /**
     * 代理地址校验
     * @param e 输入的代理地址
     */
    const inputProxyUrl = async (e) => {
        if (e.target.value) {
            let  match = /^((([Hh][Tt])|(Ff))[Tt][Pp][Ss]?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/;
            if (match.test(e.target.value)) {
                setErrorMessage({key:"agency",value:'请输入正确地址格式'})
            }else {
                setErrorMessage(null)
            }
        }else {
            setErrorMessage(null)
        }
        setAgencyUrl(e.target.value)
    }

     const goCancel = async () => {
         props.history.push(`/repository`)
     }



    /**
     * 跳转到上一级路由
     */
    const goBack = () => {
        props.history.go(-1)
    }

    const powerLis = [
        {
            id:"public",
            title:'全局',
            icon:<UnlockOutlined />,
            desc:'公共项目，全部成员可见'
        },
        {
            id:"private",
            title:'私有',
            icon:<LockOutlined />,
            desc: '私有项目，只有项目成员可以见'
        }
    ]

    const columns = [
        {
            title: '名称',
            dataIndex: 'agencyName',
            key:"agencyName",
            width:'50%',
        },
        {
            title: '地址',
            dataIndex: 'agencyUrl',
            key:"agencyUrl",
            width:'50%',
        },
        {
            title:"操作",
            dataIndex:"action",
            key:"action",
            width:"5%",
            ellipsis:true,
            render: (_,record) => {
                return  <span>
                             <DeleteOutlined onClick={()=>del(record)} />
                        </span>

            }
        },

    ];

    /**
     * 移出地址
     * @param record
     */
    const del = record =>{
        // yUserList（已选择） 减少
        setProxyPathList(proxyPathList.filter(item=>item.id!==record.id))
    }

    const onVisibleChange = (value) => {
        setErrorMessage({})
        setProxyVisible(value)
    }

    return(
        <div className='repository-add '>
            <div className='repository-add-width'>
                <BreadcrumbContent className='add-title' firstItem={`新建${params.type=="local"&&"本地"||
                                    params.type=="group"&&"组合"||params.type=="remote"&&"远程"}仓库`} goBack={goBack}/>
                <div className='add-top'>
                    <Form
                        {...layout}
                        form={form}

                        layout="vertical"
                    >
                        <Form.Item
                            label="制品仓库"
                            name="type"
                        >
                            <div className='repository-type'>
                                <div className={`type-border ${type==='Maven'&&' type-opt '}`} onClick={()=>cuteType("Maven")}>
                                    <Print type={"maven"} width={40} height={40} />
                                    <div className='type-text'>Maven</div>
                                </div>
                                <div className={`type-border ${type==='Npm'&&' type-opt'}`} onClick={()=>cuteType("Npm")}>
                                    <Print type={"npm"} width={40} height={40}/>
                                    <div className='type-text'>Npm</div>
                                </div>
                                <div className={`type-border ${type==='Docker'&&' type-opt'}`} onClick={()=>cuteType("Docker")}>
                                    <Print type={"docker"} width={40} height={40}/>
                                    <div className='type-text'>Docker</div>
                                </div>
                                <div className={`type-border ${type==='Generic'&&' type-opt'}`} onClick={()=>cuteType("Generic")}>
                                    <Print type={"generic"} width={40} height={40}/>
                                    <div className='type-text'>Generic</div>
                                </div>
                                <div className={`type-border ${type==='Helm'&&' type-opt'}`} onClick={()=>cuteType("Helm")}>
                                    <Print type={"helm"} width={40} height={40}/>
                                    <div className='type-text'>Helm</div>
                                </div>
                                <div className={`type-border ${type==='Go'&&' type-opt'}`} onClick={()=>cuteType("Go")}>
                                    <Print type={"go"} width={40} height={40}/>
                                    <div className='type-text'>Go</div>
                                </div>
                                {/*<div className={`type-border ${type==='PyPI'&&' type-opt'}`} onClick={()=>cuteType("PyPI")}>
                                    <Print type={"pypi"} width={40} height={40}/>
                                    <div className='type-text'>PyPI</div>
                                </div>

                                <div className={`type-border ${type==='NuGet'&&' type-opt'}`} onClick={()=>cuteType("NuGet")}>
                                    <Print type={"nuget"} width={40} height={40}/>
                                    <div className='type-text'>NuGet</div>
                                </div>
                                */}
                            </div>
                        </Form.Item>
                        <Form.Item
                            label='制品库名称'
                            name='name'
                            placeholder={"请输入制品库名称"}
                            rules={[
                                {required:true,message:'请输入名称'},
                                {max:30,message:'请输入1~31位以内的名称'},
                                Validation('名称','appoint'),
                                ({getFieldValue})=>({
                                    validator(rule,value) {
                                        let nameArray = []
                                        if(repositoryAllList){
                                            nameArray = repositoryAllList && repositoryAllList.map(item=>item.name)
                                        }
                                        if (nameArray.includes(value)) {
                                            return Promise.reject('名称已经存在')
                                        }
                                        return Promise.resolve()
                                    }
                                })
                            ]}>
                            <Input style={{background:'#fff'}}  placeholder={'名称'}/>
                        </Form.Item>
                        {
                            ( params.type==='local'&&type==="Maven")&&
                            <Form.Item
                                label="版本控制"
                                name="version"
                            >
                                <Select
                                    defaultValue="Release"
                                    options={[
                                        {value: 'Release', label: 'Release'},
                                        {value: 'Snapshot', label: 'Snapshot'},
                                       /* {value: 'Mixed', label: 'Mixed'},*/
                                    ]}
                                    onChange={setVersion}
                                />
                            </Form.Item>
                        }
                        {
                            params.type==='remote'&&

                            <div className='name-nav'>
                                <div className='add-table-proxy'>
                                    <div className='proxy-head-nav'>
                                        <div className='proxy-head-text'>代理地址</div>
                                        {errorMessage?.key==='agency'&&
                                            <div className='error-text'>{errorMessage?.value}</div>
                                        }
                                    </div>

                                    <Dropdown
                                        getPopupContainer={e => e.parentElement}
                                        overlay={<ProxyPathAdd
                                            visible={proxyVisible}
                                            setVisible={setProxyVisible}
                                            proxyPathList={proxyPathList}
                                            setProxyPathList={setProxyPathList}
                                            remoteProxyList={remoteProxyList}
                                            type={type}
                                        />}
                                        visible={proxyVisible}
                                        onVisibleChange={proxyVisible=>onVisibleChange(proxyVisible)}
                                        trigger={['click']}
                                        placement={'topRight'}
                                        overlayStyle={{width:540}}

                                    >
                                        <div className='add-proxy-text' >+添加代理地址</div>
                                    </Dropdown>
                                </div>
                                <div className="pipeline-user-table">
                                    <Table
                                       /* rowKey={(record) => record.id}*/
                                        columns={columns}
                                        dataSource={proxyPathList}
                                        pagination={false}
                                        showHeader={false}
                                        locale={{emptyText: <EmptyText title={"暂无数据"}/>}}
                                        /*  locale={{emptyText: <ListEmpty/>}}*/
                                    />
                                </div >
                            </div>
                        }
                       {/* <Form.Item
                            label="可见范围"
                            name="visible"
                        >
                            {RepositoryPower()}
                        </Form.Item>*/}

                        {
                            params.type==='group'&&
                            <Form.Item
                                label="组合选择"
                                name="name"
                            >
                                <div className='repository-group'>
                                    <div className='group-bord'>
                                        {
                                            repositoryList?.map(item=>{
                                                return(
                                                    <div className={`${repository?.id===item.id&&" opt-color"} cut-repository`} onClick={()=>cuteRepository(item)}>
                                                        <div className='opt-text '>
                                                            {item.name+' ('+item.repositoryType+")"}
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div>
                                        <div>
                                            <RightCircleOutlined className='icon-style' onClick={chooseRepository}/>
                                        </div>
                                        <LeftCircleOutlined className='icon-style ' onClick={cancelRepository}/>
                                    </div>
                                    <div className='group-bord'>
                                        {
                                            choiceRepositoryList?.map(item=>{
                                                return(
                                                    <div className={`${choiceRepository?.id===item.id&&" opt-color"} cut-repository`} onClick={()=>cuteChooseRepository(item)}>
                                                        <div className='opt-text'>
                                                            {item.name+' ('+item.repositoryType+")"}
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </Form.Item>
                        }

                        <Form.Item
                            label="描述"
                            name="description"
                        >
                            <TextArea rows={4} />
                        </Form.Item>
                        <Btn onClick={goCancel} title={'取消'} isMar={true}/>
                        {createState?
                            <Btn  title={'加载中'} type={'primary'}/>:
                            <Btn onClick={onFinish} title={'确定'} type={'primary'}/>
                        }
                    </Form>
                </div>

            </div>

        </div>
    )
}
export default withRouter(inject('repositoryStore')(observer(RepositoryAdd)))
