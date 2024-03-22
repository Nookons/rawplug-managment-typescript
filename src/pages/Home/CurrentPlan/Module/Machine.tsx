import React, {FC, useState} from 'react';
import styles from "../CurrentPlan.module.css";
import {
    Backdrop,
    CircularProgress,
    FormControl,
    IconButton,
    InputAdornment,
    OutlinedInput,
    Slider,
    Stack
} from "@mui/material";
import {IPlanItems} from "../../../../types/Plans";
import Battery2BarIcon from "@mui/icons-material/Battery2Bar";
import Battery4BarIcon from "@mui/icons-material/Battery4Bar";
import Battery6BarIcon from "@mui/icons-material/Battery6Bar";
import MyButton from "../../../../components/MyButton/MyButton";
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import dayjs from "dayjs";
import {onAddPallet} from "../../../../utils/AddPallet";
import {useAppSelector} from "../../../../hooks/storeHooks";
import FullView from "./FullView";

interface MachineProps {
    isReady?: boolean;
    planItem: IPlanItems;
    nap: string;
}


const Machine: FC<MachineProps> = ({isReady, planItem, nap}) => {

    const marks = [
        {
            value: planItem.planQta / 4,
            label: <Battery2BarIcon/>,
        },
        {
            value: planItem.planQta / 2,
            label: <Battery4BarIcon/>,
        },
        {
            value: planItem.planQta / 4 + planItem.planQta / 2,
            label: <Battery6BarIcon/>,
        },
    ];

    const [statusView, setStatusView] = useState<boolean>(false);

    return (
        <>
            {
                !statusView
                    ?
                    <div onClick={() => setStatusView(true)} className={styles.PlanItem}>
                        <div>
                            <article>{planItem.index}</article>
                        </div>
                        <div>
                            <Stack spacing={2} direction="column" sx={{mb: 2}} alignItems="center">
                                <Slider
                                    valueLabelDisplay="auto"
                                    aria-label="Custom marks"
                                    value={planItem.ready}
                                    max={planItem.planQta}
                                    marks={marks}
                                />
                            </Stack>
                        </div>
                    </div>

                    : <FullView  planItem={planItem} statusView={statusView} setStatusView={setStatusView} nap={nap}/>
            }
        </>
    );
};

export default Machine;