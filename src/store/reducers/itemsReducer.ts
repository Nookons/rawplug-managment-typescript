import {itemsAction, itemsState, userActionTypes} from "../../types/itemsStoreTypes";

const initialState: itemsState = {
    items: [],
    loading: false,
    error: null
}

export const itemsReducer = (state = initialState, action: itemsAction): itemsState => {
    switch (action.type) {
        case userActionTypes.FETCH_ITEMS:
            return {loading: true, error: null, items: [] }

        case userActionTypes.FETCH_ITEMS_SUCCESS:
            return {loading: false, error: null, items: action.payload }

        case userActionTypes.FETCH_ITEMS_ERROR:
            return {loading: false, error: action.payload, items: [] }

        default:
            return state
    }
}