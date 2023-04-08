/**
 * @name: ProgramDomainRole
 * @author: limingliang
 * @date: 2022-08-09 14:30
 * @description：权限
 * @update: 2021-08-09 14:30
 */
import React from "react";
import { DomainRole } from 'tiklab-user-ui';
import { inject, observer } from "mobx-react";
import { Row, Col } from "antd";

const ProgramDomainRole = props => {
    const programId = props.match.params.id;

    return (
        <Row>
            <Col lg={{ span: 24 }} xxl={{ span: "18", offset: "3" }}>
                <DomainRole
                    {...props}
                    domainId={programId}
                    bgroup = {"xpack"}
                />
            </Col>
        </Row>
    )
}
export default inject("privilegeDomainRoleStore")(observer(ProgramDomainRole)) ;
