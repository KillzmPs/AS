import React, { useState, useEffect } from 'react';
import './Recomendacoes.css';
import { fetchClasses } from './Reco'; 

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const loadRecommendations = async () => {
      const data = await fetchClasses();
      setRecommendations(data); 
    };
    loadRecommendations();
  }, []);

  return (
    <div className="recommendations">
      <h1 className="recommendations-title">- Recomendações -</h1>
      <div className="recommendations-row">
        {recommendations.length > 0 ? (
          recommendations.map((rec, index) => (
            <div key={rec.Id} className="recommendation-card">
              <img src={`src/img/${rec.Abreviacao}.png`} alt={rec.Nome} />
              <h1>{rec.Nome}</h1>
              <p>{new Date(rec.Data_Partida).toLocaleString("pt-PT", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
              })} → {new Date(rec.Data_Chegada).toLocaleString("pt-PT", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}</p>
              <p>{rec.Aeroporto_Origem}({rec.Pais_Origem})- {rec.Aeroporto_Destino}({rec.pais_destino})</p>
              <p>Classe: <b>{rec.Tipo_Classe}</b></p>
              <p><b style={{fontSize: "17px"}}>{rec.Preco}€/pessoa</b></p>
            </div>
          ))
        ) : (
          <p>A Carregar recomendações...</p>
        )}
      </div>
    </div>
  );
};

export default Recommendations;
