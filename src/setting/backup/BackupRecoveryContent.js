import React,{useEffect} from 'react';
import {BackupRestore} from 'tiklab-security-ui';
import {inject, observer} from "mobx-react";

/**
 * 备份与恢复
 */
const BackupRecoveryContent = (props) => {

    return (
        <BackupRestore
            {...props}
        />
    )
}


export default observer(BackupRecoveryContent)
