import {doc, setDoc, updateDoc} from "firebase/firestore";
import dayjs from "dayjs";
import {db} from "../../firebase";

enum StatusEnum {
    "Hold",
    "Available",
    "Odzysk"
}

interface IUpdateItem {
    id: number;
    user: any;
    status?: StatusEnum;
    data?: any;
}

export const UpdateItem = async ({id, user, data}: IUpdateItem) => {
    const actionID = Date.now();

    const itemRef = doc(db, "items", "item_" + id);
    const actionRef = doc(db, "actions", "action_" + actionID);

    await updateDoc(itemRef, {
        ...data,
        lastChange: dayjs().format("dddd, MMMM DD, YYYY [at] HH:mm  "),
        changePerson: user.email
    });


    await setDoc(actionRef, {
        person: user.email,
        personUid: user.uid,
        id: actionID,
        type: 'change',
        timeStamp: dayjs().format("YYYY-MM-DD [at] HH:mm"),
        itemId: Number(id),
        changes: {...data}
    })
}