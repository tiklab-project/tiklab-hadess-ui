/**
 * @name:左侧菜单切换制品库
 * @author: limingliang
 * @date: 2022-05-21 16:51
 * @description：ChangeRepository
 * @update: 2022-05-21 16:51
 */
import React from "react";
import './ChangeRepository.scss'

import ListIcon from "../../common/repositoryIcon/Listicon";

const ChangeRepository = (props) => {
    const {setTriggerVisible,setType,repositoryAllList} = props;

    //切换制品
    const cuteRepository =async (value) => {
        props.history.push(`/index/repository/${value.id}/libraryList`)
        setTriggerVisible(false)
        setType("2")
    }

    return(
        <div className='menu-toggle'>
            <div className='menu-toggle-title'>切换仓库</div>
            <div className='menu-toggle-group'>
                {
                    repositoryAllList.map(item=>{
                        return(
                            <div className='menu-toggle-item ' key={item.id} onClick={()=>cuteRepository(item)}>
                                <ListIcon text={item.name}/>
                                <div className='right-page-nav-text'>{item.name}</div>
                            </div>

                        )
                    })
                }
            </div>
        </div>
    )
}

export default ChangeRepository
