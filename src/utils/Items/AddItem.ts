import dayjs from "dayjs";
import {IAddFormData, IItem} from "../../types/Item";
import {doc, getDoc, onSnapshot, setDoc, updateDoc} from "firebase/firestore";
import {db} from "../../firebase";

export async function onAddItem(data: IAddFormData, user: any) {
    if (!user.uid) {
        throw new Error ('Please sign in that add some items...')
    }

    let updateRef = doc(db, "users", user.uid);

    const id = Date.now();
    const date = dayjs().format('YYYY-MM-DD [at] HH:mm');

    const item = {
        id: id,
        createdDate: date,
        lastChange: "",
        changePerson: "",
        Created: user ? user.email : null,
        userUid: user ? user.uid : null,
        PalletReceipt: id + (user ? '-' + user.uid.slice(0, 4) : "-9999"),
        ...data,
        batchNumber: data.type.toLowerCase() === "barrel" ? data.batchNumber : null
    };

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data()
        if (data.experience + (10 * data.level) > data.nextLevel) {

            await updateDoc(updateRef, {
                level:data.level + 1,
                experience: 0,
                nextLevel: data.nextLevel * data.level
            })

        } else {
            await updateDoc(updateRef, {
                experience:docSnap.data().experience + (10 * docSnap.data().level)
            })
        }
    }

    await setDoc(doc(db, "items", "item_" + item.id), {
        ...item
    });
    return [true, item];
}
