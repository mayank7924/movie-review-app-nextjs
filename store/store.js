import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userDetails from './userDetailsSlice'
import { createWrapper } from 'next-redux-wrapper'

const combinedReducer = combineReducers({
    userDetails: userDetails
})

export const makeStore = () => configureStore({
    reducer: combinedReducer,
});

export const wrapper = createWrapper(makeStore, {debug: true})