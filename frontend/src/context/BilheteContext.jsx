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
    const [selecLugaresVoo1, setSelecLugaresVoo1] = useState([]);
    const [selecLugaresVoo2, setSelecLugaresVoo2] = useState([]);
    const [selecLugaresHotel, setSelecLugaresHotel] = useState([]);
    const [LugaresVoo1, setLugaresVoo1] = useState(null);
    const [LugaresVoo2, setLugaresVoo2] = useState(null);
    const [Quartos, setQuartos] = useState();
    const [preco, setPreco] = useState(null);
    const [precoVoo, setPrecoVoo] = useState();
    const [precoHotel, setPrecoHotel] = useState();
    const [pessoas, setPessoas] = useState();
    const [datainicio, setDatainicio] = useState();
    const [datafim, setDatafim] = useState();

    const denovo = () => {setTipoBilhete(null);setPassoAtual(2);}

    const guardarHoteis = (dados) => setHotel(dados);
    const eliminarHoteis = () => setHotel(null);
    const guardarHotelSelecionado = (dados) => setSelecHotel(dados);
    const guardarQuartoHotel = (dados) => setSelecLugaresHotel(dados);

    const guardarVoo1 = (dados) => setVoo1(dados);
    const eliminarVoo1 = () => setVoo1(null);
    const guardarVooSelecionado1 = (dados) => setSelecVoo1(dados);
    const guardarLugarVoo1 = (dados) => setSelecLugaresVoo1(dados);

    const guardarVoo2 = (dados) => setVoo2(dados);
    const eliminarVoo2 = () => setVoo2(null);
    const guardarVooSelecionado2 = (dados) => setSelecVoo2(dados);
    const guardarLugarVoo2 = (dados) => setSelecLugaresVoo2(dados);

    const PassosBilhetes = {
        hotels: 3,
        idaevolta: 4,
        ida: 3,
    };

    const totalPasso = PassosBilhetes[tipoBilhete] || 1;

    return (
        <BilheteContext.Provider value={{ tipoBilhete, setTipoBilhete, denovo, passoAtual, setPassoAtual, guardarHoteis, eliminarHoteis, Hotel, totalPasso, guardarVoo1, 
        eliminarVoo1, guardarVoo2, eliminarVoo2, 
        Voo1, Voo2, guardarHotelSelecionado, 
        guardarVooSelecionado1, guardarVooSelecionado2, guardarLugarVoo1, guardarLugarVoo2, guardarQuartoHotel, pessoas, setPessoas, setLugaresVoo1, setLugaresVoo2,
        setSelecLugaresVoo1, setSelecLugaresVoo2, LugaresVoo1, LugaresVoo2, setPrecoVoo, precoVoo,
        setQuartos, Quartos, setDatainicio, setDatafim, datainicio, datafim, setPrecoHotel, precoHotel }}>
            {children}
        </BilheteContext.Provider>
    );
}
