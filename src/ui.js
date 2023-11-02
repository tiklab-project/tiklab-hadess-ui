import {stores as xpackStore} from "./stores";
import routesSaas  from "./routers";
import Layout from "./common/layout/layout";
import SyncComponent from "./common/lazy/SyncComponent";

const ExcludeProductUser=SyncComponent(()=>import('./login/components/ExcludeProductUser'))

// 制品列表
const librarys = SyncComponent(() => import('./library/components/LibraryList'))

//制品扫描
const ScanList = SyncComponent(() => import('./repository/detection/components/ScanList'))
const ScanDetails = SyncComponent(() => import('./repository/detection/components/ScanDetails'))
const ScanHistory = SyncComponent(() => import('./repository/detection/components/ScanHistory'))


// 制品库列表
const RepositoryList = SyncComponent(() => import('./repository/repository/components/RepositoryList'))
// 制品库-创建
const RepositoryAdd = SyncComponent(() => import('./repository/repository/components/RepositoryAdd'))
//制品列表
const LibraryList = SyncComponent(() => import('./repository/library/LibraryList'))

// 制品库-概览
const repositorySurvey = SyncComponent(() => import('./repository/survey/components/Survey'))
//制品库信息
const RepositoryInfo = SyncComponent(() => import('./repository/setting/basicInfo/RepositoryBasicInfo'))
//配置-代理信息
const agency = SyncComponent(() => import('./repository/deploy/components/Agency'))
//配置-复制信息
const copy = SyncComponent(() => import('./repository/deploy/components/Copy'))
//制品库-成员
const programUser = SyncComponent(() => import('./repository/setting/ProgramUser'))
//制品库-权限
const programDomainRole = SyncComponent(() => import('./repository/setting/ProjectDomainRole'))
// 制品库nav
const RepositoryAside = SyncComponent(() => import('./repository/navigator/RepositoryAside'));
// 制品库设置nav
const RepositorySetting = SyncComponent(() => import('./repository/setting/navigator/RepositorySetting'));
//推送中央仓库
const LibraryPush = SyncComponent(() => import('./repository/setting/pushCenter/components/LibraryPush'))


const SettingContent =SyncComponent(()=>import('./setting/navigator/SettingContent'))
//设置-消息通知方案
const messageNotice =SyncComponent(()=>import('./setting/message/MessageNotice'))
//设置-消息发送方式
const messagesendtype =SyncComponent(()=>import('./setting/message/Messagesendtype'))
//设置-部门
const orga =SyncComponent(()=>import('./setting/organ/Orga'))
//设置-用户
const user =SyncComponent(()=>import('./setting/organ/User'))
//设置-用户组
const group =SyncComponent(()=>import('./setting/organ/Group'))
//设置-用户目录
const userDirectory =SyncComponent(()=>import('./setting/organ/UserDirectory'))
//设置-权限
const systemRole =SyncComponent(()=>import('./setting/role/SystemRole'))

//设置-插件
const plugin =SyncComponent(()=>import('./setting/plugins/Plugin'))
//设置-操作日志
const MyLog =SyncComponent(()=>import('./setting/security/MyLog'))
//设置-版本与许可证
const Version =SyncComponent(()=>import('./setting/licence/Version'))

const Login = SyncComponent(() => import('./login/components/LoginXpack'));

const BackupRecovery =SyncComponent(()=>import('./setting/backup/components/BackupRecovery'))

export {
    ExcludeProductUser,
    librarys,
    ScanList,
    ScanDetails,
    ScanHistory,
    RepositoryList,
    RepositoryAdd,
    LibraryList,
    programDomainRole,
    RepositoryAside,
    RepositorySetting,
    LibraryPush,
    messageNotice,
    messagesendtype,
    orga,
    user,
    group,
    userDirectory,
    systemRole,
    plugin,
    MyLog,
    Version,
    repositorySurvey,
    RepositoryInfo,
    agency,
    copy,
    programUser,
    Login,

    routesSaas ,
    xpackStore,
    Layout,
    SettingContent,
    BackupRecovery
}
