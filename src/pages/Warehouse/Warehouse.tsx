import React, {useEffect, useState} from 'react';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import {db} from "../../firebase";
import {IItem} from "../../types/Item";
import {
    Autocomplete,
    Skeleton,
    TableRow, TextField,
    Typography
} from "@mui/material";

import styles from './Warehouse.module.css'

import SearchDisplay from "./dep/SearchDisplay";
import AutoCompleteArea from "./dep/AutoCompletArea";

const Warehouse = () => {
    const [data, setData] = useState<IItem[]>([]);
    const [searchIndex, setSearchIndex] = useState<string | null>("");
    const currentURL = window.location.href;

    useEffect(() => {
        try {
            const index = currentURL.split("_")
            const temp = index[1].replace("%E3%80%B5", "〵").toUpperCase()

            setSearchIndex(temp)
        } catch (error) {
            console.log(error)
        }
    }, [currentURL]);


    useEffect(() => {
        const q = query(collection(db, "items"), where("index", "==", searchIndex));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data: IItem[] = [];
            querySnapshot.forEach((doc) => {
                data.push(doc.data() as IItem);
            });
            setData(data)
        });
    }, [searchIndex]);

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <div className={styles.Main} >
            <AutoCompleteArea searchIndex={searchIndex} setSearchIndex={setSearchIndex}/>
            <hr/>
            <SearchDisplay data={data}/>
        </div>
    );
};

export default Warehouse;