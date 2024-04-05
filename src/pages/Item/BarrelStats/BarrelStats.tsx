import React, {FC, useCallback, useEffect, useState} from 'react';
import {useAppSelector} from "../../../hooks/storeHooks";
import {
    Alert,
    Autocomplete,
    Backdrop, Button,
    CircularProgress,
    TextField
} from "@mui/material";
import BarrelList from "./BarrelList";
import MyButton from "../../../components/MyButton/MyButton";

const BarrelStats: FC = () => {
    const {items, loading, error} = useAppSelector(state => state.items)

    const [uniqueIndex, setUniqueIndex] = useState([]);
    const [searchTags, setSearchTags] = useState<string[]>([]);

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

    const onAllViewClick = () => {
        setSearchTags([]);

        uniqueIndex.forEach(element => {
            setSearchTags(prevState => [...prevState, element])
        })
    }


    if (items && !loading && !error) {
        return (
            <div style={{padding: 14, minHeight: "calc(100dvh - 160px)", display: "flex", flexDirection: "column", gap: 14}}>
                <Button onClick={onAllViewClick} variant={"contained"}>View all</Button>
                <Autocomplete
                    multiple
                    limitTags={2}
                    id="multiple-limit-tags"
                    options={uniqueIndex}
                    value={searchTags}
                    onChange={(event, value) => setSearchTags(value)}
                    getOptionLabel={(option) => <p>{option}</p>}
                    renderInput={(params) => (
                        <TextField {...params} label="Search tags" placeholder="Index"/>
                    )}
                />

                {
                    !searchTags?.length
                        ? <div>
                            <Alert severity="info" style={{marginTop: 14}} variant={"filled"}>You not selected any items for
                                search</Alert>
                        </div>
                        : <BarrelList searchTags={searchTags} items={items}/>
                }
            </div>
        );
    }

    return (
        <div style={{padding: 14, minHeight: "calc(100dvh - 157px)"}}>
            <Backdrop open={true}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </div>
    )
};

export default BarrelStats;