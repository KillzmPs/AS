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
        }

        setDetalhes(detalhesTemp);
      }
    };

    fetchDados();
  }, [user]);

  return (
    <div>
      <title>Os meus Bilhetes</title>
      <h1 style={{ color: "White", textAlign: "center" }}>-Os Meus Bilhetes-</h1>
      <div className='BilheteContainer'>
        {bilhetes.length === 0 ? (
          <p>Não tem bilhetes disponíveis.</p>
        ) : (
          bilhetes.map((bilhete) => {
            const info = detalhes[bilhete.Id] || {};
            return (
              <div key={bilhete.Id} className='BilheteBox'>
                <div className='BilheteHeader'>
                  <div className='BilheteID'>ID: {bilhete.Id}</div>
                </div>
                <div className='BilheteBody'>
                  <div className='BilheteTipo'>
                    {info.voo && <div className='BilheteVoo'>Voo</div>}
                    {info.hotel && <div className='BilheteHotel'>Hotel</div>}
                  </div>
                  <div className='BilheteViagem'>
                    <div className='Viagens'>
                      {info.voo && info.voo.length > 0 ? (
                        [...new Map(info.voo.map(voo => {
                          const key = `${voo.Data_Partida}-${voo.Data_Chegada}-${voo.Aeroporto_Origem}-${voo.Aeroporto_Destino}`;
                          return [key, voo];
                        })).values()].map((voo, index) => {
                          const lugares = info.voo
                            .filter(v =>
                              v.Data_Partida === voo.Data_Partida &&
                              v.Data_Chegada === voo.Data_Chegada &&
                              v.Aeroporto_Origem === voo.Aeroporto_Origem &&
                              v.Aeroporto_Destino === voo.Aeroporto_Destino
                            )
                            .map(v => v.Lugar)
                            .filter((v, i, arr) => arr.indexOf(v) === i)
                            .sort((a, b) => a - b)
                            .join(', ');

                          return (
                            <div key={index} className='BilheteAero'>
                              <div className='BilheteCompanhia'>
                                <img src={`src/img/${voo.Abreviacao}.png`} alt={voo.Companhia_Aerea} />
                              </div>
                              <div className='ViagemContent'>
                                <div className='Tempo'>
                                  <div className='Horas'>
                                    {new Date(voo.Data_Partida).toLocaleTimeString('pt-PT', {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                      hour12: false
                                    })} - {new Date(voo.Data_Chegada).toLocaleTimeString('pt-PT', {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                      hour12: false
                                    })}
                                  </div>
                                  <div className='Data'>{new Date(voo.Data_Chegada).toLocaleDateString('pt-PT')}</div>
                                  <div><strong>Lugares:</strong> {lugares}</div>
                                </div>
                                <div className='Aeroportos'>{voo.Aeroporto_Origem} - {voo.Aeroporto_Destino}</div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <>
                        <div className='ViagemContent'>
                          <hr />
                        </div>
                        <div className='ViagemContent'>
                        <hr />
                      </div>
                      </>
                      )}
                    </div>
                    <div className='BilheteQuarto'>
                      {info.hotel && info.hotel.length > 0 ? (
                        <div>
                          <div>{new Date(info.hotel[0].Data_Inicio).toLocaleDateString('pt-PT')} - {new Date(info.hotel[0].Data_Fim).toLocaleDateString('pt-PT')}</div>
                          <div>{info.hotel[0].Nome}</div>
                          <div>
                            Quarto(s): {
                              info.hotel
                                .map(h => h.Numero_Quarto)
                                .filter((v, i, arr) => arr.indexOf(v) === i)
                                .sort((a, b) => a - b)
                                .join(', ')
                            }
                          </div>
                        </div>
                      ) : (
                        <hr />
                      )}
                    </div>
                  </div>

                  {info.pagamento && info.pagamento.map((pagamento, index) => (
                    <div key={index} className='BilhetePagamento'>
                      <div className='PagamentoContent'>
                        Data: {new Date(bilhete.Data_emissao).toLocaleDateString('pt-PT')}
                      </div>
                      <div className='PagamentoEstado' style={{backgroundColor: pagamento.Cor, color: pagamento.Tipo_Estado === "Aguardar Pagamento" ? "#333" : "white"}}>
                        {pagamento.Tipo_Estado}
                      </div>
                      <div className='PagamentoContent'>
                        {pagamento.Tipo_Pagamento}
                      </div>
                      <div className='PagamentoPreco'>
                        {pagamento.Preco}€
                      </div>
                    </div>
                  ))}
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
