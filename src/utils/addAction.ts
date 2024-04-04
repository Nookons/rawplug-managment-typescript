import { doc, onSnapshot, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import dayjs from "dayjs";

export const addAction = async (type: string, user: any, item: any) => {
    let oldArray: any = [];
    const id = Date.now();

    const snapshot = await getDoc(doc(db, "PWT70", "actions"));

    if (snapshot.data()) {
        oldArray = snapshot.data().items;
    }

    console.log(item);

    // Update the document with the new action
    await setDoc(doc(db, "PWT70", "actions"), {
        items: [...oldArray, {
            createTime: dayjs().format("YYYY-MM-DD [at] HH:mm"),
            person: user.email,
            personUid: user.uid,
            actionItem: { ...item },
            type: type ? type : "None",
            id: item.id ? item.id : id,
        }],
        lastUpdate: dayjs().format("YYYY-MM-DD [at] HH:mm"),
        person: user.email,
        personUid: user.uid,
    });
}
