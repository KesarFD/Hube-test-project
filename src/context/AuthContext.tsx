import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    useEffect,
} from "react";
import Cookies from "ts-cookies";

interface AuthContextProps {
    isAuth: boolean;
    setAuth: (isAuth: boolean) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [isAuth, setIsAuth] = useState<boolean>(false);

    const setAuth = (authStatus: boolean) => {
        setIsAuth(authStatus);
    };

    useEffect(() => {
        const token = Cookies.get("accessToken");
        if (token) {
            setIsAuth(true);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
