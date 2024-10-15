/**
 * @name:左侧菜单切换制品库
 * @author: limingliang
 * @date: 2022-05-21 16:51
 * @description：ChangeRepository
 * @update: 2022-05-21 16:51
 */
import React,{useEffect,useState} from "react";
import './ChangeRepository.scss'

import ListIcon from "../../common/repositoryIcon/Listicon";

const ChangeRepository = (props) => {
    const {setTriggerVisible,setType,repositoryAllList,repositoryId} = props;

    const [repositoryList,setRepositoryList]=useState([])

    useEffect( () => {
        if (repositoryAllList){
            const unRepository=repositoryAllList.filter(a=>a.id!==repositoryId)
            const preRepository=repositoryAllList.filter(a=>a.id===repositoryId)

            unRepository.unshift(preRepository[0])

            const repositoryList= unRepository.length>5?unRepository.slice(0,5):unRepository
            setRepositoryList(repositoryList)
        }
    }, [repositoryId]);



    //切换制品
    const cuteRepository =async (value) => {
        props.history.push(`/repository/${value.id}/library`)
        setTriggerVisible(false)
        setType("2")
    }
    //跳转仓库列表
    const goRpyList = () => {
        props.history.push(`/repository`)
    }

    return(
        <div className='menu-toggle'>
            <div className='menu-toggle-title'>切换仓库</div>
            <div className='menu-toggle-group'>
                {
                    repositoryList.map(item=>{
                        return(
                            <div className={`menu-toggle-item ${repositoryId && repositoryId===item.id?'menu-toggle-active':''}`}  key={item.id} onClick={()=>cuteRepository(item)}>
                                <ListIcon text={item.name}
                                          colors={item.color}
                                          type={"common"}
                                />
                                <div className='right-page-nav-text'>{item.name}</div>
                            </div>

                        )
                    })
                }
            </div>
            {
                repositoryAllList.length>5&&
                <div className='menu-toggle-tail cursor' onClick={goRpyList}>查看更多</div>
            }
        </div>
    )
}

export default ChangeRepository
