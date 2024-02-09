import React, {ReactEventHandler, useCallback, useEffect, useState} from 'react';
import styles from './Navbar.module.css'
import {Link, Route, useNavigate} from "react-router-dom";
import logo from '../../assets/logo.svg'
import {HOME_ROUTE, PROFILE_ROUTE, SIGN_IN_ROUTE} from "../../utils/consts";
import {useAppDispatch} from "../../hooks/storeHooks";
import {publicRoutes} from "../../Routes";

const Navbar = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [burger, setBurger] = useState(false);
    const [loader, setLoader] = useState(false);

    const onBurgerClick = useCallback(() => {
        setBurger(prevBurger => !prevBurger);
    }, []);

    const goHome: ReactEventHandler<HTMLDivElement> = (event) => {
        navigate(HOME_ROUTE)
    };

    return (
        <div className={styles.Main}>
            <div className={styles.LogoPlace} onClick={goHome}>
                <img src={logo} alt=""/>
                <h6>Rawplug Managment</h6>
            </div>
            <div className={styles.Wrapper }>
                <div className={burger ? styles.NavBarBurger : styles.NavBar}>
                    {publicRoutes.map( ({path, label}, index) =>
                        <Link key={index} to={path} >{label}</Link>
                    )}
                </div>
            </div>
        </div>
    )
};

export default Navbar;