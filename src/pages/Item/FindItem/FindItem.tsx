import React, {useState} from 'react';
import {useAppSelector} from "../../../hooks/storeHooks";
import {Alert, FormControlLabel, FormGroup, Skeleton, Switch} from "@mui/material";
import styles from './FindItem.module.css'
import Search from './module/Search'
import SearchBatch from "./module/SearchBatch";

const FindItem = () => {
    const {items, loading, error} = useAppSelector(state => state.items)


    return (
        <div className={styles.Main}>
            {!loading
                ?
                <div>
                    {
                        !error
                            ? <SearchBatch items={items} />
                            : <Alert severity="error">{error}</Alert>
                    }
                </div>
                : <Skeleton variant="rectangular" width={210} height={60}/>
            }
        </div>
    );
};

export default FindItem;