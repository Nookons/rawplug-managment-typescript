import {IItem} from "./Item";

export interface IAction {
    type: string;
    person: string;
    personUid: string,
    timeStamp: string;
    changes?: any;
    itemId?: number;
    id: number;
    item: IItem;
}