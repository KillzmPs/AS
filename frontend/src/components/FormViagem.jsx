import React from "react";
import { useBilhete } from "../context/BilheteContext";
import './FormViagem.css';

const FormViagem = () => {
  const {
    tipoBilhete,
    passoAtual,
    setPassoAtual,
    Voo1,
    Voo2,
    guardarVoo1,
    guardarVoo2,
  } = useBilhete();

  const renderVooIdaVolta = () => {
    const totalPares = Math.min(Object.keys(Voo1 || {}).length, Object.keys(Voo2 || {}).length);
    const paresVoos = [];

    for (let i = 0; i < totalPares; i++) {
      const ida = Voo1[i];
      const volta = Voo2[i];
      if (ida && volta) paresVoos.push({ voo1: ida, voo2: volta });
    }

    return paresVoos.map((par, index) => (
      <div key={index} className="bilhete-card">
        <div className="bilhete-content">
          <div className="bilhete-coluna larga">
            <div className="linha-voo">
              <img src={`src/img/${par.voo1.Comp_Abre}.png`} alt="Logo da Companhia" className="imagem-companhia" />
              <div className="info-voo">
                <div>{new Date(par.voo1.Data_Partida).toLocaleDateString("pt-PT")} </div>
                <strong>Ida:</strong> {par.voo1.Nome_Aeroporto_Origem} → {par.voo1.Nome_Aeroporto_Destino} <br />
                <small>
                  {new Date(par.voo1.Data_Partida).toLocaleTimeString("pt-PT", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })} - {new Date(par.voo2.Data_Chegada).toLocaleTimeString("pt-PT", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}    
                </small>
              </div>
            </div>
            <div className="linha-voo">
              <img src={`src/img/${par.voo2.Comp_Abre}.png`} alt="Logo da Companhia" className="imagem-companhia" />
              <div className="info-voo">
                <div>{new Date(par.voo2.Data_Partida).toLocaleDateString("pt-PT")} </div>
                <strong>Volta:</strong> {par.voo2.Nome_Aeroporto_Origem} → {par.voo2.Nome_Aeroporto_Destino} <br />
                <small>
                  {new Date(par.voo2.Data_Partida).toLocaleTimeString("pt-PT", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })} - {new Date(par.voo2.Data_Chegada).toLocaleTimeString("pt-PT", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </small>
              </div>
            </div>
          </div>
          <div className="bilhete-coluna estreita">
          <div>
            <button
              onClick={() => {
                guardarVoo1(par.voo1);
                guardarVoo2(par.voo2);
                setPassoAtual(passoAtual + 1);
              }}
              className="selecionar-btn"
            >
              Selecionar
            </button>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  const renderVooIda = () => {
    const voos = Object.values(Voo1 || {});
    return voos.map((voo, index) => (
      <div key={index} className="bilhete-card">
        <div className="bilhete-content">
          <div className="bilhete-coluna larga">
            <div className="linha-voo">
              <img src={`src/img/${voo.Comp_Abre}.png`} alt="Logo da Companhia" className="imagem-companhia" />
              <div className="info-voo">
              <div>{new Date(voo.Data_Partida).toLocaleDateString("pt-PT")} </div>
                <strong>{voo.Nome_Aeroporto_Origem} → {voo.Nome_Aeroporto_Destino}</strong><br />
                <small>
                  {new Date(voo.Data_Partida).toLocaleTimeString("pt-PT", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })} - {new Date(voo.Data_Chegada).toLocaleTimeString("pt-PT", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </small>
              </div>
            </div>
          </div>

          <div className="bilhete-coluna estreita">
            <div>
            <button
              onClick={() => {
                guardarVoo1(voo);
                setPassoAtual(passoAtual + 1);
              }}
              className="selecionar-btn"
            >
              Selecionar
            </button>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  const deveMostrar =
    (tipoBilhete === "idaevolta" && passoAtual === 2) ||
    (tipoBilhete === "ida" && passoAtual === 2);

  if (!deveMostrar) return null;

  return (
    <div className="form-container">
      <h2 className="titulo-passo">Escolhe um dos seguintes Voos Disponiveis</h2>
      {tipoBilhete === "idaevolta" ? renderVooIdaVolta() : renderVooIda()}
    </div>
  );
};

export default FormViagem;
