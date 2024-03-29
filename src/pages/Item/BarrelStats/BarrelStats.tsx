import React, {FC, useCallback, useEffect, useState} from 'react';
import {useAppSelector} from "../../../hooks/storeHooks";
import {
    Alert,
    Autocomplete,
    Backdrop,
    CircularProgress,
    TextField
} from "@mui/material";
import BarrelList from "./BarrelList";

const BarrelStats: FC = () => {
    const {items, loading, error} = useAppSelector(state => state.items)

    const [uniqueIndex, setUniqueIndex] = useState([]);
    const [searchType, setSearchType] = useState<string | null>(null);


    useEffect(() => {
        const uniqueValues = {};

        items.forEach(item => {
            if (item.type.toLowerCase() !== 'barrel') {
                return
            }
            if (!uniqueValues[item.index]) {
                uniqueValues[item.index] = true;
            }
        });

        const uniqueIndexes = Object.keys(uniqueValues);
        setUniqueIndex(uniqueIndexes);
    }, [items]);


    if (items && !loading && !error) {
        return (
            <div style={{padding: 14, minHeight: "calc(100dvh - 160px)"}}>
                <Autocomplete
                    disablePortal
                    options={uniqueIndex}
                    value={searchType}
                    onChange={(event, value) => setSearchType(value)}
                    renderInput={(params) => <TextField {...params} label="Avialeble types"/>}
                    fullWidth={true}
                    size={"medium"}
                    autoFocus={false}
                />

                {
                    !searchType?.length
                        ? <div>
                            <Alert severity="info" style={{marginTop: 14}} variant={"filled"}>You not selected any items for
                                search</Alert>
                        </div>
                        : <BarrelList searchType={searchType} items={items}/>
                }
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