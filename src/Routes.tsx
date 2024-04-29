import {
    ADD_ITEM_ROUTE,
    ADD_PALLET_ROUTE,
    ADD_PLAN_ROUTE, ADD_SOLO_BARREL,
    BARREL_STATS_ROUTE,
    CHECK_PLANS_ROUTE,
    CREATE_ITEM_ROUTE,
    FIND_ITEM_ROUTE,
    HOME_ROUTE,
    ITEM_ROUTE,
    ITEMS_GRID_ROUTE, MIXERS_RECEIPTS_ROUTE, NAP01_ROUTE, NAP02_ROUTE, NAP03_ROUTE,
    PALLET_ROUTE,
    RECEIPT_REPORT_ROUTE, REMOVED_ROUTE,
    SIGN_IN_ROUTE,
    SIGN_UP_ROUTE,
    USER_SETTINGS_ROUTE, WAREHOUSE_ROUTE,
} from "./utils/consts";
import Home from "./pages/Home/Home";
import SignIn from "./pages/User/SignIn";
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
import CreateItem from "./pages/Item/CreateItem/CreateItem";
import RemovedList from "./pages/Item/RemovedList/RemovedList";
import MixerReceipts from "./pages/Mixers/MixersReceipts/MixerReceipts";
import Warehouse from "./pages/Warehouse/Warehouse";
import Nap01 from "./pages/Nap03/Nap03";
import Nap03 from "./pages/Nap03/Nap03";
import Nap02 from "./pages/Nap02/Nap02";
import AddSoloBarrel from "./pages/Item/AddSoloBarrel/AddSoloBarrel";


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
    {
        path: CREATE_ITEM_ROUTE,
        Component: CreateItem,
        label: 'AppPrivateRoute',
    },
    {
        path: REMOVED_ROUTE,
        Component: RemovedList,
        label: 'AppPrivateRoute',
    },
    {
        path: WAREHOUSE_ROUTE,
        Component: Warehouse,
        label: 'AppPrivateRoute',
    },
    {
        path: ADD_SOLO_BARREL,
        Component: AddSoloBarrel,
        label: 'AppPrivateRoute',
    }
];