import {getDatabase, ref, set} from 'firebase/database';
import {IFormData} from "../pages/Item/AddItem/AddItem";
import dayjs from "dayjs";
import {useAppSelector} from "../hooks/storeHooks";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {IStatsItem} from "../types/Item"; // You need to import these utility functions


export function handlingError ({error}: any ) {
    const message = error.message;

    switch (message) {
        case "quantity":
            return "Hey there! you can not add items with less than 10 quantity";
        case "barrelWeight":
            return "Hey there! your barrel has a lot of weight";
        case "batch":
            return "Hey there! Could you kindly double-check if the batch number has been entered correctly? It seems like it might already exist in the system.";
        default:
            return 'Unknown error, please contact developers'
    }
}


export function onAddItem(data: IFormData, user: any) {
    try {
        if (!user) {
            return [false, 'Please sign in that add some items...']
        }

        const db = getDatabase();
        const id = Date.now();
        const date = dayjs().format('YYYY-MM-DD [at] HH:mm');


        const item = {
            id: id,
            createdDate: date,
            lastChange: date,
            Created: user ? user.email : null,
            userUid: user ? user.uid : null,
            PalletReceipt: id + (user ? '-' + user.uid.slice(0, 4) : "-9999"),
            ...data
        };

        set(ref(db, 'items/' + id), item);

        return [true, item];
    } catch (e) {
        return [false, null];
    }
}
