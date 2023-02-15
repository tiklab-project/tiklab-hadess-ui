/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 李明亮
 * @Date: 2023-01-03 19:56:02
 * @LastEditors: 李明亮
 * @LastEditTime: 2023-01-03 19:56:02
 */
import React from "react";
import { DomainRoleList } from 'tiklab-privilege-ui';
import { inject, observer } from "mobx-react";

const ProgramDomainRole = props => {
    const programId = props.match.params.id;
    console.log(programId)
    return (
        <div>
            <DomainRoleList
                {...props}
                domainId={programId}
                bgroup = {"xpack"}
            />
        </div>
           
        
    )
}
export default inject("privilegeDomainRoleStore")(observer(ProgramDomainRole)) ;