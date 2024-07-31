/**
 * @name: DeleteExec
 * @author: limingliang
 * @date: 2022-12-30 10:30
 * @description：删除制品操作
 * @update: 2022-12-30 10:30
 */
import React ,{Fragment}from "react";
import {Dropdown, Menu, Modal} from "antd";
const { confirm } = Modal;
import {EllipsisOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import libraryStore from "../../library/store/LibraryStore";
import {observer} from "mobx-react";
const DeleteExecLibrary = (props) => {

    const {deleteLibrary,deleteLibraryVersion}=libraryStore

    const {value}=props

    /**
     * 删除下拉
     */
    const DeletePullDown=() => (
        <Menu>
            <Fragment>
                <Menu.Item onClick={()=>DeletePop("current","确认删除版本")}>
                    删除当前版本
                </Menu.Item>
                <Menu.Item onClick={()=>DeletePop("all","确认删除所有版本")}>
                    删除所有版本
                </Menu.Item>
            </Fragment>
        </Menu>
    );

    //删除弹窗
    const  DeletePop = (type,title) =>{
        confirm({
            title: title,
            icon: <ExclamationCircleOutlined />,
            /* content: content,*/
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',

            onOk() {
              execDelete(type)
            },
            onCancel() {
            },
        });
    }

    //删除操作
    const execDelete = (type) => {
        if (type==='all'){
            deleteLibrary(value.id)
        }else {
            //删除当前版本
            deleteLibraryVersion(value.versionId,value.id)
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
export default observer(DeleteExecLibrary)
