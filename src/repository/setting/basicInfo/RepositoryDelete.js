/**
 * @name: RepositoryDelete
 * @author: Deploy
 * @date: 2024-03-06 10:30
 * @description：租户删除
 * @update: 2024-03-06 10:30
 */
import React, {useState, useEffect} from "react";
import { Form, Input,message} from 'antd';
import Modals from "../../../common/modal/Modal";
import Btn from "../../../common/btn/Btn";
import "./RepositoryDelete.scss"
const RepositoryDelete = (props) => {
    const [form] = Form.useForm();
    const {deleteVisible, setDeleteVisible, repository, deleteRepository} = props;

    const [deleteState,setDeleteState]=useState(false)  //删除的状态

    const onOk = () => {
        form.validateFields().then(async values => {
            setDeleteState(true)
            deleteRepository(repository.id).then(item=>{
                setDeleteState(false)
                if (item.code===0){
                    setDeleteVisible(false)
                    props.history.push(`/repository`)
                    message.info("删除成功")
                }else {
                    message.error(item.msg)
                }
            })
        })
    }

    //取消
    const cancel = () => {
        setDeleteVisible(false)
    }

    const modalFooter = (
        <>
            <Btn onClick={cancel} title={'取消'} isMar={true}/>
            {
                deleteState?
                <Btn  title={'删除中'} type={'dangerous'}/>:
                 <Btn onClick={onOk} title={'确定'} type={'dangerous'}/>
            }
        </>
    )
    return(
        <Modals
            visible={deleteVisible}
            onCancel={cancel}
            closable={false}
            footer={modalFooter}
            destroyOnClose={true}
            width={500}
            title={"删除制品库"}
        >
             <div className='repository-delete'>
                 <div className='desc-border'>
                     <div>
                         您正在删除仓库
                         <span className='desc-text'>{repository?.name}</span>
                     </div>
                     删除该制品库后 里面所有制品将会清理，客户端配置对应制品的路径将失效
                 </div>

                 <div className='data-table'>
                     <Form form={form}
                           layout='vertical'
                           autoComplete='off'>
                         <Form.Item
                             label={'制品库名称'}
                             name={'repositoryName'}
                             rules={
                                 [{required: true, message: '请输入制品库名称'},
                                     ({ getFieldValue }) => ({
                                         validator(rule, value,callback) {

                                             if(value) {
                                                 const vaild = value === repository.name
                                                 if (vaild) {
                                                     return Promise.resolve();
                                                 }

                                                 return Promise.reject(`请输入${repository.name}`);
                                             }
                                             callback()
                                         },
                                     }),
                                 ]
                             }
                         >
                             <Input  placeholder={"计划名称"}/>
                         </Form.Item>

                     </Form>
                 </div>
             </div>
        </Modals>
    )
}
export default RepositoryDelete
