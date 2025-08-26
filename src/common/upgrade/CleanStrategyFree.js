/**
 * @name: CleanStrategyFree
 * @author: limingliang
 * @date: 2025-04-27 16:51
 * @description：仓库清理策略付费功能提示
 * @update: 2025-04-27 16:51
 */
import React, { useState } from "react";
import { Modal, Button } from 'antd';
import "./ScanCodeFree.scss";
import repClean from "../../assets/images/img/rep-clean.png";
import {applySubscription} from "tiklab-core-ui";

const CleanStrategyFree = (props) => {
    const { visible, setVisible } = props;


    const goConsultBuy = () => {
        window.open(`https://tiklab.net/contactus`)
    }

    const goBuy = () => {
        applySubscription("hadess")
    }

    return <Modal
        width={900}
        height={500}
        footer={null}
        visible={visible}
        className="statistics-free-modal"
        onCancel={() => setVisible(false)}
    >
        <div className="statistics-free">
            <div className="statistics-free-introduce">
                <div className="statistics-title">清理策略</div>
                <div>
                    付费版本专属功能
                </div>
                <div className="statistics-desc">
                    功能列表
                </div>

                <div className="statistics-desc-box">
                    <div>自定义清理策略</div>
                    <div>支持手动清理制品</div>
                    <div>支持定时清理制品</div>
                </div>

                <Button type="primary" size={"middle"} block onClick={() => goConsultBuy()}>
                    咨询购买
                </Button>
                <div className='buy-text' onClick={() => goBuy()}>
                    立即购买
                </div>
            </div>
            <div className="statistics-free-image">
                <div>
                    <img src={repClean} alt="" width={"100%"} />
                </div>
            </div>
        </div>
    </Modal>
}

export default CleanStrategyFree;
