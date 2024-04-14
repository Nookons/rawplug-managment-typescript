import { getDatabase, ref, remove, push, update, child } from "firebase/database";
import {IPlan} from "../../types/Plans";


export function OnRemovePlan(id: number, item: IPlan): Promise<boolean> {
    const db = getDatabase();

    // Удаляем элемент из базы данных
    return remove(child(ref(db), 'plan/' + id.toString()))
        .then(() => {
            // Если удаление прошло успешно, добавляем его в раздел deleted
            const newPostKey = push(child(ref(db), 'deleted')).key;
            const updates = {};
            updates['/deleted/' + newPostKey] = item;
            return update(ref(db), updates)
                .then(() => true) // Возвращаем true в случае успешного обновления
                .catch(error => {
                    console.error("Error updating database:", error);
                    return false;
                });
        })
        .catch((error) => {
            console.error("Error removing document: ", error);
            return false; // Возвращаем false в случае ошибки удаления
        });
}

