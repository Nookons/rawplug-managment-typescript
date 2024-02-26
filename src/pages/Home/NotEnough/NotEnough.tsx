import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../../../hooks/storeHooks";
import dayjs from "dayjs";
import {IPlan, IPlanItems} from "../../../types/Plans";

import palletsData from '../../../assets/PalletsData.json'
import itemsData from '../../../assets/ItemsInfo.json'
import {IPalletItem, IPallets} from "../../../types/Pallet";
import {ICardItem, IItem} from "../../../types/Item";


const getUpdateQuantity = (quantity: number, allQuantity: number, index: string, ready: number) => {
    switch (index) {
        case 'OZ-U-255-164-295':
            return (quantity * allQuantity)
        case 'Q-CM-PSF-STAND-V3':
            return (quantity * allQuantity)
        default:
            return (quantity * allQuantity)
    }
}

const NotEnough = () => {
    const {items, loading, error} = useAppSelector(state => state.plans)

    const warehouseItems = useAppSelector(state => state.items.items)


    const [tempArray, setTempArray]                 = useState<any[]>([]);
    const [needItemsDisplay, setNeedItemsDisplay]   = useState<any[]>([]);
    const [needAll, setNeedAll]                     = useState<any[]>([]);
    const [staysAfterPlans, setStaysAfterPlans]     = useState<any[]>([]);

    useEffect(() => {
        setTempArray([])

        setTempArray(prevState => {
            let newArray: any = [];

            items.forEach((element: IPlan) => {
                const dateObject = dayjs(element.forDate, "YYYY-MM-DD");
                const today = dayjs().startOf('day');

                if (dateObject.isSame(today, 'day') || dateObject.isAfter(today, 'day')) {
                    if (element.firstMachine) {
                        element.firstMachine.forEach((item: IPlanItems) => {
                            newArray.push({
                                "index": item.index,
                                "planQta": item.planQta,
                                "ready": item.ready
                            });
                        });
                    }

                    if (element.secondaryMachine) {
                        element.secondaryMachine.forEach((item: IPlanItems) => {
                            newArray.push({
                                "index": item.index,
                                "planQta": item.planQta,
                                "ready": item.ready
                            });
                        });
                    }

                    if (element.thirdMachine) {
                        element.thirdMachine.forEach((item: IPlanItems) => {
                            newArray.push({
                                "index": item.index,
                                "planQta": item.planQta,
                                "ready": item.ready
                            });
                        });
                    }
                }
            });

            return [...prevState, ...newArray];
        });
    }, [items, loading]);


    useEffect(() => {
        setNeedAll([])

        setNeedAll(prevState => {
            let temp: any = [];

            tempArray.forEach(i => {
                const tempIndex = i.index;
                const tempQta = i.planQta;
                const ready = i.ready;

                palletsData.forEach(j => {
                    if (tempIndex === j.index && j.needItem) {
                        j.needItem.forEach(k => {
                            const quantity = getUpdateQuantity(k.quantity, tempQta, k.index, ready);

                            temp.push({
                                index: k.index,
                                quantity: quantity
                            });
                        });
                    }
                });
            });

            return [...prevState, ...temp];
        });
    }, [tempArray]);


    useEffect(() => {
        setNeedItemsDisplay([])

        const aggregatedData = needAll.reduce((acc, {index, quantity}) => {
            acc[index] = (acc[index] || 0) + quantity;
            return acc;
        }, {});

        const aggregatedDataArray = Object.entries(aggregatedData).map(([index, quantity]) => ({
            index,
            quantity
        }));

        setNeedItemsDisplay(aggregatedDataArray);
    }, [needAll]);


    useEffect(() => {
        setStaysAfterPlans([])

        const updatedStaysAfterPlans: any = [];

        itemsData.forEach((item: ICardItem) => {
            let tempStock = 0;

            warehouseItems.forEach((element: IItem) => {
                if (element.index === item.myIndex) {
                    tempStock += element.quantity;
                }
            });

            const difference = needItemsDisplay.find((element: any) => element.index === item.myIndex)?.quantity || 0;

            // Добавляем в массив только если разница не равна нулю
            if (difference !== 0) {
                updatedStaysAfterPlans.push({
                    index: item.myIndex,
                    quantity: tempStock - difference
                });
            }
        });

        setStaysAfterPlans(updatedStaysAfterPlans);
    }, [needItemsDisplay, itemsData, warehouseItems]);




    return (
        <div>
            <article>Needed items for the future</article>
            <hr/>
            <div style={{display: "flex", flexDirection: "column", gap: 4}}>
                {staysAfterPlans.map((element: any) => {

                    return (
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            backgroundColor: element.quantity > 1000 ? "rgb(195,235,233)" : "#F28585",
                            padding: 14
                        }}>
                            <article>{element.index}</article>
                            <article>{element.quantity}</article>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default NotEnough;