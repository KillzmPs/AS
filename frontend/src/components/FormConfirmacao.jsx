import React, { useEffect, useState } from "react";
import { useBilhete } from "../context/BilheteContext";
import { useUser } from "../context/UserContext";

const FormConfirmacao = () => {
    const { preco, selecHotel, selecVoo1, selecVoo2, precoHotel, precoVoo, selecLugaresVoo1, selecLugaresVoo2, selecLugaresHotel } = useBilhete();
    const { user } = useUser();
    
    return(<div><h1>Confirmacao</h1>
    <h1>Cliente: {user.Nome}</h1>
    {selecLugaresVoo1.length > 0 && (<h1>Lugares Voo1: {selecLugaresVoo1.join(", ")}</h1>)}
    {(selecLugaresVoo2.length > 0 && (selecLugaresVoo2.length > 1 || selecLugaresVoo2[0] !== "")) && (<h1>Lugares Voo2: {selecLugaresVoo2.join(", ")}</h1>)}
    {(selecLugaresHotel.length > 0 && (selecLugaresHotel.length > 1 || selecLugaresHotel[0] !== "")) && (<h1>Quartos Hotel: {selecLugaresHotel.join(", ")}</h1>)}
    <h1>Preco total: {preco}€</h1>
    <h1>Preco Hotel: {precoHotel}€</h1>
    <h1>Preco Voo: {precoVoo}€</h1>
    {selecHotel && (<><h1>{selecHotel.Nome}</h1></>)}
    {selecVoo1 && (<><h1>Voo1: {selecVoo1.Nome_Aeroporto_Origem} - {selecVoo1.Nome_Aeroporto_Destino}</h1></>)}
    {selecVoo2 && (<><h1>Voo2: {selecVoo2.Nome_Aeroporto_Origem} - {selecVoo2.Nome_Aeroporto_Destino}</h1></>)}

    </div>);
};

export default FormConfirmacao;