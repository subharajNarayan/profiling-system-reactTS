import { lazy } from 'react';
const Login = lazy(() => import("../core/public/login/login"))

// const Dashboard = lazy(() => import("../core/protected/Dashboard/dashboard"))
const Signup = lazy(() => import("../core/public/signup/signup"))

// PROTECTED
const Home = lazy(() => import("../core/public/Home/Home"))
const ProtectedHome = lazy(() => import("../core/protected/pages/Home/Home"));
const About = lazy(() => import("../core/public/About/About"))
const Form = lazy(() => import("../core/protected/pages/form/Form"))
const ModalFormList = lazy(() => import("../core/protected/pages/list/index"))
const Pagination = lazy(() => import("../core/protected/pages/pagination/Pagination"))
const Checkbox = lazy(() => import("../core/protected/pages/checkbox/Checkbox"))
const Carousel = lazy(() => import('../core/protected/pages/carousel/Carousel'))
const Calendar = lazy(() => import('../core/protected/pages/calendar/Calendar'))
const ProtectedState = lazy(() => import('../core/protected/pages/ProvinceNep/index'))
const ProtectedDistrict = lazy(() => import("../core/protected/pages/DistrictNep/index"))
const ProtectedMunicipality = lazy(() => import("../core/protected/pages/MunicipalityNep/index"));
const ProtectedVDC = lazy(() => import("../core/protected/pages/VDC/index"));

// ADMIN
// const AdminHome = lazy(() => import("../core/public/Home/Home"))
const AdminHome = lazy(() => import("../core/admin/pages/Home/Home"));
const AdminOrganization = lazy(() => import("../core/admin/pages/Municipality/Organization"));
const AdminInfrastructure = lazy(() => import("../core/admin/pages/Municipality/Infrastructure"));
const AdminDrinking = lazy(() => import("../core/admin/pages/Municipality/Drinking"));
const AdminIrrigation = lazy(() => import("../core/admin/pages/Municipality/Irrigation"))
const AdminForest = lazy(() => import("../core/admin/pages/Municipality/Forest"));
const AdminEnvironmentDisaster = lazy(() => import("../core/admin/pages/Municipality/Environment_Disaster"));
const AdminIncome = lazy(() => import("../core/admin/pages/Municipality/Income_Statement"));
const AdminSchool = lazy(() => import("../core/admin/pages/Municipality/School"));
const AdminIndustry = lazy(() => import("../core/admin/pages/Municipality/Industrial_Description"));
const AdminPolitics = lazy(() => import("../core/admin/pages/Municipality/Political_Party"));
const AdminPlace = lazy(() => import("../core/admin/pages/Municipality/Important_Place"));
const AdminExport = lazy(() => import("../core/admin/pages/Municipality/Export_Source"));
const AdminWater = lazy(() => import("../core/admin/pages/Municipality/Water_Source"));

const AdminAbout = lazy(() => import("../core/public/About/About"))
const AdminForm = lazy(() => import("../core/admin/pages/form/Form"))
const AdminModalFormList = lazy(() => import("../core/admin/pages/list/index"))
const AdminPagination = lazy(() => import("../core/admin/pages/pagination/Pagination"))
const AdminCheckbox = lazy(() => import("../core/admin/pages/checkbox/Checkbox"))
const AdminCarousel = lazy(() => import('../core/admin/pages/carousel/Carousel'))



// Moderator
const ModeratorHome = lazy(() => import("../core/public/Home/Home"));

const AdminState = lazy(() => import('../core/admin/pages/State/index'))
const AdminDistrict = lazy(() => import("../core/admin/pages/DistrictNep/index"))
const AdminMunicipality = lazy(() => import("../core/admin/pages/MunicipalityNep/index"));
const AdminVDC = lazy(() => import("../core/admin/pages/VDC/index"));
const AdminWard = lazy(() => import("../core/admin/pages/Ward/index"));

const appRoutes: CustomRoute[] = [
    {
        path: "/login",
        component: Login,
        type: "login"
    },
    {
        path: "/",
        component: Home,
        type: "authorized",
    },
    {
        path: "/auth/home",
        component: ProtectedHome,
        type: "authorized",
    },
    {
        path: "/auth/about",
        component: About,
        type: "authorized",
    },
    {
        path: "/auth/form",
        component: Form,
        type: "authorized",
    },
    {
        path: "/auth/list",
        component: ModalFormList,
        type: "authorized",
    },
    {
        path: "/auth/pagination",
        component: Pagination,
        type: "authorized",
    },
    {
        path: "/auth/checkbox",
        component: Checkbox,
        type: "authorized",
    },
    {
        path: "/auth/carousel",
        component: Carousel,
        type: "authorized",
    },
    {
        path: "/auth/calendar",
        component: Calendar,
    },

    // ADMINPANEL
    {
        path: "/organization",
        component: AdminOrganization,
        type: "authorized",
    },
    {
        path: "/infrastructure",
        component: AdminInfrastructure,
        type: "authorized"
    },
    {
        path: "/drinking",
        component: AdminDrinking,
        type: "authorized"
    },
    {
        path: "/irrigation",
        component: AdminIrrigation,
        type: "authorized"
    },
    {
        path: "/forest",
        component: AdminForest,
        type: "authorized"
    },
    {
        path: "/environment-disaster",
        component: AdminEnvironmentDisaster,
        type: "authorized",
    },
    {
        path: "/income-statement",
        component: AdminIncome,
        type: "authorized"
    },
    {
        path: "/school",
        component: AdminSchool,
        type: "authorized"
    },
    {
        path: "/industry",
        component: AdminIndustry,
        type: "Authorized"
    },
    {
        path: "/politics",
        component: AdminPolitics,
        type: "Authorized"
    },
    {
        path: "/place",
        component: AdminPlace,
        type: "Authorized"
    },
    {
        path: "/export",
        component: AdminExport,
        type: "Authorized"
    },
    {
        path: "/water",
        component: AdminWater,
        type: "Authorized"
    },



















    

    

    {
        path: "/admin/home",
        component: AdminHome,
        type: "authorized",
    },
    {
        path: "/admin/about",
        component: AdminAbout,
        type: "authorized",
    },
    {
        path: "/state",
        component: AdminState,
    },
    {
        path: "/district",
        component: AdminDistrict,
    },
    {
        path: "/municipality",
        component: AdminMunicipality
    },
    {
        path: "/vdc",
        component: AdminVDC
    },
    {
        path: "/ward",
        component: AdminWard
    },
    {
        path: "/admin/form",
        component: AdminForm,
        type: "authorized",
    },
    {
        path: "/admin/list",
        component: AdminModalFormList,
        type: "authorized",
    },
    {
        path: "/admin/pagination",
        component: AdminPagination,
        type: "authorized",
    },
    {
        path: "/admin/checkbox",
        component: AdminCheckbox,
        type: "authorized",
    },
    {
        path: "/admin/carousel",
        component: AdminCarousel,
        type: "authorized",
    },


    // PROTECTED PROFILING SYSTEM
    {
        path: "/state",
        component: ProtectedState,
    },
    {
        path: "/district",
        component: ProtectedDistrict,
    },
    {
        path: "/municipality",
        component: ProtectedMunicipality
    },
    {
        path: "vdc",
        component: ProtectedVDC
    },



    
    // MODERATOR

    {
        path: "/moderator/home",
        component: ModeratorHome
    },

    {
        path: "/signup",
        component: Signup,
        type: "signup"
    }
]

export default appRoutes
