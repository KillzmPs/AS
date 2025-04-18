// components/Navbar.jsx
import React from 'react';
import './Navbar.css';
import { useModal } from '../context/ModalContext';

const Navbar = () => {
  
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userName, setUserName] = React.useState('Henrique');
  const { openLogin } = useModal(); 

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="company-name">FlyEasy</span>
      </div>
      
      <div className="navbar-right">

        <div className="login-avatar">
          {isLoggedIn ? (
            <div className="user-greeting">
              <div className="avatar-circle">
                <img 
                  src="https://www.w3schools.com/howto/img_avatar.png" 
                  alt="Avatar" 
                  className="avatar-img"
                />
              </div>
              <span>Olá, {userName}</span>
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
