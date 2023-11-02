/**
 * @name: RepositoryAdd
 * @author: limingliang
 * @date: 2022-12-27 10:30
 * @description：添加制品库
 * @update: 2022-12-27 10:30
 */

import React, {useState, useEffect} from "react";
import {Form, Input, Button, Select} from 'antd';
import './RepositoryAdd.scss'
import {
    LeftCircleOutlined,
    LockOutlined,
    RightCircleOutlined,
    UnlockOutlined
} from "@ant-design/icons";
import {getUser} from "tiklab-core-ui";
import proxyService from "../../deploy/api/ProxyApi";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
import {Validation} from "../../../common/client/Client";
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import Print from "../../../common/image/Print";
const { TextArea } = Input;
const layout = {
    labelCol: {
        span: 6,
    }
};

const RepositoryAdd = (props) => {
    const [form] = Form.useForm();
    const {match:{params}} = props;

    const {repositoryStore}=props
    const {createRepository,createRepositoryMaven,repositoryAllList,findAllRepository,findLocalAndRemoteRepository ,createRepositoryGroup}=repositoryStore

    //制品库类型
    const [type,setType]=useState('Maven')
    //存储库列表
    const [storageList,setStorageList]=useState([])
    //本地库和远程库列表
    const [repositoryList,setRepositoryList]=useState([])
    //选中的制品库
    const [repository,setRepository]=useState(null)

    //代理地址
    const [agencyUrl,setAgencyUrl]=useState("https://repo1.maven.org/maven2")

    //选中的制品库
    const [choiceRepository,setChoiceRepository]=useState(null)
    //选择后的制品库列表
    const [choiceRepositoryList,setChoiceRepositoryList]=useState([])

    //错误信息
    const [errorMessage,setErrorMessage]=useState({})

    const [powerType,setPowerType] = useState("public")  //权限控制
    const [version,setVersion]=useState("Release")   //版本控制

    useEffect(async () => {
        await findRepository(type)
        await findAllRepository()


    }, []);


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
        if (!errorMessage?.key){
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
                    }
                }
                const res = await createRepository(param)
                if (res.code===0){
                    switch (params.type){
                        case "remote":
                            await createAgency(res.data)
                            break
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
                })
        }
        )

    }

    /**
     * 创建代理信息
     * @param repositoryGroupId
     */
    const createAgency=async (repositoryId)=>{
        const param={
            repository:{
                id:repositoryId,
                agencyName:"central"
            },
            agencyUrl:agencyUrl,
            agencyName:"central"
        }
        await proxyService.createRepositoryRemoteProxy(param)
    }

    /**
     * 选择制品库类型
     * @param value 制品库类型  maven、npm...
     */
    const cuteType =async (value) => {
        switch (value){
            case "Maven":
                setAgencyUrl("https://repo1.maven.org/maven2")
                break
            case "Npm":
                setAgencyUrl(" https://registry.npmjs.org")
                break
            default:
                setAgencyUrl(null)
                break
        }
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
         props.history.push(`/index/repository`)
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

    const RepositoryPower = () => {
      return(
          <div className='add-power'>
              {
                  powerLis.map(item=>{
                      return <div
                          key={item.id}
                          className={`repository-power-item  ${powerType===item.id?'repository-power-select':''} ${item.id==='private'&&"power-not"}`}
                          onClick={()=>setPowerType(item.id)}
                      >
                          <div className='power-item'>
                              <div>
                                  <div className='power-title'>{item.icon}</div>
                                  <div className='power-title'>{item.title}</div>
                              </div>
                          </div>
                          <div className='power-desc'> {item.desc} </div>
                      </div>
                  })
              }
          </div>
      )
    }


    return(
        <div className='repository-add '>
            <div className='repository-add-width'>
                <BreadcrumbContent className='add-title' firstItem={`新建${params.type}仓库`} goBack={goBack}/>
                <div className='add-top'>
                    <Form
                        {...layout}
                        form={form}
                        onFinish={onFinish}
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
                                <div className={`type-border ${type==='PyPI'&&' type-opt'}`} onClick={()=>cuteType("PyPI")}>
                                    <Print type={"pypi"} width={40} height={40}/>
                                    <div className='type-text'>PyPI</div>
                                </div>
                                <div className={`type-border ${type==='HeIm'&&' type-opt'}`} onClick={()=>cuteType("HeIm")}>
                                    <Print type={"helm"} width={40} height={40}/>
                                    <div className='type-text'>HeIm</div>
                                </div>
                                <div className={`type-border ${type==='NuGet'&&' type-opt'}`} onClick={()=>cuteType("NuGet")}>
                                    <Print type={"nuget"} width={40} height={40}/>
                                    <div className='type-text'>NuGet</div>
                                </div>
                                <div className={`type-border ${type==='Go'&&' type-opt'}`} onClick={()=>cuteType("Go")}>
                                    <Print type={"go"} width={40} height={40}/>
                                    <div className='type-text'>Go</div>
                                </div>
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
                            <Input style={{background:'#fff'}}/>
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
                                        {value: 'Mixed', label: 'Mixed'},
                                    ]}
                                    onChange={setVersion}
                                />
                            </Form.Item>
                        }
                        {
                            params.type==='remote'&&

                            <div className='name-nav'>
                                <div className='add-table-proxy'>
                                    <div>代理地址</div>
                                    <div className='add-table-proxy-text'>(创建后也可以在该制品库设置里面配置, 默认{agencyUrl} )</div>
                                </div>
                                <Input placeholder="请输入代理地址" value={agencyUrl} onChange={inputProxyUrl}  className={errorMessage?.key==='agency'&&'border-red-500'}/>
                                {errorMessage?.key==='agency'&&
                                    <div className='error-text'>{errorMessage?.value}</div>
                                }
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
                        <Button style={{ margin: '0 8px 0 0' }} onClick={goCancel}>
                            取消
                        </Button>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form>
                </div>
            </div>

        </div>
    )
}
export default withRouter(inject('repositoryStore')(observer(RepositoryAdd)))
