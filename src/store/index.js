import {configureStore} from '@reduxjs/toolkit';
import todosReducer from "./todoSlice";

export default configureStore({
    reducer: {
        todosStore: todosReducer,
    }
});