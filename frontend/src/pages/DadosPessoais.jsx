import React, { useEffect, useState } from 'react';
import { useUser } from "../context/UserContext";
import { useNotification } from '../context/NotificationContext';
import { useNavigate } from 'react-router-dom';
import Box from '../components/Box';
import { Login, updatePass } from '../components/Login';

const DadosPessoais = () => {
  const { user, login } = useUser();
  const navigate = useNavigate();
  const { notifyError, notifySuccess } = useNotification();
  const [pass, setPass] = useState("");
  const [newpass, setNewPass] = useState("");
  const [repnewpass, setRepNewPass] = useState("");

    // renderiza dps
  useEffect(() => {
    if (!user) {
      navigate("/");
      notifyError("Ainda não fizeste login");
    }
  }, [user, navigate]); // quando estes valores mudarem ele repete a funcao

  if (!user) return null; // ele renderiza a pagina primeiro , se n tiver isto ele mostra a pagina e uns milisegundos dps ele vai para o /
                          // serve para n mostrar o interior da pagina
  const changePass = async (e) => {
    e.preventDefault();
    if(!pass || !newpass || !repnewpass) {
      notifyError("Introduz todos os dados");
    } else {
      try {
      const result = await Login(user.Email, pass);
      if(result.length > 0) {
        if(newpass === repnewpass) {
          if(newpass === pass) {
            notifyError("É a mesma Palavra-Passe que a original");
          } else {
            const result = await updatePass(user.Id, newpass);
            const result2 = await Login(user.Email, newpass);
            login(result2[0]);
            notifySuccess("Palavra-Passe mudada com sucesso");
          }
      } else {
          notifyError("As Palavras-Passe não são iguais")
        }
      } else {
        notifyError("Palavra-Passe errada");
      }
      } catch(err) {
        notifyError("Erro 401");
      }
    }
  }

  return (
    <div>
      <h1 style={{color:"White", textAlign:"center"}}>-Tenho conta-</h1>
      <Box>
        <div className='Box_Header'>
          <div className='Box_Title'>
            <div className='vertical-line'></div>
            Dados Pessoais
          </div>
        </div>
        <div className='Box_Body'>
          <div className='row1'>
            <div className='cont1'>
              <input type="text" value={user.Nome} contentEditable="false" />
              <label>Nome</label>
            </div>
            <div className='cont2'>
              <input type="number"  defaultValue={user.Telemovel} />
              <label>Telemovel</label>
            </div>
          </div>
          <div className='row2'>
            <div className='cont1'>
              <input type="email" defaultValue={user.Email}   />
              <label>Nome</label>
            </div>
            <div className='cont2'>
              <input type="text" value={new Date(user.Data_Aniversario).toLocaleDateString('pt-PT')}  contentEditable="false" />
              <label>Data de Aniversário</label>
            </div>
          </div>
        </div>
        <div className='Box_Bot'>
          <div className="button-container">
            <button>Guardar Dados</button>
          </div>
          <div className="checkbox-container">
            <label className="custom-checkbox">
              <input type="checkbox" id="2fa" />
              <span className="checkmark"></span>
              Autenticação 2 Fatores
            </label>
          </div>
        </div>
      </Box>
      <Box>
        <div className='Box_Header'>
          <div className='Box_Title'>
            <div className='vertical-line'></div>
            Alterar Palavra-Passe
          </div>
        </div>
        <div className='Box_Body'>
          <div className='row1 onlyone'>
            <div className='cont1'>
              <input type="password" onChange={(e) => setPass(e.target.value)} />
              <label>Palavra-Passe Atual</label>
            </div>
          </div>
          <div className='row2'>
            <div className='cont1'>
              <input type="password"  onChange={(e) => setNewPass(e.target.value)} />
              <label>Nova Palavra-Passe</label>
            </div>
            <div className='cont2'>
              <input type="password" onChange={(e) => setRepNewPass(e.target.value)} />
              <label>Repita a nova Palavra-Passe</label>
            </div>
          </div>
        </div>
        <div className='Box_Bot'>
          <button onClick={changePass}>Guardar Palavra-Passe</button>
        </div>
      </Box>
    </div>
  );
};

export default DadosPessoais;
