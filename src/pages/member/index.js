/**
 * @name: Member
 * @author: limingliang
 * @date: 2021-08-09 14:30
 * @description：会员管理
 * @update: 2021-08-09 14:30
 */
import React, {useState, useEffect} from "react";
import {
    Input,
    Button,
    Table,
    Space,
    Modal,
    Tooltip,
    Tag,
    Pagination,
    Tabs,
    Select
} from "antd";
import {
    ExclamationCircleOutlined,
    LeftOutlined,
    RightOutlined,
    SearchOutlined
} from '@ant-design/icons';
import memberService from "../../service/member.service"
import {withRouter} from "react-router";
const { TabPane } = Tabs;
import './member.scss'
const { confirm } = Modal;
import MemberDetails from './memberDetails'
import Paging from "../../common/components/paging";
const options=[{value: 'null', label: '全部账号'}, {value: '1', label: '内部账号'}, {value: '2', label: '第三方账号'},{value: '3', label: '演示账号'}]
const Member = props => {
    const [name, setName] = useState(null);   //搜索关键字
    const [memberList, setMemberList] = useState([]);  //会员数据list
    const [member,setMember]=useState(null)  //会员数据
    
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalPage,setTotalPage]=useState(0);  //总页数
    const [state,setState]=useState('null'); //状态字段

    const [visible, setVisible] = useState(false);  //会员详情 弹窗状态
    const columns = [
        {
            title: '昵称',
            dataIndex: 'nickName',
            width:'10%',
            render: (text, record) => (
                <>
                    {
                        filedState(record,record?.nickName,'name')
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
                        filedState(record,record?.phone,'phone')
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
                        filedState(record,record?.email,'email')
                    }
                </>
            )
        },
        {
            title: '账号类别',
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
                <Space size="middle">
                    {
                        text===1&& <Tag color={'green'} key={text} >启用</Tag>||
                        text===2&& <Tag color={'red'} key={text}>禁用</Tag>
                    }
                </Space>
            ),
        },
        {
            title: '操作',
            key: 'activity',
            width:'10%',
            render: (text, record) => (
                <Space size="useState" className='space-x-4 text-blue-500'>
                    {record.useState==1?
                        <a  disabled>启用</a>:
                        <a onClick={()=>disable(record,'open')}>启用</a>
                    }
                    {record.useState==2?
                        <a  disabled>禁用</a>:
                        <a onClick={()=>disable(record,'close')}>禁用</a>
                    }

                </Space>
            ),
        },
    ];

    useEffect(async ()=>{
        await getMemberData(1)
    },[])


    const openMemberDetails = (value,type) => {
        if(type==='name'){
            setVisible(true)
            setMember(value)
        }
    }
    const onInputName = (e) => {
        const value = e.target.value
        if (value){
            setName(value)
        }else {
            setName(null)
        }
    }
    const onSearch = async () => {
        await  getMemberData(1)
    }

    //启用
    const openMemberState =async (record) => {
        record.useState=1
        await updateMember(record)
    }
    //停用
    const closeMemberState =async (record)=>{
        record.useState=2
        await updateMember(record)
    }

    //修改会员
    const updateMember=async(param) =>{
      const pre=await memberService.updateMember(param)
        if (pre.code===0){
           await getMemberData(currentPage,state)
        }
    }

    //分页条件查询会员
    const getMemberData=async (currentPage,memberType)=>{
        const param={
            memberType:memberType,
            keyword:name,
            pageParam: {
                pageSize: pageSize,
                currentPage: currentPage,
            },
        }
        const res = await  memberService.findMemberPage(param)
        if(res.code===0){
            setTotalPage(res.data.totalPage)
            setMemberList(res.data.dataList)
        }
    }
    //分页
    const handleTableChange = async (value) => {
        setCurrentPage(value)
        await getMemberData(value,state)
    }

    //添加账号
    const addMember =async () => {
        props.history.push("/index/member/addmember")
    }

    //切换状态
    const cuteState =async (value) => {
      setState(value)
       await getMemberData(1,value)
    }

    //关闭弹窗
    const onClose = () => {
        setVisible(false);
    };


    //启用禁用弹窗
    const disable=async (data,type)=>{
        confirm({
            title: [type==='open'?'确定启用':'注意! 禁用后该会员不可用,请谨慎操作'],
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                if (type==='open'){
                    openMemberState(data)
                }else {
                    closeMemberState(data)
                }
            },
            onCancel() {
            },
        });
    }
    const filedState = (record,value,type) => {
        return(
            value?.length>25?
                <Tooltip placement="right" title={value}>
                    <div style={{
                        width: 150,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                    }} className={type==='name'&&'text-blue-500 cursor-pointer'} onClick={()=>openMemberDetails(record,type)}>{value}</div>
                </Tooltip>
                :
                <div className={type==='name'&&'text-blue-500 cursor-pointer'} onClick={()=>openMemberDetails(record,type)}>{value}</div>
        )
    }
    return(
        <div className='member' >
            <div className='member-head-style'>
                <div className='member-title'>会员列表</div>
                <Button type="primary" onClick={addMember}>添加账号</Button>
            </div>
            <div className='flex space-x-8 my-4'>
                <Select    style={{width: 150}}  onChange={cuteState} options={options} placeholder='账号类别'/>
                <div className=''>
                    <Input placeholder={'手机号、邮箱'} value={name}  onChange={onInputName}
                           onPressEnter={onSearch}    size='middle' style={{ width: 240 }}   prefix={<SearchOutlined/>} className='text-gray-400' />
                </div>
            </div>
            <Table
                dataSource={memberList}
                columns={columns}
                pagination={false}
            />
            <Paging totalPage={totalPage} currentPage={currentPage} handleTableChange={handleTableChange}/>
            <MemberDetails onClose={onClose} visible={visible} memberData={member}/>
        </div>
    )
}

export default withRouter(Member)
