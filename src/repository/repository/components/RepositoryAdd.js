/**
 * @name: RepositoryAdd
 * @author: limingliang
 * @date: 2022-12-27 10:30
 * @description：添加制品库
 * @update: 2022-12-27 10:30
 */

import React, {useState, useEffect} from "react";
import {Modal, Row, Col, Form,Input,Button,Select,Steps,message} from 'antd';
const { Option } = Select;
import './RepositoryAdd.scss'
import {CloseOutlined, LeftCircleOutlined, RightCircleOutlined} from "@ant-design/icons";
import repositoryService from "../api/RepositoryApi";
import {getUser} from "tiklab-core-ui";
const { TextArea } = Input;
const layout = {
    labelCol: {
        span: 6,
    }
};
const steps = [
    {
        title: 'First',
        content: 'First-content',
    },
    {
        title: 'Second',
        content: 'Second-content',
    },
    {
        title: 'Last',
        content: 'Last-content',
    },
];
const RepositoryAdd = (props) => {
    const [form] = Form.useForm();
    const {match:{params}} = props;
    //制品库类型
    const [type,setType]=useState('Maven')
    //存储库列表
    const [storageList,setStorageList]=useState([])
    //本地库和远程库列表
    const [repositoryList,setRepositoryList]=useState([])
    //选中的制品库
    const [repository,setRepository]=useState(null)
    //输入的制品库名称
    const [repositoryName,setRepositoryName]=useState(null)

    //选中的制品库
    const [choiceRepository,setChoiceRepository]=useState(null)
    //选择后的制品库列表
    const [choiceRepositoryList,setChoiceRepositoryList]=useState([])

    //错误信息
    const [errorMessage,setErrorMessage]=useState(null)


    useEffect(async () => {
       await findStorage()
        await findRepository(type)
    }, []);

    /**
     * 存储库列表
     */
    const findStorage =async () => {
      const res=await repositoryService.findAllStorage()
        if (res.code===0){
            setStorageList(res.data)
        }
    }
    /**
     * 本地库和远程库的列表
     * @param type 类型
     */
    const findRepository =async (type) => {
       const param = new FormData()
        param.append("type",type)
      const res =  await repositoryService.findLocalAndRemoteRepository(param)
        if (res.code===0){
            setRepositoryList(res.data)
        }
    }
    /**
     * 创建制品库提交
     */
    const onFinish =async () => {
        if (!errorMessage){
            form.validateFields().then(async values => {
                const param={
                    name:repositoryName,
                    type:type,
                    repositoryType:params.type,
                    description:values.description,
                    createUser:getUser().userId,
                    storage:{
                        id:values.storage
                    }
                }
                const res = await repositoryService.createRepository(param)
                if (res.code===0){
                    await createGroupItems(res.data)
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
            const param={
                repositoryGroup:{
                    id:repositoryGroupId,
                },
                repository:{
                    id:items.id
                }
            }
            repositoryService.createRepositoryGroup(param)
        }
        )

    }

    /**
     * 选择制品库类型
     * @param value 制品库类型  maven、npm...
     */
    const cuteType =async (value) => {
        setType(value)
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
    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));

    /**
     * 输入制品库名称
     * @param e 输入的制品库名称
     */
    const inputRepositoryName =async (e) => {
        if (e.target.value) {
            let reg = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]|[#$@/\\()<>{}[\] ]/g;
            if (reg.test(e.target.value)) {
                setErrorMessage("只能以字母、数字、“_”、“-” ")
            }else {
                setErrorMessage(null)
            }
        }else {
            setErrorMessage(null)
        }
        setRepositoryName(e.target.value)
    }

 const goCancel = async () => {
     props.history.push(`/index/repository`)
 }
    return(
        <div className='repository-add '>
            <div className='repository-add-width'>
                <div className='add-title'>{`新建${params.type}仓库`}</div>
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
                                <div className='type-text'>Maven</div>
                            </div>
                            <div className={`type-border ${type==='npm'&&' type-opt'}`} onClick={()=>cuteType("npm")}>
                                <div className='type-text'>npm</div>
                            </div>
                            <div className={`type-border ${type==='Docker'&&' type-opt'}`} onClick={()=>cuteType("Docker")}>
                                <div className='type-text'>Docker</div>
                            </div>
                            <div className={`type-border ${type==='Generic'&&' type-opt'}`} onClick={()=>cuteType("Generic")}>
                                <div className='type-text'>Generic</div>
                            </div>
                            <div className={`type-border ${type==='PyPI'&&' type-opt'}`} onClick={()=>cuteType("PyPI")}>
                                <div className='type-text'>PyPI</div>
                            </div>
                            <div className={`type-border ${type==='HeIm'&&' type-opt'}`} onClick={()=>cuteType("HeIm")}>
                                <div className='type-text'>HeIm</div>
                            </div>
                            <div className={`type-border ${type==='NuGet'&&' type-opt'}`} onClick={()=>cuteType("NuGet")}>
                                <div className='type-text'>NuGet</div>
                            </div>
                            <div className={`type-border ${type==='Rpm'&&' type-opt'}`} onClick={()=>cuteType("Rpm")}>
                                <div className='type-text'>Rpm</div>
                            </div>
                        </div>
                    </Form.Item>
                    <div className='name-nav'>
                       <div className="add-table-nav">制品库名称</div>
                        <Input placeholder="请输入制品库名称" value={repositoryName} onChange={inputRepositoryName}  className={errorMessage&&'border-red-500'}/>
                        {errorMessage&&
                        <div className='error-text'>{errorMessage}</div>
                        }
                    </div>
                    <Form.Item
                        label="存储库"
                        name="storage"
                        rules={[
                            {
                                required: true,
                                message: '存储库必填',
                            },
                        ]}
                    >
                        <Select  showArrow placeholder='请选择存储库'>
                            {
                                storageList?.map(item=>{
                                    return (
                                        <Option  key={item.id} value={item.id}>
                                            {item.name}
                                        </Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
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
    )
}
export default RepositoryAdd
