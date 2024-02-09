import React from 'react';
import {Route, Routes, Outlet} from 'react-router-dom'
import {privateRoutes, publicRoutes} from "../Routes";

interface RouteObject {
    path: string;
    Component: React.ComponentType<any>;
}

type PublicRoutes = RouteObject[];
type PrivateRoutes = RouteObject[];


const AppRouter: React.FC = () => {
    return (
        <Routes>
            {publicRoutes.map(({ path, Component }, index) => (
                <Route key={index} path={path} element={<Component />} />
            ))}
            {privateRoutes.map(({ path, Component }, index) => (
                <Route key={index} path={path} element={<Component />} />
            ))}
        </Routes>
    );
};

export default AppRouter;