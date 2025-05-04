import { createContext, useContext, useState } from "react";

const BilheteContext = createContext();

export function useBilhete() {
    return useContext(BilheteContext);
}

export function BilheteProvider({ children }) {
    const [tipoBilhete, setTipoBilhete] = useState(null);
    const [passoAtual, setPassoAtual] = useState(2);

    const PassosBilhetes = {
        hotels: 3,
        idaevolta: 4,
        ida: 3,
    };

    const totalPasso = PassosBilhetes[tipoBilhete] || 1;

    return (
        <BilheteContext.Provider value={{ tipoBilhete, setTipoBilhete, passoAtual, setPassoAtual, totalPasso }}>
            {children}
        </BilheteContext.Provider>
    );
}
