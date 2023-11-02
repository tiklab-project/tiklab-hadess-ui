/**
 * @name: HoleBtn
 * @author: limingliang
 * @date: 2023-03-16 10:30
 * @description：按钮
 * @update: 2023-03-16 10:30
 */
import React from 'react';
import './HoleBtn.scss';
const HoleBtn = (props) => {
    const {type,title,size} = props
    return (
        <div className={`${size==='small'?'hole-small-btn':'hole-large-btn'} ${type?`hole-btn-${type}`:''}`} >
            {title}
        </div>
    )

}
export default HoleBtn
