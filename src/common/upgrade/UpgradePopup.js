import React,{useState,useEffect} from 'react';
import Modals from "../../common/modal/Modal";
import Btn from "../btn/Btn";
import upgrade from "../../assets/images/img/upgrade.png"
import "./UpgradePopup.scss"
const UpgradePopup = (props) => {
    const {visible,setVisible}=props


    //取消编辑弹窗
    const  cancel = () => {
        setVisible(false)
    }

    const onOk = () => {
        window.open(`https://thoughtware.cn/account/subscribe/apply/hadess`)
    }

    const modalFooter = (
        <>
            <Btn onClick={cancel} title={'取消'} isMar={true}/>
            <Btn onClick={onOk} title={'购买'} type={'primary'}/>
        </>
    )

    return(
        <Modals
            open={visible}
            onCancel={cancel}
            closable={false}
            footer={modalFooter}
            destroyOnClose={true}
            width={500}
            title={'制品扫描'}
        >
            <div className='upgrade'>
                <div className='upgrade-icon'>
                    <img  src={upgrade}  style={{width:140,height:140}}/>
                </div>
                <div className='upgrade-text'>如需使用制品扫描，请购买企业版Licence</div>
            </div>
        </Modals>

    )
}
export default UpgradePopup
