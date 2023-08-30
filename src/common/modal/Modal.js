import React,{useState,useEffect} from 'react';
import {Modal} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import {autoHeight} from "../client/Client";
import Btn from "../btn/Btn";
import "./Modal.scss";

/**
 * 弹出框
 * @param props
 * @constructor
 */
const Modals = props => {

    const {title,children,width,...res} = props

    const [height,setHeight] = useState(0)

    useEffect(()=>{
        setHeight(autoHeight())
        return ()=>{
            window.onresize = null
        }
    },[height])

    window.onresize=() =>{
        setHeight(autoHeight())
    }

    return (
        <Modal
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
        </Modal>
    )

}

export default Modals