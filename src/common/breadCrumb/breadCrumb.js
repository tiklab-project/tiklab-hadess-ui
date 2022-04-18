import React from 'react';
import {Link} from "react-router-dom";
import { Breadcrumb } from 'antd';
import styles from './breadCrumb.module.scss';


const BreadCrumb = props => {

    const {routes} = props;

    const itemRender = (route, params, routes) => {
        const last = routes.indexOf(route) === routes.length - 1;
        if (route.disabled) return  <span>{route.breadcrumbName}</span>
        return last ? (
            route.click ? <span style={{ cursor: 'pointer'}} onClick={()=> route.click()}>{route.breadcrumbName}</span> : <span>{route.breadcrumbName}</span>
        ) : (
            route.click ? <span style={{ cursor: 'pointer'}} onClick={() => route.click()}>{route.breadcrumbName}</span> : <Link to={route.path}>{route.breadcrumbName}</Link>
        );
    }

    return(
        <div className={styles['privilege-breadcrumb']}>
            <Breadcrumb itemRender={itemRender} routes={routes} separator=">"/>
        </div>

    )
}


export default BreadCrumb
