import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/storeHooks";
import {Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from "@mui/material";
import styles from './Home.module.css'
import MyButton from "../../components/MyButton/MyButton";
import Warehouse from "./Warehouse/Warehouse";
import {Link, useNavigate} from "react-router-dom";
import {
    ADD_ITEM_ROUTE,
    ADD_PALLET_ROUTE,
    ADD_PLAN_ROUTE,
    BARREL_STATS_ROUTE,
    CHECK_PLANS_ROUTE,
    CREATE_ITEM_ROUTE,
    FIND_ITEM_ROUTE,
    HOME_ROUTE,
    ITEMS_GRID_ROUTE,
    MIXERS_RECEIPTS_ROUTE, NAP02_ROUTE,
    NAP03_ROUTE,
    RECEIPT_REPORT_ROUTE,
    REMOVED_ROUTE,
    WAREHOUSE_ROUTE
} from "../../utils/consts";
import CurrentPlan from "./CurrentPlan/CurrentPlan";
import {ExpandMore} from "@mui/icons-material";

import NotEnough from "./NotEnough/NotEnough";
import LastActions from "./LastActions/LastActions";


import AddBoxIcon from '@mui/icons-material/AddBox';
import SearchIcon from '@mui/icons-material/Search';
import ListIcon from '@mui/icons-material/List';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import MoveUpIcon from '@mui/icons-material/MoveUp';
import BlenderIcon from '@mui/icons-material/Blender';

import DataThresholdingIcon from '@mui/icons-material/DataThresholding';

const Home: FC = () => {
    const {items, loading, error} = useAppSelector(state => state.items)
    const user = useAppSelector(state => state.user.user)


    return (
        <div className={styles.Main}>
            <div style={{filter: user === null ? "blur(5px)" : "", pointerEvents: user === null ? "none": "auto"}} className={styles.div1}>
                <Stack>
                    <Accordion className={styles.Details} defaultExpanded={true}>
                        <AccordionSummary
                            expandIcon={<ExpandMore/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography><article><WarehouseIcon /></article></Typography>
                        </AccordionSummary>
                        <AccordionDetails className={styles.DetailsWrapper}>
                            <MyButton><Link to={ADD_ITEM_ROUTE}><AddBoxIcon /></Link></MyButton>
                            <MyButton><Link to={CREATE_ITEM_ROUTE}><NoteAddIcon /></Link></MyButton>
                            <MyButton><Link to={REMOVED_ROUTE}><PlaylistRemoveIcon /></Link></MyButton>
                            <MyButton><Link to={WAREHOUSE_ROUTE}><SearchIcon /></Link></MyButton>
                            <MyButton><Link to={ITEMS_GRID_ROUTE}><ListIcon /></Link></MyButton>
                            <MyButton><Link to={BARREL_STATS_ROUTE}><FeaturedPlayListIcon /></Link></MyButton>
                            <MyButton><Link to={RECEIPT_REPORT_ROUTE}><ReceiptLongIcon /></Link></MyButton>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={styles.Details} defaultExpanded={false}>
                        <AccordionSummary
                            expandIcon={<ExpandMore/>}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography><article><FactCheckIcon /></article></Typography>
                        </AccordionSummary>
                        <AccordionDetails className={styles.DetailsWrapper}>
                            <MyButton><Link style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 4
                            }} to={HOME_ROUTE}><DataThresholdingIcon />01</Link></MyButton>
                            <MyButton><Link style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 4
                            }} to={NAP02_ROUTE}><DataThresholdingIcon />02</Link></MyButton>
                            <MyButton><Link style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 4
                            }} to={NAP03_ROUTE}><DataThresholdingIcon />03</Link></MyButton>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={styles.Details} defaultExpanded={false}>
                        <AccordionSummary
                            expandIcon={<ExpandMore/>}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography><article><PendingActionsIcon /></article></Typography>
                        </AccordionSummary>
                        <AccordionDetails className={styles.DetailsWrapper}>
                            <MyButton><Link to={ADD_PLAN_ROUTE}>Add</Link></MyButton>
                            <MyButton><Link to={CHECK_PLANS_ROUTE}>Check</Link></MyButton>
                        </AccordionDetails>
                    </Accordion>
                </Stack>
            </div>
            <div style={{filter: user === null ? "blur(5px)" : "", pointerEvents: user === null ? "none": "auto"}} className={styles.div2}>
                <CurrentPlan />
            </div>
            <div style={{filter: user === null ? "blur(5px)" : "", pointerEvents: user === null ? "none": "auto"}} className={styles.div3}>
                <Typography variant="caption" display="block" gutterBottom>
                    Warehouse | in progress...
                </Typography>
                <hr/>
                <Warehouse loading={loading} error={error} items={items} />
            </div>
            <div style={{filter: user === null ? "blur(5px)" : "", pointerEvents: user === null ? "none" : "auto"}} className={styles.div4}>
                <NotEnough />
            </div>
            <div style={{filter: user === null ? "blur(5px)" : "", pointerEvents: user === null ? "none": "auto"}} className={styles.div5}>
                <Typography variant="caption" display="block" gutterBottom>
                    Last actions (5)
                </Typography>
                <LastActions />
            </div>
        </div>
    );
};

export default Home;