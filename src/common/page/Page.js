import React,{Fragment} from 'react';
import {LeftOutlined, RightOutlined, SyncOutlined} from '@ant-design/icons';
import './Page.scss';

/**
 * 分页
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Page = props =>{

    const {pageCurrent,changPage,totalPage,totalRecord,refresh,pageType} = props
    const renderRightOut = () =>{
        if(pageCurrent===totalPage ){
            return(
                <span className='xpack-page-ban xpack-page-icon'>
                    <RightOutlined/>
                </span>
            )
        }
        return (
            <span className='xpack-page-allow xpack-page-icon' onClick={()=>changPage(pageCurrent+1)} >
                <RightOutlined/>
            </span>
        )
    }
    return(
        <div>
            {
                totalPage>0&&
                <div className='xpack-page'>
                    {
                        (totalPage>1)?
                            <Fragment>
                                <span className='xpack-page-padding'>{`共${totalRecord}条`}</span>
                                <span className={`${pageCurrent===1?'xpack-page-ban':'xpack-page-allow'} xpack-page-icon`}
                                      onClick={()=>pageCurrent===1? null :changPage(pageCurrent - 1)}
                                >
                            <LeftOutlined/>
                        </span>
                                <span className='xpack-page-current'>{`第${pageCurrent}页`}</span>
                                <span className='xpack-page-icon'>/</span>
                                <span>{`共${totalPage}页`}</span>
                                { renderRightOut() }
                                <span className='xpack-page-padding xpack-page-allow'><SyncOutlined onClick={refresh}/></span>
                            </Fragment>:null
                    }
                </div>
            }
        </div>

    )
}

export default Page
