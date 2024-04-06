import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector } from "../../../hooks/storeHooks";
import { IItem } from "../../../types/Item";
import Grid from "./Grid";
import {
    Skeleton, Switch,
} from "@mui/material";



const ItemsGrid = () => {
    const { items, loading, error } = useAppSelector(state => state.items)
    const [revertArray, setRevertArray] = useState<IItem[]>([]);

    useEffect(() => {
        const reversed = [...items].reverse();
        setRevertArray(reversed);
    }, [items, loading]);

    return (
        <div style={{ padding: 14, backgroundColor: 'white', overflow: 'hidden' }}>
            <div>
                {!loading
                    ? <Grid revertArray={revertArray} />
                    : <Skeleton variant="rectangular" style={{ padding: '14px !important' }} width={'100%'}
                                height={'60dvh'} />
                }
            </div>
        </div>
    );
};

export default ItemsGrid;
