/**
 * @name: RepositoryUpdatePop
 * @author: limingliang
 * @date: 2022-12-27 10:30
 * @description：更新制品库
 * @update: 2022-12-27 10:30
 */
import React, {useState, useEffect,useRef} from "react";
import Modals from "../../../common/modal/Modal";
import Btn from "../../../common/btn/Btn";
import {Dropdown, Form, Input, message, Table} from "antd";
import Print from "../../../common/image/Print";
import ProxyPathAdd from "../../../common/ProxyPathAdd/ProxyPathAdd";
import {DeleteOutlined, LeftCircleOutlined, RightCircleOutlined} from "@ant-design/icons";
import {PrivilegeProjectButton} from "tiklab-privilege-ui";
import {inject, observer} from "mobx-react";
import RemoteAgencyStore from "../../../setting/agency/store/RemoteAgencyStore";
import TextArea from "antd/es/input/TextArea";
import "./RepositoryUpdatePop.scss"
const RepositoryUpdatePop = (props) => {
    const {visible,setVisible,repositoryId,repositoryStore}=props

    const [form] = Form.useForm();

    const {compileRepositoryGroup,findRepository,updateRepository,deleteRepository,findRepositoryByGroup,
        findUnRelevanceRepository,findRepositoryMavenByRpyId}=repositoryStore

    const {findRemoteProxyList,findProxyListByRpyId}=RemoteAgencyStore


    const [repository,setRepository]=useState()
    const [repositoryList,setRepositoryList]=useState([])  //未关联的本地和远程库

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
        if (visible){
            findRepositoryById()

            findRepositoryMavenByRpyId({repositoryId:repositoryId}).then(res=>{
                if (res.code===0&&res.data.length>0){
                    const data=res.data[0]
                    data.coverState===0?setStrategyState(false):setStrategyState(true)
                    setRepositoryMaven(res.data[0])

                }
            })

            findProxyListByRpyId(repositoryId).then(res=>{
                if (res.code===0){
                    setProxyPathList(res.data)
                }
            })
        }
    }, [visible]);


    //查询仓库相关的数据
    const findRepositoryById = () => {
         findRepository(repositoryId).then(res=>{
             if (res.code===0){
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
                 findUnRelevanceRepository(res.data.type,repositoryId).then(item=>{
                     item.code===0&& setRepositoryList(item.data)
                 })

                 //查询组合库关联的制品的库
                 findRepositoryByGroup(repositoryId).then(item=>{
                     item.code===0&&setChoiceRepositoryList(item.data)
                 })

                 const type=res.data.type.toLowerCase()
                 findRemoteProxyList({agencyType:type}).then(res=>{
                     res.code===0&&setRemoteProxyList(res.data)
                 })
             }
         })
    }

    //关闭弹窗
    const cancel = async () => {
        setVisible(false)
    }

    const onFinish = (values) => {
        setUpdateState(true)
        updateRepository({...values,id:repository.id,
            name:repositoryName,
            repositoryUrl:repositoryName,
            repositoryType:repository.repositoryType,
            category:repository.category,
            storage:{id:values.storage},
            type:repository?.type,
            proxyDataList:proxyPathList,
        }).then(res=>{
            if (res.code===0){

                if (repository?.repositoryType==='group'){
                    compileRepositoryGroup({ repositoryGroupId:repository.id, repositoryList:choiceRepositoryList}).then(item=>{
                        item.code===0&& findRepositoryById()
                    })
                }else {
                    findRepositoryById()
                }
                message.success("修改成功",1)
                setUpdateState(false)
                cancel()
                form.resetFields
            }
        })
    }

    //修改仓库名称
    const inputRepositoryName =async (e) => {
        const value = e.target.value;
        setRepositoryName(value)
    }

    //切换制品库
    const cuteRepository =async (item) => {
        setUnderRepository(item)
    }

    const onVisibleChange = (value) => {
        setProxyVisible(value)
    }

    /**
     * 移出地址
     * @param record
     */
    const del = record =>{
        // yUserList（已选择） 减少
        setProxyPathList(proxyPathList.filter(item=>item.id!==record.id))
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

    const modalFooter = (
        <>
            <Btn onClick={cancel} title={'取消'} isMar={true}/>
            {
                updateState?
                    <Btn  title={'加载中'} type={'primary'}/>:
                    <PrivilegeProjectButton code={"rpy_update"} domainId={repository && repository.id}>
                        <Btn
                            type={'primary'}
                            title={'确定'}
                            onClick={() => {
                                form.validateFields()
                                    .then((values) => {
                                        onFinish(values)
                                    })
                            }}
                        />
                    </PrivilegeProjectButton>

            }
        </>
    )

    return(
        <Modals
            visible={visible}
            onCancel={cancel}
            closable={false}
            footer={modalFooter}
            destroyOnClose={true}
            width={840}
            title={`更新仓库`}
        >
            <div className='repository-update'>
                <Form
                    form={form}
                    autoComplete='off'
                    layout='vertical'
                    name='name'
                    initialValues={{name:repository?.name,remarks:repository?.remarks}}
                >
                    <Form.Item
                        label="制品仓库"
                        name="type"
                    >
                        <div className={`repository-type-table`}>
                            <Print type={repository?.type} width={35} height={35} />
                            <div className='type-text'>{repository?.type}</div>
                        </div>
                    </Form.Item>
                    <Form.Item
                        label="仓库名称"
                        name="name"
                        rules={[{required: true, message: '仓库名称必填'}]}
                    >
                        <Input addonBefore={`${repository?.prefixPath}`}   onChange={inputRepositoryName}/>
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

                            <Input defaultValue={repository?.versionType}  disabled/>
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
                        <TextArea rows={4}  />
                    </Form.Item>
                </Form>
            </div>

        </Modals>
    )

}
export default inject('repositoryStore')(observer(RepositoryUpdatePop))
