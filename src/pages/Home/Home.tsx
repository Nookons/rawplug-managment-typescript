import React, {FC, useEffect, useState} from 'react';
import {useAppSelector} from "../../hooks/storeHooks";
import {Accordion, AccordionDetails, AccordionSummary, Button, Stack, Typography} from "@mui/material";
import styles from './Home.module.css'
import Warehouse from "./Warehouse/Warehouse";
import {Link, useNavigate} from "react-router-dom";
import {
    ADD_ITEM_ROUTE, ADD_NEW_USER_ROUTE, ADD_PALLET_ROUTE, ADD_PALLET_TEMPLATE, ADD_SOLO_BARREL,
    BARREL_STATS_ROUTE,
    CREATE_ITEM_ROUTE, DISPLAY_ROUTE, INFO_READY_PALLET_ROUTE,
    ITEMS_GRID_ROUTE, MACHINE_SCREEN_ROUTE,
    RECEIPT_REPORT_ROUTE,
    REMOVED_ROUTE,
    WAREHOUSE_ROUTE
} from "../../utils/consts";
import CurrentPlan from "./CurrentPlan/CurrentPlan";
import {ExpandMore} from "@mui/icons-material";


import AddBoxIcon from '@mui/icons-material/AddBox';
import SearchIcon from '@mui/icons-material/Search';
import ListIcon from '@mui/icons-material/List';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';

import Diversity1Icon from '@mui/icons-material/Diversity1';
import InfoIcon from '@mui/icons-material/Info';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {doc, onSnapshot} from "firebase/firestore";
import {db} from "../../firebase";
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';

const Home: FC = () => {
    const {items, loading, error} = useAppSelector(state => state.items)
    const navigate = useNavigate();
    const user = useAppSelector(state => state.user.user)

    const [loadData, setLoadData] = useState();

    useEffect(() => {
        if (user) {
            const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
                const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
                if (doc.exists()) {
                    setLoadData(doc.data())
                }
            });
        }
    }, []);

    useEffect(() => {
        if (loadData) {
            switch (loadData.role) {
                case "machine":
                    navigate(MACHINE_SCREEN_ROUTE)
                    break
                default:
                    break
            }
        }
    }, [loadData]);

    return (
        <div className={styles.Main}>
            <div style={{filter: user === null ? "blur(5px)" : "", pointerEvents: user === null ? "none": "auto"}} className={styles.div1}>
                <Stack>
                    <Accordion className={styles.Details} defaultExpanded={false}>
                        <AccordionSummary
                            expandIcon={<ExpandMore/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography><WarehouseIcon /></Typography>
                        </AccordionSummary>
                        <AccordionDetails className={styles.DetailsWrapper}>
                            <Link to={ADD_ITEM_ROUTE}><Button fullWidth={true} variant={"contained"}><AddBoxIcon /></Button></Link>
                            <Link to={ADD_NEW_USER_ROUTE}><Button fullWidth={true} variant={"contained"}><PersonAddIcon /></Button></Link>
                            <Link to={CREATE_ITEM_ROUTE}><Button fullWidth={true} variant={"contained"}><NoteAddIcon /></Button></Link>
                            {/*<Link to={REMOVED_ROUTE}><Button fullWidth={true} variant={"contained"}><PlaylistRemoveIcon /></Button></Link>*/}
                            <Link to={WAREHOUSE_ROUTE}><Button fullWidth={true} variant={"contained"}><SearchIcon /></Button></Link>
                            <Link to={ITEMS_GRID_ROUTE}><Button fullWidth={true} variant={"contained"}><ListIcon /></Button></Link>
                            <Link to={BARREL_STATS_ROUTE}><Button fullWidth={true} variant={"contained"}><FeaturedPlayListIcon /></Button></Link>
                            <Link to={RECEIPT_REPORT_ROUTE}><Button fullWidth={true} variant={"contained"}><ReceiptLongIcon /></Button></Link>
                            {/*<Link to={ADD_SOLO_BARREL}><Button fullWidth={true} variant={"contained"}><PlaylistAddCircleIcon /></Button></Link>*/}
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={styles.Details} defaultExpanded={false}>
                        <AccordionSummary
                            expandIcon={<ExpandMore/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography><Diversity1Icon /></Typography>
                        </AccordionSummary>
                        <AccordionDetails className={styles.DetailsWrapper}>
                            <Link to={INFO_READY_PALLET_ROUTE}><Button fullWidth={true} variant={"contained"}><InfoIcon /></Button></Link>
                            <Link to={MACHINE_SCREEN_ROUTE}><Button fullWidth={true} variant={"contained"}><ScreenSearchDesktopIcon /></Button></Link>
                            <Link to={ADD_PALLET_ROUTE}><Button fullWidth={true} variant={"contained"}><AddBoxIcon /></Button></Link>
                            <Link to={DISPLAY_ROUTE}><Button fullWidth={true} variant={"contained"}><ArtTrackIcon /></Button></Link>
                            <Link to={ADD_PALLET_TEMPLATE}><Button fullWidth={true} variant={"contained"}><NoteAddIcon /></Button></Link>
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
        </div>
    );
};

export default Home;