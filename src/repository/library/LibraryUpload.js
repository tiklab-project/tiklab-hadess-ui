/**
 * @name: LibraryUpload
 * @author: limingliang
 * @date: 2023-08-31 10:30
 * @description：制品上传
 * @update: 2023-08-31 10:30
 */

import React, {useState, useEffect} from "react";
import "./LibraryUpload.scss"
import Modals from "../../common/modal/Modal";
import Btn from "../../common/btn/Btn";
import {Form, Input, message, Switch} from "antd";
import FileUploading  from "../../common/upload/FileUploading"
import libraryStore from "../../library/store/LibraryStore";
import {getUser} from "tiklab-core-ui";
const layout = {
    labelCol: { span: 6},
    wrapperCol: { span: 30},
};
const LibraryUpload = (props) => {
    const {visible,setVisible,repositoryId,type}=props
    const [form] = Form.useForm();

    const {libraryHandPush,findHandPushResult}=libraryStore

    const [fileUrl, setFileUrl] = useState(); //文件地址
    const [pom,setPom]=useState(true)

    const [buttonText, setButtonText] = useState('确定');

    const cancel = () => {
        setVisible(false)
        setFileUrl(null)
    }
    const onOk = () => {
        form.validateFields().then(async values => {
            libraryHandPush({...values, filePath:fileUrl, pom:pom, repositoryId:repositoryId,type:type,user:getUser().name}).then(item=>{
                if (item.code===0){
                    timeTask(repositoryId)
                }
            })
        })
    }


    //定时任务
    const timeTask =async (value) => {
        setButtonText("加载中")
        let timer=setInterval(()=>{
            findHandPushResult(value).then(res=>{

                if (res.code===0){
                   if (res.data==="succeed"){
                       cancel(false)
                       message.success("推送成功",1)
                       clearInterval(timer)
                       setButtonText("确认")
                   }
                   if (res.data==="fail"){
                       message.error(res.data,1)
                       clearInterval(timer)
                       setButtonText("确认")
                   }
                } else {
                    clearInterval(timer)
                    setButtonText("确认")
                }
            })
        },2000)
    }

    const modalFooter = (
        <>
            <Btn onClick={cancel} title={'取消'} isMar={true}/>
            <Btn onClick={onOk} title={buttonText} type={'primary'}/>
        </>
    )
    const onChange = (e) => {
        setPom(e)
    }
    const setFilePath = (value) => {
        form.setFieldsValue({
            file: value
        })
        setFileUrl(value)
    }
    //maven 的上传form
    const mavenForm = () => {
      return(
          <Form
              {...layout}
              form={form}
              preserve={false}
              layout="vertical"
              initialValues={{file:fileUrl,pom:pom}}
          >
              <Form.Item
                  name="groupId"
                  label='Group'
                  rules={[{required: true, message: '请输入groupId'}]}
              >
                  <Input placeholder='请输入'/>
              </Form.Item>
              <Form.Item
                  name="artifactId"
                  label='Artifact'
                  rules={[{required: true, message: '请输入artifactId'}]}
              >
                  <Input placeholder='请输入'/>
              </Form.Item>
              <Form.Item
                  name="version"
                  label='Version'
                  rules={[{required: true, message: '请输入version'}]}
              >
                  <Input placeholder='请输入'/>
              </Form.Item>
              <Form.Item
                  name="packaging"
                  label='Packaging'
                  rules={[{required: true, message: '请输入packaging'}]}
              >
                  <Input placeholder='请输入'/>
              </Form.Item>
              <Form.Item
                  name="classifier"
                  label='Classifier'
              >
                  <Input placeholder='请输入'/>
              </Form.Item>
              <Form.Item
                  name="file"
                  label='File'
                  rules={[{required: true, message: '请上传文件'}]}
              >
                  <FileUploading   setFileUrl={setFilePath} fileUrl={fileUrl} />
              </Form.Item>
              <Form.Item
                  name="pom"
                  label='生成pom文件'
                  rules={[{required: true}]}
              >
                  <Switch defaultChecked onChange={onChange} />
              </Form.Item>
          </Form>
      )
    }

    const generic = () => {
      return(
          <Form
              {...layout}
              form={form}
              preserve={false}
              layout="vertical"
              initialValues={{file:fileUrl,pom:pom}}
          >
              <Form.Item
                  name="file"
                  label='文件'
                  rules={[{required: true, message: '请上传文件'}]}
              >
                  <FileUploading   setFileUrl={setFilePath} fileUrl={fileUrl} />
              </Form.Item>
              <Form.Item
                  name="version"
                  label='版本'
                  rules={[{required: true, message: '请输入version'}]}
              >
                  <Input placeholder='请输入'/>
              </Form.Item>

          </Form>
      )
    }

    return(
        <Modals
            open={visible}
            onCancel={cancel}
            closable={false}
            footer={modalFooter}
            destroyOnClose={true}
            width={600}
            title={`上传${type}制品`}
        >
            {
                type==="maven"&&mavenForm()||
                type==='generic'&&generic()

            }

        </Modals>

    )
}
export default LibraryUpload
