/**
 * @name: BlogList
 * @author: limingliang
 * @date: 2022-11-08 14:30
 * @description：空间管理
 * @update: 2022-1-08 14:30
 */
import React,  {useState, useEffect} from "react";
import {Dropdown, Button, Form, Input, Radio, Select, Modal, Pagination, Empty, Tooltip, Tabs} from "antd";
const { TabPane } = Tabs;
const { confirm } = Modal;
import {
    LikeOutlined,
    MessageOutlined,
    FunnelPlotOutlined,
    LikeFilled,
    ExclamationCircleOutlined,
    EyeOutlined, SearchOutlined
} from "@ant-design/icons";
import {getUser} from "tiklab-core-ui"
import './blog.scss'
import blogService from "../../service/blog.service";
import BlogDetails from "./blogDetails";
import Paging from "../../common/components/paging";

const BlogList = (props) => {

    const [currentPage,setCurrentPage]=useState(1)    //当前页
    const [pageSize,setPageSize]=useState(10)
    const [totalPage,setTotalPage]=useState(0);  //总页数

    const [name, setName] = useState('');
    const [status,setStates]=useState('all'); //状态字段
    const [sort,setSort]=useState("asc");  //排序字段
    const [updateDate,setUpdateDate]=useState();
    const [blogDataList, setBlogDataList] = useState([]);

    const [detailsVisible,setDetailsVisible]=useState(false)
    const [blogData,setBlogData]=useState()  //博客data
    useEffect(async ()=>{
        await getBlogsDate(currentPage,sort,status)
    },[])

    //分页查询博客   当前页：currentPage 、排序：sort
    const getBlogsDate=async (currentPage,sort,status)=>{
        const params={
            pageParam: {
                pageSize: pageSize,
                currentPage: currentPage,
            },
            orderParams:[
                {
                    name:'createTime',
                    orderType:sort,
                }
            ],
            name:name,
            status:status==='all'?null:status,   //状态
            userId:getUser().userId,

        }
        const data = await blogService.findBlogsPage(params)
        if (data.code===0){
            setTotalPage(data.data.totalPage)
            const paratData = data.data.dataList.map(item => {
                return {
                    ...item,
                    details: JSON.parse(item.details)
                }
            })
            setBlogDataList(paratData)
            addTenant()
        }
    }

    //上架博客
    const hitShelfBlog =async(value)=>{
        const  details= JSON.stringify(value.details)
        const  params={
            id:value.id,
            name: value.name,
            type: value.type,
            digest:value.digest,
            details: details,
            member:{
                id:getUser().userId
            },
            status:'issue'  //将状态改为发布
        }
        const code= await blogService.updateBlogs(params)
        if (code.code===0){
            await getBlogsDate(currentPage,sort,status)
        }
    }

    const addTenant = () => {
        setUpdateDate(null)
    }

    // 状态查询
    const cutBlogs=async (event)=>{
        //将状态字段 放入useState
        setStates(event)
        await getBlogsDate(1,sort,event)
    }

    //标题查询添加查询名称
    const onInputName=(e)=>{
        const value = e.target.value;
        setName(value)
    }
    //通过标题查询
    const onSearch = async()=>{
        await getBlogsDate(1,sort,status)
    }

    //切换页码
    const handleTableChange=async(e)=> {
        setCurrentPage(e)
        await getBlogsDate(e,sort,status)
    }


    //删除博客弹窗
    const deletePop=async (data)=>{
        confirm({
            title: '是否删除该博客',
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                deleteBlog(data)
            },
            onCancel() {
            },
        });

    }

    //删除博客
    const deleteBlog =async (id)=>{
        const formData = new FormData()
        formData.append('id', id);
        const response=await blogService.deleteBlogs(formData)
        if (response.code === 0) {
            setBlogDataList(blogDataList.filter(item=>item.id!==id))
        }
    }

    //打开创建博客的页面
    const openCreateBlog = async () => {
        props.history.push(`/index/blog/compileBlog/add`,)
    }

    //打开博客详情抽屉
    const openBlogDetails = (value) => {
      setDetailsVisible(true)
        setBlogData(value)
    }
    //关闭博客详情抽屉
    const closeBlogDetails = (value) => {
        setDetailsVisible(false)
        setBlogData(value)
    }


    //跳转修改blog界面
    const skipUpdateBlog=async (value)=>{
        props.history.push(`/index/blog/compileBlog/${value.id}`)
    }

    return(
        <div className=' blog'>
            <div className='blog-head-style'>
                <div className='blog-title'>博客列表</div>
                <Button type="primary" onClick={openCreateBlog}>创建博客</Button>
            </div>
            <section className='flex flex-col '>
                <div className='py-4 flex justify-between items-center'>
                    <div className='flex space-x-6'>
                        <Tabs  activeKey={status}  onTabClick={cutBlogs}  id={"tabPane"} >
                            <TabPane  tab="全部" key="all"/>
                            <TabPane tab="草稿箱" key="drafts"/>
                            <TabPane tab="已发布" key="issue"/>
                        </Tabs>
                        <div className='grid grid-cols-2 gap-2 mt-2'>
                            <div className='space-x-4'>
                                <Input
                                    className='appearance-none border   bg-white text-gray-700 placeholder-gray-400 rounded-full text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transpar'
                                    placeholder={'请输入关键字查询'}
                                    size='middle' style={{ width: 240 }}
                                    value={name} onChange={onInputName}
                                    onPressEnter={onSearch}
                                    prefix={<SearchOutlined/>}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {
                        blogDataList.length>0?blogDataList.map(item => {
                                return (
                                    <div key={ item.id } className='py-2 border-b border-solid border-light-grey-500'>
                                        <div className='grid grid-cols-6 gap-4'>
                                            <div className='flex flex-col col-span-5'>
                                                <h1 className='text-2xl hover:text-blue-400 truncate cursor-pointer' onClick={()=>openBlogDetails(item)}>{item.name}</h1>
                                                <section className={` mt-4`}>
                                                    {item.digest}
                                                </section>

                                                <div className='flex space-x-4 my-6'>
                                                    {item.status==="issue"
                                                        ?<Button type='primary' disabled size='large' shape='round'>上架</Button>
                                                        : <Button type='primary' size='large' shape='round' onClick={()=>hitShelfBlog(item)}>上架</Button> }
                                                    <Button type='primary' size='large' shape='round' onClick={()=>skipUpdateBlog(item)}>编辑</Button>
                                                    <Button type='primary' size='large' shape='round' onClick={()=> deletePop(item.id)} >删除</Button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex items-center justify-between'>
                                            <div className='flex space-x-4 items-center mt-3'>
                                                <div className='flex space-x-2 items-center cursor-pointer'>
                                                    <Tooltip title='点赞数'>
                                                        {
                                                            item.like
                                                                ?<LikeFilled className='text-lg' />
                                                                : <LikeOutlined  className='text-lg' />
                                                        }
                                                    </Tooltip>
                                                    <span className='mt-2'>{item.likeNumInt}</span>
                                                </div >
                                                <div className='flex space-x-2 items-center cursor-pointer'>
                                                    <Tooltip title='浏览量'>
                                                        <EyeOutlined className='text-lg'/>
                                                    </Tooltip>
                                                    <span className='mt-2'>{item.number}</span>
                                                </div>
                                            </div>
                                            <span>{item.createTime}</span>
                                        </div>
                                    </div>
                                )
                            }):
                            <section className='flex flex-col mt-6'>
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} >
                                    <Button type="primary" onClick={openCreateBlog}>创建博客</Button>
                                </Empty>
                            </section>
                    }
                    <Paging totalPage={totalPage} currentPage={currentPage} handleTableChange={handleTableChange}/>
                </div>
            </section>
             <BlogDetails visible={detailsVisible} onClose={closeBlogDetails}  blogData={blogData}/>
        </div>
    )
}
export default BlogList