
import React, { useState } from "react";
import { useBilhete } from "../context/BilheteContext";
import { useUser } from "../context/UserContext";
import { useModal } from "../context/ModalContext";
import { useNavigate } from 'react-router-dom';
import { CriaBilhete, procuraLugar, maxBilhete, updateLugar, inserirlugar, procuraQuarto, updateQuarto, inserirQuarto, criarpagamento } from "./Bilhetes";
import './FormConfirmacao.css';

const FormConfirmacao = () => {
    const { preco, selecHotel, selecVoo1, selecVoo2, precoHotel, precoVoo, selecLugaresVoo1, selecLugaresVoo2, selecLugaresHotel, datainicio, datafim} = useBilhete();
    const [metodo, setMetodo] = useState("");
    const [ligado, setLigado] = useState(true);
    const [idM, setIdM] = useState("");
    const { refMbWay } = useModal();
    const {navigate } = useNavigate();

    const { user } = useUser();
    
    const CriarBilhete = async () => {

            const result = await CriaBilhete(user.Id); // criar bilhete
            const result2 = await maxBilhete(user.Id); // id bilhete
            const id_bilhete = result2[0].ma;
            console.log(id_bilhete);
            if(selecLugaresVoo1.length > 0) // voo1
                selecLugaresVoo1.forEach(async (num) => {
                const result = await procuraLugar(num, selecVoo1.Id_Viagem);  // id lugar
                const id_lugar = result[0].Id;
                const result2 = await updateLugar(id_lugar);
                const result3 = await inserirlugar(id_bilhete, id_lugar);
                console.log(result3);
            });

            if(selecLugaresVoo2.length > 0) //voo2
                selecLugaresVoo2.forEach(async (num) => {
                const result = await procuraLugar(num, selecVoo2.Id_Viagem);  // id lugar
                const id_lugar = result[0].Id;
                const result2 = await updateLugar(id_lugar);
                const result3 = await inserirlugar(id_bilhete, id_lugar);
                console.log(result3);
            });

            if(selecLugaresHotel.length > 0) //hotel
                console.log(selecHotel);
                selecLugaresHotel.forEach(async (num) => {
                const result = await procuraQuarto(num, selecHotel.Id_Hotel);  // id_hotel
                const id_lugar = result[0].Id;
                const result2 = await updateQuarto(id_lugar);
                console.log(id_lugar);
                const result3 = await inserirQuarto(id_bilhete, id_lugar, new Date(selecVoo1.Data_Partida).toISOString().slice(0, 10), new Date(selecVoo2.Data_Partida).toISOString().slice(0, 10));
            });

            const result4 = await criarpagamento(id_bilhete,preco,"1",idM, user.Email);
            if(idM === 1){refMbWay()}
            navigate("/");

    }

    return (
        <div className="backConf">
            <div className="ConfCard">
                <div className="DadosPessoais">
                    <h2 className="ConfCardHead">Dados Pessoais</h2>
                    <div style={{height:"100%", alignItems:"center", justifyItems:"center", justifyContent:"center", alignContent:"center"}}>
                    <div className="UserInfo">Nome: {user.Nome}</div>
                    <div className="UserInfo">{user.Email}</div>
                    <div className="UserInfo">Telemóvel: {user.Telemovel}</div>
                    <div className="UserInfo">Nascimento: {new Date(user.Data_Aniversario).toLocaleDateString('pt-PT')}</div>
                    <div className="UserInfo">País: {user.Nome_Pais}</div>
                    </div>
                </div>

                <div className="ViagensHotel">
                    <h2 className="ConfCardHead">Detalhes da Viagem</h2>
                    <div className="Viagens2">
                        {selecVoo1 && (<div className="viagem">
                            <div className="imagens">
                                <img src={`src/img/${selecVoo1.Comp_Abre}.png`} style={{height:"50px"}} alt="Voo de Ida" className="imagemViagem" />
                            </div>
                            <div>Ida: {selecVoo1.Nome_Aeroporto_Origem} → {selecVoo1.Nome_Aeroporto_Destino}</div>
                            <div>Lugares: {selecLugaresVoo1.join(", ")}</div>
                            <div className='Data'>{new Date(selecVoo1.Data_Partida).toLocaleDateString('pt-PT')} {new Date(selecVoo1.Data_Partida).toLocaleTimeString('pt-PT', {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                      hour12: false
                                    })} - {new Date(selecVoo1.Data_Chegada).toLocaleTimeString('pt-PT', {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                      hour12: false
                                    })}</div>
                        </div>)}
                        {selecVoo2 && (<div className="viagem">
                            <div className="imagens">
                                <img src={`src/img/${selecVoo2.Comp_Abre}.png`} style={{height:"50px"}} alt="Voo de Ida" className="imagemViagem" />
                            </div>
                            <div>Volta: {selecVoo2.Nome_Aeroporto_Origem} → {selecVoo2.Nome_Aeroporto_Destino}</div>
                            <div>Lugares: {selecLugaresVoo2.join(", ")}</div>
                            <div className='Data'>{new Date(selecVoo2.Data_Partida).toLocaleDateString('pt-PT')} {new Date(selecVoo1.Data_Partida).toLocaleTimeString('pt-PT', {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                      hour12: false
                                    })} - {new Date(selecVoo2.Data_Chegada).toLocaleTimeString('pt-PT', {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                      hour12: false
                                    })}</div>
                        </div>)}
                    </div>
                    <div className="Hoteis">
                        {selecHotel && (<div className="hotelInfo">
                            <div>Hotel: {selecHotel.Nome}</div>
                            <div>Localização: {selecHotel.Morada}</div>
                            <div>Lugares: {selecLugaresHotel.join(", ")}</div>
                        </div>)}
                    </div>
                </div>

                <div className="DadosPreco">
                    <h2 className="ConfCardHead pedido">Resumo do Pedido</h2>
                    <div className="PrecoInfo"><hr /></div>
                    <div className="PrecoInfo"><span>Voo</span><span>{precoVoo}€</span></div>
                    <div className="PrecoInfo"><span>Hotel</span><span>{precoHotel}€</span></div>
                    <div className="PrecoInfo"><hr /></div>
                    <div className="PrecoInfo total"><span>Total</span><span>{preco}€</span></div>
                </div>
            </div>
            <div>
                <h1 style={{color:"white", width:"1300px"}}>Metodos Pagamento</h1>
                <div className="MetodosPagamento">
                <div className="Metodos" onClick={() => {setMetodo("MBWay");setLigado(false);setIdM(1)}} style={{backgroundColor: metodo === "MBWay" ? "pink": "white"}}>
                   <div>
                    <div>
                        <img src="src/img/MBWAY.png"/>
                    </div>
                    <div style={{textAlign:"end"}}>
                        MBWay
                    </div>
                   </div>
                </div>
                <div className="Metodos" onClick={() => {setMetodo("Multibanco");setLigado(false);setIdM(2)}} style={{backgroundColor: metodo === "Multibanco" ? "pink": "white"}}>
                   <div>
                    <div>
                        <img src="src/img/Multibanco.png"/>
                    </div>
                    <div style={{textAlign:"end"}}>
                        Multibanco
                    </div>
                   </div>
                </div>
                <div className="Metodos" onClick={() => {setMetodo("Stripe");setLigado(false);setIdM(3)}} style={{backgroundColor: metodo === "Stripe" ? "pink": "white"}}>
                   <div>
                    <div>
                        <img src="src/img/Stripe.png"/>
                    </div>
                    <div style={{textAlign:"end"}}>
                        Stripe
                    </div>
                   </div>
                </div>
                </div>
            </div>
            <div style={{display:"flex", justifyContent:"flex-end", width:"1300px"}}>
            <button type="submit" className="veriB" disabled={ligado} style={{backgroundColor: ligado ? "gray" : "blue"}} onClick={() => {CriarBilhete()}}>Pagar</button>
            </div>
        </div>
    );
};

export default FormConfirmacao;
