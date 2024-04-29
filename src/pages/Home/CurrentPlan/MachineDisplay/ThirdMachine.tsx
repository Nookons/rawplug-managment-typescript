import React, {useEffect, useState} from 'react';
import {doc, onSnapshot} from "firebase/firestore";
import {db} from "../../../../firebase";
import {Alert, Card, CardContent, Skeleton, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {HOME_ROUTE, ITEM_ROUTE} from "../../../../utils/consts";

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

const ThirdMachine = () => {
    const [data, setData] = useState();

    const [isExistsError, setIsExistsError] = useState(false);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "nap03", "data"), (doc) => {
            if (doc.exists()) {
                setTimeout(() => {
                    setData(doc.data());
                }, 250)
            } else {
                setIsExistsError(true);
            }
        });
    }, []);


    if (data) {
        return (
            <Card sx={{minWidth: 240, width: "100%", backgroundImage: getColor(data?.condition)}} variant={"outlined"}
                  raised={true}>
                <CardContent>
                    <div style={{display: "flex", justifyContent: "flex-end", alignItems: "flex-end", gap: 8}}>
                        <Typography variant={"h5"} marginTop={"12px"}>
                            Nap-03
                        </Typography>
                    </div>
                </CardContent>
            </Card>
        );
    } else {
        return (
            <>
                {
                    !isExistsError
                        ? <Skeleton variant="rectangular" fullWidth={true} height={75}/>
                        : <Alert severity="error">Unfortunately, there was an error when loading the data machine.</Alert>

                }
            </>
        )
    }
};

export default ThirdMachine;