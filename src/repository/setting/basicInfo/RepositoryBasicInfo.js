/**
 * @name: RepositoryInfo
 * @author: Deploy
 * @date: 2023-02-17 10:30
 * @description：制品库信息
 * @update: 2023-02-17 10:30
 */
import React, {useState, useEffect} from "react";
import "./RepositoryBasicInfo.scss"
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import {
    DeleteOutlined,
    DownOutlined,
    EditOutlined,
    LeftCircleOutlined,
    RightCircleOutlined,
    RightOutlined
} from "@ant-design/icons";
import { Dropdown, Form, Input, message, Col, Switch, Table} from "antd";
import {inject, observer} from "mobx-react";
import Btn from "../../../common/btn/Btn";
import {PrivilegeProjectButton} from 'tiklab-privilege-ui';
const { TextArea } = Input;
import Print from "../../../common/image/Print";
import RemoteAgencyStore from "../../../setting/agency/store/RemoteAgencyStore";
import ProxyPathAdd from "../../../common/ProxyPathAdd/ProxyPathAdd";
import RepositoryDelete from "../../../common/Repository/RepositoryDelete";
import {getUser} from "tiklab-core-ui";
const RepositoryBasicInfo = (props) => {
    const [form] = Form.useForm();
    const {match:{params},repositoryStore} = props;
    const {compileRepositoryGroup,findRepository,updateRepository,deleteRepository,findRepositoryByGroup,
        findUnRelevanceRepository,updateRepositoryMaven,findRepositoryMavenByRpyId}=repositoryStore

    const {findRemoteProxyList,findProxyListByRpyId}=RemoteAgencyStore

    const [repository,setRepository]=useState(null)  //制品库
    const [repositoryList,setRepositoryList]=useState([])  //未关联的本地和远程库
    const {repositoryData} = repositoryStore

    const [underRepository,setUnderRepository]=useState()
    const [choiceRepository,setChoiceRepository]=useState(null)   //选中选择后的制品库
    const [choiceRepositoryList,setChoiceRepositoryList]=useState([])    //选择后的制品库id
    const [repositoryName,setRepositoryName]=useState('')   //仓库名称
    const [expandedTree,setExpandedTree] = useState([])  // 树的展开与闭合

    const [strategyState,setStrategyState]=useState(false);
    const [repositoryMaven,setRepositoryMaven]=useState()

    const [proxyVisible,setProxyVisible]=useState(false)  //代理地址弹窗状态
    const [proxyPathList,setProxyPathList]=useState([])  //选择后的代理地址
    const [remoteProxyList,setRemoteProxyList]=useState([])  //所有的


    const [updateState,setUpdateState]=useState(false)
    const [deleteVisible,setDeleteVisible]=useState(false)  //删除弹窗状态

    useEffect(async () => {
        await findRepositoryById()

        findRepositoryMavenByRpyId({repositoryId:params.id}).then(res=>{
            if (res.code===0&&res.data.length>0){
                const data=res.data[0]
                data.coverState===0?setStrategyState(false):setStrategyState(true)
                setRepositoryMaven(res.data[0])

            }
        })

        findProxyListByRpyId(params.id).then(res=>{
            if (res.code===0){
                setProxyPathList(res.data)
            }
        })
    }, [params.id]);


    //通过id查询制品库
    const findRepositoryById =async () => {

        const res=await findRepository(params.id)
        if (res.code===0){
            if (!res.data){
                props.history.push(`/repository`)
            }else {
                form.setFieldsValue({
                    type: res.agencyUrl,
                    name:res.data.name,
                    /* storage:res.data.storage.id,*/
                    description:res.data.description,

                })
                setRepository(res.data)
                //仓库名字
                setRepositoryName(res.data?.name)


                //查询未关联组合库的制品库
                findUnRelevanceRepository(res.data.type,params.id).then(item=>{
                    item.code===0&& setRepositoryList(item.data)
                })

                //查询组合库关联的制品的库
                findRepositoryByGroup(params.id).then(item=>{
                    item.code===0&&setChoiceRepositoryList(item.data)
                })

                const type=res.data.type.toLowerCase()
                findRemoteProxyList({agencyType:type}).then(res=>{
                    res.code===0&&setRemoteProxyList(res.data)
                })
            }
        }
    }



    //提交修改
    const onOk = async (values) => {
        setUpdateState(true)
        const res=await updateRepository({...values,id:repository.id,
            name:repositoryName,
            repositoryUrl:repositoryName,
            repositoryType:repository.repositoryType,
            category:repository.category,
            storage:{id:values.storage},
            type:repository?.type,
            proxyDataList:proxyPathList,
        })
        if (res.code===0){

            if (repository?.repositoryType==='group'){
                compileRepositoryGroup({ repositoryGroupId:repository.id, repositoryList:choiceRepositoryList}).then(item=>{
                    item.code===0&& findRepositoryById()
                })
            }else {
                await findRepositoryById()
            }
            message.success("修改成功",1)
        }
        setUpdateState(false)
    }

    /**
     * 是否存在key
     * @param key
     * @returns {boolean}
     */
    const isExpandedTree = key => {
        return expandedTree.some(item => item ===key)
    }


    /**
     * 展开和闭合
     * @param key
     */
    const setOpenOrClose = key => {
        if (isExpandedTree(key)) {
            // false--闭合
            setExpandedTree(expandedTree.filter(item => item !== key))
        } else {
            // ture--展开
            setExpandedTree(expandedTree.concat(key))
        }
    }
    //切换制品库
    const cuteRepository =async (item) => {
        setUnderRepository(item)
    }
    //修改仓库名称
    const inputRepositoryName =async (e) => {
        const value = e.target.value;
        setRepositoryName(value)
    }

    //选择制品库
    const chooseRepository =async () => {
        if (repository){
            setRepositoryList(repositoryList.filter(item=>underRepository?.id!==item.id))
            underRepository&& setChoiceRepositoryList(choiceRepositoryList.concat(underRepository))
            setUnderRepository(null)
        }
    }

    //取消制品库
    const cancelRepository =async () => {
        if (choiceRepository){
            setRepositoryList(repositoryList.concat(choiceRepository))
            setChoiceRepositoryList(choiceRepositoryList.filter(item=>choiceRepository?.id!==item.id))
            setChoiceRepository(null)
        }
    }

    //切换选择后的制品库
    const cuteChooseRepository =async (item) => {
        setChoiceRepository(item)
    }


    //修改策略
    const onChangeStrategy = (value) => {
        const coverState=value?1:0
        updateRepositoryMaven({...repositoryMaven,coverState:coverState})
        setStrategyState(value)
    }

    const onVisibleChange = (value) => {
        setProxyVisible(value)
    }

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
                if (proxyPathList.length>1){
                    return  <span>
                             <DeleteOutlined onClick={()=>del(record)} />
                        </span>
                }
                return  <span className="user-table-ban">
                             <DeleteOutlined />
                        </span>
            }
        }];


    /**
     * 移出地址
     * @param record
     */
    const del = record =>{
        // yUserList（已选择） 减少
        setProxyPathList(proxyPathList.filter(item=>item.id!==record.id))
    }

    const list=[
        {
            key:1,
            title:'仓库信息',
            desc: '更新仓库信息',
            icon: <EditOutlined />,
            enCode:'house_update',
            content: <div className='bottom-rename'>
                <Form
                    form={form}
                    autoComplete='off'
                    layout='vertical'
                    name='name'
                    initialValues={{name:repositoryData?.name,remarks:repositoryData?.remarks}}
                >
                    <Form.Item
                        label="制品仓库"
                        name="type"
                    >
                        <div className={`repository-type-table`}>
                            <Print type={repository?.type} width={35} height={35} />
                            <div className='type-text'>{repositoryData?.type}</div>
                        </div>
                    </Form.Item>
                    <Form.Item
                        label="仓库名称"
                        name="name"
                        rules={[{required: true, message: '仓库名称必填'}]}
                    >
                        <Input addonBefore={`${repository?.prefixPath}`}   style={{width: '70%'}} onChange={inputRepositoryName}/>
                    </Form.Item>

                    {
                        (repository?.repositoryType==='remote')&&
                        <div className='proxy-style'>
                            <div className='add-table-proxy'>
                                <div className='proxy-head-nav'>
                                    <div className='proxy-head-text'>代理地址</div>
                                </div>

                                <Dropdown
                                    getPopupContainer={e => e.parentElement}
                                    overlay={<ProxyPathAdd
                                        visible={proxyVisible}
                                        setVisible={setProxyVisible}
                                        proxyPathList={proxyPathList}
                                        setProxyPathList={setProxyPathList}
                                        remoteProxyList={remoteProxyList}
                                        type={repository?.type}
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
                            <Table
                                 rowKey={(record) => record.id}
                                columns={columns}
                                dataSource={proxyPathList}
                                pagination={false}
                                showHeader={false}
                                /*  locale={{emptyText: <ListEmpty/>}}*/
                            />

                        </div>
                    }

                    {
                        (repository?.repositoryType==='local'&&repository.type==="maven")&&

                        <Form.Item
                            label="版本控制"
                            name="version"
                        >

                            <Input defaultValue={repository?.versionType} style={{width: '70%'}} disabled/>
                        </Form.Item>
                    }
                    {
                        repository?.repositoryType==='group'&&
                        <Form.Item
                            label="组合选择"
                            name="name"
                        >
                            <div className='repository-group'>
                                <div className='group-bord'>
                                    {
                                        repositoryList.length?repositoryList?.map(item=>{
                                            return(
                                                <div className={`${underRepository?.id===item.id&&" opt-color"} cut-repository click-cursor`} onClick={()=>cuteRepository(item)}>
                                                    <div className='opt-text '>
                                                        {item.name+' ('+item.repositoryType+")"}
                                                    </div>
                                                </div>
                                            )
                                        }):null
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
                                                <div className={`${choiceRepository?.id===item.id&&" opt-color"}  cut-repository click-cursor`} onClick={()=>cuteChooseRepository(item)}>
                                                    <div className='opt-text '>
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
                        <TextArea rows={4} style={{width: '70%'}} />
                    </Form.Item>
                </Form>

                <div className='bottom-rename-btn'>
                    <Btn
                        title={'取消'}
                        isMar={true}
                        onClick={()=>setOpenOrClose(1)}
                    />

                    {
                        updateState?
                                <Btn  title={'加载中'} type={'primary'}/>:
                               /* <PrivilegeProjectButton code={"rpy_update"} domainId={repository && repository.id}>
                                    <Btn
                                        type={'primary'}
                                        title={'确定'}
                                        onClick={() => {
                                            form.validateFields()
                                                .then((values) => {
                                                    onOk(values)
                                                })
                                        }}
                                    />
                                </PrivilegeProjectButton>*/
                            <Btn
                                type={'primary'}
                                title={'确定'}
                                onClick={() => {
                                    form.validateFields()
                                        .then((values) => {
                                            onOk(values)
                                        })
                                }}
                            />

                    }

                </div>
            </div>
        },
        {
            key:2,
            title:'版本策略',
            desc: '版本策略',
            icon: <DeleteOutlined />,
            enCode:'house_delete',
            content: <div >
                <div >制品是否允许覆盖</div>
                <div className='strategy-style'>
                    <div className='strategy-text-desc'>开启后，允许推送相同包名、相同版本的制品，且会覆盖老的制品版本</div>
                    <PrivilegeProjectButton code={"rpy_tactics"} domainId={repository && repository.id}>
                        <Switch checkedChildren="允许" unCheckedChildren="不允许" defaultChecked={strategyState} onChange={onChangeStrategy} />
                     </PrivilegeProjectButton>

                </div>
            </div>
        },
        {
            key:3,
            title:'仓库删除',
            desc: '删除仓库',
            icon: <DeleteOutlined />,
            enCode:'house_delete',
            content: <div className='bottom-delete'>
                <div style={{color:'#ff0000',paddingBottom:5,fontSize:13}}>
                    此操作无法恢复！请慎重操作！
                </div>
                <Btn title={'取消'} isMar={true} onClick={()=>setOpenOrClose(3)}/>
                {/*<PrivilegeProjectButton code={"rpy_delete"} domainId={repository && repository.id}>
                    <Btn onClick={()=>setDeleteVisible(true)} type={'dangerous'} title={'删除'}/>
                </PrivilegeProjectButton>*/}
                <Btn onClick={()=>setDeleteVisible(true)} type={'dangerous'} title={'删除'}/>
            </div>
        }
    ]

    const lisItem = (item,index) =>{
        return(
            (repository?.versionType !=='Release'&&item.key==2)?null
             :<div key={item.key} className={`${index>0?' border-top':''}`}>
                    <div className={`basicInfo-li-top ${isExpandedTree(item.key) ?'basicInfo-li-select':''}`}
                         onClick={()=>setOpenOrClose(item.key)}>
                        <div className='basicInfo-li-icon'>{item.icon}</div>
                        <div className='basicInfo-li-center'>
                            <div className='basicInfo-li-title'>{item.title}</div>
                            {
                                !isExpandedTree(item.key) &&
                                <div className='basicInfo-li-desc'>{item.desc}</div>
                            }
                        </div>
                        <div className='basicInfo-li-down'>
                            {isExpandedTree(item.key)? <DownOutlined />:<RightOutlined />}
                        </div>
                    </div>
                    <div className={`${isExpandedTree(item.key)? 'basicInfo-li-bottom':'basicInfo-li-none'}`}>
                        {
                            isExpandedTree(item.key) && item.content
                        }
                    </div>
                </div>
        )
    }

    return(
        <div className='basicInfo '>
            <Col
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "20", offset: "2" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <div className='basicInfo-up'>
                    <BreadcrumbContent firstItem={'仓库信息'}/>
                </div>
                <div className='basicInfo-li'>
                    {
                        list.map((item,index)=> lisItem(item,index) )
                    }
                </div>
                <RepositoryDelete {...props}
                                  deleteVisible={deleteVisible}
                                  repository={repository}
                                  setDeleteVisible={setDeleteVisible}
                                  deleteRepository={deleteRepository}/>
            </Col>
        </div>
    )
}
export default inject('repositoryStore')(observer(RepositoryBasicInfo))
