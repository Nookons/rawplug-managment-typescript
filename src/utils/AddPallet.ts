import { getDatabase, ref, set, push } from 'firebase/database';
import {IFormData} from "../pages/Item/AddItem";
import dayjs from "dayjs";
import {useAppSelector} from "../hooks/storeHooks";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {IPalletItem, IUserPallet} from "../types/Pallet";
import {IPlan} from "../types/Plans";
import {rejects} from "assert"; // You need to import these utility functions

const getCurrentDate = () => {
    return dayjs().format('YYYY-MM-DD [at] HH:mm');
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

export function onAddPallet(data: IUserPallet | null, user: any, plans: IPlan[]) {
    try {
        if (!user) {
            return [false, 'Please sign in that add some items...']
        }

        const db = getDatabase();
        const id = Date.now();
        const date = getCurrentDate();
        const dateForPlan = dayjs().format('YYYY-MM-DD')

        const newItemRef = push(ref(db, 'pallets'));
        let found = false; // Переменная для отслеживания найденного соответствия

        switch (data?.machineIndex) {
            case 'first':
                plans.map(i => {
                    if (i.forDate === dateForPlan) {
                        const id = i.id
                        i.firstMachine.map((j, index) => {
                            if (j.index === data?.index) {
                                set(ref(db, 'plan/' + id + '/firstMachine/' + index + '/ready'), j.ready + data.quantity);
                                set(newItemRef, {
                                    id: id,
                                    createdDate: date,
                                    index: data ? data.index : null,
                                    quantity: data ? Number(data.quantity) : null,
                                    JM: 'sht',
                                    Created: user ? getCurrentUser(user) : null,
                                    userUid: user ? user.uid : null,
                                    PalletReceipt: id + (user ? '-' + user.uid.slice(0, 4) : "-9999"),
                                    description: data ? data.description : null,
                                });
                                found = true; // Устанавливаем флаг, что нашли соответствие
                            }
                        })
                    }
                })
                break;
            case 'secondary':
                plans.map(i => {
                    if (i.forDate === dateForPlan) {
                        const id = i.id
                        i.secondaryMachine.map((j, index) => {
                            if (j.index === data?.index) {
                                set(ref(db, 'plan/' + id + '/secondaryMachine/' + index + '/ready'), j.ready + data.quantity);
                                set(newItemRef, {
                                    id: id,
                                    createdDate: date,
                                    index: data ? data.index : null,
                                    quantity: data ? Number(data.quantity) : null,
                                    JM: 'sht',
                                    Created: user ? getCurrentUser(user) : null,
                                    userUid: user ? user.uid : null,
                                    PalletReceipt: id + (user ? '-' + user.uid.slice(0, 4) : "-9999"),
                                    description: data ? data.description : null,
                                });
                                found = true;
                            }
                        })
                    }
                })
                break;
            case 'third':
                plans.map(i => {
                    if (i.forDate === dateForPlan) {
                        const id = i.id
                        i.thirdMachine.map((j, index) => {
                            if (j.index === data?.index) {
                                set(ref(db, 'plan/' + id + '/thirdMachine/' + index + '/ready'), j.ready + data.quantity);
                                set(newItemRef, {
                                    id: id,
                                    createdDate: date,
                                    index: data ? data.index : null,
                                    quantity: data ? Number(data.quantity) : null,
                                    JM: 'sht',
                                    Created: user ? getCurrentUser(user) : null,
                                    userUid: user ? user.uid : null,
                                    PalletReceipt: id + (user ? '-' + user.uid.slice(0, 4) : "-9999"),
                                    description: data ? data.description : null,
                                });
                                found = true;
                            }
                        })
                    }
                })
                break;
        }

        if (!found) { // Если не найдено соответствие, возвращаем false
            return [false, 'This item does not need updates today'];
        }

        return [true, newItemRef.key];
    } catch (e) {
        return [false, e];
    }
}
