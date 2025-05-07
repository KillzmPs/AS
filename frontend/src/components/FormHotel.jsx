import React from "react";
import { useBilhete } from "../context/BilheteContext";
import { useUser } from "../context/UserContext";
import { useModal } from "../context/ModalContext";
import { Quartos } from "./SistemaBilhetes";
import './FormViagem.css';

const FormHotel = () => {
  
    const {
    Hotel,
    guardarHotelSelecionado,
    setQuartos
  } = useBilhete();

  const { openLogin, hotels } = useModal();
  const { user } = useUser();

  const hoteis = Hotel || [];


  if (!hoteis.length) return null;

   const clicarHotel = async (quarto) => {
      if (user) {
        guardarHotelSelecionado(quarto);
        const result = await Quartos(quarto.Id_Hotel);
        console.log(result);
        setQuartos(result);
        hotels();
      } else {
        openLogin();
      }
    }

  return (
    <div className="form-container">
      <h2 className="titulo-passo">Escolha um dos Seguintes Hoteis</h2>
      {hoteis.map((hotel, index) => (
        <div key={index} className="bilhete-card">
          <div className="bilhete-content">
            <div className="bilhete-coluna larga">
              <div className="hotel-info">
                <div className="info-detalhes">
                  <h3>{hotel.Nome}</h3>
                  <p>{hotel.Morada}, {hotel.Nome_Pais}</p>
                  <p>Lotação: {hotel.Lotacao} pessoas</p>
                  <p>Quartos disponíveis: {hotel.Quartos_Disponiveis}</p>
                  <p>Avaliação: {"★".repeat(hotel.Avaliacao)}</p>
                </div>
              </div>
            </div>

            <div className="bilhete-coluna  estreita">
            <div>
              <div><h3>{hotel.Min_preco} - {hotel.Max_preco}€/Pessoa dia</h3></div>
              <button
                  onClick={() => {clicarHotel(hotel)}}
                  className="selecionar-btn"
                >
                  Selecionar
                </button>
            </div>
          </div>

          </div>
        </div>
      ))}
    </div>
  );
};

export default FormHotel;
