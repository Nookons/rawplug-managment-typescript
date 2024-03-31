import {IItem} from "./Item";

export interface IAction {
    type: string;
    user: string;
    userUid: string,
    actionTime: string;
    item: IItem;
}