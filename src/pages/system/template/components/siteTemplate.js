/**
 * @name: siteTemplate
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：站点模板
 * @update: 2021-05-06 15:19
 */

import React from 'react';
import {Col, Row} from "antd";
import {Axios} from 'tiklab-core-ui';

import './siteTemplate.scss'

// TODO 在string 原型链上添加序列化json数据格式方法
String.prototype.render = function(context) {
    if (!context) return
    const tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;
    return this.replace(tokenReg, function (word, slash1, token, slash2) {
        if (slash1 || slash2) {
            return word.replace('\\', '');
        }

        const variables = token.replace(/\s/g, '').split('.');
        let currentObject = context;
        let i, length;

        for (i = 0, length = variables.length; i < length; ++i) {
            currentObject = currentObject[variables[i]];
            if (currentObject === undefined || currentObject === null) return '';
        }
        return currentObject;
    });
}
const SiteTemplate = props => {
    const {id, title, status, content, receiveTime, replaceData, messageLink = '', history,match}= props;
    // TODO 显示数据内容
    const showContent = replaceData => {
        // TODO 调用原型链上添加序列化json数据格式方法
        return content.render(replaceData)
    }

    // TODO 处理消息链接的数据
    const handelMessageLink =  replaceData => {
        // TODO 调用原型链上添加序列化json数据格式方法
        return messageLink.render(replaceData)
    }


    const handelStatus = async () => {
        if (id && status !== 10) {
            const params = {
                id,
                status:10
            }
            const response = await Axios.post('/messageDispatchItem/updateMessageDispatchItem', params, match.params.tenant);
            if (!response.code) {
                const link = handelMessageLink(replaceData)
                history.push(link)
            }
        } else {
            const link = handelMessageLink(replaceData)
            if (link) history.push(link)
        }
    }
    return(
        <div id='site-template-message' onClick={handelStatus}>
            <div className='site-template-item'>
                <Row>
                    <Col>
                        <h3>{title}</h3>
                    </Col>
                    <Col offset={1}>
                        <h3>{status === 0 ? "未读" : "已读"}</h3>
                    </Col>
                </Row>
                <Row>

                    <Col span={24}>
                        <div className='site-template-item-content' dangerouslySetInnerHTML={{ __html: showContent(replaceData) }}></div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className='site-template-item-date'>日期：{receiveTime || '--'}</div>
                    </Col>
                </Row>
            </div>
        </div>

    )
};


export default SiteTemplate
