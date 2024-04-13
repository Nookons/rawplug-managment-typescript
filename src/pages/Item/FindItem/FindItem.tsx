import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../../../hooks/storeHooks";
import {Alert, FormControlLabel, FormGroup, Skeleton, Switch} from "@mui/material";
import styles from './FindItem.module.css'
import Search from './module/Search'
import SearchBatch from "./module/SearchBatch";
import Warehouse from "../../Warehouse/Warehouse";

const FindItem = () => {
    const {items, loading, error} = useAppSelector(state => state.items)
    const [isBatch, setIsBatch] = useState(false);

    return (
        <div className={styles.Main}>
            {!loading
                ?
                <div>
                    <FormGroup>
                        <FormControlLabel
                            control={<Switch checked={isBatch} onChange={(event, checked) => setIsBatch(checked)} />}
                            label={<article>Search by batch</article>}
                        />
                    </FormGroup>
                    {
                        !error
                            ? <div>{isBatch ? <SearchBatch items={items} /> : <Warehouse />}</div>
                            : <Alert severity="error">{error}</Alert>
                    }
                </div>
                : <Skeleton variant="rectangular" width={210} height={60}/>
            }
        </div>
    );
};

export default FindItem;