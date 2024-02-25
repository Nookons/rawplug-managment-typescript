import React from 'react';
import {useAppSelector} from "../../../hooks/storeHooks";
import {Alert, Skeleton} from "@mui/material";
import styles from './FindItem.module.css'
import Search from './module/Search'

const FindItem = () => {
    const {items, loading, error} = useAppSelector(state => state.items)


    return (
        <div className={styles.Main}>
            {!loading
                ?
                <div>
                    {
                        !error
                        ? <Search items={items} />
                        : <Alert severity="error">{error}</Alert>
                    }
                </div>
                : <Skeleton variant="rectangular" width={210} height={60}/>
            }
        </div>
    );
};

export default FindItem;