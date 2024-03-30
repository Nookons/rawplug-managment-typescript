import {IItem} from "./Item";

export interface IRemoved {
    removedTime: string;
    user: string;
    type: string;
    item: IItem;
}