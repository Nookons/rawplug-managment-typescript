import dayjs from "dayjs";
import {doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {db} from "../../firebase";
import { deleteDoc } from "firebase/firestore";

export const onDeleteItem = async (currentItem: any, user: any) => {
    try {
        const updateRef = doc(db, "users", user.uid);
        const docSnap   = await getDoc(updateRef);


        if (docSnap.exists()) {
            const data = docSnap.data()
            if (data.experience + (5 * data.level) > data.nextLevel) {

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

        await deleteDoc(doc(db, "items", 'item_' + currentItem.id));
        await setDoc(doc(db, "removed", "item_" + currentItem.id), {
            person: user.email,
            personUid: user.uid,
            timeStamp: dayjs().format("YYYY-MM-DD [at] HH:mm"),
            item: {...currentItem}
        });

        return [true];
    } catch (error) {
        console.error(`Error deleting item with id ${currentItem.id}:`, error);
        return false;
    }
};


export const onRestoreItem = async (currentItem: any, user: any) => {
    try {
        const updateRef = doc(db, "users", user.uid);
        const docSnap   = await getDoc(updateRef);


        if (docSnap.exists()) {
            const data = docSnap.data()
            if (data.experience + (5 * data.level) > data.nextLevel) {

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

        await deleteDoc(doc(db, "removed", 'item_' + currentItem.id));
        await setDoc(doc(db, "items", "item_" + currentItem.id), {
            ...currentItem
        });

        return [true];
    } catch (error) {
        console.error(`Error deleting item with id ${currentItem.id}:`, error);
        return false;
    }
};