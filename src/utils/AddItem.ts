import { getDatabase, ref, set } from 'firebase/database';
import {IFormData} from "../pages/Item/AddItem";
import dayjs from "dayjs";
import {useAppSelector} from "../hooks/storeHooks";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error; // You need to import these utility functions

const getCurrentDate = () => {
    const date      = dayjs().toDate().toDateString();

    const HOUR      = dayjs().get('hour')
    const MINUTES   = dayjs().get('minute')

    let myMinutes   = '00'

    if (MINUTES.toString().length < 2) {
        myMinutes = '0' + MINUTES;
    }else {
        myMinutes = MINUTES.toString()
    }

    return date + ' at ' + HOUR + ':' + myMinutes
}

export function getCurrentUser (user: any) {
    const email = user.email

    switch (email) {
        case 'nookon@icloud.com':
            return 'Kolomiiets Dmytro'
        default:
            return user.email
    }
}

function areAllFieldsFilled(obj: any): boolean {
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            // Проверяем, что значение не пустое, null или undefined
            if (value === '' || value === null || value === undefined || value === 0) {
                return false;
            }
        }
    }
    return true;
}

export function onAddItem(data: IFormData | null, user: any) {
    try {
        if (!user) {
            return [false, 'Please sign in that add some items...']
        }

        const db = getDatabase();
        const id = Date.now();
        const date = getCurrentDate();


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
