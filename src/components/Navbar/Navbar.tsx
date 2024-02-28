import React, {ReactEventHandler, useCallback, useEffect, useState} from 'react';
import styles from './Navbar.module.css'
import {Link, Route, useNavigate} from "react-router-dom";
import logo from '../../assets/logo.svg'
import {HOME_ROUTE, PROFILE_ROUTE, SIGN_IN_ROUTE, USER_SETTINGS_ROUTE} from "../../utils/consts";
import {useAppDispatch, useAppSelector} from "../../hooks/storeHooks";
import {publicRoutes} from "../../Routes";
import LoginIcon from '@mui/icons-material/Login';
import {Button, Skeleton} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import {mySignOut} from "../../utils/SignOut";
import { userSignOut } from '../../store/reducers/User/userSlice';
import MyLoader from "../Loader/MyLoader";

const Navbar = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {user, loading, error} = useAppSelector(state => state.user)
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const goHome: ReactEventHandler<HTMLDivElement> = (event) => {
        navigate(HOME_ROUTE)
    };

    useEffect(() => {
        if (!loading && user === null) {
            navigate(SIGN_IN_ROUTE)
        }
    }, [user, loading]);

    const logOut = async () => {
        setIsLoading(true)
        try {
            const response = await mySignOut();

            if (response) {
                dispatch(userSignOut(false))
            }
        }catch (e) {
            console.log(e);
        } finally {
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
        }
    }

    return (
        <div className={styles.Main}>
            {isLoading ? <MyLoader isVisible={isLoading} /> : null}
            <Button className={styles.LogoPlace} onClick={goHome}>
                <img src={logo} alt=""/>
                <p>Rawplug Managment</p>
            </Button>
            <div className={styles.Wrapper}>
                {/*<div className={styles.NavBar}>
                    {publicRoutes.map(({path, label}, index) =>
                        <Link key={index} to={path}>{label}</Link>
                    )}
                </div>*/}
                <div>
                    {loading
                        ? <Skeleton variant="circular" width={25} height={25}/>
                        : <div>
                            {error
                                ? <LoginIcon style={{cursor: "pointer"}} onClick={() => navigate(SIGN_IN_ROUTE)}/>
                                : <div style={{display: 'flex', gap: 14}}>
                                    <AccountCircleIcon onClick={() => navigate(USER_SETTINGS_ROUTE)} style={{cursor: "pointer"}}/>
                                    <LogoutIcon onClick={logOut} style={{cursor: "pointer"}}/>
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;