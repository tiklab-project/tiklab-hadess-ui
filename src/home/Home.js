/**
 * @name: Home
 * @author: limingliang
 * @date: 2022-11-07 17:56
 * @description：Home
 * @update: 2022-11-07 17:56
 */
import React from "react";
import {connect} from "tiklab-plugin-core-ui";
import {AppLink} from "tiklab-licence-ui";
import Layout from "../common/layout/layout";
import {UserVerify} from "tiklab-eam-ui";
const Home = (props) => {
    return <Layout {...props} AppLink={<AppLink isSSO={false}/>}/>

}
function mapStateToProps(state) {
    return {
        pluginStore: state.pluginStore
    }
}

export default connect(mapStateToProps)(UserVerify(Home,"/no-auth"))
