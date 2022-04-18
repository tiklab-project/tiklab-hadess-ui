/**
 * @name: Member
 * @author: limingliang
 * @date: 2021-08-09 14:30
 * @description：会员管理
 * @update: 2021-08-09 14:30
 */
import React, {useState, useEffect} from "react";
import {Breadcrumb, Row, Col, Input, Button, Table,Space,Modal,Switch } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import memberService from "../../service/member.service"
import {withRouter} from "react-router";
const { confirm } = Modal;
const Member = props => {
    const [name, setName] = useState('');
    const [editData, setEditData] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalRecord, setTotalRecord] = useState(props.total);
    const [visible, setVisible] = useState(false);
    const [memberData, setMemberData] = useState(null);

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            render: (text, record) => {
                return <a className='text-blue-500' onClick={() => findDetails(record)}>{record.name}</a>
           }
        },

        {
            title: '手机号',
            dataIndex: 'phone',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
        },
        {
            title: '认证方式',
            dataIndex: 'memberType',
            render:(text)=>text===1?'内部':null||text===2?'第三方':null
        },

        {
            title: '创建时间',
            dataIndex: 'createTime',
        },
        {
            title: '启用状态',
            dataIndex: 'useState',
            render: (text, record) => (
                console.info("查询text",text),
                <Switch checkedChildren="启用" unCheckedChildren="停用" checked={text===1?true:false} onChange={(e)=>changeEnable(e,record)} />

            ),
        },
        {
            title: '操作',
            key: 'activity',
            render: (text, record) => (
                <Space size="useState">
                    <a >编辑</a>
                </Space>
            ),
        },
    ];

    useEffect(async ()=>{
        const param={
            pageParam: {
                pageSize: 10,
                currentPage: 1,
            },
        }
        await getMemberData(param)
    },[])

    const findDetails=async (record)=>{
        props.history.push({
            pathname:"/setting/member/details",
            params:record
        });
    }

    const onInputName = (e) => {
        const value = e.target.value
        setName(value)
    }
    const onSearch = async () => {
        const param={
            phone:name,
            pageParam: {
                pageSize: 10,
                currentPage: 1,
            },
        }
        await  getMemberData(param)
    }

    const changeEnable =(e,record)=>{
        console.log(record)
        if (e===true){
            record.useState=1
            updateMember(record)
        }else {
            record.useState=2
            updateMember(record)
        }
    }

    //停用
    const stopUse =async (param)=>{
        debugger
        const params={
            phone:name,
            ...param,
            useState:2
        }
        await updateMember(params)
    }
    //启用
    const openUse =async (param)=>{
        debugger
        const params={
            phone:name,
            ...param,
            useState:1
        }
        const pre= await updateMember(params)
        if (pre.code===0){
            const param={
                pageParam: {
                    pageSize: 10,
                    currentPage: 1,
                },
            }
            await getMemberData()
        }
    }

    //修改会员
    const updateMember=async(param) =>{
      const pre=await memberService.updateMember(param)

        if (pre.code===0){
            debugger
            const param={
                pageParam: {
                    pageSize: 10,
                    currentPage: 1,
                },
            }
           await getMemberData(param)
        }
    }

    //分页条件查询会员
    const getMemberData=async (param)=>{
        const pre = await  memberService.findMemberPage(param)
        if(pre.code===0){
            setTotalRecord(pre.data.totalRecord)
            setTableData(pre.data.dataList)
        }
    }
    const handleTableChange = async (pagination, filters, sorter) => {
        setPage(pagination.current)
        const newParams = {
            pageParam: {
                pageSize: pageSize,
                currentPage: pagination.current
            }
        }
        await getMemberData(newParams)
    }


    return(
        <section className='w-full flex flex-row'>
            <div className='w-full p-6 max-w-screen-xl m-auto'>
                <Breadcrumb separator=">" className='border-b border-solid pb-4'>
                    <Breadcrumb.Item>会员管理</Breadcrumb.Item>
                    <Breadcrumb.Item href=""> 会员列表</Breadcrumb.Item>
                </Breadcrumb>
                <Row gutter={[16, 16]} className='py-6'>
                    <Col span={6}>
                        <Input placeholder={'手机号'} value={name}  onChange={onInputName} onPressEnter={onSearch} />
                    </Col>
                </Row>
                <Row gutter={[16, 16]} >
                    <Col span={24}>
                        <Table
                            dataSource={tableData}
                            columns={columns}
                            rowKey={record => record.id}
                            pagination={{
                                current:page,
                                pageSize: pageSize,
                                total: totalRecord,
                            }}
                            onChange={(pagination, filters, sorter) => handleTableChange(pagination, filters, sorter)}
                        />
                    </Col>
                </Row>
            </div>
        </section>
    )
}

export default withRouter(Member)
