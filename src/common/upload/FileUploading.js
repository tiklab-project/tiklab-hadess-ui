/**
 * @name: FileUploading
 * @author: limingliang
 * @date: 2023-03-30 10:49
 * @description：文件上传
 * @update: 2023-03-30 10:49
 */

import React,{useEffect,useState} from "react";
import {Button, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {getAPIgateway, getUser} from "tiklab-core-ui";
import {inject, observer} from "mobx-react";
const FileUploading = (props) => {

    const {setFileUrl,fileUrl} = props;


    const [fileList, setFileList] = useState([]);
    //文件上传
    const uploadPros = {
        name: 'uploadFile',
        action: `${node_env? base_url:window.location.origin}/fileHand/fileUpload/${getUser().tenant&&getUser().tenant}`,
        headers:{
            ticket:getUser().ticket,
        },
        progress:{
            strokeColor: {
                '0%': '#108ee9',
                '100%': '#108ee9',
            },
            strokeWidth: 3,
            format: (percent) =>`${parseFloat(percent.toFixed(2))}%`,
        },
    }
    //文件上传
    const fileUpload={
        ...uploadPros,
        onChange(info) {
            setFileList([])
            setFileUrl(null)
            let fileList = [...info.fileList];
            fileList = fileList.slice(-1);
            fileList = fileList.map(file => {
                if (file.response) {
                    file.url = file.response.url;
                    setFileUrl(file.response.data)
                }
                return file;
            });
            setFileList(fileList)
        },
    }


    return(
        <>
            {
                fileUrl
                    ?<Upload {...fileUpload} fileList={fileList}>
                    </Upload>
                    : <Upload {...fileUpload} >
                        <Button zicon={<UploadOutlined />}>Upload</Button>
                    </Upload>
            }
        </>
    )
}

export default observer(FileUploading)
