import { useRoutes } from "react-router-dom";
import Main from "./layouts/Main";
import Home from "./pages/Home";


export default function App() {
    let content = useRoutes([
        {
            path: "/",
            element: <Home />,
            /*children: [
                {
                    path: "messages",
                    element: <DashboardMessages />,
                },
                { path: "tasks", element: <DashboardTasks /> },
            ],*/
        },
    ]);



    return (
        <Main className="App">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
                <div className="row">
                    {content}
                </div>
            </div>
        </Main>
    );
}
