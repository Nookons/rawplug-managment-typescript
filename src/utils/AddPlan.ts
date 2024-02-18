import { child, get, getDatabase, ref, set } from 'firebase/database';
import dayjs from "dayjs";
import { IPlan } from "../pages/Plan/AddPlan";
import { IItem } from "../types/Item";
import {IPlanItems} from "../types/Plans";

// Get current date and time formatted
const getCurrentDateTime = () => {
    return dayjs().format('YYYY-MM-DD [at] HH:mm');
}

// Get user name based on email
const getCurrentUser = (user: any) => {
    const email = user.email;
    switch (email) {
        case 'nookon@icloud.com':
            return 'Kolomiiets Dmytro';
        default:
            return user.email;
    }
}

export async function onAddPlan(data: IPlan | null, user: any, forDate: Date | null) {
    try {
        console.log(data);
        // Check if user is authenticated
        /*if (!user) {
            return [false, 'Please sign in to add some items.'];
        }*/

        const id = Date.now()
        const db = getDatabase();
        const databaseRef = ref(db, 'plan/');
        const snapshot = await get(databaseRef);

        const date = getCurrentDateTime();

        if (snapshot.exists()) {
            const itemsArray = Object.values(snapshot.val()) as IPlan[];
            const existingPlan = itemsArray.find(item => item.forDate === dayjs(forDate).format('YYYY-MM-DD'));

            if (existingPlan) {
                return [false, 'We already have a plan for this day. If you want add plan for this day. Delete plan what you added before'];
            }
        }

        const newPlan = {
            id: id,
            createdDate: date,
            forDate: dayjs(forDate).format('YYYY-MM-DD'),
            ready: 0,
            firstMachine: [...data.firstMachine],
            secondaryMachine: [...data.secondaryMachine],
            thirdMachine: [...data.thirdMachine],
        };

        await set(ref(db, 'plan/' + id), newPlan);

        return [true, newPlan]; // Return success message and new plan object
    } catch (error) {
        console.error('Error adding plan:', error);
        return [false, error]; // Return failure message and null
    }
}
