import {
    ADD_ITEM_ROUTE, ADD_PALLET_ROUTE, ADD_PLAN_ROUTE, CHECK_PLANS_ROUTE,
    HOME_ROUTE,
    SIGN_IN_ROUTE,
    SIGN_UP_ROUTE,
} from "./utils/consts";
import Home from "./pages/Home/Home";
import SignIn from "./pages/User/SignIn";
import {Add} from "@mui/icons-material";
import AddItem from "./pages/Item/AddItem";
import AddPlan from "./pages/Plan/AddPlan";
import AddPallet from "./pages/AddPallet/AddPallet";
import CheckPlans from "./pages/Plan/module/CheckPlans";


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
        label: 'FilmPrivate',
    },
    {
        path: ADD_ITEM_ROUTE,
        Component: AddItem,
        label: 'FilmPrivate',
    },
    {
        path: ADD_PLAN_ROUTE,
        Component: AddPlan,
        label: 'FilmPrivate',
    },
    {
        path: ADD_PALLET_ROUTE,
        Component: AddPallet,
        label: 'FilmPrivate',
    },
    {
        path: CHECK_PLANS_ROUTE,
        Component: CheckPlans,
        label: 'FilmPrivate',
    },
];