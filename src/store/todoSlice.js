import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {setPadding} from "./api/response/paddings";
import {setSuccessfully} from "./api/response/successfully";
import {setError} from "./api/response/errors";

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async function (limit, {
        rejectWithValue,
    }) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);

            if (!response.ok) {
                throw new Error('Server Error');
            }

            return await response.json();
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async function ({id}, {
        rejectWithValue,
        dispatch
    }) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Can\'t delete todo. Server Error!');
            }

            dispatch(removeTodo({id}));

            return await response.json();
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);

export const addNewTodo = createAsyncThunk(
    'todos/addNewTodo',
    async function ({title}, {
        rejectWithValue,
        dispatch
    }) {
        try {
            const todo = {
                userId: 1,
                title: title,
                completed: false
            }
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todo)
            });

            if (!response.ok) {
                throw new Error('Can\'t add todo. Server Error!');
            }

            const data = await response.json();

            dispatch(addTodo(data));

            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);

export const toggleTodo = createAsyncThunk(
    'todos/toggleTodo',
    async function ({id}, {
        rejectWithValue,
        dispatch,
        getState
    }) {
        const todo = getState().todosStore.todosSliceStore.find(todo => todo.id === id);

        console.log(todo);

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    completed: !todo.completed
                })
            });

            if (!response.ok) {
                throw new Error('Can\'t update todo. Server Error!');
            }

            //const data = await response.json();

            dispatch(toggleTodoCompleted({id}));

            //return await response.json();
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todosSliceStore: [],
        status: null,
        error: null
    },
    reducers: {
        addTodo(state, action) {
            state.todosSliceStore.push(action.payload)
        },
        removeTodo(state, action) {
            state.todosSliceStore = state.todosSliceStore.filter(todo => todo.id !== action.payload.id);
        },
        toggleTodoCompleted(state, action) {
            const toggleTodo = state.todosSliceStore.find(todo => todo.id === action.payload.id);
            toggleTodo.completed = !toggleTodo.completed;
        }
    },
    // здесь мы обрабатываетм createAsyncThunk
    extraReducers: {
        /**
         * @name Получение
         */
        // когда отправился запрос в API но еще не получили отчет
        [fetchTodos.pending]: setPadding,
        // когда мы успешно плучили ответ от сервера или завершился запрос
        [fetchTodos.fulfilled]: setSuccessfully,
        // когда произошла ошибка
        [fetchTodos.rejected]: setError,

        /**
         * @name Удаление
        * */
        // когда отправился запрос в API но еще не получили отчет
        // [deleteTodo.pending]: setPadding,
        // когда мы успешно плучили ответ от сервера или завершился запрос
        // [deleteTodo.fulfilled]: setSuccessfully,
        // когда произошла ошибка
        [deleteTodo.rejected]: setError,
        /**
         * @name Добавление
        * */
        // когда отправился запрос в API но еще не получили отчет
        //[addNewTodo.pending]: setPadding,
        // когда мы успешно плучили ответ от сервера или завершился запрос
        //[addNewTodo.fulfilled]: setSuccessfully,
        // когда произошла ошибка
        [addNewTodo.rejected]: setError,

        /**
         * @name Обновление
        * */
        // когда отправился запрос в API но еще не получили отчет
        //[toggleTodo.pending]: setPadding,
        // когда мы успешно плучили ответ от сервера или завершился запрос
        // [toggleTodo.fulfilled]: setSuccessfully,
        // когда произошла ошибка
        [toggleTodo.rejected]: setError,
    }
});

/**
 * @deprecated
 * @code

 export const {addTodo, removeTodo, toggleTodoCompleted} = todoSlice.actions;

 * */
const {addTodo, removeTodo, toggleTodoCompleted} = todoSlice.actions;

export default todoSlice.reducer;
