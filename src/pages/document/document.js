
/**
 * @name: Document
 * @author: limingliang
 * @date: 2022-01-20 14:30
 * @description：文档管理
 * @update: 2022-01-20 14:30
 */
import {withRouter} from "react-router";
import {Breadcrumb ,Menu, Dropdown, Button, Space,Comment,Input,Form,Modal}from "antd";
import React, {useState, useEffect} from "react";
import {
    MenuOutlined,
    CaretRightOutlined,
    CaretDownOutlined,
    FileOutlined,
    DownOutlined,
    PlusOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons";
import "./scss/drop-down.scss"
import documentService from "../../service/document.service"
//import PreviewEditor from "../../common/editSlate/previewEditor";
import {PreviewEditor} from 'tiklab-slate-ui'
const { TextArea } = Input;
const { confirm } = Modal;
import './scss/document.scss'

const Document = props => {
    const repositorys=props.history.location.params

    const [documentTree,setDocumentTree]=useState([])  //文档树
    const [expandedTree, setExpandedTree] = useState([])  //文档树 展开的id

    const [documentDetails,setDocumentDetails]=useState(null) //文档详情
    const [type,setType]=useState(null)   //类型  目录：catalog、文档 document
    const [catalogDetails,setCatalogDetails]=useState(null)  //目录详情
    const [childDocumentList,setChildDocumentList]=useState()  //子级的数据

    const [repositoryDetails,setRepositoryDetails]=useState('') //文档空间数据


    const [categoryDataList, setCategoryDataList] = useState([]);  //目录树详情
    const [documentDataList,setDocumentDataList]=useState([]);  //文档list
    const [expand, setExpand] = useState(false);  // 鼠标移动到导航栏哪一个
    const [mouseOverMenuId,setMouseOverMenuId]=useState('')  //鼠标移动到左侧目录栏的哪一个


   
    const [documentData,setDocumentData]=useState('')  //文档内容
    const [categoryData,setCategoryData]=useState(null)  //目录详情
    const [state,setState]=useState(false) //右边展示目录或者文档状态

    const [visible, setVisible] = useState(false); //创建弹窗状态
    const [editData, setEditData] = useState(null);  //编辑空间传到弹窗的数据
    const [parentCategoryId,setParentCategoryId]=useState(null)  //父目录的id

    const [commentTree,setCommentTree]=useState([])  //评论树

    const [repository,setRepository]=useState([])  //空间

    const [name, setName] = useState('');  //搜索内容

    const [highlightId, setHighlightId]=useState('') //高亮id
    useEffect(async ()=>{
        if (repositorys){
            sessionStorage.setItem("repository", JSON.stringify(repositorys));
        }
       const repository=   JSON.parse(sessionStorage.getItem("repository"))
        setRepositoryDetails(repository)
        await findDocumentTree(repository,1)
        await findRepository()

    },[])

    //查询所有空间
    const findRepository=async ()=>{
        const res=  await documentService.findAllRepository()
        if (res.code===0){
            setRepository(res.data)
        }
    }
    //查询文档tree
    const findDocumentTree=async (repository,type)=>{
        const param={
            repositoryId:repository.id
        }
        const res=await documentService.findDocumentTree(param)
        if (res.code===0){
            setDocumentTree(res.data)
            //setDocumentDataList(res.data.document)
            //setCategoryDataList(res.data.category)
            //第一次默认打开第一个文档
            if (res.data){

                setDocumentDetails(res.data[0])
                setHighlightId(res.data[0].id)
                debugger
                //await findDocument(res.data[0])
                await findCommentByDocumentId(res.data[0].id)
            }
        }
    }
    //切换空间
    const cutRepository = (
        <Menu >
            {repository&&repository.map(item=>{
                return(
                    <Menu.Item key={item.id} onClick={()=>cutRepositoryData(item)}>
                        {item.name}
                    </Menu.Item>
                )
            })}
        </Menu>
    )
    const  cutRepositoryData=async (repositoryDetails)=>{
       await findCategoryTree(repositoryDetails)
        setRepositoryDetails(repositoryDetails)
    }


    //添加查询内容
    const onInputName=async (e)=>{
        const value = e.target.value;
        setName(value)
    }
    //模糊查询查询
    const onSearch=async (name)=>{
        const param={
            repositoryId:repository.id,
            name:name
        }
        const res=await documentService.likeFindCategoryListTree(param)
        if (res.code===0){
            if (res.data){
                setCategoryDataList(res.data.category)
                setDocumentDataList(res.data.document)
            }else {
                setCategoryDataList(null)
                setDocumentDataList(null)
            }
            setExpandedTree([])
        }
    }

    //左侧目录栏移入的id
    const mouseOverId = async (id) => {
        setMouseOverMenuId(id)
    }
    //左侧目录栏移除id
    const removeOverId = async () => {
        setMouseOverMenuId('')
    }
    //左侧目录栏移入
    const  mouseOverMouse=async ()=>{
        setExpand(true)
    }
    // 左侧目录栏移出
    const leaveMouseNav = () => {
        setExpand(false)
    }

    //跳转添加页面
    const skipAddDocument=(data)=>{
        props.history.push({
            pathname:"/index/document/compileDocument",
            params:data
        });
    }
    //跳转修改u文档页面
    const skipCompileDocument=(documentDetails)=>{
        props.history.push({
            pathname:"/index/document/compileDocument",
            params:documentDetails.repository
        });
    }
    //取消创建弹窗
    const onCancel = async () => {
        setVisible(false)
    }
    //确认弹窗
    const onOK=async (parentCategoryId)=>{
        setVisible(false)
        await findCategoryTree(repositoryDetails)

       const param=new FormData();
        param.append('categoryId',parentCategoryId)
       const res=await documentService.findChildrenCategory(param)
        if (res.code===0){
            setCategoryData(res.data)
        }
    }


    // 树的展开与闭合
    const isExpandedTree = (key) => {
        return expandedTree.some(item => item === key)
    }

    //打开目录或者打开文档详情
    const openOrCloseTree=(document)=>{
        setType(document.type)
        setDocumentDetails(document)
       if (document.type==="document"){
            setHighlightId(document.id)
       }else {
           setChildDocumentList(document.childDocument)
           if (isExpandedTree(document.id)) {
               setExpandedTree(expandedTree.filter(item => item !== document.id))
           } else {
               setExpandedTree(expandedTree.concat(document.id));
           }
       }


    }

    //查询目录详情
    const findCategory=async (category)=>{
        setHighlightId(category.id)
        setCategoryData(category)

        setState(true)
    }
    //查询文档详情(通过id查询)
    const findDocument=async(documentItem) =>{
        setHighlightId(documentItem.id)
       const param=new FormData();
        param.append('id',documentItem.id)
        const res = await documentService.findDocument(param)
        if (res.code===0){
            const documentData={...res.data,details:JSON.parse(res.data.details)}
            setDocumentData(documentData)
            setState(false)
           await findCommentByDocumentId(documentItem.id)
        }

    }

    //第一级文档树
    const catalogTree=(documentTree)=>{
        return(
            <div className='pl-7 cursor-pointer space-y-3'>
                {documentTree?.map(item=>{
                    return(
                        <div key={item.id} >
                            <div  className={`flex items-center space-x-2 py-1 hover:bg-gray-200 ${highlightId===item.id?" text-blue-500":null}`} onClick={()=>openOrCloseTree(item)}  >
                                {
                                    item.type==="catalog"?
                                    isExpandedTree(item.id)
                                        ?<CaretDownOutlined className='text-gray-400 text-sm'/>
                                        :<CaretRightOutlined className='text-gray-400 text-sm'/>:
                                        <i className='w-1 h-1 bg-gray-400 rounded-full'/>
                                }
                                <div onClick={()=>findCategory(item)}>{item.name}</div>
                               {/* <div>
                                    {
                                        mouseOverMenuId===item.id&&
                                        <div className='pl-60' >
                                            <div onClick={()=>deletePop(item,2)}>
                                                删除
                                            </div>
                                        </div>
                                    }
                                </div>*/}
                            </div>
                            {isExpandedTree(item.id)&&childCatalogTree(item)}
                        </div>
                    )
                    }
                )
                }

            </div>
            )

    }
    //子级文档树  (二级及以下文档)
    const childCatalogTree=(document)=>{
        return <div className='pl-4  pt-1 space-y-3'>
                {
                    document?.childDocument?.map(childItem=>{
                        return(
                            <div  key={childItem.id} className='pt-1'>
                                <div className={`flex items-center space-x-2 py-1 hover:bg-gray-200 ${highlightId===childItem.id?" text-blue-500":null}`}   onClick={()=>openOrCloseTree(childItem)} >
                                    {
                                        childItem.type==="catalog"?
                                            isExpandedTree(childItem.id)
                                                ?<CaretDownOutlined className='text-gray-400 text-sm'/>
                                                :<CaretRightOutlined className='text-gray-400 text-sm'/>:
                                            <i className='w-1 h-1 bg-gray-400 rounded-full'/>
                                    }
                                    <div onClick={()=>findCategory(childItem)}>{childItem.name}</div>
                                  {/* <div>
                                       {
                                           mouseOverMenuId===childItem.id&&
                                           <div className='pl-52'>
                                               <div  onClick={()=>deletePop(childItem,2)}>
                                                   删除
                                               </div>
                                           </div>
                                       }
                                   </div>*/}
                                </div>
                                {
                                    childItem.childDocument&&isExpandedTree(childItem.id)&&childCatalogTree(childItem)
                                }
                            </div>
                        )
                    })
                }
        </div>
    }

    //文档详情
    const documentDetail=()=>{
        return(
            <div className='w-full p-6  max-w-screen-xl '>
                <Breadcrumb separator="/" className='border-b border-solid pb-4'>
                    <Breadcrumb.Item  href='#/setting/documentList'>{`${type==="document"?"文档管理":'目录管理'}`}</Breadcrumb.Item>
                    <Breadcrumb.Item href="">文档详情</Breadcrumb.Item>
                </Breadcrumb>
                <div className='w-full p-4' id='slate'>
                    <div className='flex items-center justify-between'>
                        <div className='w-96 text-xl py-2 pr-3'>{documentDetails.name}</div>
                        <div className='flex space-x-3'>
                            <div onClick={()=>skipCompileDocument(documentDetails)}  className='cursor-pointer text-blue-500'>编辑</div>
                            {type==="catalog"&&
                                <div className='cursor-pointer text-blue-500' onClick={()=>skipAddDocument(catalogDetails)} >
                                    添加内容
                                </div>
                            }
                        </div>

                    </div>
                    <div className='text-gray-400'>
                        创建时间: {documentDetails.createTime}
                    </div>
                    <div className='pt-6 bg-white'>
                        <PreviewEditor value={JSON.parse(documentDetails.details)}/>
                    </div>
                    {comment()}
                </div>
            </div>
        )
    }


    //评论
    const comment=()=>{
       return(
           <div  className='container mx-auto flex flex-col pt-12' >
               <div className='flex items-center justify-between w-full border-b-2  '>
                   <span className='px-4 font-bold text-base'>评论列表</span>
               </div>
               {
                   commentTree&& commentTree.map(item=>{
                           return(
                               <div key={item.id} className='p-2'>
                                   <div  className='flex items-center justify-between'>
                                       <div  className='flex items-center py-2 space-x-2'>
                                           <p className='text-base'>{item.member.name}</p>
                                           <p className='pl-2 text-base text-gray-400'>{item.createTime}</p>
                                       </div>
                                       <p className='  placeholder-gray-300' onClick={()=>deletePop(item,1)}>删除</p>
                                   </div>
                                   <div className='pl-3'>
                                       {item.details}
                                   </div>
                                   {/*子评论显示*/}
                                   {item.commentList&&childComment(item)}
                               </div>
                           )
                       }
                   )
               }
           </div>
       )
    }
    //子评论
    const childComment=(item)=>{
        return(
            <div className='bg-blue-50' >
                {item.commentList.map(secondItem=>{
                    return(
                        <div key={secondItem.id} className='m-4 '>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center space-x-4'>
                                    <p>{secondItem.member.name}</p>
                                    <p>回复 {secondItem.aimAtUser}</p>
                                    <p className='text-gray-400'>{secondItem.createTime}</p>
                                </div>
                                <p className='  placeholder-gray-300' onClick={()=>deletePop(secondItem,1)}>删除</p>
                            </div>
                            <div className='pl-3' >
                                {secondItem.details}
                            </div>
                        </div>
                    )
                })
                }
            </div>
        )
    }
    //通过文档id查询评论
    const findCommentByDocumentId=async (documentId)=>{
        const param={
            commentObjectId:documentId
        }
        const res=await documentService.findCommentTreePage(param)
        if (res.code===0){
            setCommentTree(res.data)
        }
    }
    //删除弹窗  type=1评论删除 type=2 目录删除  type=3 文档删除
    const deletePop=async (data,type)=>{
        confirm({
            title: '是否确定删除',
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            style:{top: 200} ,
            onOk() {
                deleteComment(data,type)
            },
            onCancel() {
            },
        });
    }
    //删除
    const deleteComment=async (data,type)=>{
        const param=new FormData();
        param.append('id',data.id)
        //删除评论
        if (type===1){
            const res =await documentService.deleteComment(param)
            if (res.code===0){
                await findCommentByDocumentId(data.commentObjectId)
            }
        }
        //删除目录
        if (type===2){
            const res =await documentService.deleteCategory(param)
            if (res.code===0){
                await findCategoryTree(repositoryDetails)
            }
        }
        //删除文档
        if (type===3){
            const res =await documentService.deleteDocument(param)
            if (res.code===0){
                await findCategoryTree(repositoryDetails)
            }
        }

    }


    return(
        <section className='w-full flex flex-row  '>
            <div className={' flex flex-col bg-gray-100 '}>
                <div className='flex items-center justify-between max-w-full  border-b-2 py-2 cursor-pointer relative pr-3'>
                    <div className='w-72 text-xl py-2 pr-3 '>
                        {repositoryDetails.name}
                    </div>
                        <span className='text-blue-600 cursor-pointer' onClick={()=>skipAddDocument(repositoryDetails)}>
                            <PlusOutlined className='pr-4 '/>
                        </span>
                    <Dropdown overlay={cutRepository}>
                        <MenuOutlined className='text-lg '/>
                    </Dropdown>
                </div>
                <div onMouseOut={leaveMouseNav} className={'  h-full'}>
                    <div className='m-auto  mx-6 pt-6 border-b  '>
                        <Input placeholder="搜索内容 "  size="middle" className='rounded-full' value={name} onChange={onInputName} onPressEnter={onSearch} bordered={false}/>
                    </div>
                    <div className='w-full pt-4'>
                        {catalogTree(documentTree)}
                    </div>
                </div>
            </div>
            <div className={'w-full p-6  max-w-screen-xl right-hight'}>
                {
                    documentDetails?
                    documentDetail():

                    <div className='w-full p-6  max-w-screen-xl '>
                        <Breadcrumb separator="/" className='border-b border-solid pb-4'>
                            <Breadcrumb.Item  href='#/setting/documentList'>文档管理</Breadcrumb.Item>

                        </Breadcrumb>
                        <section className='w-full m-auto border-solid border-2 p-6 mt-6 max-w-screen-xl text-center'>
                            还没有创建任何目录或文档
                            <span className='text-blue-600 cursor-pointer' onClick={()=>skipAddDocument(repositoryDetails)}> 创建</span>
                        </section>
                    </div>
                }


                {/*{
                categoryDataList.length>0||documentDataList.length>0
                    ?
                    state
                    ?categoryDetail()
                    :documentDetails
                    :<div className='w-full p-6  max-w-screen-xl '>
                        <Breadcrumb separator="/" className='border-b border-solid pb-4'>
                            <Breadcrumb.Item  href='#/setting/documentList'>文档管理</Breadcrumb.Item>
                            <Breadcrumb.Item href="">目录详情</Breadcrumb.Item>
                        </Breadcrumb>
                        <section className='w-full m-auto border-solid border-2 p-6 mt-6 max-w-screen-xl text-center'>
                            还没有创建任何目录或文档
                                <span className='text-blue-600 cursor-pointer' onClick={()=>repositorySkipDocument()}> 创建</span>
                        </section>
                    </div>
                }*/}
            </div>
        </section>
)
}

export default withRouter(Document)