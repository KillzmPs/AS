import React, { use, useEffect, useState } from "react";
import { useModal } from "../context/ModalContext";
import "./ModalContent.css"
import { Login, veriEmail, Register, send2FACode, verify2FACode } from "./Login";
import { useUser } from "../context/UserContext";
import { fetchCountries } from "./Paises";

const ModalContent = () => {
  const { activeModal, closeModels, openLogin, openRegister, autenticacao } = useModal();

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
  const [codigo, setCodigo] = useState('');
  const [login2fa, setLogin2fa] = useState({})

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
      if(result.length > 0) {
        if(result[0].Ativo_2FA === 1) {
          await send2FACode(email);
          setLogin2fa(result[0]);
          autenticacao();
        } else {
          login(result[0]);
          closeModels();
        }
      } else {
        setError("Email ou Palavra-Passe Erradas");
      }
    } catch {
      setError("Erro 401");
    }
    }
  }


  const doRegister = async (e) => {
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
                const result3 = await Login(email, password);
                login(result3[0]);
                closeModels();
            }
          } catch {
            setError("Erro 401");
          }
      }
    }
  }

  const verificar2fa = async (e) => {
    e.preventDefault();
    
    const result = await verify2FACode(email, codigo);
    if(result.sucesso == true) {
      login(login2fa);
      closeModels()
    } else {
      setError(result.mensagem);
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
          -
          <button type="submit" onClick={doRegister}>Registar</button>
          </div>
        </form>
        </div>
        <div className="End_Modal">
          <h5>Já tens conta? <span style={{color: "blue", cursor:"pointer"}} onClick={() => {closeModels(); openLogin();}}>Iniciar Sessão</span></h5>
        </div>
      </div>
    );
  }

  if (activeModal === "2fa") {
    return (
      <div>
        <div className="Top_Modal">
          <div className="Title_Modal">
            <h2>Autenticação 2 Fatores</h2>
          </div>
        </div>
        <div className="Middle_Modal">
        <form>
          <div className="FormRow" >
            Coloque o código de segurança que foi enviado para o seu email.
          </div>
          <div className="Error_part" >
          {error}
        </div>
          <div className="FormRow" >
          <input type="text" placeholder="Código de Segurança" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
          </div>
          <div className="FormRow" >
          <button type="submit" onClick={verificar2fa} >Verificar</button>
          </div>
        </form>
        </div>
      </div>
    );
  }

  return null;
};

export default ModalContent;