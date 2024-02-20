import React, {FC, useEffect, useState} from 'react';
import styles from "../CurrentPlan.module.css";
import {IPallets} from "../../../../types/Pallet";
import {useAppSelector} from "../../../../hooks/storeHooks";
import {Alert, Skeleton} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {PALLET_ROUTE} from "../../../../utils/consts";

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
                            <p>(5) Last pallets 👩‍🔧️</p>
                            <hr/>
                            <div className={styles.NeedWrapper}>
                                {revertPallets.slice(0, 5).map((item: IPallets) => {

                                    return (
                                        <button onClick={() => onPalletClick(item.id)} className={styles.NeedItem}>
                                            <h6>{item.index}</h6>
                                            <p>{item.createdDate} 🕑</p>
                                            <p>{item.quantity} ({item.JM}) 📦</p>
                                        </button>
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