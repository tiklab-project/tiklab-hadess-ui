import React, {useState, useEffect}  from 'react';
import { Col, Row } from 'antd';
import WorkService from './service/workService'
import AppLinkManagement from './components/AppLinkManagement';
import styles from "./components/workBench.module.scss";

const WORK_NAME = {
    apibox: {
        label: 'API BOX',
    },
    project: {
        label: '项目管理',
    },
};

const Work = (props) => {
    const {match} = props;

    const [urls, setUrls] = useState([]);
    const [visibleManagement, setVisibleManagement] = useState(false);

    useEffect(() => {
        getWorkList().then(r => {})
    }, [])

    const showManage = id => {
        setVisibleManagement(true)
    }

    const requestWorkList = () =>{
        getWorkList().then(r => {})
    }

    const getWorkList = async () => {
        const data = await WorkService.getWorkList(match.params.tenant);
        setUrls(data)
    }

    return (
        <>
            <Row justify={'center'} style={{width:'100%',}}>
                <Col xl={{span:24}} xxl={{span:16}}>
                    <div className={styles['title']}>
                        default
                        <span className={styles['head-action']} onClick={()=> showManage() }>管理</span>
                    </div>
                    <div className={styles["box-gather"]}>
                        {
                            urls.map(item => {
                                return (
                                    <div className={styles["box-item"]} key={item.id}>
                                        <div className={styles["box-icon"]}>
                                            <a href={item.appUrl} target='_blank'> {WORK_NAME[item.appType].label}</a>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                </Col>
            </Row>
            {
                urls.length === 0 && <Row justify={'center'} style={{width:'100%',}}>
                    <Col xl={{span:24}} xxl={{span:16}}>
                        <div className={styles['title']}>
                            default
                            <span className={styles['head-action']} onClick={()=> showManage('') }>管理</span>
                        </div>
                        <div className={styles["box-gather"]}>

                        </div>
                    </Col>
                </Row>
            }
            <AppLinkManagement
                {...props}
                workList={urls}
                requestWorkList={requestWorkList}
                visibleManagement = {visibleManagement}
                setVisibleManagement = {setVisibleManagement}
            />
        </>
    )
}
export default Work
