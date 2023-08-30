/**
 * @name: RepositoryInfo
 * @author: Deploy
 * @date: 2023-02-17 10:30
 * @description：制品库信息
 * @update: 2023-02-17 10:30
 */
import React, {useState, useEffect} from "react";
import "./RepositoryBasicInfo.scss"
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import {EditOutlined} from "@ant-design/icons";
import {Form} from "antd";
import {inject, observer} from "mobx-react";
const RepositoryBasicInfo = (props) => {
    const [form] = Form.useForm();
    const {repositoryStore} = props
    const {repositoryData,deleteRpy,isLoading,updateRpy,errorMsg} = repositoryStore

    const list=[
        {
            key:1,
            title:'仓库信息',
            desc: '更新仓库信息',
            icon: <EditOutlined />,
            enCode:'house_update',
            content: <div className='bottom-rename'>
                <Form
                    form={form}
                    autoComplete='off'
                    layout='vertical'
                    name='name'
                    initialValues={{name:repositoryData.name,remarks:repositoryData.remarks}}
                >
                    <Form.Item
                        label="制品仓库"
                        name="type"
                    >
                        <div className={`repository-type-table`}>
                            <div className='type-text'>{repositoryData?.type}</div>
                        </div>
                    </Form.Item>
                    <Form.Item
                        label="仓库名称"
                        name="name"
                        rules={[{required: true, message: '仓库名称必填'}]}
                    >
                        <div>{repositoryData?.repositoryUrl}</div>
                    </Form.Item>
                </Form>
                <div className='bottom-rename-btn'>
                    <Btn
                        title={'取消'}
                        isMar={true}
                        onClick={()=>setOpenOrClose(1)}
                    />
                    <Btn
                        type={'primary'}
                        title={'确定'}
                        onClick={() => {
                            form.validateFields()
                                .then((values) => {
                                    onOk(values)

                                })
                        }}
                    />
                </div>
            </div>
        },

    ]

    return(
        <div className='xpack-setting-width'>
            <div className='basicInfo-up'>
                <BreadcrumbContent firstItem={'仓库信息'}/>
            </div>
            <div className='basicInfo-li'>
                {
                    lis.map((item,index)=> lisItem(item,index) )
                }
            </div>
            {
                isLoading && <Loading/>
            }
        </div>
    )

}
export default inject('repositoryStore')(observer(RepositoryBasicInfo))
