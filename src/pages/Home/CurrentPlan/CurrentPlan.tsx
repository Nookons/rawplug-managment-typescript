import React from 'react';
import styles from './CurrentPlan.module.css'
import {useAppSelector} from "../../../hooks/storeHooks";
import dayjs from "dayjs";
import LastPallets from "./Module/LastPallets";
import MachineWrapper from "./Module/MachineWrapper";
import {Alert} from "@mui/material";



const CurrentPlan = () => {
    const {items, loading, error} = useAppSelector(state => state.plans)

    const lastUpdate = dayjs().format('YYYY-MM-DD [at] HH:mm')


    return (
        <div className={styles.Main}>
            <p>Last update: {lastUpdate}</p>
            {error
                ? <Alert severity="error">{error}</Alert>
                : <MachineWrapper />
            }
            <LastPallets />
        </div>
    );
};

export default CurrentPlan;