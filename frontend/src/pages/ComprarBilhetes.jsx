import React from 'react';
import ProgressBar from '../components/ProgressBar';
import { useBilhete } from '../context/BilheteContext';
import FormViagem from '../components/FormViagem';
import FormHotel from '../components/FormHotel';


const ComprarBilhetes = () => {

  const { tipoBilhete, passoAtual } = useBilhete();
  
  return (
    <div>
        <ProgressBar />
        {(tipoBilhete === "ida" || tipoBilhete === "idaevolta") && passoAtual === 2 && <FormViagem />}
        {( (tipoBilhete === "idaevolta" && passoAtual === 3) || (tipoBilhete === "hotels" && passoAtual === 2) ) && <FormHotel />}
    </div>
  );
};

export default ComprarBilhetes;