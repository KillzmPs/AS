import { createContext, use, useContext, useState } from "react";

const BilheteContext = createContext();

export function useBilhete() {
    return useContext(BilheteContext);
}

export function BilheteProvider({ children }) {
    const [tipoBilhete, setTipoBilhete] = useState(null);
    const [passoAtual, setPassoAtual] = useState(2);
    const [Hotel, setHotel] = useState(null);
    const [Voo1, setVoo1] = useState(null);
    const [Voo2, setVoo2] = useState(null);
    const [selecVoo1, setSelecVoo1] = useState(null);
    const [selecVoo2, setSelecVoo2] = useState(null);
    const [selecHotel, setSelecHotel] = useState(null);
    const [selecLugares, setSelecLugares] = useState([]);
    const [preco, setPreco] = useState(null);

    const guardarHoteis = (dados) => setHotel(dados);
    const eliminarHoteis = () => setHotel(null);

    const guardarVoo1 = (dados) => setVoo1(dados);
    const eliminarVoo1 = () => setVoo1(null);

    const guardarVoo2 = (dados) => setVoo2(dados);
    const eliminarVoo2 = () => setVoo2(null);

    const PassosBilhetes = {
        hotels: 3,
        idaevolta: 4,
        ida: 3,
    };

    const totalPasso = PassosBilhetes[tipoBilhete] || 1;

    return (
        <BilheteContext.Provider value={{ tipoBilhete, setTipoBilhete, passoAtual, setPassoAtual, guardarHoteis, eliminarHoteis, Hotel, totalPasso, guardarVoo1, eliminarVoo1, guardarVoo2, eliminarVoo2, Voo1, Voo2 }}>
            {children}
        </BilheteContext.Provider>
    );
}
