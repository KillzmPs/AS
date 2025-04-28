import React, { useState } from 'react';
import './Navbar.css';
import { useModal } from '../context/ModalContext';
import { useUser } from "../context/UserContext";
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';

const Navbar = () => {
  
  const { openLogin, closeModels } = useModal(); 
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const { notifySuccess } = useNotification();

  const [showPerfilModal, setShowPerfilModal] = useState(false);

  const PerfilModal = ()  => {
    setShowPerfilModal((prev) => !prev);
  }

  const LogOut = () => {
    logout();
    navigate("/");
    notifySuccess("Logout feito com sucesso");
  }

  return (
    <nav className="navbar">
      <div className="navbar-left" onClick={() => navigate("/")}>
        <span className="company-name">FlyEasy</span>
      </div>
      
      <div className="navbar-right">

        <div className="login-avatar">
          {user ? (
            <div className="user-greeting2 perfil-container" onClick={PerfilModal}>
              <div className="avatar-circle">
                <img 
                  src="https://www.w3schools.com/howto/img_avatar.png" 
                  alt="Avatar" 
                  className="avatar-img"
                />
              </div>
              <span>Olá, {user.Nome}</span>
              {
                showPerfilModal && (
                  user.Nome_Tipo === "Cliente" ? (<div className='perfil-modal'>
                    <button className="close-button2" onClick={closeModels}>
                      ⛌
                    </button>
                    <div className='section'>
                      <div className='content' onClick={() => navigate("/areapessoal")}>
                        Dados Pessoais
                      </div>
                    </div>
                    <div className='section'>
                      <div className='content' onClick={() => navigate("/bilhetes")}>
                        Os Meus Bilhetes
                      </div>
                    </div>
                    <div className='section'>
                      <div className='content'>
                        Tickets
                      </div>
                    </div>
                    <div className='section'>
                      <div className='content'onClick={LogOut}>
                        Logout
                      </div>
                    </div>
                  </div>) : (
                    <div className='perfil-modal'>
                    <button className="close-button2" onClick={closeModels}>
                      ⛌
                    </button>
                    <div className='section'>
                      <div className='content' onClick={() => navigate("/areapessoal")}>
                        Dados Pessoais
                      </div>
                    </div>
                    <div className='section'>
                      <div className='content'>
                        Tickets
                      </div>
                    </div>
                    <div className='section'>
                      <div className='content'>
                        Consulta de Bilhetes
                      </div>
                    </div>
                    <div className='section'>
                      <div className='content'>
                        Administração de clientes
                      </div>
                    </div>
                    <div className='section'>
                      <div className='content'>
                        Estatisticas
                      </div>
                    </div>
                    <div className='section'>
                      <div className='content' onClick={LogOut}>
                        Logout
                      </div>
                    </div>
                  </div>
                  )
                )
              }
            </div>
          ) : (
            <div className="login-button user-greeting" onClick={() => openLogin()}> 
              <div className="avatar-circle">
                <img 
                  src="https://www.w3schools.com/howto/img_avatar.png" 
                  alt="Avatar" 
                  className="avatar-img"
                />
              </div>
              <span>Iniciar Sessão</span>
            </div>
          )}
        </div>
        
        <div className="language-selector">
          <div className="flag-circle">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Portugal.svg" 
              alt="Bandeira de Portugal" 
              className="flag-img"
            />
          </div>
          <span className="language-text">PT</span>
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;
