/**
 * @name: Paging
 * @author: limingliang
 * @date: 2022-11-16 16:53
 * @description：分页
 * @update: 2022-11-16 16:53
 */
import React from "react";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import './Paging.scss'
const Paging = (props) => {
    const {totalPage, currentPage,handleTableChange} = props;

    const cutPage = (value) => {
        handleTableChange(value)
    }
    return(
        <div>
            {
                totalPage>1&&
                <div className='paging'>
                    {
                        currentPage===1?
                            <LeftOutlined   className='paging-icon'/> :
                            <LeftOutlined  className='paging-text' disabled onClick={()=>cutPage(currentPage-1)}/>
                        }

                    <div className='paging-mar'>第{currentPage}页 / 共{totalPage}页</div>
                    {
                        currentPage===totalPage?
                            <RightOutlined className='paging-icon' />:
                            <RightOutlined className='paging-text'   onClick={()=>cutPage(currentPage+1)}/>
                    }
                </div>
            }
        </div>

    )
}
export default Paging
