/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: limingliang
 * @Date: 2021-03-05 17:06:32
 * @LastEditors: limingliang
 * @LastEditTime: 2022-01-18 09:20:30
 */
import React from "react";
import { DomainRole } from 'tiklab-privilege-ui';
import { inject, observer } from "mobx-react";

const ProjectDomainRole = props => {
    const projectId = props.match.params.id;

    return (
        <DomainRole
            {...props}
            domainId={projectId}
            bgroup = {"hadess"}
        />
    )
}

export default inject("privilegeDomainRoleStore")(observer(ProjectDomainRole));
