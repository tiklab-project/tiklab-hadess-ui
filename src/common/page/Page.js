import React,{Fragment} from 'react';
import {LeftOutlined,RightOutlined} from '@ant-design/icons';
import './Page.scss';

/**
 * 分页
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Page = props =>{

    const {pageCurrent,changPage,totalPage} = props
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
        <div className='xpack-page'>
            {
                (totalPage>1)?
                    <Fragment>
                        <span className={`${pageCurrent===1?'xpack-page-ban':'xpack-page-allow'} xpack-page-icon`}
                              onClick={()=>pageCurrent===1? null :changPage(pageCurrent - 1)}
                        >
                            <LeftOutlined/>
                        </span>
                        <span className='xpack-page-current'>{`第${pageCurrent}页`}</span>
                        <span className='xpack-page-icon'>/</span>
                        <span>{`共${totalPage}页`}</span>
                        { renderRightOut() }
                    </Fragment>:null
            }

        </div>
    )
}

export default Page
