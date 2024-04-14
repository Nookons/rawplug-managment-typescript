import React, {FC, useState} from 'react';
import styles from "../CurrentPlan.module.css";
import {Backdrop, CircularProgress, IconButton, Slider, Stack} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import dayjs from "dayjs";
import {useAppSelector} from "../../../../hooks/storeHooks";
import {onAddPallet} from "../../../../utils/plans/AddPallet";
import {IPlanItems} from "../../../../types/Plans";

interface FullViewProps {
    planItem: IPlanItems
    statusView: boolean;
    setStatusView: () => void;
    nap: string;
}

const getMachineIndex = (data: string) => {
    switch (data) {
        case "Nap - 01":
            return "first"
        case "Nap - 02":
            return "secondary"
        case "Nap - 03":
            return "third"
    }
}

const FullView:FC<FullViewProps> = ({planItem, statusView, setStatusView, nap}) => {
    const {items, loading, error} = useAppSelector(state => state.plans)
    const [user, setUser] = useState({
        email: "testEmail@gmail.com"
    });

    const currentDate = dayjs().format('dddd, MMMM DD, YYYY [at] HH:mm  ')

    const [isSending, setIsSending] = useState(false);
    const [addValue, setAddValue] = useState<number>(400);

    const FullMarks = [
        {
            value: planItem.ready,
            label: <p>{planItem.ready.toLocaleString()}</p>,
        },
        {
            value: planItem.planQta,
            label: <p>{planItem.planQta.toLocaleString()}</p>,
        },
    ];

    const onAddClick = async () => {
        const data = {
            index: planItem.index,
            quantity: addValue,
            machineIndex: getMachineIndex(nap)
        }
        try {
            setIsSending(true)
            const response = await onAddPallet(data, user, items)
            console.log(response);
        } catch (e) {
            console.log(e)
        }
        finally {
            setTimeout(() => {
                setIsSending(false)
            }, 250)
        }
    }

    return (
        <div className={styles.PlanItemFullView}>
            <Backdrop style={{zIndex: 2}} open={isSending}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <div>
                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 14,
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                    <article>{planItem.index}</article>
                    <p>Last update: {currentDate}</p>
                    <IconButton onClick={() => setStatusView(false)} aria-label="Cancel">
                        <CancelIcon/>
                    </IconButton>
                </div>
                <p>{planItem.description}</p>
            </div>

            <div className={styles.PlanItemGridMenu}>
                <div>
                    <p>Last pallet added: Sunday, March 10, 2024 at 00:16</p>
                    <Stack spacing={3} direction="column" sx={{m: 2}} alignItems="center">
                        <Slider
                            valueLabelDisplay="auto"
                            aria-label="Custom marks"
                            value={planItem.ready}
                            max={planItem.planQta}
                            marks={FullMarks}
                        />
                    </Stack>
                </div>
            </div>
        </div>
    );
};

export default FullView;