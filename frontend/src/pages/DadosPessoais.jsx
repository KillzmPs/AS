import React, { useEffect } from 'react';
import { useUser } from "../context/UserContext";
import { useNotification } from '../context/NotificationContext';
import { useNavigate } from 'react-router-dom';

const DadosPessoais = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { notifyError } = useNotification();

    // renderiza dps
  useEffect(() => {
    if (!user) {
      navigate("/");
      notifyError("Ainda não fizeste login");
    }
  }, [user, navigate]); // quando estes valores mudarem ele repete a funcao

  if (!user) return null; // ele renderiza a pagina primeiro , se n tiver isto ele mostra a pagina e uns milisegundos dps ele vai para o /
                          // serve para n mostrar o interior da pagina

  return (
    <div>
      <h1>Tenho conta</h1>
    </div>
  );
};

export default DadosPessoais;
