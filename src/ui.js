import {stores as xpackStore} from "./stores";
import  Routers  from "./routers";
import Portals from "./home/Portals";
import SyncComponent from "./common/lazy/SyncComponent";

const ExcludeProductUser=SyncComponent(()=>import('./login/components/ExcludeProductUser'))

//公共组件
const Breadcrumb=SyncComponent(()=>import('./common/breadcrumb/Breadcrumb'))
const btn=SyncComponent(()=>import('./common/btn/btn'))
const HoleBtn=SyncComponent(()=>import('./common/btn/HoleBtn'))
const NavigationImage=SyncComponent(()=>import('./common/image/NavigationImage'))
const TopNav=SyncComponent(()=>import('./common/navigation/TopNav'))
const FirstNav=SyncComponent(()=>import('./common/navigation/FirstNav'))
const LibraryHistory = SyncComponent(() => import('./common/library/History'))
const Modals = SyncComponent(() => import('./common/modal/Modal'))

//制品
const LibraryDetails = SyncComponent(() => import('./library/component/LibraryDetails'))
const RpyLibraryDetails = SyncComponent(() => import('./repository/library/components/LibraryDetails'))

//制品扫描
const ScanPlayList = SyncComponent(() => import('./repository/scan/components/ScanPlayList'))
const ScanList = SyncComponent(() => import('./repository/scan/components/ScanList'))
const ScanDetails = SyncComponent(() => import('./repository/scan/components/ScanDetails'))
const ScanHistory = SyncComponent(() => import('./repository/scan/components/ScanHistory'))

//扫描方案
const ScanScheme =SyncComponent(()=>import('./setting/scan/components/ScanScheme'))
const ScanHole =SyncComponent(()=>import('./setting/scan/components/ScanHole'))
const HoleList =SyncComponent(()=>import('./setting/scan/components/HoleList'))
const HoleEdit =SyncComponent(()=>import('./setting/scan/components/HoleEditPop'))

// 制品库列表
const RepositoryList = SyncComponent(() => import('./repository/repository/components/RepositoryList'))
// 制品库-创建
const RepositoryAdd = SyncComponent(() => import('./repository/repository/components/RepositoryAdd'))


//制品库信息
const RepositoryInfo = SyncComponent(() => import('./repository/setting/basicInfo/RepositoryBasicInfo'))


//制品库-成员
const programUser = SyncComponent(() => import('./repository/setting/ProgramUser'))
//制品库-权限
const programDomainRole = SyncComponent(() => import('./repository/setting/ProjectDomainRole'))
// 制品库nav
const RepositoryAside = SyncComponent(() => import('./repository/navigator/RepositoryAside'));
// 制品库设置nav
const RepositorySetting = SyncComponent(() => import('./repository/setting/navigator/RepositorySetting'));

//推送中央仓库
const PushGroup = SyncComponent(() => import('./repository/setting/pushCenter/components/PushGroup'))
const PushLibrary = SyncComponent(() => import('./repository/setting/pushCenter/components/PushLibrary'))

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

//设置-操作日志
const MyLog =SyncComponent(()=>import('./setting/security/MyLog'))
//设置-版本与许可证
const Version =SyncComponent(()=>import('./setting/licence/Version'))
const AuthContent =SyncComponent(()=>import('./setting/licence/AuthContent'))

const Login = SyncComponent(() => import('./login/components/LoginXpack'));

const BackupRecovery =SyncComponent(()=>import('./setting/backup/BackupRecoveryContent'))

//资源监控
const Resources =SyncComponent(()=>import('./setting/resources/components/Resources'))
const RemoteAgency =SyncComponent(()=>import('./setting/remoteAgency/components/RemoteAgency'))

import SettingHome from "./setting/home/components/SettingHome";


const SystemFunction =SyncComponent(()=>import('./setting/basicData/SystemFunction'))
const ProjectFunction =SyncComponent(()=>import('./setting/basicData/ProjectFunction'))
const ProjectRole =SyncComponent(()=>import('./setting/basicData/ProjectRole'))
const SystemRole =SyncComponent(()=>import('./setting/basicData/SystemRole'))
const LogType =SyncComponent(()=>import('./setting/basicData/LogType'))



export {
    NavigationImage,
    TopNav,
    FirstNav,
    Modals,

    LibraryHistory,
    LibraryDetails,
    RpyLibraryDetails,
    SettingHome,
    ExcludeProductUser,
    ScanPlayList,
    ScanList,
    ScanDetails,
    ScanHistory,
    RepositoryList,
    RepositoryAdd,
    programDomainRole,
    RepositoryAside,
    RepositorySetting,
    PushLibrary,
    PushGroup,
    messageNotice,
    messagesendtype,
    orga,
    user,
    group,
    userDirectory,
    systemRole,
    MyLog,
    Version,
    AuthContent,
    RepositoryInfo,
    programUser,
    Login,

    Routers ,
    xpackStore,
    SettingContent,
    BackupRecovery,

    ScanScheme,
    ScanHole,
    HoleList,
    HoleEdit,

    Resources,
    RemoteAgency,

    SystemFunction,
    ProjectFunction,
    ProjectRole,
    SystemRole,
    LogType,
    Portals,
}
