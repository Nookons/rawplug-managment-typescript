import React, {FC, useEffect, useState} from 'react';
import {collection, doc, getDoc, onSnapshot, query} from "firebase/firestore";
import {db} from "../../../firebase";
import {Box, Divider, Paper, Stack} from "@mui/material";
import NeedItem from "./NeedItem";
import {INeededItem} from "../../../types/Pallet";

interface NeedDisplayProps {
    index: string;
    quantity: number;
    currentQta: number;
    data: any[];
    setTotalArray: (update: (prev:
                                { index: string; value: number; }[]) =>
                                { index: string; value: number; }[]) => void;
}

const NeedDisplay: FC<NeedDisplayProps> = ({index, quantity, currentQta, data, setTotalArray}) => {

    const [needArray, setNeedArray] = useState<INeededItem[]>([]);

    useEffect(() => {
        async function get() {
            setNeedArray([]);

            const docRef = doc(db, "palletsTemplate", index.replace("/", "\\"));
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const needArray = docSnap.data().needItem

                needArray.forEach((i: INeededItem) => {
                    setNeedArray((prev) => [...prev, i])
                })
            }
        }

        get();
    }, [data]);

    useEffect(() => {
        if (needArray.length) {

            setTotalArray((prev) => {
                const updatedArray = [...prev];

                needArray.forEach((item) => {
                    const count = item.quantity * quantity;
                    const existingIndex = updatedArray.findIndex(el => el.index === item.index);

                    if (existingIndex === -1) {
                        updatedArray.push({
                            index: item.index ? item.index : "",
                            value: count
                        });
                    } else {
                        updatedArray[existingIndex].value += count;
                    }
                });
                return updatedArray;
            });
        }
    }, [needArray]);

    return (
        <Paper elevation={3}>
            <Stack
                my={1}
                direction="row"
                divider={<Divider orientation="vertical" flexItem/>}
                spacing={2}
            >
                <Box sx={{p: 2}}>
                    <article>{index}</article>
                </Box>
                <Box sx={{p: 2}}>
                    <article>{quantity.toLocaleString()}</article>
                </Box>
            </Stack>
        </Paper>
    );
};

export default NeedDisplay;
