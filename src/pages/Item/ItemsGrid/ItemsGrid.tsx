import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector } from "../../../hooks/storeHooks";
import { IItem } from "../../../types/Item";
import Grid from "./Grid";
import dayjs from "dayjs";
import {
    Skeleton, Switch,
} from "@mui/material";



const ItemsGrid = () => {
    const { items, loading, error } = useAppSelector(state => state.items)
    const [revertArray, setRevertArray] = useState<IItem[]>([]);

    const currentDate = dayjs().format('dddd, MMMM DD, YYYY [at] HH:mm  ')


    const [uniqueIndex, setUniqueIndex] = useState([]);
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
        const uniqueValues = {};

        items.forEach(item => {
            if (!uniqueValues[item.index]) {
                uniqueValues[item.index] = true;
            }
        });

        const uniqueIndexes = Object.keys(uniqueValues);
        setUniqueIndex(uniqueIndexes);
    }, [items]);



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
