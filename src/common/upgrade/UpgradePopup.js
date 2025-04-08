import React,{useState,useEffect} from 'react';
import Modals from "../../common/modal/Modal";
import Btn from "../btn/Btn";
import upgrade from "../../assets/images/img/upgrade.png"
import "./UpgradePopup.scss"
const UpgradePopup = (props) => {
    const {visible,setVisible,title,data}=props


    //取消编辑弹窗
    const  cancel = () => {
        setVisible(false)
    }

    const onOk = () => {
        window.open(`https://tiklab.net/account/subscribe/apply/hadess`)
    }

    const modalFooter = (
        <>
            <Btn onClick={cancel} title={'取消'} isMar={true}/>
            <Btn onClick={onOk} title={'购买'} type={'primary'}/>
        </>
    )

    return(
        <Modals
            visible={visible}
            onCancel={cancel}
            closable={false}
            footer={modalFooter}
            destroyOnClose={true}
            width={500}
            title={title}
        >
            <div className='upgrade'>
                <div className='upgrade-icon'>
                    <img  src={upgrade}  style={{width:140,height:140}}/>
                </div>
                <div className='upgrade-text'>{data}</div>
            </div>
        </Modals>

    )
}
export default UpgradePopup
