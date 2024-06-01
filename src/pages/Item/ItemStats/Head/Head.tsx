import React, {FC, useEffect, useState} from 'react';
import {Box, Divider, Paper, Stack, Typography} from "@mui/material";
import {collection, onSnapshot, query} from "firebase/firestore";
import {db} from "../../../../firebase";
import {IItem, IItemTemplate} from "../../../../types/Item";
import { doc, getDoc } from "firebase/firestore";

interface HeadProps {
    currentIndex: string;
}

const Head:FC <HeadProps> = ({currentIndex}) => {

    const [currentTemplate, setCurrentTemplate] = useState<IItemTemplate>();

    useEffect(() => {
        async function get () {
            const docRef = doc(db, "itemsTemplate", currentIndex.replace("/", "\\"));
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setCurrentTemplate(docSnap.data());
                console.log(docSnap.data());
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
        }

        get()
    }, [currentIndex]);


    return (
        <Paper sx={{p: 2}}>
            <Typography variant="h5" gutterBottom component="h5">
                {currentIndex}
            </Typography>
            <Stack my={1} spacing={1}>
                <p>{currentTemplate?.description}</p>
                <p>{currentTemplate?.type}</p>
            </Stack>
        </Paper>
    );
};

export default Head;