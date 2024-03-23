import React, {useCallback, useEffect, useState} from 'react';
import {useAppSelector} from "../../../hooks/storeHooks";
import {
    Backdrop,
    Button,
    ButtonGroup,
    CircularProgress,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup
} from "@mui/material";
import BarrelList from "./BarrelList";
import styles from './BarrelStats.module.css'

const BarrelStats = () => {
    const {items, loading, error} = useAppSelector(state => state.items)

    const [uniqueIndex, setUniqueIndex] = useState([]);
    const [searchType, setSearchType] = useState('Q-CM-EPOXID-A');


    useEffect(() => {
        const uniqueValues = {};

        items.forEach(item => {
            if (!uniqueValues[item.index]) {
                uniqueValues[item.index] = true;
            }
        });

        const uniqueIndexes = Object.keys(uniqueValues);
        setUniqueIndex(uniqueIndexes);
    }, [items]);


    const onChangeType = useCallback((event: HTMLDivElement.MouseEvent) => {
        setSearchType(event.target.value)
    }, []);

    useEffect(() => {
        console.log(searchType);
    }, [searchType]);

    if(items && !loading && !error) {
        return (
            <div style={{padding: 14, minHeight: "calc(100dvh - 170px)"}}>
                <h5>Avialeble types:</h5> <hr/>
                <RadioGroup
                    aria-label="barrels"
                    defaultValue="Q-CM-EPOXID-A"
                    name="radio-buttons-group"
                    className={styles.RadioWrapper}
                >
                    {uniqueIndex.map((el, index) => (
                        <FormControlLabel
                            value={el}
                            control={<Radio color={el === searchType ? "success" : "secondary"}/>}
                            style={{backgroundColor: el === searchType ? "#b7ffc3" : "#dde8ff"}}
                            label={<p style={{whiteSpace: "nowrap"}}>{el}</p>}
                            className={styles.RadioItem}
                            labelPlacement="end"
                            onClick={(event) => onChangeType(event)}
                        />
                    ))}
                </RadioGroup>
                <BarrelList searchType={searchType} items={items}/>
            </div>
        );
    }

    if (loading) {
        return (
            <div style={{padding: 14, minHeight: "calc(100dvh - 157px)"}}>
                <Backdrop open={true}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
            </div>
        )
    }
};

export default BarrelStats;