import {child, get, getDatabase, ref, set} from 'firebase/database';
import dayjs from "dayjs";
import {IPlan} from "../../pages/Plan/AddPlan";
import {doc, setDoc} from "firebase/firestore";
import {db} from "../../firebase";


export async function onAddPlan(data: IPlan | null, user: any, forDate: Date | null) {
    const id = Date.now()
    const date = dayjs(forDate).format("YYYY-MM-DD");

    await setDoc(doc(db, "nap01", "plan_" + date), {
        items: [...data.firstMachine]
    });
    await setDoc(doc(db, "nap02", "plan_" + date), {
        items: [...data.secondaryMachine]
    });
    await setDoc(doc(db, "nap03", "plan_" + date), {
        items: [...data.thirdMachine]
    });
}
