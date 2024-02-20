import { getDatabase, ref, remove, push, update, child } from "firebase/database";
import {IPlan} from "../types/Plans";

export function OnRemovePlan(id: number, item: IPlan) {
    const db = getDatabase();

    // Удаляем элемент из базы данных
    remove(child(ref(db), 'plan/' + id.toString()))
        .then(() => {
            // Если удаление прошло успешно, добавляем его в раздел deleted
            const newPostKey = push(child(ref(db), 'deleted')).key;
            const updates = {};
            updates['/deleted/' + newPostKey] = item;
            update(ref(db), updates);
        })
        .catch((error) => {
            console.error("Error removing document: ", error);
        });
}
