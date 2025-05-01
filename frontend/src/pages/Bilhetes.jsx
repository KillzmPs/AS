import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { BilhetesId, BilheteVoo, BilheteHotel, Pagamento } from '../components/Bilhetes';
import '../components/Bilhete.css';

const Bilhetes = () => {
  const { user } = useUser();
  const [bilhetes, setBilhetes] = useState([]);
  const [detalhes, setDetalhes] = useState({});

  useEffect(() => {
    const fetchDados = async () => {
      if (!user) return;

      const bilhetesData = await BilhetesId(user.Id);
      setBilhetes(bilhetesData || []);

      if (bilhetesData && bilhetesData.length > 0) {
        const detalhesTemp = {};

        for (const bilhete of bilhetesData) {
          const id = bilhete.Id;
          const voo = await BilheteVoo(id);
          const hotel = await BilheteHotel(id);
          const pagamento = await Pagamento(id);

          detalhesTemp[id] = { voo, hotel, pagamento };
          console.log(detalhesTemp);
        }

        setDetalhes(detalhesTemp);
      }
    };

    fetchDados();
  }, [user]);

  return (
    <div>
      <title>Os meus Bilhetes</title>
      <h1 style={{color:"White", textAlign:"center"}}>-Dados Pessoais-</h1>
      <div className='BilheteContainer'>
      {bilhetes.length === 0 ? (
        <p>Não tem bilhetes disponíveis.</p>
      ) : (
        bilhetes.map((bilhete) => {
          const info = detalhes[bilhete.Id] || {};
          return (
            <div key={bilhete.Id} className='BilheteBox'>
              <div className='BilheteHeader'>
                <div className='BilheteID'>
                  ID: {bilhete.Id}
                </div>
              </div>
              <div className='BilheteBody'>
                <div className='BilheteTipo'>
                  { info.voo  && (<div className='BilheteVoo'>Voo</div>)}
                  { info.hotel && (<div className='BilheteHotel'>Hotel</div>)}
                </div>
                <div className='BilheteViagem'>
                <div className='Viagens'>
                {info.voo && info.voo.map((voo, index) => (
                    <div key={index} className='BilheteAero'>
                      <div className='BilheteCompanhia'>
                      <img src={`src/img/${voo.Abreviacao}.png`} alt={voo.Companhia_Aerea} />
                      </div>
                      <div className='ViagemContent'>
                        <div><strong>Lugar:</strong> {voo.Lugar}</div>
                        <div className='Tempo'>
                          <div className='Horas'>{new Date(voo.Data_Partida).toLocaleTimeString('pt-PT', {hour: '2-digit', minute: '2-digit', hour12: false})} - {new Date(voo.Data_Chegada).toLocaleTimeString('pt-PT', {hour: '2-digit', minute: '2-digit', hour12: false})}</div>
                          <div className='Data'>{new Date(voo.Data_Chegada).toLocaleDateString()}</div>
                        </div> 
                        <div className='Aeroportos'>{voo.Aeroporto_Origem} - {voo.Aeroporto_Destino}</div>
                      </div>
                    </div>
                  ))}
                  </div>
                   <div className='BilheteQuarto'>
                  {info.hotel && info.hotel.map((hotel, index) => (
                  <>
                    <div key={index}>{hotel.Nome}</div>
                    <div key={index}>Quarto:{hotel.Numero_Quarto}</div>
                  </>
                ))}
                </div>
                </div>
              </div>
            </div>
          );
        })
      )}
      </div>
    </div>
  );
};

export default Bilhetes;
