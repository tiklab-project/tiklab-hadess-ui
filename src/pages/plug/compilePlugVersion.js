/**
 * @name: CompilePlugVersion
 * @author: limingliang
 * @date: 2022-10-20 14:48
 * @description：添加或修改插件版本
 * @update: 2022-10-20 14:48
 */
import React, {useState, useEffect,useCallback} from "react";
import {Input, Form, Button, Row, Col, Breadcrumb, Upload} from 'antd';
import {FTP_URl} from "../../const";
import {getUser} from "tiklab-core-ui";
import {UploadOutlined} from "@ant-design/icons";
import CustomEditor from "../../common/editSlate/editor";
import plugService from "../../service/plug.service";
import './plug.scss'
const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 18 },
};
const CompilePlugVersion = (props) => {
    const {match:{params}} = props;
    const [form] = Form.useForm();
    const [plugDetails,setPlugDetails]=useState(null)
    const [fileList, setFileList] = useState([]);
    const [fileName, setFileName] = useState(); //插件
    const [fileUrl,setFileUrl]=useState()  //相对路径
    const [size,setSize]=useState(); //文件大小  字节
    const [value] = useState([
        {
            type: "paragraph",
            children: [{ text: "" }],
        },
    ]);

    useEffect(async ()=>{
        await findPlug(params)

    },[])
    //通过id查询插件
    const findPlug=async (params)=> {
        const param = new FormData()
        param.append("id", params.plugId)
        const res = await plugService.findArtifact(param)
        if (res.code === 0) {
            setPlugDetails(res.data)
            //将数据展示出来（类似回显）
            form.setFieldsValue({
                artifactName: res.data.name
            })
        }
    }

    const onFinish = async (value) => {
        const details = JSON.stringify(value.versionDetails)
        const params = {
            version:value.version,
            versionDetails:details,
            plugIn:fileName,
            plugUrl:fileUrl,
            artifact:{
                id:plugDetails.id
            },
            plugSize:(size/1048576).toFixed(2),  //将字节转为mb 并保留两位数
            des:value.des
        }
        const response=  await plugService.createArtifactVersion(params)
        if (response.code===0){
            props.history.push(`/index/server/plugDetails/${plugDetails.id}`);
        }
    }

    const uploadPros = {
        name: 'uploadFile',
        data:{type:"plug"},
        action: FTP_URl+'/uploadFile/ftpUpload',
        headers:{
            ticket:getUser().ticket
        },
        progress:{
            strokeWidth: 2,
            showInfo: false
        }
    }
    //插件上传
    const fileUpload={
        ...uploadPros,
        onChange(info) {
            setFileName(null)
            let fileList = [...info.fileList];
            fileList = fileList.slice(-1);
            fileList = fileList.map(file => {
                const size=file.originFileObj.size
                setSize(size)
                if (file.response) {
                    file.url = file.response.url;
                    setFileName(file.response.data.fileName)
                    setFileUrl(file.response.data.url)
                }
                return file;
            });
            setFileList(fileList)
        },
    }
    const cancel = () => {
        props.history.push("/index/plugList");
    }
    return(
        <div className=' w-full p-6 max-w-full max-w-screen-xl  m-auto plug' id='tables'>
            <Breadcrumb separator="/" className=' plug-title'>
                <Breadcrumb.Item href={'#/index/plugList'}>插件列表 </Breadcrumb.Item>
                <Breadcrumb.Item href="">编辑插件</Breadcrumb.Item>
            </Breadcrumb>
            <Form
                {...layout}
                onFinish={onFinish}
                name="nest-messages"
                form={form}
                className='mt-6'
                layout="vertical"
            >
                <Form.Item name={'artifactName'} label="关联插件" rules={[{ required: true }]}>
                    <Input disabled type="text"/>
                </Form.Item>
                <Form.Item name={'version'} label="版本" rules={[{ required: true }]}>
                    <Input/>
                </Form.Item>
                <Form.Item label="添加插件" name={'plugIn'} rules={[{ required: true }]}>
                    {
                        fileName
                            ?<Upload {...fileUpload} fileList={fileList}>
                            </Upload>
                            : <Upload {...fileUpload} >
                                <Button icon={<UploadOutlined />}>Upload</Button>
                            </Upload>
                    }
                </Form.Item>
                <Form.Item  label="版本介绍" name={['versionDetails']} initialValue={value} rules={[{ required: true }]}>
                    <CustomEditor/>
                </Form.Item>
                <Row>
                    <Col span={24} style={{ textAlign: 'left' }} >
                        <Button type="primary" htmlType="submit">提交</Button>
                        <Button style={{ margin: '0 8px' }} onClick={cancel}>取消</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}
export default CompilePlugVersion