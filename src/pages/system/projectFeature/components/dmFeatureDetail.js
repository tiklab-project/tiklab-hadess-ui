/**
 * @name: dmFeatureDetail
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：权限中心 项目域下的功能详情
 * @update: 2021-05-06 15:19
 */
import React from 'react';
import { useTranslation } from 'react-i18next'
import {Row,Col} from "antd";
import {BreadCrumb} from "../../../../common";
import './dmFeatureDetail.scss';


const DmFeatureDetail = props => {
    const {t} = useTranslation();
    const {data} = props
    const routes = [{
        disabled:true,
        breadcrumbName: '功能管理 '
    }, {
        path: 'first',
        breadcrumbName: '功能详情'
    }];
    return(
        <div className={'privilege-detail'}>

            <BreadCrumb
                {...props}
                routes={routes}
            />
            <div className={'privilege-detail-content'}>
                <Row>
                    <Col span={6}>
                        <div className={'privilege-detail-content-item'}>
                            <label>{t('privilege-feature-name')}:</label>
                            <span>{data.name}</span>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <div className={'privilege-detail-content-item'}>
                            <label>{t('privilege-feature-code')}:</label>
                            <span>{data.code}</span>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}


export default DmFeatureDetail
