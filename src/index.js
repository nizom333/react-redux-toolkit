import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import store from './store'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    /**
     * Примечание: - Проверки строгого режима работают только в режиме разработки; они не оказывают никакого эффекта в продакшен-сборке.
     * */
    // <React.StrictMode> // если не убрать отправляется 2 запроса к серверу
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
    // </React.StrictMode>
);

reportWebVitals();
