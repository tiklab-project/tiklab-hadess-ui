/**
 * @name: CompilePlug
 * @author: limingliang
 * @date: 2022-10-20 14:48
 * @description：添加或修改插件
 * @update: 2022-10-20 14:48
 */
import React, {useState,useEffect} from "react";
import {Col, Row, Form, Modal, Input, Select, Upload, Button} from 'antd';
import {FTP_DOWNLOAD_URL, FTP_URl} from "../../const";
import {UploadOutlined} from "@ant-design/icons";
import plugService from "../../service/plug.service";
import {getUser} from "tiklab-core-ui";
import {withRouter} from "react-router";
const { Option } = Select;
const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 24 },
};
const plugType = [{code:'eas', value: 'eas账号和门户中心' },{code:'teamwire', value: 'teamWire项目管理' }, { code:'postin', value: 'postIn接口测试' },
    {code:'kanass', value: 'kanass知识库' },{code:'teston', value: 'testOn自动化测试' },{code:'matflow', value: 'matFlow流水线' },{code:"other",value:'其他'}];

const CompilePlug = (props) => {
    const [form] = Form.useForm();
    const [surfacePlot,SetSurfacePlot]=useState(); //封面图
    const [fileUrl, setFileUrl] = useState(); //文件地址
    const {visible, onCancel, editData} = props;
    useEffect(()=>{
        if (editData) {
            form.setFieldsValue({
                name: editData.name,
                type: editData.type,
                des:editData.des,
            })
            setFileUrl(editData.captureUrl)
        }
    }, [editData])

    const uploadPros = {
        name: 'uploadFile',
        data:{type:"plug"},
        action: FTP_URl + '/uploadFile/ftpUpload',
        headers:{
            ticket:getUser().ticket
        },
        progress:{
            strokeWidth: 2,
            showInfo: false
        }
    }
    //文件上传
    const pictureUpload={
        ...uploadPros,
        onChange(info) {
            SetSurfacePlot(null)
            let fileList = [...info.fileList];
            fileList = fileList.slice(-1);
            fileList = fileList.map(file => {
                if (file.response) {
                    SetSurfacePlot(file.response.data.fileName)
                    setFileUrl(file.response.data.url)
                }
                return file;
            });
        },
    }
    const pictureList=[
        {
            uid: '-1',
            name: surfacePlot,
            status: 'done',
            url:`${FTP_DOWNLOAD_URL}/${fileUrl}`,
            thumbUrl:`${FTP_DOWNLOAD_URL}/${fileUrl}`
        }
    ]

    const handleOk = () => {
        form.validateFields().then(async values => {
            if (editData) {
              const res = await plugService.updateArtifact({...values, id: editData.id,member:{id:getUser().userId}, captureUrl:fileUrl})
                if (res.code===0) {
                    onCancel()
                }
            } else {
                const  res = await plugService.createArtifact({...values,member:{id:getUser().userId},captureUrl:fileUrl})
                if (res.code===0) {
                    props.history.push(`/setting/compileVersion/${res.data}`);
                }
            }
        })
    }

    return(
      <Modal
          visible={visible}
          title='添加插件'
          onCancel={onCancel}
          okText='保存'
          cancelText='取消'
          width={500}
          closable={false}
          destroyOnClose={true}
          onOk={handleOk}


      >
          <Row>
              <Col span={24}>
                  <Form
                      {...layout}
                      form={form}
                      preserve={false}
                      layout="vertical"
                  >
                      <Form.Item
                          name="name"
                          label='插件名称'
                          rules={
                              [
                                  {
                                      required: true,
                                      message: '字段类型名称不能包含非法字符，如&,%，&，#……等'
                                  }
                              ]
                          }
                      >
                          <Input />
                      </Form.Item>
                      <Form.Item
                          name="type"
                          label='插件类型'
                          rules={
                              [
                                  {
                                      required: true,
                                      message: '必填'
                                  }
                              ]
                          }
                      >
                          <Select
                              showArrow
                          >
                              {plugType.map(item=>{
                                  return(
                                      <Option value={item.code} key={item.code}>{item.value}</Option>
                                  )
                              })}
                          </Select>
                      </Form.Item>
                      <Form.Item name={'captureUrl'} label="插件封面图">
                          {
                              fileUrl
                                  ? <Upload {...pictureUpload} listType="picture" defaultFileList={[...pictureList]}
                                            className="upload-list-inline" maxCount='1'>
                                  </Upload>
                                  :  <Upload {...pictureUpload} listType="picture"
                                             className="upload-list-inline" maxCount='1'>
                                      <Button icon={<UploadOutlined />}>Upload</Button>
                                  </Upload>
                          }
                      </Form.Item>
                      <Form.Item
                          name="des"
                          label='插件描述'
                      >
                          <Input />
                      </Form.Item>
                  </Form>
              </Col>
          </Row>
      </Modal>
  )
}
export default withRouter(CompilePlug)