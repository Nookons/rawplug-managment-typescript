import {IItem} from "./Item";

export interface IAction {
    type: string;
    user: string;
    actionTime: string;
    item: IItem;
}