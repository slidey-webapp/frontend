import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers } from 'redux';
import { authSlice } from '~/store/authSlice';

const reducer = combineReducers({
    auth: authSlice.reducer,
});

export const store = configureStore({
    reducer,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const useAppSelector: TypedUseSelectorHook<RootState> = (...args) => useSelector(...args);

export default store;
