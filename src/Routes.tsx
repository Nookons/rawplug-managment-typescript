import {
    ADD_ITEM_ROUTE, ADD_PALLET_ROUTE, ADD_PLAN_ROUTE, BARREL_STATS_ROUTE, CHECK_PLANS_ROUTE, FIND_ITEM_ROUTE,
    HOME_ROUTE, ITEM_ROUTE, ITEMS_GRID_ROUTE, PALLET_ROUTE, RECEIPT_REPORT_ROUTE,
    SIGN_IN_ROUTE,
    SIGN_UP_ROUTE, USER_SETTINGS_ROUTE,
} from "./utils/consts";
import Home from "./pages/Home/Home";
import SignIn from "./pages/User/SignIn";
import {Add} from "@mui/icons-material";
import AddItem from "./pages/Item/AddItem/AddItem";
import AddPlan from "./pages/Plan/AddPlan";
import AddPallet from "./pages/Pallet/AddPallet/AddPallet";
import CheckPlans from "./pages/Plan/module/CheckPlans";
import Pallet from "./pages/Pallet/Pallet";
import Item from "./pages/Item/Item";
import ItemsGrid from "./pages/Item/ItemsGrid/ItemsGrid";
import FindItem from "./pages/Item/FindItem/FindItem";
import Settings from "./pages/User/settings/Settings";
import BarrelStats from "./pages/Item/BarrelStats/BarrelStats";
import ReceiptReport from "./pages/Item/ReceiptReport/ReceiptReport";


interface Route {
    path: string;
    Component: React.ComponentType<any>;
    label: string;
}

type PublicRoutes = Route[];
type PrivateRoutes = Route[];

// routes for users
export const publicRoutes: PublicRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home,
        label: 'Home',
    },
];

export const privateRoutes: PrivateRoutes = [
    {
        path: SIGN_IN_ROUTE,
        Component: SignIn,
        label: 'AppPrivateRoute',
    },
    {
        path: ADD_ITEM_ROUTE,
        Component: AddItem,
        label: 'AppPrivateRoute',
    },
    {
        path: ADD_PLAN_ROUTE,
        Component: AddPlan,
        label: 'AppPrivateRoute',
    },
    {
        path: ADD_PALLET_ROUTE,
        Component: AddPallet,
        label: 'AppPrivateRoute',
    },
    {
        path: CHECK_PLANS_ROUTE,
        Component: CheckPlans,
        label: 'AppPrivateRoute',
    },
    {
        path: PALLET_ROUTE,
        Component: Pallet,
        label: 'AppPrivateRoute',
    },
    {
        path: ITEM_ROUTE,
        Component: Item,
        label: 'AppPrivateRoute',
    },
    {
        path: ITEMS_GRID_ROUTE,
        Component: ItemsGrid,
        label: 'AppPrivateRoute',
    },
    {
        path: FIND_ITEM_ROUTE,
        Component: FindItem,
        label: 'AppPrivateRoute',
    },
    {
        path: USER_SETTINGS_ROUTE,
        Component: Settings,
        label: 'AppPrivateRoute',
    },
    {
        path: BARREL_STATS_ROUTE,
        Component: BarrelStats,
        label: 'AppPrivateRoute',
    },
    {
        path: RECEIPT_REPORT_ROUTE,
        Component: ReceiptReport,
        label: 'AppPrivateRoute',
    },
];