/**
 * @name: managedb
 * @author: limingliang
 * @date: 2022-05-16 14:30
 * @description：租户数据源管理
 * @update: 2022-05-16 14:30
 */

import React, {useState, useEffect,Fragment} from "react";
import {
    Breadcrumb,
    Radio,
    Space,
    Table,
    Button,
    Modal,
    Row,
    Form,
    Input,
    Select, Col
} from "antd";
const { Option } = Select;
const layout = {
    labelCol: { span: 6},
    wrapperCol: { span: 18},
};
import tenantService from "../../service/tenant.service"
import { PlusOutlined,DeleteOutlined,FormOutlined} from "@ant-design/icons";
import {list} from "postcss";
const ManageDb = props=> {
    const [form] = Form.useForm();
    const [tenantDbDataList,setTenantDbDataList]=useState([])  //db数据

    const [tenantDbData,setTenantDbData]=useState()  //要修改的单个租户db数据
    const [tenantVisible, setTenantVisible] = useState(false);  //修改单个tenant数据源的弹窗


    const [test,setTest]=useState([{text:'',value:''}])
    const [tenantTableData, setTenantTableData] = useState([]);  //租户数据
    const [dbVisible, setDbVisible] = useState(false);  //添加db数据源的弹窗

    const [mouseType,setMouseType]=useState(null)    //鼠标状态

    const columns = [
        {
            title: '租户名称',
            dataIndex: ['tenant','name'],
        },
        {
            title: '产品',
            dataIndex: 'app',
        },
        {
            title: 'db',
            dataIndex: 'url',
            filters: [
                { text: "172.10.1.10:3306", value: '172.10.1.10:3306' },
                { text: 'Female', value: 'female' },
            ],
            onFilter: (value, record) => record.url.indexOf(value) === 0,
        },
        {
            title: '操作',
            key: 'activity',
            render: (text, record) => (
                <Space size="useState">
                    <a onClick={()=>addTenantDbVisible(record)}>修改</a>
                </Space>
            ),
        },
    ];

    useEffect(async ()=>{
        await findDb()
        await findTenant()
    },[])
    //查询所有的数据源db
    const findDb = async () => {
       const res=await tenantService.findAllTenantDbGroup()
        if (res.code===0){
            setTenantDbDataList(res.data)
        }
    }
    //查询租户数据
    const findTenant = async (tenantDbId) => {
        const param={
            dbGroupId:tenantDbId
        }
       const res=await tenantService.findTenantDatabaseByDb(param)
        if (res.code===0){
            setTenantTableData(res.data)
        }
    }

    const cuteType = (value) => {
        const res=value.target.value

    }

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
        }
    };

    //打开单个修改租户db数据弹窗
    const addTenantDbVisible = (value) => {
        setTenantDbData(value)
        setTenantVisible(true)
        if (value) {
            form.setFieldsValue({
                tenantName:value.tenant.name,
                url:value.url
            })
        }
    }
    const tenantOnCancel = () => {
        setTenantVisible(false)
    }
    //修改单个db路径
    const updateTenantDb = () => {
        form.validateFields().then(async values => {
            const res=await tenantService.updateTenantDatabase({...tenantDbData,tenantDbGroup:{id:values.url}})
            if (res.code===0){
                setTenantVisible(false)
               await findTenant()
            }
        })
    }


    //添加db
    const addDbVisible =async () => {
        setDbVisible(true)

    }
    const dbOnCancel = () => {
        setDbVisible(false)
    }
    const addDb = async () => {
        form.validateFields().then(async values => {
            const res=await tenantService.createTenantDbGroup({...values})
            if (res.code===0){
                setDbVisible(false)
              await  findDb()
            }
        })
    }

    //删除数据源
    const deleteDb =async () => {

    }

    //修改单个租户的db数据源弹窗
    const updateTenantDbDatePop = () => {
        return(
            <Modal
            visible={tenantVisible}
            title='修改db数据源'
            okText='保存'
            cancelText='取消'
            width={500}
            destroyOnClose={true}
            onOk={updateTenantDb}
            style={{ top: 250 }}
            onCancel={tenantOnCancel}
        >
            <Row>
                <Col span={24}>
                    <Form
                        {...layout}
                        form={form}
                        preserve={false}
                    >
                        <Form.Item
                            name="tenantName"
                            label='租户'
                        >
                            <Input disabled="disabled"/>
                        </Form.Item>
                        <Form.Item
                            name="url"
                            label='bd数据源'
                            rules={[{required: true}]}
                        >
                            <Select  showArrow>
                                {
                                    tenantDbDataList.map(item=>{
                                        return (
                                            <Option  key={item.id} value={item.id}>
                                                {item.url}
                                            </Option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Form>
                </Col>

            </Row>
        </Modal>
        )}
    //添加bd数据源
   const addDbPop = () => {
       return(
           <Modal
               visible={dbVisible}
               title='添加db数据源'
               okText='保存'
               cancelText='取消'
               width={500}
               destroyOnClose={true}
               onOk={addDb}
               onCancel={dbOnCancel}
           >
               <Row>
                   <Col span={24}>
                       <Form
                           {...layout}
                           form={form}
                           preserve={false}
                       >
                           <Form.Item
                               name="url"
                               label='url地址'
                               rules={[{required: true}]}
                           >
                               <Input/>
                           </Form.Item>
                           <Form.Item
                               name="userName"
                               label='用户名'
                               rules={[{required: true}]}
                           >
                               <Input/>
                           </Form.Item>
                           <Form.Item
                               name="password"
                               label='密码'
                               rules={[{required: true}]}
                           >
                               <Input/>
                           </Form.Item>
                           <Form.Item
                               name="details"
                               label='简介'
                               rules={[{required: true}]}
                           >
                               <Input/>
                           </Form.Item>
                       </Form>
                   </Col>

               </Row>
           </Modal>
       )
   }


    return(
        <section className='flex-row p-6'>
            <div className='w-full  max-w-screen-xl m-auto'>
                <Breadcrumb separator=">" className='border-b border-solid pb-4'>
                    <Breadcrumb.Item href="#/setting/tenant">租户列表</Breadcrumb.Item>
                    <Breadcrumb.Item href=""> 数据源管理</Breadcrumb.Item>
                </Breadcrumb>
                <div className='pt-6'>
                    <Radio.Group defaultValue='db' onChange={cuteType}>
                        <Radio.Button value="db">db</Radio.Button>
                        <Radio.Button value="dss">dss</Radio.Button>
                    </Radio.Group>
                </div>
                <div className='grid  grid-cols-5 gap-x-1 pt-6' >
                    {
                        tenantDbDataList&&tenantDbDataList.map((item,index)=> {
                            return(
                                <div key={index} className='flex'>
                                    <div  className=' flex-col justify-center border border-gray-200 flex-col py-2 px-4  grid gap-y-2'>
                                      <div className='border-b grid gap-y-2'>
                                          <p>用户:{item.userName}</p>
                                          <p>地址:{item.url}</p>
                                          <p>描述：{item.details}</p>
                                      </div>
                                       <div className='flex justify-between px-4'>
                                           <div className='border border-gray-200 bg-blue-400 px-2 text-white cursor-pointer' >
                                               修改
                                           </div>
                                           <div  className='border border-gray-200 px-2 cursor-pointer' onClick={()=>deleteDb()} >
                                               删除
                                           </div>

                                       </div>
                                    </div>
                                    {index===tenantDbDataList.length-1&&
                                        <PlusOutlined className='text-xl py-10 pl-4 cursor-pointer' onClick={addDbVisible}/>
                                    }
                                </div>

                            )
                        })
                    }
                </div>
                <div className='pt-8 ' >
                  {/*  <div className=' flex justify-end'>
                        <Button type="primary"  onClick={addTenantDbListVisible} >
                            修改
                        </Button>
                    </div>*/}
                    <div className='border border-gray-200'>
                        <Table
                            rowSelection={{
                                type: 'checkbox',
                                ...rowSelection,
                            }}
                            columns={columns}
                            dataSource={tenantTableData}
                            rowKey = {record => record.id}
                            pagination={false}
                            scroll={{ y: 400 }}
                        />
                    </div>
                </div>
            </div>
            {updateTenantDbDatePop()}
            {addDbPop()}
        </section>
    )
}

export default ManageDb