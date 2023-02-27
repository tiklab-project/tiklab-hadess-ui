/**
 * @name: RepositoryInfo
 * @author: Deploy
 * @date: 2023-02-17 10:30
 * @description：制品库信息
 * @update: 2023-02-17 10:30
 */
import React, {useState, useEffect} from "react";
import './RepositoryInfo.scss'
import {
    DeleteOutlined, EditOutlined,
    ExclamationCircleOutlined,
    LeftCircleOutlined,
    RightCircleOutlined
} from "@ant-design/icons";
import {Button, Form, Input, Modal, Select} from "antd";
const { TextArea } = Input;
const { confirm } = Modal;
const { Option } = Select;
import repositoryService from "../../../service/repository.service";
const layout = {labelCol: {span: 6}};
const RepositoryInfo = (props) => {
    const {match:{params}} = props;
    const [form] = Form.useForm();
    const [storageList,setStorageList]=useState([])   //存储库信息
    const [repository,setRepository]=useState(null)  //制品库
    const [repositoryList,setRepositoryList]=useState([])  //远程库和本地库和

    const [underRepository,setUnderRepository]=useState()
    const [choiceRepository,setChoiceRepository]=useState(null)   //选中选择后的制品库
    const [choiceRepositoryList,setChoiceRepositoryList]=useState([])    //选择后的制品库id

    useEffect(async () => {
        await findRepositoryById()
        await findStorage()
    }, [params.id]);

    //查询存储库
    const findStorage =async () => {
        const res=await repositoryService.findAllStorage()
        if (res.code===0){
            setStorageList(res.data)
        }
    }

    //通过id查询制品库
    const findRepositoryById =async () => {
        const param = new FormData()
        param.append('id',params.id)
        const res = await repositoryService.findRepository(param);
        if (res.code===0){
            form.setFieldsValue({
                type: res.agencyUrl,
                name:res.data.name,
                storage:res.data.storage.id,
                description:res.data.description,

            })
            setRepository(res.data)
            await findRepository(res.data.type,params.id)
            await findRepositoryGroupList(params.id)
        }
    }

    //查询未关联组合库的本地和远程库list
    const findRepository =async (type,repositoryGroupId) => {
        const param = new FormData()
        param.append("repositoryType",type)
        param.append("repositoryGroupId",repositoryGroupId)
        const res =  await repositoryService.findUnRelevanceRepository(param)
        if (res.code===0){
            setRepositoryList(res.data)
        }
    }
    //查询组合库关联的制品的库
    const findRepositoryGroupList =async (repositoryGroupId) => {
        const param = new FormData();
        param.append("repositoryGroupId",repositoryGroupId)
        const res=await repositoryService.findRepositoryByGroup(param)
        if (res.code===0){
            setChoiceRepositoryList(res.data)
        }
    }

    const onFinish = () => {
        form.validateFields().then(async values => {
            const res= await repositoryService.updateRepository({...values,id:repository.id,repositoryUrl:repository.repositoryUrl,
                repositoryType:repository.repositoryType,storage:{id:values.storage},type:repository?.type})
            if (res.code===0){
                await findRepositoryById()
                await compileRepositoryGroup(res.data)
            }
        })
    }

    const compileRepositoryGroup =async (repositoryGroupId) => {
        choiceRepositoryList.map(items=>{
            const param={
                repositoryGroup:{
                    id:repositoryGroupId,
                },
                repository:{
                    id:items.id
                }
            }
            repositoryService.compileRepositoryGroup(param)
        } )
    }

    //删除制品库弹窗
    const openDeletePop =async () => {
        confirm({
            title: '注意：下面的制品也会被删除',
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',

            onOk() {
                deleteRepository(params.id)
            },
            onCancel() {
            },
        });
    }

    const deleteRepository =async (id) => {
        const param = new FormData();
        param.append('id',id)
        const res=await repositoryService.deleteRepository(param)
        if (res.code===0){
            props.history.push(`/index/repository`)
        }

    }

    //切换选择后的制品库
    const cuteChooseRepository =async (item) => {
        setChoiceRepository(item)
    }
    //取消制品库
    const cancelRepository =async () => {
        if (choiceRepository){
            setRepositoryList(repositoryList.concat(choiceRepository))
            setChoiceRepositoryList(choiceRepositoryList.filter(item=>choiceRepository?.id!==item.id))
            setChoiceRepository(null)
        }
    }
    //切换制品库
    const cuteRepository =async (item) => {
        setUnderRepository(item)
    }
    //选择制品库
    const chooseRepository =async () => {
        if (repository){
            setRepositoryList(repositoryList.filter(item=>underRepository?.id!==item.id))
            setChoiceRepositoryList(choiceRepositoryList.concat(repository))
            setUnderRepository(null)
        }
    }
    return(
        <div className='repository-info'>
            <div className='info-title'>制品库信息</div>
            <div className='mt-6'>
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
                        <div className={`border w-20 py-4 rounded-md cursor-pointer `}>
                            <div className='flex-row text-center '>{repository?.type}</div>
                        </div>
                    </Form.Item>
                    <Form.Item
                        label="仓库名称"
                        name="name"
                        rules={[{required: true, message: '仓库名称必填'}]}
                    >
                        <Input placeholder="请输入制品库名称"/>
                    </Form.Item>
                    <Form.Item
                        label="存储库"
                        name="storage"
                        rules={[
                            {
                                required: true,
                                message: '使用中英文、数字、空格组合',
                            },
                        ]}
                    >
                        <Select  showArrow placeholder='请选择存储库' >
                            {
                                storageList?.map(item=>{
                                    return (
                                        <Option  key={item.id}  value={item.id}>
                                            {item.name}
                                        </Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    {
                        repository?.repositoryType==='group'&&
                        <Form.Item
                            label="组合选择"
                            name="name"
                        >
                            <div className='flex justify-between'>
                                <div className='border w-2/5 h-32 '>
                                    {
                                        repositoryList?.map(item=>{
                                            return(
                                                <div className={`${underRepository?.id===item.id&&" bg-gray-300"} hover:bg-gray-300 cursor-pointer`} onClick={()=>cuteRepository(item)}>
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
                    {/* <Button style={{ margin: '0 8px 0 0' }} onClick={onCancel}>
                        取消
                    </Button>*/}
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form>
                <div className='delete-style '>
                    <div className='info-title '>
                        删除制品库
                    </div>
                    <div className='text-red-500 mt-4'>此操作无法恢复！请慎重操作！</div>
                    <Button type="primary" htmlType="submit" onClick={openDeletePop} className='mt-2'>
                        删除
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default RepositoryInfo
