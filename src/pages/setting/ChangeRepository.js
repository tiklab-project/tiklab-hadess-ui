/**
 * @name: 切换制品库
 * @author: limingliang
 * @date: 2022-05-21 16:51
 * @description：ChangeRepository
 * @update: 2022-05-21 16:51
 */
import React, { useEffect, useRef, useState } from "react";
import './ChangeRepository.scss'
import {Profile} from "tiklab-eam-ui";
import {CaretDownOutlined} from "@ant-design/icons";
import repositoryService from "../../service/repository.service";
const ChangeRepository = (props) => {
    const { openState,setOpenState,repositoryId,setType} = props;

    const [repository,setRepository]=useState([])
    const onClickOpen =async () => {
        if (openState){
            setOpenState(false)
        }else {
            await findRepository()
            setOpenState(true)
        }

    }
    //查询制品库
    const findRepository =async () => {
        const res=await repositoryService.findAllRepository()
        if (res.code===0){
          const dataList = res.data.filter(item=>item.id!==repositoryId);
            setRepository(dataList)
        }
    }
    //切换制品
    const cuteRepository =async (value) => {
        props.history.push(`/index/repository/${value.id}/libraryList`)
        setOpenState(false)
        setType("2")
    }

    return(
        <div className='change-repository'>
            <div className='flex mt-3' onClick={onClickOpen}>
                <Profile />
                <CaretDownOutlined  className='text-sm pl-1 pt-1' />
            </div>
            {openState&&
                <div className='right-page'>
                    <div className='space-y-4'>
                        {
                            repository.map(item=>{
                                return(
                                    <div key={item.id} className='flex space-x-2 '  onClick={()=>cuteRepository(item)}>
                                        <Profile />
                                        <div className='mt-2  hover:bg-gray-200'>{item.name}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }

        </div>
    )
}
export default ChangeRepository
