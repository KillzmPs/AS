import React from "react";
import { useModal } from "../context/ModalContext";
import "./ModalContent.css"

const ModalContent = () => {
  const { activeModal, closeModels, openLogin, openRegister } = useModal();
  

  if (activeModal === "login") {
    return (
      <div>
        <div className="Top_Modal">
          <div className="Title_Modal">
            <h2>Login</h2>
          </div>
        </div>
        <div className="Middle_Modal">
        <form>
          <div className="FormRow" >
          <input type="email" placeholder="Email" required/>
          </div>
          <div className="FormRow" >
          <input type="password" placeholder="Palavra-Passe" required/>
          </div>
          <div className="FormRow" >
          <button type="submit">Entrar</button>
          </div>
        </form>
        </div>
        <div className="End_Modal">
          <h5>És novo? <span style={{color: "blue", cursor:"pointer"}} onClick={() => {closeModels(); openRegister();}}>Regista-te</span></h5>
        </div>
      </div>
    );
  }

  if (activeModal === "register") {
    return (
      <div>
        <div className="Top_Modal">
          <div className="Title_Modal">
            <h2>Registar</h2>
          </div>
        </div>
        <div className="Middle_Modal">
        <form>
          <div className="FormRow" >
          <input type="text" placeholder="Nome" required/>
          </div>
          <div className="FormRow" >
          <input type="email" placeholder="Email" required/>
          </div>
          <div className="FormRow" >
          <input type="tel" placeholder="Telemovel"  pattern="[0-9]{9}" required/>
          </div>
          <div className="FormRow" >
          <input type="date" placeholder="Data de Nascimento" required/>
          </div>
          <div className="FormRow" >
          <input type="password" placeholder="Palavra-Passe" required/>
          </div>
          <div className="FormRow" >
          <input type="password" placeholder="Repita a Palavra-Passe" required/>
          </div>
          <div className="FormRow" >
          <button type="submit">Registar</button>
          </div>
        </form>
        </div>
        <div className="End_Modal">
          <h5>Já tens conta? <span style={{color: "blue", cursor:"pointer"}} onClick={() => {closeModels(); openLogin();}}>Iniciar Sessão</span></h5>
        </div>
      </div>
    );
  }

  if (activeModal === "account-settings") {
    return (
      <div>
        <h2>Configurações da Conta</h2>
        <p>Aqui você pode editar seus dados pessoais, visualizar seus bilhetes e fazer logout.</p>
        <button onClick={closeModels}>Fechar</button>
      </div>
    );
  }

  return null;
};

export default ModalContent;