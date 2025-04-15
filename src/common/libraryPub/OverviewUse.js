/**
 * @name: OverviewUse
 * @author: limingliang
 * @date: 2023-09-04 10:30
 * @description：概览 -使用
 * @update: 2023-09-04 10:30
 */
import React,{useEffect,useState} from "react";
import "./OverviewUse.scss"
import {message, Select} from "antd";
import {inject, observer} from "mobx-react";
import {CopyOutlined} from "@ant-design/icons";
import {withRouter} from "react-router";
const { Option } = Select;

const mavenList=[{key:"maven",value:"Maven"},{key:"gradle",value:"Gradle"}]
const npmList=[{key:"npm",value:"npm"},{key:"yarn",value:"yarn"}]
const OverviewUse = (props) => {
    const {versionData,repositoryStore}=props
    const {findRepository}=repositoryStore

    const [selectData,setSelectData]=useState([])

    const [type,setType]=useState("")
    const [value,setValue]=useState('')
    const [repository,setRepository]=useState()

    const [path,setPath]=useState(null)
    const [ipPath,setIpPath]=useState();

    useEffect(async () => {
        const proPath=node_env? base_url:window.location.origin
        setPath(proPath)

        if (versionData.libraryType==='maven'){
            setSelectData(mavenList)
            setType("Maven")
        }else if(versionData.libraryType==='npm'){
            setSelectData(npmList)
            setType("npm")
        }
        findRepository(versionData?.repository?.id).then(res=>{
            setRepository(res.data)
        })

        if (versionData.libraryType==='pypi'){
            if (proPath.startsWith("http://")){
                const result = proPath.replace(/^[^:]+:\/\//, '').split(':')[0];
                setIpPath(result)
            }
        }
    }, [versionData]);


    useEffect(async () => {
        if ( type === 'npm' ){
            setValue("npm install ")
        }else {
            setValue("yarn add  ")
        }
    }, [type]);

    //切换类型
    const cuteType = (value) => {
        setType(value)
    }



    const selectOption=(selectData)=>{
        return (
            selectData.map(item=>{
                return(
                    <Option  key={item.key} value={item.value}>
                        {item.value}
                    </Option>
                )
            })
        )
    }

    //复制
    const clickCopy = (type) => {
        let value= document.getElementById(type).outerText;
        const textarea = document.createElement('textarea');
        textarea.value = value;

        // 使 textarea 不可见
        textarea.style.position = 'fixed'; // 避免影响页面布局
        textarea.style.left = '-9999px';

        // 添加到文档中
        document.body.appendChild(textarea);

        // 选中 textarea 的内容
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length); // 确保在移动设备上也能正确选中

        // 执行复制命令
        const successful = document.execCommand('copy');
        if (successful){
            message.success("复制成功")
        }else {
            message.error("复制失败")
        }
        document.body.removeChild(textarea);
    }


    return(
        <div className='overview-use drop-down'>
         {/*   <div className='overview-title'>使用</div>*/}

                {
                    versionData.libraryType==='maven'&&
                    <div className='overview-use-input'>
                        <Select   defaultValue={"Maven"}
                                  style={{width: 180}}
                                  onChange={cuteType}
                                  getPopupContainer={triggerNode => triggerNode.parentElement}
                        >
                            {selectOption(selectData)}
                        </Select>
                    </div> ||
                    versionData.libraryType==='npm'&&
                    <div className='overview-use-input'>
                        <Select   defaultValue={"npm"}
                                  style={{width: 180}}
                                  onChange={cuteType}
                                  getPopupContainer={triggerNode => triggerNode.parentElement}
                        >
                            {selectOption(selectData)}
                        </Select>
                    </div>
                }
            <div className='overview-use-table'>
                {
                    versionData.libraryType === 'maven' &&
                    <pre className='overview-guide-table'>
                        {
                            type==='Maven'?
                                <code id={'Maven'}>
                                    {
                                        "<dependency>\n" +
                                        `    <groupId>${versionData.groupId}</groupId>\n` +
                                        `    <artifactId>${versionData.artifactId}</artifactId>\n`+
                                        `    <version>${versionData.version}</version>\n`+
                                        "</dependency>"
                                    }
                                </code>:
                                <code id={'Gradle'}>
                                    {
                                        "dependencies {\n" +
                                        `  compile '${versionData.groupId}:${versionData.artifactId}:${versionData.version}'\n`+
                                        "}"
                                    }
                                </code>
                        }
                         <div className='overview-guide-table-copy' onClick={()=>clickCopy(type)}>
                            <CopyOutlined />
                        </div>
                    </pre> ||
                    versionData.libraryType === 'npm' &&
                    <pre className='overview-guide-table'>
                        <code id={'npm'}>
                            {
                                `${value} ${versionData.library?.name}@${versionData?.version}`
                            }
                        </code>
                         <div className='overview-guide-table-copy' onClick={()=>clickCopy("npm")}>
                            <CopyOutlined />
                        </div>
                    </pre> ||
                    versionData.libraryType === 'generic' &&
                        <div className='overview-guide-table'>
                            <code id={'generic'}>
                                {`curl -H "type:download"  -u [USER_NAME]:[PASSWORD]  "${node_env? base_url:window.location.origin}/generic/${versionData.repository?.name}/${versionData.library?.name}" -o [OUTPUT_FILE]`}
                            </code>
                              <div className='overview-guide-table-copy' onClick={()=>clickCopy("generic")}>
                                <CopyOutlined />
                            </div>
                        </div>||
                    versionData.libraryType === 'docker' &&
                    <div className='overview-guide-table'>
                        <code id={'docker'}>
                            {`docker pull ${repository?.prefixPath}${versionData.repository?.name}/${versionData.library?.name}:${versionData.version}`}
                        </code>
                        <div className='overview-guide-table-copy' onClick={()=>clickCopy("docker")}>
                            <CopyOutlined />
                        </div>
                    </div> ||
                    versionData.libraryType === 'helm' &&
                    <pre className='overview-guide-table'>
                        <code id={'helm'}>
                            <div>helm repo update</div>
                            {`helm pull ${versionData.repository?.name}/${versionData.library?.name} --version ${versionData.version}`}
                        </code>
                          <div className='overview-guide-table-copy' onClick={()=>clickCopy("helm")}>
                                <CopyOutlined />
                            </div>
                    </pre>||
                    versionData.libraryType === 'pypi'&&
                    <div className='overview-guide-table'>
                        <code id={'generic'}>
                            {`pip install  ${versionData.library?.name} -i ${path}/pypi/${versionData.repository?.name}  ${path?.startsWith("http:")? `--trusted-host ${ipPath}` :''}`}
                        </code>
                        <div className='overview-guide-table-copy' onClick={()=>clickCopy("generic")}>
                            <CopyOutlined />
                        </div>
                    </div>

                }
            </div>
        </div>
    )
}
export default withRouter(inject('repositoryStore')(observer(OverviewUse)))
