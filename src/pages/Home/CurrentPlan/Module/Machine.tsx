import React, {FC} from 'react';
import styles from "../CurrentPlan.module.css";
import {Slider, Stack} from "@mui/material";
import {IPlanItems} from "../../../../types/Plans";
import Battery2BarIcon from "@mui/icons-material/Battery2Bar";
import Battery4BarIcon from "@mui/icons-material/Battery4Bar";
import Battery6BarIcon from "@mui/icons-material/Battery6Bar";

interface MachineProps {
    index: number;
    isReady?: boolean;
    planItem: IPlanItems;
}

const Machine: FC<MachineProps> = ({index, isReady, planItem}) => {

    const marks = [
        {
            value: planItem.planQta / 4,
            label: <Battery2BarIcon  />,
        },
        {
            value: planItem.planQta / 2,
            label: <Battery4BarIcon />,
        },
        {
            value: planItem.planQta / 4 + planItem.planQta / 2,
            label: <Battery6BarIcon />,
        },
    ];

    return (
        <div key={index} style={{ backgroundColor: isReady ? '#b3ff86' : null }} className={styles.PlanItem}>
            <article>📋 {planItem.index} ({planItem.planQta.toLocaleString()})
                | ⬅ {planItem.planQta - planItem.ready}</article>
            <div style={{padding: '4px 24px'}}>
                <Stack spacing={2} direction="row" sx={{mb: 2}} alignItems="center">
                    <Slider
                        valueLabelDisplay="on"
                        aria-label="Custom marks"
                        value={planItem.ready}
                        max={planItem.planQta}
                        marks={marks}
                    />
                </Stack>
            </div>
        </div>
    );
};

export default Machine;