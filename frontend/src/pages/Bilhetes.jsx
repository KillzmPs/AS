import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { BilhetesId, BilheteVoo, BilheteHotel, Pagamento } from '../components/Bilhetes';

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
      <h1>Bilhetes</h1>

      {bilhetes.length === 0 ? (
        <p>Não tem bilhetes disponíveis.</p>
      ) : (
        bilhetes.map((bilhete) => {
          const info = detalhes[bilhete.Id] || {};
          return (
            <div key={bilhete.Id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
              <h2>Bilhete ID: {bilhete.Id}</h2>
              <pre>{JSON.stringify(bilhete, null, 2)}</pre>

              <h3>Bilhete Voo:</h3>
              <pre>
                {info.voo === undefined
                  ? 'A carregar...'
                  : info.voo
                  ? JSON.stringify(info.voo, null, 2)
                  : 'Sem dados de voo.'}
              </pre>

              <h3>Bilhete Hotel:</h3>
              <pre>
                {info.hotel === undefined
                  ? 'A carregar...'
                  : info.hotel
                  ? JSON.stringify(info.hotel, null, 2)
                  : 'Sem dados de hotel.'}
              </pre>

              <h3>Pagamento:</h3>
              <pre>
                {info.pagamento === undefined
                  ? 'A carregar...'
                  : info.pagamento
                  ? JSON.stringify(info.pagamento, null, 2)
                  : 'Sem dados de pagamento.'}
              </pre>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Bilhetes;
