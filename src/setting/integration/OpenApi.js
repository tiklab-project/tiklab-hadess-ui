import React from "react";
import {AccessToken} from 'tiklab-openapi-ui';


const OpenApi = (props) => {

    return (
        <div style={{flex:"1",height:"100%"}}>
            <AccessToken
                {...props}
                //tiklab-postin-client-ui组件OpenApiDocPage的路由
                postInOpenApiPath={'/openApi'} //必填
            />
        </div>



    )

}

export default OpenApi
