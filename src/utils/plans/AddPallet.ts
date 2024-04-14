import { getDatabase, ref, set, push } from 'firebase/database';
import dayjs from "dayjs";
import {IUserPallet} from "../../types/Pallet";
import {IPlan} from "../../types/Plans";



export function onAddPallet(data: IUserPallet | null, user: any, plans: IPlan[]) {
    try {
        if (!user) {
            return [false, 'Please sign in that add some items...']
        }

        const db = getDatabase();
        const newId = Date.now();
        const date = dayjs().format('YYYY-MM-DD [at] HH:mm');
        const dateForPlan = dayjs().format('YYYY-MM-DD')

        const newItemRef = push(ref(db, 'pallets'));
        let found = false; // Переменная для отслеживания найденного соответствия

        let itemToReturn = {}

        switch (data?.machineIndex) {
            case 'first':
                plans.map(i => {
                    const id = i.id
                    if (i.forDate === dateForPlan) {
                        i.firstMachine.map((j, index) => {
                            if (j.index === data?.index) {
                                set(ref(db, 'plan/' + id + '/firstMachine/' + index + '/ready'), j.ready + data.quantity);
                                const pallet = {
                                    id: newId,
                                    createdDate: date,
                                    index: data ? data.index : null,
                                    quantity: data ? Number(data.quantity) : null,
                                    machine: 'first',
                                    JM: 'sht',
                                    Created: user ? user.email : null,
                                    userUid: user ? user.uid : null,
                                    PalletReceipt: newId + (user ? '-' + user.uid.slice(0, 4) : "-9999"),
                                    description: data ? data.description : null,
                                }
                                set(newItemRef, pallet);
                                found = true; // Устанавливаем флаг, что нашли соответствие
                                itemToReturn = pallet
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
                                    id: newId,
                                    createdDate: date,
                                    index: data ? data.index : null,
                                    quantity: data ? Number(data.quantity) : null,
                                    machine: 'secondary',
                                    JM: 'sht',
                                    Created: user ? user.email : null,
                                    userUid: user ? user.uid : null,
                                    PalletReceipt: newId + (user ? '-' + user.uid.slice(0, 4) : "-9999"),
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
                                    id: newId,
                                    createdDate: date,
                                    index: data ? data.index : null,
                                    quantity: data ? Number(data.quantity) : null,
                                    machine: 'third',
                                    JM: 'sht',
                                    Created: user ? user.email : null,
                                    userUid: user ? user.uid : null,
                                    PalletReceipt: newId + (user ? '-' + user.uid.slice(0, 4) : "-9999"),
                                    description: data ? data.description : null,
                                });
                                found = true;
                            }
                        })
                    }
                })
                break;
        }

        if (!found) {
            return [false, 'This item does not need updates today'];
        }

        return [true, itemToReturn];
    } catch (e) {
        return [false, e];
    }
}
