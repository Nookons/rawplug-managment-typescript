import {getDatabase, ref, set} from 'firebase/database';
import {IFormData} from "../pages/Item/AddItem/AddItem";
import dayjs from "dayjs";
import {useAppSelector} from "../hooks/storeHooks";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {IStatsItem} from "../types/Item"; // You need to import these utility functions

interface barrelData {
    first: number,
    secondary: number,
    third: number,
    four: number
}


export function getCurrentUser(user: any) {
    const email = user.email

    switch (email) {
        case 'nookon@icloud.com':
            return 'Kolomiiets Dmytro'
        default:
            return user.email
    }
}

export function onAddItem(data: IFormData | null, user: any, barrelData: barrelData) {
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
            index: data ? data.index : null,
            type: data ? data.type : null,
            quantity: data ? Number(data.quantity) : null,
            JM: data ? data.JM : null,
            Recipient: data ? data.ToDepartment : null,
            Sender: data ? data.FromDepartment : null,
            Created: user ? getCurrentUser(user) : null,
            userUid: user ? user.uid : null,
            PalletReceipt: id + (user ? '-' + user.uid.slice(0, 4) : "-9999"),
            status: data ? data.status : null,
            description: data ? data.description : null,
            batchNumber: data?.type.toLowerCase() === "barrel" ? Number(data.batchNumber) : null,
            barrel:  data?.type.toLowerCase() === "barrel" ? {...barrelData} : null
        };

        set(ref(db, 'items/' + id), item);

        return [true, item];
    } catch (e) {
        return [false, null];
    }
}
