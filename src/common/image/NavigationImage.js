import React, {useEffect, useState} from "react";
import "./NavigationImage.scss"
import library_white from "../../assets/images/img/library-white.png";
import library_black from "../../assets/images/img/library-black.png";

import repository_white from "../../assets/images/img/repository-white.png";
import repository_black from "../../assets/images/img/repository-black.png";

import goBack_black from "../../assets/images/img/goBack-black.png"
import goBack_white from "../../assets/images/img/goBack-white.png"

import message_black from "../../assets/images/img/message-black.png"
import message_white from "../../assets/images/img/message-black.png"

import {observer} from "mobx-react";
const NavigationImage = (props) => {
    const {theme,icon,type}=props

    const [imgPath,setImagPath]=useState()

    useEffect(()=> {
        if (theme==='default'||theme==='gray'){
            switch (icon){
                case "library":
                    setImagPath(library_black)
                    break
                case "repository":
                    setImagPath(repository_black)
                    break
                case "goBack":
                    setImagPath(goBack_black)
                    break
                case "message":
                    setImagPath(message_black)
                    break
            }

        }else {
            switch (icon){
                case "library":
                    setImagPath(library_white)
                    break
                case "repository":
                    setImagPath(repository_white)
                    break
                case "goBack":
                    setImagPath(goBack_white)
                    break
                case "message":
                    setImagPath(message_white)
                    break
            }
        }
    }, [theme])





    return(
        <img  src={imgPath}  className={`${type}-size`}/>
    )

}
export default observer(NavigationImage)
