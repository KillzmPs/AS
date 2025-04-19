import React, { useEffect, useState } from "react";
import { useModal } from "../context/ModalContext";
import "./ModalContent.css"
import { Login, veriEmail, Register } from "./Login";
import { useUser } from "../context/UserContext";
import { fetchCountries } from "./Paises";

const ModalContent = () => {
  const { activeModal, closeModels, openLogin, openRegister } = useModal();

  const [error, setError ] = useState("")
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const { login } = useUser(); 
  const [pais, setPais] = useState([]);
  const [selectedPais, setSelectedPais] = useState('');
  const [name, setName] = useState('');
  const [tele, setTele] = useState('');
  const [nasc, setNasc] = useState('');
  const [againPas, setAgainPas] = useState('');

  useEffect(() => {
      const loadPais = async () => {
        const data = await fetchCountries();
        setPais(data);
      };
      loadPais();
    
    }, []);

    const handlePaisChange = (e) => {
      setSelectedPais(e.target.value); 
    };

  const doLogin = async (e) => {
    e.preventDefault();
    setError("");
    if(!email || !password){
      setError("Introduza os dados")
    } else {
    try {
      const result = await Login(email, password);
      console.log(result[0]);
      if(result.length > 0) {
        login(result[0]);
        closeModels();
      } else {
        setError("Email ou Palavra-Passe Erradas");
      }
    } catch {
      setError("Erro 401");
    }
    }
  }


  const dores = async (e) => {
    e.preventDefault();
    
    if(!name || !email || !tele || !nasc || !selectedPais || !password || !againPas) {
      setError("Introduza todos os dados");
    } else {
      if(password != againPas) {
        setError("As Palavras passes não são iguais");
      } else {
          try {
            const result = await veriEmail(email);
            if(result.length > 0) {
              setError("Email já existe");
            } else {
                const result2 = await Register(name, email, tele, nasc, password, selectedPais);
                login(name);
                closeModels();
            }
          } catch {
            setError("Erro 401");
          }
      }
    }
  }


  

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
        <div className="Error_part" >
          {error}
        </div>
          <div className="FormRow" >
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="FormRow" >
          <input type="password" placeholder="Palavra-Passe" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="FormRow" >
          <button type="submit" onClick={doLogin}>Entrar</button>
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
        <div className="Error_part" >
          {error}
        </div>
          <div className="FormRow" >
          <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="FormRow" >
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="FormRow" >
          <input type="tel" placeholder="Telemovel"  pattern="[0-9]{9}" value={tele} onChange={(e) => setTele(e.target.value)}/>
          </div>
          <div className="FormRow" >
          <input type="date" placeholder="Data de Nascimento" value={nasc} onChange={(e)=> setNasc(e.target.value)} />
          </div>
          <div className="FormRow">
          <select
              value={selectedPais}
              onChange={handlePaisChange}
              className="pais_modal"
            >
              <option value="" disabled>Pais</option>
              {pais.map((cls) => (
                <option key={cls.Id} value={cls.Id}>
                  {cls.Nome_Pais}
                </option>
              ))}
            </select>
          </div>
          <div className="FormRow" >
          <input type="password" placeholder="Palavra-Passe" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="FormRow" >
          <input type="password" placeholder="Repita a Palavra-Passe" value={againPas} onChange={(e) => setAgainPas(e.target.value)} />
          </div>
          <div className="FormRow" >
          <button type="submit" onClick={dores}>Registar</button>
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