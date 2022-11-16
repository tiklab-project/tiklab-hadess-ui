/**
 * @name: Paging
 * @author: limingliang
 * @date: 2022-11-16 16:53
 * @description：分页
 * @update: 2022-11-16 16:53
 */
import React from "react";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
const Paging = (props) => {
    const {totalPage, currentPage,handleTableChange} = props;

    const cutPage = (value) => {
        handleTableChange(value)
    }
    return(
        <div>
            {
                totalPage>1&&
                <div className=' flex justify-center  py-4 border-t space-x-3'>
                    {
                        currentPage===1?
                            <LeftOutlined   className='mt-1   text-gray-400'/> :
                            <LeftOutlined  className='mt-1 cursor-pointer' disabled onClick={()=>cutPage(currentPage-1)}/>
                        }

                    <div>第{currentPage}页 / 共{totalPage}页</div>
                    {
                        currentPage===totalPage?
                            <RightOutlined className='mt-1 text-gray-400' />:
                            <RightOutlined className='mt-1 cursor-pointer'   onClick={()=>cutPage(currentPage+1)}/>
                    }
                </div>
            }
        </div>

    )
}
export default Paging