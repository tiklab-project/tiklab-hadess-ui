/**
 * @name: PlugList
 * @author: limingliang
 * @date: 2022-10-20 14:48
 * @description：插件列表
 * @update: 2022-10-20 14:48
 */
import {withRouter} from "react-router";
import React, {useState, useEffect,useCallback} from "react";
import {Breadcrumb, Row, Col, Input, Button, Table, Space, Modal} from "antd";
const PlugList = (props) => {

    const addPlug = () => {

    }
    return(
        <section className='w-full flex flex-row'>
            <div className='w-full p-6 max-w-full m-auto'>
                <Breadcrumb separator=">" className='border-b border-solid pb-4'>
                    <Breadcrumb.Item>插件管理 </Breadcrumb.Item>
                    <Breadcrumb.Item href=""> 插件列表</Breadcrumb.Item>
                </Breadcrumb>
                <Row gutter={[16, 16]} className='py-6'>
                    <Col span={10} offset={8} className='flex justify-end'>
                        <Button type="primary" onClick={addPlug}>添加插件</Button>
                    </Col>
                </Row>
            </div>
        </section>
    )
}
export default PlugList