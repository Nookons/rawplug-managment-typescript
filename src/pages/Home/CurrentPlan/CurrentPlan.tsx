import React, {useEffect, useState} from 'react';
import styles from './CurrentPlan.module.css'
import {useAppSelector} from "../../../hooks/storeHooks";
import dayjs from "dayjs";
import CartridgePie from "./dep/CartridgePie";
import PistonsPie from "./dep/PistonsPie";
import BarrelsPie from "./dep/BarrelsPie";



const CurrentPlan = () => {
    const {items, loading, error} = useAppSelector(state => state.items)
    const lastUpdate = dayjs().format('dddd, MMMM DD, YYYY [at] HH:mm  ')



    return (
        <div className={styles.Main}>
            <div className={styles.PieStyles}>
                <h5>Cartridges (310 ml)</h5>
                <hr/>
                <CartridgePie />
            </div>
            <div className={styles.PieStyles}>
                <h5>Nozzles</h5>
                <hr/>
                <PistonsPie />
            </div>
        </div>
    );
};

export default CurrentPlan;