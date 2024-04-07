import {IItem} from "./Item";

export interface IRemoved {
    timeStamp: string;
    person: string;
    personUid: string;
    item: IItem;
}