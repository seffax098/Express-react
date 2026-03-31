import { Route, Routes } from "react-router-dom";
import { routesConfig } from "./config/routes";

function App() {
    return (
        <Routes>
            {routesConfig.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
            ))}
        </Routes>
    );
}
export default App;
