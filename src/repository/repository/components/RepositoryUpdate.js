/**
 * @name: RepositoryInfo
 * @author: Deploy
 * @date: 2023-02-17 10:30
 * @description：制品库信息
 * @update: 2023-02-17 10:30
 */
import React, {useState, useEffect} from "react";
import './RepositoryUpdate.scss'
import {ExclamationCircleOutlined, LeftCircleOutlined, RightCircleOutlined} from "@ant-design/icons";
import {Button, Form, Input, message, Modal, Select} from "antd";
const { TextArea } = Input;
const { confirm } = Modal;
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
import Print from "../../../common/image/Print";
const layout = {labelCol: {span: 6}};
const RepositoryUpdate = (props) => {
    const {match:{params},repositoryStore} = props;

    const {compileRepositoryGroup,findRepository,updateRepository,deleteRepository,findRepositoryByGroup,findUnRelevanceRepository}=repositoryStore

    const [form] = Form.useForm();
    const [repository,setRepository]=useState(null)  //制品库
    const [repositoryList,setRepositoryList]=useState([])  //未关联的本地和远程库

    const [underRepository,setUnderRepository]=useState()
    const [choiceRepository,setChoiceRepository]=useState(null)   //选中选择后的制品库
    const [choiceRepositoryList,setChoiceRepositoryList]=useState([])    //选择后的制品库id

    useEffect(async () => {
        await findRepositoryById()
    }, [params.id,]);


    //通过id查询制品库
    const findRepositoryById =async () => {
        debugger
        const res=await findRepository(params.id)
        if (res.code===0){
            form.setFieldsValue({
                type: res.agencyUrl,
                name:res.data.name,
               /* storage:res.data.storage.id,*/
                description:res.data.description,

            })
            setRepository(res.data)

            //查询未关联组合库的制品库
            findUnRelevanceRepository(res.data.type,params.id).then(item=>{
                item.code===0&& setRepositoryList(item.data)
            })

            //查询组合库关联的制品的库
            findRepositoryByGroup(params.id).then(item=>{
                item.code===0&&setChoiceRepositoryList(item.data)

            })
        }
    }

    const onFinish = () => {
        form.validateFields().then(async values => {
            const res=await updateRepository({...values,id:repository.id,
                repositoryType:repository.repositoryType,
                storage:{id:values.storage},
                type:repository?.type})
            if (res.code===0){
                message.success("修改成功",1)
                if (repository?.repositoryType==='group'){
                    compileRepositoryGroup({ repositoryGroupId:repository.id, repositoryList:choiceRepositoryList}).then(item=>{
                        item.code===0&& findRepositoryById()
                    })
                }else {
                    await findRepositoryById()
                }
            }
        })
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
                deleteRepository(params.id).then(item=>{
                    item.code==0&& props.history.push(`/index/repository`)
                })
            },
            onCancel() {
            },
        });
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
        debugger
        if (repository){
            setRepositoryList(repositoryList.filter(item=>underRepository?.id!==item.id))
            underRepository&& setChoiceRepositoryList(choiceRepositoryList.concat(underRepository))
            setUnderRepository(null)
        }
    }
    return(
        <div className=' xpack-setting-width repository-info'>
            <div className='info-title'>制品库信息</div>
            <div className='info-table'>
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
                        <div className={`repository-type-table`}>

                            <div className='type-text'>{repository?.type}</div>
                        </div>
                    </Form.Item>
                    <Form.Item
                        label="仓库名称"
                        name="name"
                        rules={[{required: true, message: '仓库名称必填'}]}
                    >
                        <div>{repository?.repositoryUrl}</div>

                    </Form.Item>
                    {
                        (repository?.repositoryType==='local'&&repository.type==="maven")&&

                        <Form.Item
                            label="版本控制"
                            name="version"
                        >
                            <div>{repository?.versionType}</div>

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
                                            debugger
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
                    <div className='delete-text'>此操作无法恢复！请慎重操作！</div>
                    <Button type="primary" htmlType="submit" onClick={openDeletePop} className='mt-2'>
                        删除
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default withRouter(inject('repositoryStore')(observer(RepositoryUpdate)))
