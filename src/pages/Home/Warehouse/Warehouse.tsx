import React, {FC} from 'react';
import styles from "./Warehouse.module.css";
import data from "../../../assets/ItemsInfo.json";
import {ICardItem, IItem} from "../../../types/Item";
import {WarehouseItem} from "./WareHouseItem";
import {Alert, Skeleton} from "@mui/material";

interface WarehouseProps {
    loading: boolean;
    error: string | undefined;
    items: IItem[];
}

const Warehouse: FC<WarehouseProps> = ({loading, error, items}) => {
    return (
        <div className={styles.Main}>
            {!loading
                ? <div>
                    {!error
                        ?
                        <div className={styles.WarehouseWrapper}>
                            {data.slice(0, 20).map((cardItem: ICardItem, index: number) => {

                                let tempQta : number            = 0;
                                let tempPalletsQta : number     = 0;
                                let tempLast  : IItem[]     = []

                                items.map((item: IItem ) => {
                                    if (item.index === cardItem.myIndex) {
                                        tempQta = tempQta + item.quantity
                                        tempPalletsQta++
                                        tempLast.push(item)
                                    }
                                })

                                if (tempPalletsQta > 0) {
                                    return (
                                        <WarehouseItem
                                            key={index}
                                            card={cardItem}
                                            tempQta={tempQta}
                                            tempPalletsQta={tempPalletsQta}
                                            tempLast={tempLast}
                                        />
                                    )
                                }
                            })}
                        </div>
                        :
                        <Alert severity="error">{error}</Alert>


                    }
                </div>
                : <div style={{display: 'flex', gap: 14, flexDirection: 'column'}}>
                    <Skeleton variant="rectangular" width={'100%'} height={'50dvh'} />
                </div>
            }
        </div>
    );
};

export default Warehouse;