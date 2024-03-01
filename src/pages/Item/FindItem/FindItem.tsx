import React, {useState} from 'react';
import {useAppSelector} from "../../../hooks/storeHooks";
import {Alert, FormControlLabel, FormGroup, Skeleton, Switch} from "@mui/material";
import styles from './FindItem.module.css'
import Search from './module/Search'
import SearchBatch from "./module/SearchBatch";

const FindItem = () => {
    const {items, loading, error} = useAppSelector(state => state.items)

    const [isBatchSearch, setIsBatchSearch] = useState<boolean>(true);

    return (
        <div className={styles.Main}>

            <div style={{margin: "14px 0"}}>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                                value={isBatchSearch}
                                onChange={() => setIsBatchSearch(!isBatchSearch)}
                                defaultChecked={true}
                            />
                        }
                        label={<p>By batch</p>}
                    />
                </FormGroup>
            </div>
            {!loading
                ?
                <div>
                    {
                        !error
                            ? <>{isBatchSearch ? <SearchBatch items={items} /> : <Search items={items}/>}</>
                            : <Alert severity="error">{error}</Alert>
                    }
                </div>
                : <Skeleton variant="rectangular" width={210} height={60}/>
            }
        </div>
    );
};

export default FindItem;