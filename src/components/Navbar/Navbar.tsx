import React, {ReactEventHandler, useCallback, useEffect, useState} from 'react';
import styles from './Navbar.module.css'
import {Link, Route, useNavigate} from "react-router-dom";
import logo from '../../assets/logotype.svg'
import {HOME_ROUTE, PROFILE_ROUTE, SIGN_IN_ROUTE, USER_SETTINGS_ROUTE} from "../../utils/consts";
import {useAppDispatch, useAppSelector} from "../../hooks/storeHooks";
import {publicRoutes} from "../../Routes";
import LoginIcon from '@mui/icons-material/Login';
import {Backdrop, Button, CircularProgress, Skeleton} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import {mySignOut} from "../../utils/SignOut";
import {signOutUser, userSignOut} from '../../store/reducers/User/userSlice';

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
            dispatch(signOutUser())
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
            {isLoading
                ?
                <Backdrop sx={{zIndex: 99}} open={isLoading}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
                : null
            }
            <Button className={styles.LogoPlace} onClick={goHome}>
                <img src={logo} alt=""/>
            </Button>
            <div className={styles.Wrapper}>
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