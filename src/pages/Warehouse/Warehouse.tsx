import React, {useEffect, useState} from 'react';
import {collection, query, where, onSnapshot} from "firebase/firestore";
import {db} from "../../firebase";
import {IItem} from "../../types/Item";
import {
    Autocomplete, FormControlLabel, FormGroup,
    Skeleton, Switch,
    TableRow, TextField,
    Typography
} from "@mui/material";

import styles from './Warehouse.module.css'

import SearchDisplay from "./dep/SearchDisplay";
import AutoCompleteArea from "./dep/AutoCompletArea";

import {styled} from '@mui/material/styles';
import {SwitchProps} from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import ByBatch from "./search/ByBatch";

const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({theme}) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));


const Warehouse = () => {
    const [data, setData] = useState<IItem[]>([]);
    const [searchIndex, setSearchIndex] = useState<string>("");
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
    }, [searchIndex, currentURL]);

    const [isBatch, setIsBatch] = useState<boolean>(false);

    return (
        <div className={styles.Main}>

            <FormControlLabel
                control={
                    <IOSSwitch
                        sx={{m: 1}}
                        value={isBatch}
                        onChange={(event, checked) => setIsBatch(checked)}
                    />
                }
                label={<p>Search by batch | Поиск по батч номеру</p>}
            />
            <hr/>
            {!isBatch
                ?
                <div>
                    <AutoCompleteArea searchIndex={searchIndex} setSearchIndex={setSearchIndex}/>
                    <SearchDisplay data={data}/>
                </div>
                : <ByBatch />
            }
        </div>
    );
};

export default Warehouse;