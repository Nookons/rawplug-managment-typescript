import React, {FC, useEffect, useState} from 'react';
import styles from "../CurrentPlan.module.css";
import {IPallets} from "../../../../types/Pallet";
import {useAppSelector} from "../../../../hooks/storeHooks";
import {Alert, Skeleton} from "@mui/material";

interface LastPalletsProps {

}

const LastPallets: FC<LastPalletsProps> = () => {
    const {pallets, loading, error} = useAppSelector(state => state.pallets)

    const [revertPallets, setRevertPallets] = useState<IPallets[]>([]);

    useEffect(() => {
        const temp = [...pallets].reverse();
        setRevertPallets(temp);
    }, [pallets]);

    return (
        <div className={styles.div4}>
            {!loading
                ?
                <div>
                    {!error
                        ?
                        <div>
                            <p>(5) Last pallets 👩‍🔧️</p>
                            <hr/>
                            <div className={styles.NeedWrapper}>
                                {revertPallets.slice(0, 5).map((item: IPallets) => {

                                    return (
                                        <div className={styles.NeedItem}>
                                            <h6>{item.index}</h6>
                                            <p>{item.createdDate} 🕑</p>
                                            <p>{item.quantity} ({item.JM}) 📦</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        :
                        <Alert severity="error">{error}</Alert>


                    }
                </div>
                : <Skeleton variant="rectangular" width={280} height={570}/>
            }
        </div>
    );
};

export default LastPallets;