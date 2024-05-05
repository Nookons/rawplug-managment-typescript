import React, {useEffect, useState} from 'react';
import styles from './CurrentPlan.module.css'
import {useAppSelector} from "../../../hooks/storeHooks";
import dayjs from "dayjs";
import CartridgePie from "./dep/CartridgePie";
import PistonsPie from "./dep/NozzlePie";
import BarrelsPie from "./dep/BarrelsPie";
import {Box, Tab, Tabs, Typography} from "@mui/material";
import FirstMachine from "./MachineDisplay/FirstMachine";
import SecondaryMachine from "./MachineDisplay/SecondaryMachine";
import ThirdMachine from "./MachineDisplay/ThirdMachine";



const CurrentPlan = () => {
    const {items, loading, error} = useAppSelector(state => state.items)
    const lastUpdate = dayjs().format('dddd, MMMM DD, YYYY [at] HH:mm  ')

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            {/*<Box className={styles.MachineBlock}>
                <FirstMachine />
                <SecondaryMachine />
                <ThirdMachine />
            </Box>*/}

            <div className={styles.Main}>
                <div className={styles.PieStyles}>
                    <h5>Cartridges</h5>
                    <hr/>
                    <CartridgePie />
                </div>
                <div className={styles.PieStyles}>
                    <h5>Nozzles</h5>
                    <hr/>
                    <PistonsPie />
                </div>
                <div className={styles.PieStyles}>
                    <h5>Barrels</h5>
                    <hr/>
                    <BarrelsPie />
                </div>
            </div>
        </>
    );
};

export default CurrentPlan;