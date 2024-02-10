import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/storeHooks";
import {fetchItems} from "../../store/reducers/item/itemsSlice";
import {ICardItem, IItem} from "../../types/Item";
import {CircularProgress, Skeleton} from "@mui/material";
import data from '../../assets/ItemsInfo.json'
import {WarehouseItem} from "./WareHouseItem";
import styles from './Home.module.css'
import LeftMenu from "../../components/LeftMenu/LeftMenu";
import MyButton from "../../components/MyButton/MyButton";
import {fetchUser} from "../../store/reducers/User/userSlice";

const Home: FC = () => {
    const dispatch = useAppDispatch();

    const {items, loading, error} = useAppSelector(state => state.items)
    const [visible, setVisible] = useState<boolean>(false);


    return (
        <div className={styles.Main}>
            <LeftMenu visible={visible} setVisible={setVisible} />
            <MyButton click={() => setVisible(true)}>Menu</MyButton>
            {!loading
                ? <div>
                    {!error
                        ?
                        <div className={styles.WarehouseWrapper}>
                            {data.map((cardItem: ICardItem, index: number) => {

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
                        <div><h4 style={{color: 'red'}}>{error}</h4></div>
                    }
                </div>
                : <div style={{display: 'flex', gap: 14, flexDirection: 'column'}}>
                    <Skeleton variant="rectangular" width={'100%'} height={'50dvh'} />
                </div>
            }
        </div>
    );
};

export default Home;