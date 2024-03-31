import {IItem} from "./Item";

export interface IRemoved {
    removedTime: string;
    user: string;
    userUid: string;
    type: string;
    item: IItem;
}