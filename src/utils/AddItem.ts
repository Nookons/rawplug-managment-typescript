import {getDatabase, ref, set} from 'firebase/database';
import {IFormData} from "../pages/Item/AddItem";
import dayjs from "dayjs";
import {useAppSelector} from "../hooks/storeHooks";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {IStatsItem} from "../types/Item"; // You need to import these utility functions

const getCurrentDate = () => {
    const date = dayjs().toDate().toDateString();

    const HOUR = dayjs().get('hour')
    const MINUTES = dayjs().get('minute')

    let myMinutes = '00'

    if (MINUTES.toString().length < 2) {
        myMinutes = '0' + MINUTES;
    } else {
        myMinutes = MINUTES.toString()
    }

    return date + ' at ' + HOUR + ':' + myMinutes
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

export function onAddItem(data: IFormData | null, user: any, itemsStats: IStatsItem[]) {
    try {
        if (!user) {
            return [false, 'Please sign in that add some items...']
        }

        const db = getDatabase();
        const id = Date.now();
        const date = getCurrentDate();

        const existingItemIndex = itemsStats.findIndex(item => item.index === data?.index);

        const newData = {
            index: data.index,
            lastChange: date,
            pallets: existingItemIndex !== -1 ? itemsStats[existingItemIndex].pallets + 1 : 1,
            quantity: existingItemIndex !== -1 ? itemsStats[existingItemIndex].quantity + data?.quantity : data?.quantity
        };

        set(ref(db, `itemsStats/${data.index}`), newData);

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
            batchNumber: data ? Number(data.batchNumber) : null
        };

        set(ref(db, 'items/' + id), item);

        return [true, item];
    } catch (e) {
        return [false, null];
    }
}
