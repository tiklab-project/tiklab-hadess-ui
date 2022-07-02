
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
import CreateOrUpdateCategory from "./popup/createOrUpdateCategory";
//import PreviewEditor from "../../common/editSlate/previewEditor";
import {PreviewEditor} from 'doublekit-slate-ui'
const { TextArea } = Input;
const { confirm } = Modal;
import './scss/document.scss'

const Document = props => {
    const repositorys=props.history.location.params
    const [categoryDataList, setCategoryDataList] = useState([]);  //目录树详情
    const [documentDataList,setDocumentDataList]=useState([]);  //文档list
    const [expand, setExpand] = useState(false);  // 鼠标移动到导航栏哪一个
    const [mouseOverMenuId,setMouseOverMenuId]=useState('')  //鼠标移动到左侧目录栏的哪一个

    const [expandedTree, setExpandedTree] = useState([])  //目录树 展开的id
    const [repositoryData,setRepositoryData]=useState('') //文档空间数据
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
        setRepositoryData(repository)
        await findCategoryTree(repository,1)
        await findRepository()

    },[])

    //查询所有空间
    const findRepository=async ()=>{
        const res=  await documentService.findAllRepository()
        if (res.code===0){
            setRepository(res.data)
        }
    }
    //查询目录树  type（创建或修改目录后不需要在查询文档）
    const findCategoryTree=async (repository,type)=>{
        const param={
            repositoryId:repository.id
        }
        const res=await documentService.findCategoryListTree(param)
        if (res.code===0){
            setDocumentDataList(res.data.document)
            setCategoryDataList(res.data.category)
            //第一次默认打开第一个文档
            if (res.data.document&&type){
                await findDocument(res.data.document[0])
                await findCommentByDocumentId(res.data.document[0].id)
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
    const  cutRepositoryData=async (repositoryData)=>{
       await findCategoryTree(repositoryData)
        setRepositoryData(repositoryData)
    }


    //添加查询内容
    const onInputName=(e)=>{
        const value = e.target.value;
        setName(value)
    }
    //模糊查询查询
    const onSearch=async ()=>{
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
    //这是在目录下面打开的创建
    const categoryMenu = (
        <Menu >
            <Menu.Item  onClick={()=>CategoryOpenPopup()} >
                添加目录
            </Menu.Item>
            <Menu.Item onClick={()=>CategorySkipDocument()}>
                添加文档
            </Menu.Item>
        </Menu>
    );
    //这是在空间下面打开的创建
    const repositoryMenu = (
        <Menu >
            <Menu.Item  onClick={()=>repositoryOpenCategoryPopup()} >
                添加目录
            </Menu.Item>
            <Menu.Item onClick={()=>repositorySkipDocument()}>
                添加文档
            </Menu.Item>
        </Menu>
    );
    //空间下面打开创建目录的弹窗
   const repositoryOpenCategoryPopup= ()=>{
       setParentCategoryId(null)
       openCreatCategoryPopup()
   }
   //目录下面打开创建目录弹窗
    const CategoryOpenPopup=()=>{
        setParentCategoryId(categoryData.id)
        openCreatCategoryPopup()
    }
    //打开创建目录弹窗
    const openCreatCategoryPopup=()=>{
        setVisible(true)
    }

    //空间下面跳转文档页面
    const repositorySkipDocument=()=>{
        skipAddDocument(repositoryData)
    }
    //目录下面跳转添加文档界面
    const CategorySkipDocument=()=>{
        skipAddDocument(categoryData)
    }
    //跳转添加文档页面
    const skipAddDocument=(data)=>{
        props.history.push({
            pathname:"/setting/document/addDocument",
            params:data
        });
    }
    //跳转修改u文档页面
    const skipUpdateDocument=(data)=>{
        props.history.push({
            pathname:"/setting/document/updateDocument",
            params:data
        });
    }
    //取消创建弹窗
    const onCancel = async () => {
        setVisible(false)
    }
    //确认弹窗
    const onOK=async (parentCategoryId)=>{
        setVisible(false)
        await findCategoryTree(repositoryData)

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
    const openOrCloseTree=(key)=>{
        if (isExpandedTree(key)) {
            setExpandedTree(expandedTree.filter(item => item !== key))
        } else {
            setExpandedTree(expandedTree.concat(key));
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

    //目录文档展示
    const document=(value,type)=>{
        return <div >
            {
                value&&value.map(documentItem=>{
                    return(
                        <div  key={documentItem.id} className='pt-1'  >
                            {
                                !type? <div className={`flex  justify-between  ${highlightId===documentItem.id?"aside-select":null}`}  onClick={()=>findDocument(documentItem)} onMouseOver={()=>mouseOverId(documentItem.id)}>
                                    <div className='flex items-center '>
                                        <FileOutlined/>
                                        <div className='hover:text-blue-400' >{documentItem.name}</div>
                                    </div>
                                    <div>
                                        {
                                            mouseOverMenuId===documentItem.id&&
                                            <div>
                                                <div onClick={()=>deletePop(documentItem,3)}>
                                                    删除
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                                    :
                                    <div  onClick={()=>findDocument(documentItem)}>
                                        <div className='flex items-center '>
                                            <FileOutlined/>
                                            <div className='hover:text-blue-400' >{documentItem.name}</div>
                                        </div>
                                    </div>
                            }
                        </div>
                    )
                })
            }
        </div>
    }
    //第一级目录树
    const categoryTree=(value,documentDataList)=>{
        return(
            <div className='pl-7 cursor-pointer'>
                {documentDataList&&document(documentDataList)}
                {value&&value.map(item=>{
                        return(
                            <div key={item.id} className='pt-1'>
                                <div  className={`flex  justify-between ${highlightId===item.id?"aside-select":null}`}  onMouseOver={()=>mouseOverId(item.id)}  onClick={()=>openOrCloseTree(item.id)}>
                                    <div className='flex items-center'>
                                        {
                                            isExpandedTree(item.id)
                                                ?<CaretDownOutlined />
                                                :<CaretRightOutlined/>
                                        }
                                        <div onClick={()=>findCategory(item)}>{item.name}</div>
                                    </div>
                                    <div>
                                        {
                                            mouseOverMenuId===item.id&&
                                            <div className='pl-60' >
                                                <div onClick={()=>deletePop(item,2)}>
                                                    删除
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                                {isExpandedTree(item.id)&&categorySecondTree(item)}
                            </div>
                        )
                    }
                )
                }

            </div>
            )

    }
    //二级及以下目录 （能打开的）
    const categorySecondTree=(item)=>{
        return <div className='pl-4  pt-1'>
            <div>
                {
                    item.children&&item.children.map(twoItem=>{
                        return(
                            <div  key={twoItem.id} className='pt-1'>
                                <div className={`flex  justify-between ${highlightId===twoItem.id?"aside-select":null}`}  onMouseOver={()=>mouseOverId(twoItem.id)} onClick={()=>openOrCloseTree(twoItem.id)} >
                                    <div className='flex items-center'>
                                        {
                                            isExpandedTree(twoItem.id)
                                                ?< CaretDownOutlined/>
                                                :<CaretRightOutlined/>
                                        }
                                        <div onClick={()=>findCategory(twoItem)}>{twoItem.name}</div>
                                    </div>
                                   <div>
                                       {
                                           mouseOverMenuId===twoItem.id&&
                                           <div className='pl-52'>
                                               <div  onClick={()=>deletePop(twoItem,2)}>
                                                   删除
                                               </div>
                                           </div>
                                       }
                                   </div>
                                </div>
                                {
                                    twoItem.children&&!isExpandedTree(twoItem.id)&&categorySecondTree(twoItem)
                                }
                            </div>
                        )
                    })
                }
            </div>
            {document(item.documents)}
        </div>
    }
    //目录详情
    const categoryDetail=()=>{
        return(
            <div className='w-full p-6  max-w-screen-xl '>
                <Breadcrumb separator=">" className='border-b border-solid pb-4'>
                    <Breadcrumb.Item  href='#/setting/document'>文档管理</Breadcrumb.Item>
                    <Breadcrumb.Item href="">目录详情</Breadcrumb.Item>
                </Breadcrumb>
                <div className='flex items-center  border-b border-solid pb-4 pt-4 text-center ' >
                   <h2 className='w-1/2 text-2xl text-right' >{categoryData.name}</h2>
                    <div className='cursor-pointer w-1/2'>
                        <Dropdown  overlay={categoryMenu}  >
                            <span onClick={e => e.preventDefault()}>添加内容</span>
                        </Dropdown>
                    </div>
                </div>
                <div className=' pt-3 w-1/2'>
                    {categoryDetails(categoryData)}
                </div>
            </div>
        )
    }
    //目录下面的目录（只展示 不能打开）
    const categoryDetails=(item)=>{
        return <div className='pl-4  pt-1'>
            <div>
                {
                    item.children&&item.children.map(twoItem=>{
                        return(
                            <div  key={twoItem.id}>
                                <div className='flex  pt-1 justify-end' >
                                    <div >{twoItem.name}</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {document(item.documents,1)}
        </div>
    }
    //文档详情
    const documentDetails=()=>{
        return(
            <div className='w-full p-6  max-w-screen-xl '>
                <Breadcrumb separator=">" className='border-b border-solid pb-4'>
                    <Breadcrumb.Item  href='#/setting/documentList'>文档管理</Breadcrumb.Item>
                    <Breadcrumb.Item href="">文档详情</Breadcrumb.Item>
                </Breadcrumb>
                <div className='w-full p-4' id='slate'>
                    <div className='flex items-center justify-between'>
                        <div className='w-96 text-xl py-2 pr-3'>{documentData.name}</div>
                        <div onClick={()=>skipUpdateDocument(documentData)}>编辑</div>
                    </div>

                    <div className='text-gray-400'>
                        创建时间: {documentData.createTime}
                    </div>
                    <div className='pt-6 bg-white'>
                         {documentData.details&&
                            <PreviewEditor
                                value={documentData.details}
                            />}
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
                                       <p className='text-base  placeholder-gray-400' onClick={()=>deletePop(item,1)}>删除</p>
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
                                <p className='text-base  placeholder-gray-400' onClick={()=>deletePop(secondItem,1)}>删除</p>
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
                await findCategoryTree(repositoryData)
            }
        }
        //删除文档
        if (type===3){
            const res =await documentService.deleteDocument(param)
            if (res.code===0){
                await findCategoryTree(repositoryData)
            }
        }

    }

    return(
        <section className='w-full flex flex-row'>
            <div className={' flex flex-col  pl-6'}>
                <div className='flex items-center justify-between max-w-full  border-b-2 py-2 cursor-pointer relative pr-3'>
                    <div className='w-96 text-xl py-2 pr-3'>
                        {repositoryData.name}
                    </div>
                    <Dropdown overlay={repositoryMenu}>
                        <span className='text-blue-600 cursor-pointer' onClick={e => e.preventDefault()}>
                            <PlusOutlined className='pr-4 '/>
                        </span>
                    </Dropdown>
                    <Dropdown overlay={cutRepository}>
                        <MenuOutlined className='text-lg '/>
                    </Dropdown>
                </div>
                <div onMouseOut={leaveMouseNav} className={' bg-gray-100'}>
                    <div className='m-auto pb-6 px-4 pt-6'>
                        <Input placeholder="搜索内容" size="large" className='rounded-full' value={name} onChange={onInputName} onPressEnter={onSearch}/>
                    </div>
                    <div className='w-full ' onMouseOut={removeOverId}>
                        {categoryTree(categoryDataList,documentDataList)}
                    </div>
                </div>
            </div>
            <div className={'w-full p-6  max-w-screen-xl right-hight'}>
                {
                categoryDataList.length>0||documentDataList.length>0
                    ?
                    state
                    ?categoryDetail()
                    :documentDetails()
                    :<div className='w-full p-6  max-w-screen-xl '>
                        <Breadcrumb separator=">" className='border-b border-solid pb-4'>
                            <Breadcrumb.Item  href='#/setting/document'>文档管理</Breadcrumb.Item>
                            <Breadcrumb.Item href="">目录详情</Breadcrumb.Item>
                        </Breadcrumb>
                        <section className='w-full m-auto border-solid border-2 p-6 mt-6 max-w-screen-xl text-center'>
                            还没有创建任何目录或文档
                            <Dropdown overlay={repositoryMenu}>
                                <span className='text-blue-600 cursor-pointer' onClick={e => e.preventDefault()}> 创建</span>
                            </Dropdown>
                        </section>
                    </div>
                }
            </div>
            <CreateOrUpdateCategory visible={visible} onCancel={onCancel} onOk={onOK} editData={editData}
                                    repository={repositoryData} categoryData={categoryData} parentCategoryId={parentCategoryId}/>
        </section>
)
}

export default withRouter(Document)