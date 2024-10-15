/**
 * @name: LibraryTable
 * @author: limingliang
 * @date: 2022-12-30 10:30
 * @description：制品的table
 * @update: 2022-12-30 10:30
 */
import React, {useState, useEffect} from "react";
import {observer} from "mobx-react";
import Print from "../image/Print";
import "./LibraryTable.scss"
import EmptyText from "../emptyText/EmptyText";
import ListIcon from "../repositoryIcon/Listicon";
import {Dropdown, Menu, Tooltip} from 'antd';
import {EllipsisOutlined} from "@ant-design/icons";
import {formatSize} from "../utils";
const LibraryTable = (props) => {
    const {libraryList,goDetails,goDetailsType}=props


    /**
     * 操作下拉
     */
    const execPullDown=(value) => (
        <Menu>
            <Menu.Item  style={{width:100}} onClick={()=>goDetailsType(value,"info")}>
                使用指南
            </Menu.Item>
            <Menu.Item onClick={()=>goDetailsType(value,'file')}>
                文件
            </Menu.Item>
        </Menu>
    );

    return(
        <div className='library-table'>
            <div className='library-table-title'>
                <div className='table-title-left'>制品名称</div>
                <div className='table-title-right'>
                    <div className='title-right-version'>最新版本</div>
                    <div className='title-right-exec'>操作</div>
                </div>
            </div>

            {
                libraryList.length>0?libraryList.map((library,size)=>{
                        return(
                            <div key={library.id} className='library-tab-nav' onClick={()=>goDetails(library)}>
                                <div className='library-tab-left'>
                                    <ListIcon   text={library?.name}
                                                colors={(size - 1) % 2 + 1}
                                                type={"library"}
                                    />
                                    <div className='library-tab-name-nav'>
                                        <div className='library-tab-name'>
                                            <div>{library.name}</div>
                                        </div>

                                        <div className='tab-left-desc'>
                                            {
                                                library.libraryType === 'maven' &&
                                                <div>{library.groupId}</div>
                                            }
                                           <div>{formatSize(library.librarySize)}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='library-tab-right'>
                                    <div className='tab-right-data'>
                                        <Tooltip placement="top" title={"最后发布时间"}>
                                            <div className='tab-right-data-time'>{library.updateTime}</div>
                                        </Tooltip>
                                        <div className='tab-right-data-color'>|</div>
                                        <Tooltip placement="top" title={"最新版本"}>
                                            <div className='tab-right-data-version'>{library.showVersion}</div>
                                        </Tooltip>
                                    </div>
                                    <div className='tab-right-exec'>
                                        <div className='right-exec-version-size' onClick={()=>goDetailsType(library,'history')}>版本数：{library.versionCount}</div>
                                        <div>
                                            <Dropdown    overlay={()=>execPullDown(library)}
                                                         placement="bottomRight"
                                                         trigger={['click']}
                                                         getPopupContainer={e => e.parentElement}

                                            >
                                                <div onClick={(e) => e.stopPropagation()}>
                                                    <EllipsisOutlined style={{fontSize:20}}/>
                                                </div>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }):
                    <EmptyText/>
            }
        </div>
    )

}
export default observer(LibraryTable)
