import React, {useEffect, useRef, useState} from 'react';
import {useAppSelector} from "../../../hooks/storeHooks";
import {useNavigate} from "react-router-dom";
import {ITEM_ROUTE} from "../../../utils/consts";
import {IItem} from "../../../types/Item";
import {
    Button, FormControlLabel, FormGroup,
    Skeleton, Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow, ToggleButton, ToggleButtonGroup
} from "@mui/material";
import {useReactToPrint} from "react-to-print";
import Grid from "./Grid";

import styles from '../Print/Print.module.css'
import MyButton from "../../../components/MyButton/MyButton";

import PrintIcon from '@mui/icons-material/Print';
import dayjs from "dayjs";



const ItemsGrid = () => {
    const navigate = useNavigate();
    const {items, loading, error} = useAppSelector(state => state.items)

    const [revertArray, setRevertArray] = useState<IItem[]>([]);

    const currentDate = dayjs().format("YYYY-MM-dddd [at] HH:mm")



    const onItemClick = (id: number) => {
        navigate(ITEM_ROUTE + "?_" + id);
    }

    useEffect(() => {
        if (items && items.length > 0) {
            const tempArray = [...items].reverse();
            setRevertArray(tempArray);
        }
    }, [items, loading]);

    const contentToPrint = useRef(null);

    const handlePrint = useReactToPrint({
        documentTitle: "GRID ITEMS PDF",
        pageStyle: "a4",
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
    });


    const [alignment, setAlignment] = React.useState('Q-CM-EPOXID-A');

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
    };

    const [isPrintSelect, setIsPrintSelect] = useState<boolean>(false);

    const [isShowBarrelWeight, setIsShowBarrelWeight] = useState<boolean>(false);

    return (
        <div style={{padding: 14, backgroundColor: 'white'}}>
            <div  className={styles.Main} ref={contentToPrint}>
                <h5>{alignment}</h5>
                <article>Print date ( {currentDate} )</article>
                <hr/>

                <div className={styles.Wrapper}>
                    {
                        items.map((e: IItem) => {

                            let CM: string = '';
                            let CMB: string = '';

                            switch (alignment) {
                                case 'EPOXID-B':
                                    CM = 'Q-CM-EPOXID-B'
                                    CMB = 'Q-CMB-EPOXID-B'
                                    break
                                case 'EPOXID-A':
                                    CM = 'Q-CM-EPOXID-A'
                                    CMB = 'Q-CMB-EPOXID-A'
                                    break
                                case 'PSF-STAND':
                                    CM = 'Q-CM-PSF-STAND-V3'
                                    CMB = 'Q-CMB-PSF-STAND-V3'
                                    break
                            }

                            if (e.type.toLowerCase() === "barrel" && (e.index === CM || e.index === CMB)) {

                                const rootClasses = [styles.PrintItem]

                                if (isShowBarrelWeight) {
                                    rootClasses.push(styles.ActiveBarrel)
                                }

                                return (
                                    <div className={rootClasses.join(' ')}>
                                        <TableCell><p>{e.index}</p></TableCell>
                                        <TableCell><p>{e.createdDate}</p></TableCell>
                                        <TableCell><p>Batch: {e.batchNumber}</p></TableCell>
                                        <TableCell><p>{e.status}</p></TableCell>
                                        <TableCell><p>{e.quantity} | {e.JM}</p></TableCell>
                                        {isShowBarrelWeight
                                        ?
                                            <TableCell>
                                                <p>1. {e.barrel?.first} | {e.JM}</p>
                                                <p>2. {e.barrel?.secondary} | {e.JM}</p>
                                                <p>3. {e.barrel?.third} | {e.JM}</p>
                                                <p>4. {e.barrel?.four} | {e.JM}</p>
                                            </TableCell>
                                        : null
                                        }
                                        <TableCell><p>For search: {e.id.toString().slice(8, 13)}</p></TableCell>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch
                            value={isPrintSelect}
                            onChange={(e) => setIsPrintSelect(!isPrintSelect)}
                        />
                    }
                    label={<article>Barrel print</article>}
                />
            </FormGroup>
            {
                isPrintSelect
                ?
                    <div style={{display: "flex", flexDirection: 'column', gap: 8}}>
                        <FormControlLabel
                            control={
                                <Switch
                                    value={isShowBarrelWeight}
                                    onChange={(e) => setIsShowBarrelWeight(!isShowBarrelWeight)}
                                />
                            }
                            label={<article>Show barrel weight when printing?</article>}
                        />
                        <ToggleButtonGroup
                            color="primary"
                            orientation="vertical"
                            size="small"
                            value={alignment}
                            exclusive
                            onChange={handleChange}
                            aria-label="Platform"
                        >
                            <ToggleButton value="EPOXID-A">Epoxid A</ToggleButton>
                            <ToggleButton value="EPOXID-B">Epoxid B</ToggleButton>
                            <ToggleButton value="PSF-STAND">PSF-STAND</ToggleButton>
                            <ToggleButton value="PSF-ZIMA">PSF-ZIMA</ToggleButton>
                            <ToggleButton value="PSF-LATO">PSF-LATO</ToggleButton>
                            <ToggleButton value="PSF-STONE">PSF-STONE</ToggleButton>
                            <ToggleButton value="PSF-GREY">PSF-GREY</ToggleButton>
                            <ToggleButton value="HYBRYDA-STANDART">HYBRYDA-STANDART</ToggleButton>
                            <ToggleButton value="HYBRYDA-LATO">HYBRYDA-LATO</ToggleButton>
                            <ToggleButton value="HYBRYDA-ZIMA">HYBRYDA-ZIMA</ToggleButton>
                        </ToggleButtonGroup>

                        <MyButton click={() => {
                            handlePrint(null, () => contentToPrint.current);
                        }}>
                            <PrintIcon />
                        </MyButton>
                    </div>
                    : <p>You can print stats for barrels, just switch on top</p>
            }
                <hr/>
                <div>
                    {!loading
                        ? <Grid revertArray={revertArray}/>
                        : <Skeleton variant="rectangular" style={{padding: '14px !important'}} width={'100%'} height={'60dvh'}/>
                    }
                </div>
        </div>
    );
};

export default ItemsGrid;