/**
 * @name: featureDetail
 * @author: mahai
 * @date: 2021-07-14 16:08
 * @description：featureDetail
 * @update: 2021-07-14 16:08
 */
import React from 'react';
import {Row,Col} from "antd";
import { useTranslation } from 'react-i18next';

import BreadCrumb from "../../../../common/breadCrumb/breadCrumb";
import './featureDetail.scss';

const FeatureDetail = props => {
    const {data} = props;
    const {t} = useTranslation();
    const routes = [{
        disabled:true,
        breadcrumbName: '功能管理 '
    }, {
        path: 'first',
        breadcrumbName: '功能详情'
    }];

    return(
        <div className={'privilege-detail'}>
            <BreadCrumb{...props} routes={routes}/>
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


export default FeatureDetail;
