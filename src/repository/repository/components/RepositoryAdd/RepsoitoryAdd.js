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
    const {visible,onCancel,createType}=props

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
    //错误状态
    const [errorState,setErrorState]=useState(false)
    //选中的制品库
    const [choiceRepository,setChoiceRepository]=useState(null)
    //选择后的制品库列表
    const [choiceRepositoryList,setChoiceRepositoryList]=useState([])


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
        form.validateFields().then(async values => {
            const param={
                name:values.name,
                type:type,
                repositoryType:createType,
                description:values.description,
                createUser:getUser().userId,
                storage:{
                    id:values.storage
                }
            }
            const res = await repositoryService.createRepository(param)
            if (res.code===0){
                onCancel()
                await createGroupItems(res.data)
            }
        })
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
        if (e.target.value){
            let reg = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/g;
            if (reg.test(e.target.value)) {
                setErrorState(true)
                return message.error("不能有中文")
            }
        }else {
            setRepositoryName(e.target.value)
        }

    }

    /**
     * 取消创建制品库
     */
    const abolish =async () => {
        setRepositoryName(null)
        onCancel()
    }
    return(
        <div className='bg-gray-100'>
            <Modal
                visible={visible}
                onOk={onFinish}
                onCancel={abolish}
                cancelText="取消"
                okText="确定"
                footer={false}
                mask={false}
                closable={false}
                width={"100vw"}
                className="repository-addmodel"
            >
                <Row className='h-full'>
                    <Col
                        className="project-type-col"
                        lg={{ span: "18", offset: "3" }}
                        xl={{ span: "14", offset: "5" }}
                        xxl={{ span: "10", offset: "7" }}
                        style={{ height: "100%" }}
                    >
                        <div>
                            <div className='flex justify-between'>
                                <div className='title'>{`添加制品库(${createType})`}</div>
                                <CloseOutlined onClick={onCancel}/>
                            </div>
                            <div className='h-14'>
                                <Steps   current={2} items={[
                                    {
                                        title: 'Finished',

                                    },
                                    {
                                        title: 'In Progress',

                                    },
                                    {
                                        title: 'Waiting',

                                    },
                                ]} />
                            </div>

                            <div className='mt-6 '>
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
                                        <div className='flex grid grid-cols-5 gap-x-5 gap-y-4 '>
                                            <div className={`border w-24 py-4 rounded-md cursor-pointer ${type==='Maven'&&' text-blue-500 border-blue-400'}`} onClick={()=>cuteType("Maven")}>
                                                <div className='flex-row text-center '>Maven</div>
                                            </div>
                                            <div className={`border w-24 py-4 rounded-md cursor-pointer ${type==='npm'&&' text-blue-500 border-blue-400'}`} onClick={()=>cuteType("npm")}>
                                                <div className='text-center'>npm</div>
                                            </div>
                                            <div className={`border w-24 py-4 rounded-md cursor-pointer ${type==='Docker'&&' text-blue-500 border-blue-400'}`} onClick={()=>cuteType("Docker")}>
                                                <div className='text-center'>Docker</div>
                                            </div>
                                            <div className={`border w-24 py-4 rounded-md cursor-pointer ${type==='Generic'&&' text-blue-500 border-blue-400'}`} onClick={()=>cuteType("Generic")}>
                                                <div className='text-center'>Generic</div>
                                            </div>
                                            <div className={`border w-24 py-4 rounded-md cursor-pointer ${type==='PyPI'&&' text-blue-500 border-blue-400'}`} onClick={()=>cuteType("PyPI")}>
                                                <div className='text-center'>PyPI</div>
                                            </div>
                                            <div className={`border w-24 py-4 rounded-md cursor-pointer ${type==='HeIm'&&' text-blue-500 border-blue-400'}`} onClick={()=>cuteType("HeIm")}>
                                                <div className='text-center'>HeIm</div>
                                            </div>
                                            <div className={`border w-24 py-4 rounded-md cursor-pointer ${type==='NuGet'&&' text-blue-500 border-blue-400'}`} onClick={()=>cuteType("NuGet")}>
                                                <div className='text-center'>NuGet</div>
                                            </div>
                                            <div className={`border w-24 py-4 rounded-md cursor-pointer ${type==='Rpm'&&' text-blue-500 border-blue-400'}`} onClick={()=>cuteType("Rpm")}>
                                                <div className='text-center'>Rpm</div>
                                            </div>
                                        </div>
                                    </Form.Item>
                                    <Form.Item
                                        label="制品库名称"
                                        name="name"
                                        rules={[
                                            {
                                                required: true,
                                                message: '仓库名称仅支持2-31位的小写英文、数字、下划线(_)、中划线(-)、点(.)的组合',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="请输入制品库名称" value={repositoryName} onChange={inputRepositoryName} className={(errorState)?" border-red-500":''} />
                                    </Form.Item>
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
                                        createType==='group'&&
                                        <Form.Item
                                            label="组合选择"
                                            name="name"
                                        >
                                            <div className='flex justify-between'>
                                                <div className='border w-2/5 h-32 '>
                                                    {
                                                        repositoryList?.map(item=>{
                                                            return(
                                                                <div className={`${repository?.id===item.id&&" bg-gray-300"} hover:bg-gray-300 cursor-pointer`} onClick={()=>cuteRepository(item)}>
                                                                    <div className='pl-2 py-1 '>
                                                                        {item.name+' ('+item.repositoryType+")"}
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                <div className='flex-row space-y-2'>
                                                    <div>
                                                        <RightCircleOutlined className='text-2xl text-gray-400 cursor-pointer' onClick={chooseRepository}/>
                                                    </div>
                                                    <LeftCircleOutlined className='text-2xl text-gray-400 cursor-pointer' onClick={cancelRepository}/>
                                                </div>
                                                <div className='border w-2/5  h-32'>
                                                    {
                                                        choiceRepositoryList?.map(item=>{
                                                            return(
                                                                <div className={`${choiceRepository?.id===item.id&&" bg-gray-300"} hover:bg-gray-300 cursor-pointer`} onClick={()=>cuteChooseRepository(item)}>
                                                                    <div className='pl-2 py-1 '>
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
                                    <Button style={{ margin: '0 8px 0 0' }} onClick={onCancel}>
                                        取消
                                    </Button>
                                    <Button type="primary" htmlType="submit">
                                        提交
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Modal>
        </div>
    )
}
export default RepositoryAdd
