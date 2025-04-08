/**
 * @name: Home
 * @author: limingliang
 * @date: 2022-11-07 17:56
 * @description：Home
 * @update: 2022-11-07 17:56
 */
import React from "react";
import FirstNav from "../common/navigation/FirstNav"
import {UserVerify} from "tiklab-eam-ui";
import Portals from "./Portals";
import {AppLink,HelpLink,AvatarLink} from "tiklab-licence-ui";
const Home = (props) => {
    return <Portals
                {...props}
                FirstNav={<FirstNav {...props}
                                    AppLink={AppLink}
                                    HelpLink={HelpLink}
                                    AvatarLink={AvatarLink}
                />}
            />

}


export default UserVerify(Home,"/no-auth")
