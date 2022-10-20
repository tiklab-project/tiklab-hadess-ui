/**
 * @name: Member
 * @author: limingliang
 * @date: 2021-08-09 14:30
 * @description：会员管理
 * @update: 2021-08-09 14:30
 */
import React, {useState, useEffect} from "react";
import {Breadcrumb, Row, Col, Input, Button, Table,Space,Modal,Switch ,Tooltip} from "antd";
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
    const [totalRecord, setTotalRecord] = useState();


    const columns = [
        {
            title: '昵称',
            dataIndex: 'nickName',
            width:'10%',
            render: (text, record) => (
                <>
                    {
                        filedState(record?.nickName,'name')
                    }
                </>)
        },
        {
            title: '账号',
            dataIndex: 'account',
            width:'10%',
            render: (text, record) => (
                <>
                    {
                        filedState(record?.account,'account')
                    }
                </>)
        },
        {
            title: '手机号',
            dataIndex: 'phone',
            width:'10%',
            render: (text, record) => (
                <>
                    {
                        filedState(record?.phone,'phone')
                    }
                </>)
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            width:'10%',
            render: (text, record) => (
                <>
                    {
                        filedState(record?.email,'email')
                    }
                </>
            )
        },
        {
            title: '认证方式',
            dataIndex: 'memberType',
            width:'10%',
            render:(text)=>text===1&&'内部'||text===2&&'第三方'||text===3&&'演示账号'

        },

        {
            title: '创建时间',
            dataIndex: 'createTime',
            width:'20%',
        },
        {
            title: '启用状态',
            dataIndex: 'useState',
            width:'10%',
            render: (text, record) => (
                console.info("查询text",text),
                <Switch checkedChildren="启用" unCheckedChildren="停用" checked={text===1?true:false} onChange={(e)=>changeEnable(e,record)} />

            ),
        },
        {
            title: '操作',
            key: 'activity',
            width:'20%',
            render: (text, record) => (
                <Space size="useState">
                    {/*{record.memberType===1&&
                        <a onClick={()=>updateMemberType(record)}>演示账号</a>}*/}

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


    const filedState = (value,type) => {
      return(
          value?.length>25?
              <Tooltip placement="right" title={value}>
                  <div style={{
                      width: 150,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap"
                  }} className={type==='name'&&'text-blue-500 cursor-pointer'} onClick={()=>findDetails(value)}>{value}</div>
              </Tooltip>
              :
              <div className={type==='name'&&'text-blue-500 cursor-pointer'} onClick={()=>findDetails(value)}>{value}</div>
      )
    }
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

    //设置为演示账号
    const updateMemberType = (record) => {
        record.memberType=3
        updateMember(record)
    }
    //启用停用
    const changeEnable =(e,record)=>{
        if (e===true){
            record.useState=1
            updateMember(record)
        }else {
            record.useState=2
            updateMember(record)
        }
    }

    //修改会员
    const updateMember=async(param) =>{
      const pre=await memberService.updateMember(param)
        if (pre.code===0){
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

    //添加账号
    const addMember =async () => {
        props.history.push("/setting/member/addmember")
    }

    return(
        <section className='w-full flex flex-row'>
            <div className='w-full p-6 max-w-full m-auto'>
                <Breadcrumb separator=">" className='border-b border-solid pb-4'>
                    <Breadcrumb.Item>会员管理</Breadcrumb.Item>
                    <Breadcrumb.Item href=""> 会员列表</Breadcrumb.Item>
                </Breadcrumb>
                <Row gutter={[16, 16]} className='py-6 '>
                    <Col span={6}>
                        <Input placeholder={'手机号'} value={name}  onChange={onInputName} onPressEnter={onSearch} />
                    </Col>
                    <Col span={10} offset={8} className='flex justify-end'>
                        <Button type="primary" onClick={addMember}>添加账号</Button>
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
