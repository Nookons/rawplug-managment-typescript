import React, {FC, useEffect, useState} from 'react';
import styles from "../CurrentPlan.module.css";
import {IPallets} from "../../../../types/Pallet";
import {useAppSelector} from "../../../../hooks/storeHooks";
import {Alert, Card, CardContent, Skeleton, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {ITEM_ROUTE, PALLET_ROUTE} from "../../../../utils/consts";

interface LastPalletsProps {

}

const LastPallets: FC<LastPalletsProps> = () => {
    const navigate = useNavigate();
    const {pallets, loading, error} = useAppSelector(state => state.pallets)

    const [revertPallets, setRevertPallets] = useState<IPallets[]>([]);

    useEffect(() => {
        const temp = [...pallets].reverse();
        setRevertPallets(temp);
    }, [pallets]);

    const onPalletClick = (id: number) => {
        navigate(PALLET_ROUTE + '?_' + id)
    }

    return (
        <div className={styles.div4}>
            {!loading
                ?
                <div>
                    {!error
                        ?
                        <div>
                            <Typography variant="caption" display="block" gutterBottom>
                                (5) Last pallets 👩‍🔧️
                            </Typography>
                            <hr/>
                            <div className={styles.NeedWrapper}>
                                {revertPallets.slice(0, 5).map((item: IPallets) => {

                                    return (
                                        <Card sx={{ minWidth: 240 }} variant={"outlined"} raised={true}>
                                            <CardContent>
                                                <Typography fontSize={12} color="text.secondary" variant={"subtitle1"}>
                                                    <Link to={PALLET_ROUTE + "?_" + item.id}>{item.index}</Link>
                                                    {item.createdDate.slice(10)}
                                                </Typography>
                                                <Typography fontSize={12} color="text.secondary" variant={"subtitle1"}>
                                                    {item.Created}
                                                </Typography>
                                                <div style={{display: "flex", justifyContent: "flex-end", alignItems: "flex-end", gap: 4, flexDirection: "column"}}>
                                                    <Typography fontSize={16} variant={"subtitle1"}>
                                                        {item.quantity} {item.JM}
                                                    </Typography>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )
                                })}
                            </div>
                        </div>
                        :
                        <Alert severity="error">{error}</Alert>


                    }
                </div>
                : <Skeleton variant="rectangular" width={280} height={250}/>
            }
        </div>
    );
};

export default LastPallets;