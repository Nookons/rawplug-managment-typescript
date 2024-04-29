import React, {FC, useEffect, useState} from 'react';
import {Alert, Badge, Box, Button, Card, CardContent, Chip, Skeleton, Stack, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {ITEM_ROUTE} from "../../../../utils/consts";
import {doc, getDoc, onSnapshot} from "firebase/firestore";
import {db} from "../../../../firebase";
import {IItem} from "../../../../types/Item";
import {Mail} from "@mui/icons-material";

const getColor = (condition: string) => {
    switch (condition) {
        case "good":
            return "linear-gradient(90deg, rgba(255, 255, 255, 1) 50%, rgba(0, 255, 24, 1) 100%)"
        case "mildly":
            return "linear-gradient(90deg, rgba(255, 255, 255, 1) 50%, rgba(240, 255, 0, 1) 100%)"
        case "bad":
            return "linear-gradient(90deg, rgba(255, 255, 255, 1) 50%, rgba(255, 0, 0, 1) 100%)"
    }
}

const FirstMachine = () => {

    const [data, setData] = useState();
    const [isExistsError, setIsExistsError] = useState(false);
    const [slotsData, setSlotsData] = useState([]);


    useEffect(() => {
        const unsub = onSnapshot(doc(db, "nap01", "data"), (doc) => {
            if (doc.exists()) {
                setTimeout(() => {
                    setData(doc.data());
                }, 250)
            } else {
                setIsExistsError(true);
            }
        });
    }, []);

    useEffect(() => {
        setSlotsData([])

        const fetchData = async () => {

            if (data) {
                const slots = data.slots;
                let itemsIDArray = [];

                for (const el of slots) {
                    const docRef = doc(db, "slots", el);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        itemsIDArray.push(docSnap.data().palletID)
                    }
                }

                for (const el of itemsIDArray) {
                    if (el !== undefined) {
                        const docRef = doc(db, "items", "item_" + el);
                        const docSnap = await getDoc(docRef);

                        if (docSnap.exists()) {
                            setSlotsData((prevState) => ([...prevState, docSnap.data()]))
                        }
                    }
                }
            }
        };

        fetchData();
    }, [data]);


    if (data) {
        return (
            <Card sx={{minWidth: 240, width: "100%", backgroundImage: getColor(data?.condition)}} variant={"outlined"}
                  raised={true}>
                <CardContent>
                    <div style={{display: "flex", justifyContent: "flex-end", alignItems: "flex-end", gap: 8}}>
                        <Typography variant={"h5"} marginTop={"12px"}>
                            Nap-01
                        </Typography>
                    </div>
                </CardContent>
            </Card>
        );
    }
    return (
        <>
            {
                !isExistsError
                    ? <Skeleton variant="rectangular" fullWidth={true} height={75}/>
                    : <Alert severity="error">Unfortunately, there was an error when loading the data machine.</Alert>

            }
        </>
    )
};

export default FirstMachine;