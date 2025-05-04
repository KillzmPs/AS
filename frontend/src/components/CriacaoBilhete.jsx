import React from "react";
import { useBilhete } from '../context/BilheteContext.jsx';

const CriacaoBilhete = () => {
    const {totalPasso, tipoBilhete } = useBilhete();
    return (
        <div>
            {tipoBilhete === "hotels" && 
            <div>
                <h1>Numero de passos: {totalPasso}</h1>
                <h2>1 - Escolher horario</h2>
                <br />
                <h2>2 - Escolher Hotel</h2>
                <br />
                <h2>3 - Pagamento</h2>
            </div>}
            {tipoBilhete === "idaevolta" && 
            <div>
                <h1>Numero de passos: {totalPasso}</h1>
                <h2>1 - escolher horario</h2>
                <br />
                <h2>2 - Escolher Voo</h2>
                <br />
                <h2>3 - Escolher Hotel</h2>
                <br />
                <h2>4 - Pagamento</h2>
            </div>}
            {tipoBilhete === "ida" && 
            <div>
                <h1>Numero de passos: {totalPasso}</h1>
                <h2>1 - Escolher horario</h2>
                <br />
                <h2>2 - Escolher Voo</h2>
                <br />
                <h2>3 - Pagamento</h2>
            </div>}
        </div>
    );
};

export default CriacaoBilhete;
