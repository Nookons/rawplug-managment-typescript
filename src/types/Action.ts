import {IItem} from "./Item";

export interface IAction {
    type: string;
    user: string;
    item: IItem;
}