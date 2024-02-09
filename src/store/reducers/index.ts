import { combineReducers } from 'redux';
import { itemsReducer } from './itemsReducer';

export const rootReducer = combineReducers({
    items: itemsReducer,
    // Other reducers if any
});

export type RootState = ReturnType<typeof rootReducer>