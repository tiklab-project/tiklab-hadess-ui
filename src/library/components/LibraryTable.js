

/**
 * @name: LibraryTable
 * @author: limingliang
 * @date: 2022-12-30 10:30
 * @description：制品table
 * @update: 2022-12-30 10:30
 */
import {observer} from "mobx-react";
import React, {useState ,useEffect,Fragment} from "react";
import {Table} from "antd";
import libraryStore from "../store/LibraryStore";
import LibraryDetails from "../../common/library/LibraryDetails";
import LibraryDrawer from "../../common/library/LibraryDrawer";
const LibraryTable = (props) => {

    const {libraryList,libraryType}=props
    const {findLibraryNewVersion}=libraryStore

    const [columns,setColumns]=useState([])
    //制品文件详情弹窗
    const [visible,setVisible]=useState(false)
    const [version,setVersion]=useState()
    useEffect(async () => {
        let list;
        switch (libraryType){
            case "maven":
                list=mavenColumns
                break
            case 'npm':
                list= npmColumns
                break
            case 'generic':
                list= npmColumns
                break
            case 'docker':
                list= npmColumns
                break
        }
        setColumns(list)
    }, [libraryType]);

    const mavenColumns = [
        {
            title: '名称',
            dataIndex: 'name',
            key:"name",
            width:'10%',
            render:(text,record)=><div className={'text-color'}  onClick={()=>goLibraryDetails(record)}> {text}</div>
        },
        {
            title: '类型',
            dataIndex: 'libraryType',
            key:"libraryType",
            width:'10%',

        },
        {
            title: '所属制品库',
            dataIndex: ["repository",'name'],
            key:"repositoryName",
            width:'10%',
        },
        {
            title: '版本',
            dataIndex: 'newVersion',
            key:"newVersion",
            width:'10%',
        },
        {
            title: 'Group',
            dataIndex: 'groupId',
            key:"groupId",
            width:'10%',
        },
        {
            title: 'Artifact',
            dataIndex: 'artifactId',
            key:"artifactId",
            width:'10%',
        },
    ];

    const npmColumns=[
        {
            title: '名称',
            dataIndex: 'name',
            key:"name",
            width:'35%',
            render:(text,record)=><div className={'text-color'} onClick={()=>goLibraryDetails(record)}> {text}</div>
        },
        {
            title: '类型',
            dataIndex: 'libraryType',
            key:"libraryType",
            width:'20%',
        },
        {
            title: '所属制品库',
            dataIndex: ["repository",'name'],
            key:"repositoryName",
            width:'30%',

        },
        {
            title: '版本',
            dataIndex: 'newVersion',
            key:"newVersion",
            width:'25%',
        }
    ]



    /**
     * 跳转制品详情
     * @param  value 选择的制品数据
     */
    const goLibraryDetails =async (value) => {
        const res=await findLibraryNewVersion(value.id)
        if (res.code===0){
            setVisible(true)

            setVersion(res.data)
           // props.history.push(`/index/library/${libraryType}/survey/${res.data.id}`)
        }
    }



    return(
        <Fragment>
            <Table
                columns={columns}
                dataSource={libraryList}
                rowKey={record=>record.id}
                pagination={false}
            />
            <LibraryDrawer visible={visible} version={version}  setVisible={()=>setVisible(false)} />
        </Fragment>


    )
}

export default observer(LibraryTable)
