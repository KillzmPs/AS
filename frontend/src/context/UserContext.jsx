import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({children}) {
    const [user, setUser] = useState(null);

    const login = (dados) => {
        localStorage.setItem('user', JSON.stringify(dados));
        setUser(dados);
      };
    
    const logout = () => {
        setUser(null);
        localStorage.setItem('user', JSON.stringify(user));
      };
      

    return (
        <UserContext.Provider value={{user, login, logout}}>
            {children}
        </UserContext.Provider>
    );
}