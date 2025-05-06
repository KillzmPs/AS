import React from 'react';
import ProgressBar from '../components/ProgressBar';
import { useBilhete } from '../context/BilheteContext';
import FormViagem from '../components/FormViagem';
import FormHotel from '../components/FormHotel';
import FormConfirmacao from '../components/FormConfirmacao';


const ComprarBilhetes = () => {

  const { tipoBilhete, passoAtual } = useBilhete();
  
  return (
    <div>
        <ProgressBar />
        {(tipoBilhete === "ida" || tipoBilhete === "idaevolta") && passoAtual === 2 && <FormViagem />}
        {( (tipoBilhete === "idaevolta" && passoAtual === 3) || (tipoBilhete === "hotels" && passoAtual === 2) ) && <FormHotel />}
        {( (tipoBilhete === "idaevolta" && passoAtual === 4 ) || ((tipoBilhete === "ida" || tipoBilhete === "hotels") && passoAtual == 3) ) && <FormConfirmacao />}
    </div>
  );
};

export default ComprarBilhetes;