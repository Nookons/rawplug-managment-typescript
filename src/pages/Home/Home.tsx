import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/storeHooks";
import {
    Accordion, AccordionDetails, AccordionSummary,
    Autocomplete,
    Divider,
    FormControlLabel,
    FormGroup,
    InputAdornment,
    OutlinedInput, Slider, Stack,
    Switch,
    TextField, Typography
} from "@mui/material";
import styles from './Home.module.css'
import MyButton from "../../components/MyButton/MyButton";
import Warehouse from "./Warehouse/Warehouse";
import {useNavigate} from "react-router-dom";
import {
    ADD_ITEM_ROUTE,
    ADD_PALLET_ROUTE,
    ADD_PLAN_ROUTE,
    CHECK_PLANS_ROUTE, FIND_ITEM_ROUTE,
    ITEMS_GRID_ROUTE
} from "../../utils/consts";
import CurrentPlan from "./CurrentPlan/CurrentPlan";
import MyModal from "../../components/Modal/MyModal";
import {ExpandMore} from "@mui/icons-material";
import {IPallets} from "../../types/Pallet";

import tempStyles from './CurrentPlan/CurrentPlan.module.css'

const Home: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const {items, loading, error} = useAppSelector(state => state.items)
    const [visible, setVisible] = useState<boolean>(false);

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
                            <Typography><article>Warehouse</article></Typography>
                        </AccordionSummary>
                        <AccordionDetails className={styles.DetailsWrapper}>
                            <MyButton   click={() => navigate(ADD_ITEM_ROUTE)}>Add item</MyButton>
                            <MyButton   click={() => navigate(FIND_ITEM_ROUTE)}>Find item</MyButton>
                            <MyButton   click={() => navigate(ITEMS_GRID_ROUTE)}>Items Grid</MyButton>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={styles.Details} defaultExpanded={false}>
                        <AccordionSummary
                            expandIcon={<ExpandMore/>}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography><article>Ready production</article></Typography>
                        </AccordionSummary>
                        <AccordionDetails className={styles.DetailsWrapper}>
                            <MyButton   click={() => navigate(ADD_PALLET_ROUTE)} >Add Pallet</MyButton>
                            <MyButton   click={() => alert('In progress...')}>Find Pallet</MyButton>
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
                            <MyButton   click={() => navigate(ADD_PLAN_ROUTE)}>Add Plan</MyButton>
                            <MyButton   click={() => navigate(CHECK_PLANS_ROUTE)}>Check Plans</MyButton>
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
            <div style={{filter: user === null ? "blur(5px)" : "", pointerEvents: user === null ? "none" : "auto"}}
                 className={styles.div4}>
                <p>Not enough ( Not working now... )</p>
                <hr/>
                <div className={tempStyles.NeedWrapper}>
                    <div style={{backgroundColor: '#ff7373'}} className={tempStyles.NeedItem}>
                        <h6>R-NOZ-10-M〵Z</h6>
                        <p>4500 | 3400 📦</p>
                    </div>
                    <div style={{backgroundColor: '#ff7373'}} className={tempStyles.NeedItem}>
                        <h6>OZ-U-255-164-295</h6>
                        <p>1200 | 800 📦</p>
                    </div>
                    <div style={{backgroundColor: '#ff7373'}} className={tempStyles.NeedItem}>
                        <h6>KRP-ST-PISTON</h6>
                        <p>6500 | 2400 📦</p>
                    </div>
                </div>
            </div>
            <div style={{filter: user === null ? "blur(5px)" : "", pointerEvents: user === null ? "none": "auto"}} className={styles.div5}>
                <p>Last actions</p>
            </div>
        </div>
    );
};

export default Home;