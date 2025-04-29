import React, {  useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { BilhetesId, BilheteVoo, BilheteHotel, Pagamento } from '../components/Bilhetes';
const Bilhetes = () => {
  const { user } = useUser();
  const [bilhete, setBilhete] = useState(null);

  useEffect(() => {


    const fetchBilhetes = async () => {
      const result = await BilhetesId(user.Id);
      setBilhete(result[0]);
    };

    const fetchBilheteVoo = async () => {
      const result = await BilhetesId(user.Id);
      setBilhete(result[0]);
    };

    const fetchBilheteHotel = async () => {
      const result = await BilhetesId(user.Id);
      setBilhete(result[0]);
    };

    const fetchPagamento = async () => {
      const result = await BilhetesId(user.Id);
      setBilhete(result[0]);
    };

    fetchBilhetes();
    fetchBilheteVoo();
    fetchBilheteHotel();
    fetchPagamento();

  }, [user]);



  return (
    <div>
      <title>Os meus Bilhetes</title>
      <h1>{JSON.stringify(bilhete)}</h1>

    </div>
  );
};

export default Bilhetes;