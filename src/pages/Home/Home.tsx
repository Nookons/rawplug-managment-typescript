import React, {FC} from 'react';
import {useAppSelector} from "../../hooks/storeHooks";
import {Accordion, AccordionDetails, AccordionSummary, Button, Stack, Typography} from "@mui/material";
import styles from './Home.module.css'
import Warehouse from "./Warehouse/Warehouse";
import {Link} from "react-router-dom";
import {
    ADD_ITEM_ROUTE, ADD_PALLET_ROUTE, ADD_SOLO_BARREL,
    BARREL_STATS_ROUTE,
    CREATE_ITEM_ROUTE, DISPLAY_ROUTE, INFO_READY_PALLET_ROUTE,
    ITEMS_GRID_ROUTE,
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


const Home: FC = () => {
    const {items, loading, error} = useAppSelector(state => state.items)
    const user = useAppSelector(state => state.user.user)


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
                            <Link to={CREATE_ITEM_ROUTE}><Button fullWidth={true} variant={"contained"}><NoteAddIcon /></Button></Link>
                            <Link to={REMOVED_ROUTE}><Button fullWidth={true} variant={"contained"}><PlaylistRemoveIcon /></Button></Link>
                            <Link to={WAREHOUSE_ROUTE}><Button fullWidth={true} variant={"contained"}><SearchIcon /></Button></Link>
                            <Link to={ITEMS_GRID_ROUTE}><Button fullWidth={true} variant={"contained"}><ListIcon /></Button></Link>
                            <Link to={BARREL_STATS_ROUTE}><Button fullWidth={true} variant={"contained"}><FeaturedPlayListIcon /></Button></Link>
                            <Link to={RECEIPT_REPORT_ROUTE}><Button fullWidth={true} variant={"contained"}><ReceiptLongIcon /></Button></Link>
                            <Link to={ADD_SOLO_BARREL}><Button fullWidth={true} variant={"contained"}><PlaylistAddCircleIcon /></Button></Link>
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
                            <Link to={ADD_PALLET_ROUTE}><Button fullWidth={true} variant={"contained"}><AddBoxIcon /></Button></Link>
                            <Link to={DISPLAY_ROUTE}><Button fullWidth={true} variant={"contained"}><ArtTrackIcon /></Button></Link>
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