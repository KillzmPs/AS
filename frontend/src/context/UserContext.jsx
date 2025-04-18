import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({children}) {
    const [user, setUser] = useState(null);

    const login = (dados) => setUser(dados);
    const logout = () => setUser(null);

    return (
        <UserContext.Provider value={{user, login, logout}}>
            {children}
        </UserContext.Provider>
    );
}