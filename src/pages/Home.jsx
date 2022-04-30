import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {addNewTodo, deleteTodo, fetchTodos, toggleTodo} from '../store/todoSlice';

export default function Home() {
    const {todosSliceStore, status, error} = useSelector(state => state.todosStore);
    const dispatch = useDispatch();
    const [text, setText] = useState('');


    console.log("LOADED", status);

    useEffect(() => {
        dispatch(fetchTodos(10));
    }, [dispatch]);


    const addTodo = () => {
        if (text.trim()) {
            dispatch(addNewTodo({
                title: text
            }));
            setText('');
        }
    }

    return (
        <>
            <div className="flex mb-10 gap-2">
                <input type="text"
                       className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm"
                       value={text} onChange={(e) => setText(e.target.value)}/>
                <button
                    className="w-64 bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg flex items-center justify-center dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
                    onClick={addTodo}>Add random element
                </button>
            </div>


            {status === 'loading' && (
                <div>
                    Loading...
                </div>
            )}
            {error && (
                <div>
                    {error}
                </div>
            )}
            {
                status === 'resolved' &&
                todosSliceStore.map(todo => <div
                    className={"p-5 mb-2 border-2 rounded flex items-center justify-between " + (todo.completed ? "border-sky-600" : "border-red-600")}
                    key={todo.id}>
                    <div className="font-bold">
                        <h4>{todo.id} - {todo.title}</h4>
                    </div>
                    <div className="flex gap-2">
                        <button
                            className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
                            type="button" onClick={() => dispatch(toggleTodo(todo))}>
                            Обновить статус
                        </button>
                        <button
                            className="bg-red-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-red-500 dark:highlight-white/20 dark:hover:bg-red-400"
                            type="button" onClick={() => dispatch(deleteTodo(todo))}>
                            Удалить
                        </button>
                    </div>
                </div>)
            }
        </>
    )
}
