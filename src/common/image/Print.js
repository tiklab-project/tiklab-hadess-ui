
import React from "react";

import maven from "../../assets/images/img/mvn.png"
import npm from "../../assets/images/img/npm.png"
import docker from "../../assets/images/img/docker.png"
import generic from "../../assets/images/img/generic.png"
import pypi from "../../assets/images/img/pypi.png"
import nuget from "../../assets/images/img/nuget.png"
import go from "../../assets/images/img/go.png"
import helm from "../../assets/images/img/helm.png"
import composer from "../../assets/images/img/composer.png"
import "./Print.scss"
const Print = (props) => {
    const {type,width,height}=props
    return(
        <div className='border-img-center'>
            {
                type==='maven'&&  <img  src={maven}  style={{width:width,height:height}}/>||
                type==='npm'&&  <img  src={npm}  style={{width:width,height:height}}/>||
                type==='docker'&&  <img  src={docker}  style={{width:width,height:height}}/>||
                type==='generic'&&  <img  src={generic}  style={{width:width,height:height}}/>||
                type==='pypi'&&  <img  src={pypi}  style={{width:width,height:height}}/>||
                type==='nuget'&&  <img  src={nuget}  style={{width:width,height:height}}/>||
                type==='go'&&  <img  src={go}  style={{width:width,height:height}}/>||
                type==='helm'&&  <img  src={helm}  style={{width:width,height:height}}/>||
                type==='composer'&&  <img  src={composer}  style={{width:width,height:height}}/>
            }
        </div>
    )
}
export default Print
