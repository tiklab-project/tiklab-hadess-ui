/**
 * @name: DeleteExec
 * @author: limingliang
 * @date: 2022-12-30 10:30
 * @description：删除操作
 * @update: 2022-12-30 10:30
 */
import React from "react";
import {Dropdown, Menu, Modal} from "antd";
const { confirm } = Modal;
import {EllipsisOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import "./DeleteExec.scss"
const DeleteExec = (props) => {

    const {value ,deleteData,title,type,findRepositoryByProxyId,schemeId}=props


    /**
     * 删除下拉
     */
     const DeletePullDown=(value) => (
        <Menu>
            <Menu.Item onClick={verify} className='delete-exec'>
                删除
            </Menu.Item>
        </Menu>
    );

     //校验
     const verify = () => {
         //类型为代理地址
         if (type==='agency'){
             findRepositoryByProxyId(value.id).then(res=>{
                 if (res.code===0&&res.data.length>0){
                     DeletePop("存在关联的仓库,请先去仓库移除关联",res.data)
                 }else {
                     DeletePop(title)
                 }
             })
         }
         if (type!=='scanLibrary'&&type!=='agency'){
             DeletePop(title)
         }
     }

   //删除弹窗
    const  DeletePop = (title,content) =>{
        confirm({
            title: title,
            icon: <ExclamationCircleOutlined />,
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',

            onOk() {
                !content? execDelete():null
            },
            onCancel() {
            },
        });
    }

    //删除操作
    const execDelete = () => {
        switch (type){
            case "scanRecord":
                deleteData(value.scanGroup)
                break
            case "schemeHole":
                deleteData(value.id,schemeId)
                break
            default  :
                deleteData(value.id)
        }
    }


    return(
        <Dropdown   overlay={()=>DeletePullDown(value)}
                    placement="bottomRight"
                    trigger={['click']}
        >
            <EllipsisOutlined style={{fontSize:18}} />
        </Dropdown>
    )
}
export default DeleteExec





