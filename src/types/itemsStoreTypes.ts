import {IItem} from "./Item";

export enum userActionTypes {
    FETCH_ITEMS = "FETCH_ITEMS",
    FETCH_ITEMS_SUCCESS = "FETCH_ITEMS_SUCCESS",
    FETCH_ITEMS_ERROR = "FETCH_ITEMS_ERROR"
}

export interface itemsState {
    items: any,
    loading: boolean,
    error: null | string
}

/*////////////////////////////////////////////////////////////////*/

interface FetchItemsAction {
    type: userActionTypes.FETCH_ITEMS,
}

interface FetchItemsSuccessAction {
    type: userActionTypes.FETCH_ITEMS_SUCCESS,
    payload: any
}

interface FetchItemsErrorAction {
    type: userActionTypes.FETCH_ITEMS_ERROR,
    payload: string
}

export type itemsAction = FetchItemsAction | FetchItemsSuccessAction| FetchItemsErrorAction