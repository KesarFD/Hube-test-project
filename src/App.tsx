import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import NotFound from "./pages/notFound/NotFound";
import GlobalSettings from "./pages/globalSettings/GlobalSettings";
import { useAuth } from "./context/AuthContext";

// Компонент высшего порядка для защищенных маршрутов
const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const { isAuth } = useAuth();
    return isAuth ? children : <Navigate to="/auth" />;
};

const App: React.FC = () => {
    const { isAuth } = useAuth();

    return (
        <Routes>
            <Route
                path="/settings"
                element={
                    <ProtectedRoute>
                        <GlobalSettings />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/auth"
                element={isAuth ? <Navigate to="/settings" /> : <Auth />}
            />
            <Route
                path="*"
                element={isAuth ? <NotFound /> : <Navigate to="/auth" />}
            />
        </Routes>
    );
};

export default App;
