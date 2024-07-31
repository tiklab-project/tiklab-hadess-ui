/**
 * @name: OmitFiled
 * @author: limingliang
 * @date: 2023-09-04 10:30
 * @description：省略字段
 * @update: 2023-09-04 10:30
 */

import React from "react";
import {Tooltip} from "antd";
const OmitFiled = (props) => {
    const {value}=props

    return(
        <div>
            {
                value?.length>20?
                    <Tooltip placement="right" title={value}>
                        <div style={{
                            display:"flex",
                            overflow: "hidden",
                            maxWidth:"300px",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap"
                        }} >{value}</div>
                    </Tooltip>
                    :
                    <div  >{value}</div>
            }
        </div>
    )
}
export default OmitFiled
