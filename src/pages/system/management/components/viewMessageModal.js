/**
 * @name: sendModal
 * @author: mahai
 * @date: 2021-05-06 15:19
 * @description：显示消息弹窗
 * @update: 2021-05-06 15:19
 */

import React from 'react';
import {Col, Row, Modal, Input, Button, Tabs, Table} from "antd";
import {useTranslation} from "react-i18next";
import './viewMessageModal.scss';
const { TextArea } = Input;
const { TabPane } = Tabs;


const ViewMessageModal = props => {
    const { t } = useTranslation();
    const {visible, onCancel, data, } = props;

    const columns = [
        {
            title: t('tiklab-message-management-detail-tab-table-title'),
            dataIndex: ['receiver', 'name'],
        },
        {
            title: t('tiklab-message-management-detail-tab-table-phone'),
            dataIndex: 'receiverContact',
        },
        {
            title: t('tiklab-message-table-action'),
            dataIndex: 'action',
            key: 'action',
            // render: (text, record) => (
            //     <Space size="middle">
            //         <a onClick={() => onRemove(record.id)}>{t('tiklab-message-delete')}</a>
            //     </Space>
            // )
        },
    ];

    /**
     * 弹窗取消事件
     */
    const handleCancel = () => {
        onCancel()
    };
    return(
        <Modal
            visible={visible}
            closable={false}
            title={t("tiklab-message-modal-title")}
            width={1200}
            footer={[
                <Button key="submit" type="primary" onClick={handleCancel}>
                    {t("message-table-cancel")}
                </Button>,
            ]}
        >
            <Row className='padding-8'>
                <Col span={2} style={{textAlign:'right', marginRight:'10px'}}>
                    <label>消息标题:</label>
                </Col>
                <Col span={16}>
                    {data.messageTemplate && data.messageTemplate.title}
                </Col>
            </Row>
            {/*<Row className='padding-8'>*/}
            {/*    <Col span={2} style={{textAlign:'right', marginRight:'10px'}}>*/}
            {/*        <label>业务类型:</label>*/}
            {/*    </Col>*/}
            {/*    <Col span={16}>*/}
            {/*        {data.messageTemplate && data.messageTemplate.msgType.name}*/}
            {/*    </Col>*/}
            {/*</Row>*/}
            <Row className='padding-8'>
                <Col span={2} style={{textAlign:'right', marginRight:'10px'}}>
                    <label>发送者:</label>
                </Col>
                <Col span={16}>
                    {data.sender && data.sender.name}
                </Col>
            </Row>
            <Row className='padding-8'>
                <Col span={2} style={{textAlign:'right', marginRight:'10px'}}>
                    <label>接收时间:</label>
                </Col>
                <Col span={16}>
                    {data.receiveTime}
                </Col>
            </Row>
            <Row className='padding-8'>
                <Col span={2} style={{textAlign:'right', marginRight:'10px'}}>
                    <label>消息内容:</label>
                </Col>
                <Col span={16}>
                    <TextArea
                        value={data.data}
                        autoSize={{ minRows: 3, maxRows: 5 }}
                        disabled
                    />
                </Col>
            </Row>
            <Row >
                <Col span={24} >
                    <div className="card-container">
                        <Tabs type="card">
                            <TabPane tab={t('tiklab-message-management-detail-tab-table-title')} key="1">
                                <Row>
                                    <Col span={24}>
                                        <Table
                                            columns={columns}
                                            dataSource={data.messageReceiverList || []}

                                            rowKey={r => r.id}
                                            tableLayout="fixed"
                                        />
                                    </Col>
                                </Row>
                            </TabPane>
                        </Tabs>
                    </div>
                </Col>
            </Row>
        </Modal>
    )
}


export default ViewMessageModal
