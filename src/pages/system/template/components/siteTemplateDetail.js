/**
 * @name: siteMessageDetail
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：站点模板详情
 * @update: 2021-05-06 15:19
 */

import React, {useEffect} from 'react';
import {Col, Row} from "antd";
import { withRouter } from "react-router";

import './siteTemplateDetail.scss'


const SiteMessageDetail = props => {
    const { match } = props;
    const {params} = match;
    useEffect(() => {
        getWebSiteInfo(params.id)
    }, [params]);
    const getWebSiteInfo = (id) => {

    }
    return(
        <div id='site-template-message-detail'>
            <Row justify={'center'} style={{width:'100%'}}>
                <Col xl={{span:16}} lg={{span:24}}>
                </Col>
            </Row>
        </div>

    )
};

const SiteTemplateDetail = withRouter(SiteMessageDetail);
export default SiteTemplateDetail;


