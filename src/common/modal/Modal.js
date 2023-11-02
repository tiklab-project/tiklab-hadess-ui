/**
 * 弹出框
 * @param props
 * @constructor
 */
import React,{useState,useEffect} from 'react';
import {Modal} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import {autoHeight} from "../client/Client";
import Btn from "../btn/Btn";
import "./Modal.scss";

const Modals = props => {

    const {title,children,width,footer,...res} = props

    const [height,setHeight] = useState(0)

    useEffect(()=>{
        setHeight(autoHeight())
        return ()=>{
            window.onresize = null
        }
    },[height])

    const style = {
        maxWidth: 'calc(100vw - 120px)',
        maxHeight: 'calc(100vh - 120px)',
        marginRight: 'auto',
        marginLeft: 'auto',
        position: 'absolute',
        top: 60,
        right: 0,
        left: 0,
        height:'100%',
        display:"flex",
        flexDirection: 'column'
    }

    window.onresize=() =>{
        setHeight(autoHeight())
    }

    const modalFooter = (
        <>
            <Btn onClick={res.onCancel} title={"取消"} isMar={true}/>
            <Btn onClick={res.onOk} title={"确定"} type={"primary"}/>
        </>
    )

    return (

        <Modal
            title={title}
            width={width}
            style={style}
            wrapClassName={'tiklab_modal'}
            closable={false}
            footer={footer || modalFooter}
            {...res}
        >
            {children}
        </Modal>
     /*   <Modal
            style={{height:height,top:60}}
            bodyStyle={{padding:0}}
            width={width}
            {...res}
        >
            <div className='xpack-modal'>
                <div className='xpack-modal-up'>
                    <div>{title}</div>
                    <Btn
                        title={<CloseOutlined style={{fontSize:16}}/>}
                        type="text"
                        onClick={res.onCancel}
                    />
                </div>
                <div className='xpack-modal-content'>
                    {children}
                </div>
            </div>
        </Modal>*/
    )

}

export default Modals
