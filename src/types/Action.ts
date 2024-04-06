import {IItem} from "./Item";

export interface IAction {
    type: string;
    person: string;
    personUid: string,
    timeStamp: string;
    id: number;
    item: IItem;
}