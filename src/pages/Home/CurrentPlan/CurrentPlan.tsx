import React from 'react';
import styles from './CurrentPlan.module.css'
import {useAppSelector} from "../../../hooks/storeHooks";
import dayjs from "dayjs";
import LastPallets from "./Module/LastPallets";
import MachineWrapper from "./Module/MachineWrapper";
import {Alert} from "@mui/material";



const CurrentPlan = () => {

    const lastUpdate = dayjs().format('dddd, MMMM DD, YYYY [at] HH:mm  ')


    return (
        <div className={styles.Main}>
            <p>Last update: {lastUpdate}</p>
            <MachineWrapper />
            <LastPallets />
        </div>
    );
};

export default CurrentPlan;