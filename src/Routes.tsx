import {
    ADD_ITEM_ROUTE, ADD_NEW_USER_ROUTE,
    ADD_PALLET_TEMPLATE,
    ADD_SOLO_BARREL, ADMIN_DISPLAY_ROUTE,
    BARREL_STATS_ROUTE,
    CREATE_ITEM_ROUTE, DISPLAY_ROUTE,
    FIND_ITEM_ROUTE,
    HOME_ROUTE, INFO_FULL_ITEM_ROUTE, INFO_READY_PALLET_ROUTE,
    ITEM_ROUTE,
    ITEMS_GRID_ROUTE, ITEMS_STATS_ROUTE, MACHINE_SCREEN_ROUTE,
    RECEIPT_REPORT_ROUTE, REMOVED_ROUTE,
    SIGN_IN_ROUTE,
    USER_SETTINGS_ROUTE, WAREHOUSE_ROUTE,
} from "./utils/consts";
import Home from "./pages/Home/Home";
import AddItem from "./pages/Item/AddItem/AddItem";
import Item from "./pages/Item/Item";
import ItemsGrid from "./pages/Item/ItemsGrid/ItemsGrid";
import FindItem from "./pages/Item/FindItem/FindItem";
import BarrelStats from "./pages/Item/BarrelStats/BarrelStats";
import ReceiptReport from "./pages/Item/ReceiptReport/ReceiptReport";
import CreateItem from "./pages/Item/CreateItem/CreateItem";
import Warehouse from "./pages/Warehouse/Warehouse";
import AddSoloBarrel from "./pages/Item/AddSoloBarrel/AddSoloBarrel";
import InfoPage from "./pages/Ready/Info/InfoPage";
import Display from "./pages/Ready/Display/Display";
import AddTemplate from "./pages/Ready/Add/AddTemplate";
import SignIn from "./pages/User/SignIn";
import UserSettings from "./pages/User/setting/UserSettings";
import AddNewUser from "./pages/User/AddNewUser/AddNewUser";
import MachineScreen from "./pages/MachineScreen/MachineScreen";
import AdminDisplay from "./pages/Ready/AdminDisplay/AdminDisplay";
import InfoPallet from "./pages/Ready/Info/InfoPallet";
import ItemsStats from "./pages/Item/ItemStats/ItemsStats";


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
        path: ADD_NEW_USER_ROUTE,
        Component: AddNewUser,
        label: 'AppPrivateRoute',
    },
    {
        path: ITEMS_STATS_ROUTE,
        Component: ItemsStats,
        label: 'AppPrivateRoute',
    },
    {
        path: ADMIN_DISPLAY_ROUTE,
        Component: AdminDisplay,
        label: 'AppPrivateRoute',
    },
    {
        path: MACHINE_SCREEN_ROUTE,
        Component: MachineScreen,
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
        Component: UserSettings,
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
        path: WAREHOUSE_ROUTE,
        Component: Warehouse,
        label: 'AppPrivateRoute',
    },
    {
        path: ADD_SOLO_BARREL,
        Component: AddSoloBarrel,
        label: 'AppPrivateRoute',
    },
    {
        path: INFO_FULL_ITEM_ROUTE,
        Component: InfoPallet,
        label: 'AppPrivateRoute',
    },
    {
        path: INFO_READY_PALLET_ROUTE,
        Component: InfoPage,
        label: 'AppPrivateRoute',
    },
    {
        path: DISPLAY_ROUTE,
        Component: Display,
        label: 'AppPrivateRoute',
    },
    {
        path: ADD_PALLET_TEMPLATE,
        Component: AddTemplate,
        label: 'AppPrivateRoute',
    }
];