import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector } from "../../../hooks/storeHooks";
import { IItem } from "../../../types/Item";
import Grid from "./Grid";

import dayjs from "dayjs";
import { useReactToPrint } from 'react-to-print';
import Print from "../Print/Print";

import {
    Button, FormControlLabel, FormGroup,
    Skeleton, Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow, ToggleButton, ToggleButtonGroup
} from "@mui/material";

import styles from '../Print/Print.module.css'
import ComponentToPrint from "../Print/Print";
import MyButton from "../../../components/MyButton/MyButton";
import PrintIcon from '@mui/icons-material/Print';


const ItemsGrid = () => {
    const { items, loading, error } = useAppSelector(state => state.items)
    const [revertArray, setRevertArray] = useState<IItem[]>([]);

    const currentDate = dayjs().format('dddd, MMMM DD, YYYY [at] HH:mm  ')


    const [isPrintSelect, setIsPrintSelect] = useState<boolean>(false);
    const [isShowBarrelWeight, setIsShowBarrelWeight] = useState<boolean>(false);

    const [alignment, setAlignment] = useState('');

    const [allQuantity, setAllQuantity] = useState<number>(0);

    useEffect(() => {
        if (items && items.length > 0) {
            const tempArray = [...items].reverse();
            setRevertArray(tempArray);
        }
    }, [items, loading]);

    useEffect(() => {
        let CM: string = '';
        let CMB: string = '';

        setAllQuantity(0)

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
        revertArray.map((item: IItem) => {
            if (item.index === CM || item.index === CMB) {
                setAllQuantity(prevQuantity => prevQuantity + item.quantity);
            }
        })
    }, [alignment]);

    const contentToPrint = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        content: () => contentToPrint.current,
        documentTitle: "🛢️" + alignment + " | " + currentDate,
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
    });


    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
    };

    return (
        <div style={{ padding: 14, backgroundColor: 'white', overflow: 'hidden' }}>

            <div style={{display: "flex"}}>
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
            </div>
            {
                isPrintSelect
                    ?
                    <div style={{margin: "14px 0", display: "flex", flexWrap: "wrap", flexDirection: "column", alignItems: "center", gap: 14}}>
                        <ToggleButtonGroup
                            color="primary"
                            orientation="horizontal"
                            size="small"
                            value={alignment}
                            exclusive
                            onChange={handleChange}
                            aria-label="Platform"
                        >
                            <ToggleButton value="EPOXID-A">Epoxid A</ToggleButton>
                            <ToggleButton value="EPOXID-B">Epoxid B</ToggleButton>
                            <ToggleButton value="PSF-STAND">PSF-STAND</ToggleButton>
                           {/* <ToggleButton value="PSF-ZIMA">PSF-ZIMA</ToggleButton>
                            <ToggleButton value="PSF-LATO">PSF-LATO</ToggleButton>
                            <ToggleButton value="PSF-STONE">PSF-STONE</ToggleButton>
                            <ToggleButton value="PSF-GREY">PSF-GREY</ToggleButton>*/}
                            {/*<ToggleButton value="HYBRYDA-STANDART">HYBRYDA-STANDART</ToggleButton>*/}
                            {/*<ToggleButton value="HYBRYDA-LATO">HYBRYDA-LATO</ToggleButton>
                            <ToggleButton value="HYBRYDA-ZIMA">HYBRYDA-ZIMA</ToggleButton>*/}
                        </ToggleButtonGroup>

                        <MyButton click={handlePrint}>
                            <PrintIcon />
                        </MyButton>
                        <div style={{display: "flex", margin: 14}}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        size={"small"}
                                        value={isShowBarrelWeight}
                                        onChange={(e) => setIsShowBarrelWeight(!isShowBarrelWeight)}
                                    />
                                }
                                label={<p>Show barrel weight when printing?</p>}
                            />
                        </div>
                    </div>
                    : <p>You can print stats for barrels, just switch on top</p>
            }
            <div>
                {!loading
                    ? <Grid revertArray={revertArray} />
                    : <Skeleton variant="rectangular" style={{ padding: '14px !important' }} width={'100%'}
                                height={'60dvh'} />
                }
            </div>

            {isPrintSelect
                ? <ComponentToPrint ref={contentToPrint} allQuantity={allQuantity} currentDate={currentDate} items={revertArray} alignment={alignment} isShowBarrelWeight={isShowBarrelWeight} />
                : null
            }
        </div>
    );
};

export default ItemsGrid;
