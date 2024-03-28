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
    ADD_PLAN_ROUTE, BARREL_STATS_ROUTE,
    CHECK_PLANS_ROUTE, FIND_ITEM_ROUTE,
    ITEMS_GRID_ROUTE, RECEIPT_REPORT_ROUTE
} from "../../utils/consts";
import CurrentPlan from "./CurrentPlan/CurrentPlan";
import {ExpandMore} from "@mui/icons-material";

import NotEnough from "./NotEnough/NotEnough";

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
                            <Typography><article>Warehouse</article></Typography>
                        </AccordionSummary>
                        <AccordionDetails className={styles.DetailsWrapper}>
                            <MyButton><Link to={ADD_ITEM_ROUTE}>Add</Link></MyButton>
                            <MyButton><Link to={FIND_ITEM_ROUTE}>Search</Link></MyButton>
                            <MyButton><Link to={ITEMS_GRID_ROUTE}>List</Link></MyButton>
                            <MyButton><Link to={BARREL_STATS_ROUTE}>Barrels list</Link></MyButton>
                            <MyButton><Link to={RECEIPT_REPORT_ROUTE}>Report</Link></MyButton>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={styles.Details} defaultExpanded={true}>
                        <AccordionSummary
                            expandIcon={<ExpandMore/>}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography><article>Ready production</article></Typography>
                        </AccordionSummary>
                        <AccordionDetails className={styles.DetailsWrapper}>
                            <MyButton><Link to={ADD_PALLET_ROUTE}>Add</Link></MyButton>
                            <MyButton   click={() => alert('In progress...')}><Link>Find</Link></MyButton>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={styles.Details} defaultExpanded={false}>
                        <AccordionSummary
                            expandIcon={<ExpandMore/>}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography><article>Plans</article></Typography>
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
                <p>Warehouse</p>
                <hr/>
                <Warehouse loading={loading} error={error} items={items} />
            </div>
            <div style={{filter: user === null ? "blur(5px)" : "", pointerEvents: user === null ? "none" : "auto"}} className={styles.div4}>
                <NotEnough />
            </div>
            <div style={{filter: user === null ? "blur(5px)" : "", pointerEvents: user === null ? "none": "auto"}} className={styles.div5}>
                <p>Last actions</p>
            </div>
        </div>
    );
};

export default Home;