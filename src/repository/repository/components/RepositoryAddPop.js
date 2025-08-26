/**
 * @name: RepositoryAddPop
 * @author: limingliang
 * @date: 2022-12-27 10:30
 * @description：添加制品库
 * @update: 2022-12-27 10:30
 */

import React, {useState, useEffect,useRef} from "react";
import {
    Form,
    Input,
    Button,
    Select,
    Dropdown,
    Table,
    Col
} from 'antd';
import './RepositoryAddPop.scss'
import {
    DeleteOutlined,
    LeftCircleOutlined,
    LockOutlined,
    RightCircleOutlined,
    UnlockOutlined,
} from "@ant-design/icons";
import {getUser} from "tiklab-core-ui";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
import {Validation} from "../../../common/client/Client";
import Print from "../../../common/image/Print";
import Btn from "../../../common/btn/Btn";
import RemoteAgencyStore from "../../../setting/agency/store/RemoteAgencyStore";
import ProxyPathAdd from "../../../common/ProxyPathAdd/ProxyPathAdd";
import EmptyText from "../../../common/emptyText/EmptyText";
import Modals from "../../../common/modal/Modal";
const { TextArea } = Input;
const layout = {labelCol: {span: 6}};

const RepositoryAddPop = (props) => {
    const {visible,setVisible,addType,repositoryStore}=props
    const [form] = Form.useForm();

    const {createRepository,createRepositoryMaven,repositoryAllList,findAllRepository,findLocalAndRemoteRepository ,createRepositoryGroup}=repositoryStore
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

    const [version,setVersion]=useState("Release")   //版本控制
    const [createState,setCreateState]=useState(false)

    const [proxyVisible,setProxyVisible]=useState(false)  //代理地址弹窗状态
    const [proxyPathList,setProxyPathList]=useState([])  //选择后的代理地址
    const [remoteProxyList,setRemoteProxyList]=useState([])  //所有的

    const [typeList,setTypeList]=useState([])


    useEffect(async () => {
        await findRepository(type)
        await findAllRepository()
        getRemoteProxyList(type)
    }, []);

    useEffect(async () => {
        let options;
        if (addType==='local'){
            options = [ {value: 'Maven', label: 'maven'},
                {value: 'Npm', label: 'npm'},
                {value: 'Docker', label: 'docker'},
                {value: 'Generic', label: 'generic'},
                {value: 'Helm', label: 'helm'},
                {value: 'Pypi', label: 'pypi'},
                {value: 'Composer', label: 'composer'},
                {value: 'Nuget', label: 'nuget'},
                {value: 'Conan', label: 'conan'},
            ]
        }else if(addType==='remote'){
            options = [ {value: 'Maven', label: 'maven'},
                {value: 'Npm', label: 'npm'},
                {value: 'Docker', label: 'docker'},
                {value: 'Helm', label: 'helm'},
                {value: 'Go', label: 'go'},
                {value: 'Pypi', label: 'pypi'},
                {value: 'Composer', label: 'composer'},
                {value: 'Nuget', label: 'nuget'},
                {value: 'Conan', label: 'conan'},
            ]
        }else if (addType==='group') {
            options = [ {value: 'Maven', label: 'maven'},
                {value: 'Npm', label: 'npm'},
                {value: 'Docker', label: 'docker'},
                {value: 'Helm', label: 'helm'},
                {value: 'Pypi', label: 'pypi'},
                {value: 'Composer', label: 'composer'},
                {value: 'Nuget', label: 'nuget'},
                {value: 'Conan', label: 'conan'},
            ]
        }
        setTypeList(options)

    }, [addType,visible]);

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
        if (addType==='remote'&&proxyPathList.length===0){
            setErrorMessage({key:"agency",value:'代理地址不能为空'})
        }else {
            form.validateFields().then(async values => {
                const param={
                    name:values.name,
                    type:type,
                    repositoryType:addType,
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
                    switch (addType){
                        case "group":
                            await createGroupItems(res.data)
                            break
                        case "local":
                            await createRepositoryMaven({repository:{id:res.data},version:version})
                            break
                    }
                    props.history.push(`/repository/${res.data}/guide`)
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
    }

    //关闭弹窗
    const cancel = async () => {
        form.resetFields()
        setVisible(false)
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

    const modalFooter = (
        <>
            <Btn onClick={cancel} title={'取消'} isMar={true}/>
            {createState?
                <Btn  title={'加载中'} type={'primary'}/>:
                <Btn onClick={onFinish} title={'确定'} type={'primary'}/>
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
            title={`新建${addType=="local"&&"本地"||
            addType=="group"&&"组合"||addType=="remote"&&"远程"}仓库`}
        >
            <div className='repository-add '>
                <div className='add-top'>
                    <Form
                        form={form}
                        layout="vertical"
                    >
                        <Form.Item
                            label="制品仓库"
                            name="type"
                        >
                            <div className='repository-type'>
                                {
                                    typeList?.map(item=>{
                                        return(
                                            <div>
                                                <div key={item.value} className={`type-border ${type===item.value&&' type-opt '}`} onClick={()=>cuteType(item.value)}>
                                                    <Print type={item.label} width={40} height={40} />
                                                    <div className='type-text'>{item.value}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
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
                            ( addType==='local'&&type==="Maven")&&
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
                            addType==='remote'&&

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
                                        placement={'bottomRight'}
                                        overlayStyle={{width:540}}
                                    >
                                        <div className='add-proxy-text'>添加代理地址</div>
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
                            addType==='group'&&
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
                    </Form>
                </div>
            </div>
        </Modals>

    )
}
export default withRouter(inject('repositoryStore')(observer(RepositoryAddPop)))
