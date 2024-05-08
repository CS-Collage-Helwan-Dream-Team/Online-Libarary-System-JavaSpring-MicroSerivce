import {
    getTokenFromSession,
    setTokenToSession,
} from "@/utils/tokenSessionActions";
import {
    getUserFromSession,
    setUserToSession,
} from "@/utils/userSessionActions";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getUserFromSession());
    const [token, setToken] = useState(getTokenFromSession());

    useEffect(() => {
        setUserToSession(user ? user : "");
    }, [user]);

    useEffect(() => {
        setTokenToSession(token ? token : "");
    }, [token]);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                token,
                setToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

function useAuthContext() {
    const context = useContext(AuthContext);
    if (context === undefined)
        throw new Error("auth context was used outside of language provider");
    return context;
}
export { AuthProvider, useAuthContext };
