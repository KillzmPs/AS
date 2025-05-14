import React, { useEffect, useState } from "react";
import { useModal } from "../context/ModalContext";
import "./ModalContent.css"
import { Login, veriEmail, Register, send2FACode, verify2FACode, Pass2 } from "./Login";
import { useUser } from "../context/UserContext";
import { fetchCountries } from "./Paises";
import { useNotification } from "../context/NotificationContext";
import { useBilhete } from "../context/BilheteContext";

const ModalContent = () => {
  const { activeModal, closeModels, openLogin, openRegister, autenticacao, esquecimePass } = useModal();
  const { notifySuccess } = useNotification();
  const [error, setError ] = useState("")
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const { user, login } = useUser(); 
  const [pais, setPais] = useState([]);
  const [selectedPais, setSelectedPais] = useState('');
  const [name, setName] = useState('');
  const [tele, setTele] = useState('');
  const [nasc, setNasc] = useState('');
  const [againPas, setAgainPas] = useState('');
  const [codigo, setCodigo] = useState('');
  const [login2fa, setLogin2fa] = useState({})
  const { pessoas, LugaresVoo1, LugaresVoo2, guardarLugarVoo1,
     guardarLugarVoo2, setPassoAtual, passoAtual, setPrecoVoo,
      precoVoo, Quartos, guardarQuartoHotel, datainicio, datafim, setPrecoHotel, setPreco, preco} = useBilhete();

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
          notifySuccess("Login efetuado com sucesso");
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
      if(tele.length > 9){
        setError("Número de telemovel inválido");
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
                  notifySuccess("Registado com sucesso");
                  closeModels();
              }
            } catch {
              setError("Erro 401");
            }
        }
      }
    }
  }

  const verificar2fa = async (e) => {
    e.preventDefault();
    
    const result = await verify2FACode(email, codigo);
    if(result.sucesso == true) {
      login(login2fa);
      notifySuccess("Login efetuado com sucesso");
      closeModels()
    } else {
      setError(result.mensagem);
    }
  }

  const NovaPass = async (e) =>  {
    e.preventDefault();
    try {
      console.log(email);
      const result = await veriEmail(email);
      if(result.length === 0) {
        setError("Email não existe");
      } else {
          const result2 = await Pass2(email);
          notifySuccess("A nova Palavra-Passe foi enviada para o seu e-mail com sucesso");
          closeModels();
          openLogin();
      }
    } catch {
      setError("Erro 401");
    }

  }

  const [lugaresIda, setLugaresIda] = useState(Array(pessoas).fill(""));
  const [lugaresVolta, setLugaresVolta] = useState(Array(pessoas).fill(""));

  const lugaresDisponiveisIda = Array.isArray(LugaresVoo1)
  ? LugaresVoo1.map(l => l.Lugar?.toString?.() || "")
  : [];

const lugaresDisponiveisVolta = Array.isArray(LugaresVoo2)
  ? LugaresVoo2.map(l => l.Lugar?.toString?.() || "")
  : [];


  const handleChangeIda = (index, value) => {
    const novos = [...lugaresIda];
    novos[index] = value;
    setLugaresIda(novos);
  };

  const handleChangeVolta = (index, value) => {
    const novos = [...lugaresVolta];
    novos[index] = value;
    setLugaresVolta(novos);
  };


  const confirmarLugares = () => {
    setPrecoVoo(precoVoo * pessoas);
    guardarLugarVoo1(lugaresIda);
    guardarLugarVoo2(lugaresVolta);
    setPreco(precoVoo);
    closeModels();
    setPassoAtual(passoAtual + 1);
    
  };

  const [quartosSelecionados, setQuartosSelecionados] = useState(Array(pessoas).fill(""));

  const handleChangeQuarto = (index, value) => {
    const novos = [...quartosSelecionados];
    novos[index] = value;
    setQuartosSelecionados(novos);
  };

  const quartosDisponiveis = Array.isArray(Quartos)
  ? Quartos.map((q) => ({
      id: q.Id?.toString?.() || "",
      texto: `Quarto ${q.Numero_Quarto} - ${q.Preco}€`,
      quarto: q.Numero_Quarto?.toString?.(),
      preco: q.Preco,
    }))
  : [];

  const calcularPrecoTotal = () => {
    const total = quartosSelecionados.reduce((acc, numeroQuarto) => {
      const quarto = quartosDisponiveis.find((q) => q.quarto === numeroQuarto);
      return acc + (quarto ? quarto.preco : 0);
    }, 0);
    return total;
  };
  

  const handleConfirmar = () => {
    guardarQuartoHotel(quartosSelecionados);
    const total = calcularPrecoTotal();
    const preco2 = Math.floor((datafim - datainicio) / (1000 * 60 * 60 * 24)) * total;
    const preco3 = preco + preco2;
    setPrecoHotel(preco2);
    setPreco(preco3);
    setPassoAtual(passoAtual + 1);
    closeModels();
  };



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
          <h5>És novo? <span style={{color: "blue", cursor:"pointer"}} onClick={() => {closeModels(); openRegister();}}>Regista-te</span><br />
          <br />
          <span style={{color: "blue", cursor:"pointer"}} onClick={() => {closeModels();esquecimePass();}}>Esqueceu-se da Palavra-Passe?</span></h5>
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

  if (activeModal === "Esquecime_Pass") {
    return (
      <div>
        <div className="Top_Modal">
          <div className="Title_Modal">
            <h2>Esqueci-me da Palavra-Passe</h2>
          </div>
        </div>
        <div className="Middle_Modal">
        <form>
          <div className="FormRow" >
            Insira o E-mail da sua conta
          </div>
          <div className="Error_part" >
          {error}
        </div>
          <div className="FormRow" >
          <input type="text" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="FormRow" >
          <button type="submit" onClick={NovaPass} >Verificar</button>
          </div>
        </form>
        </div>
      </div>
    );
  }

  if(activeModal === "ida-volta") {
    return (
      <div>
        <div className="Top_Modal">
          <div className="Title_Modal">
            <h2>Escolher Lugares</h2>
          </div>
        </div>
  
        <div className="Middle_Modal">
          <form>

            {LugaresVoo1 && (<>
              <h3>Ida</h3>
              {Array.from({ length: pessoas }, (_, i) => (
              <div className="FormRow" key={i}>
                <select
                  value={lugaresIda[i] || ""}
                  onChange={(e) => handleChangeIda(i, e.target.value)}
                  className="pais_modal"
                >
                  <option value="">Seleciona um lugar</option>
                  {lugaresDisponiveisIda
                    .filter(l => !lugaresIda.includes(l) || l === lugaresIda[i])
                    .map((lugar) => (
                      <option key={lugar} value={lugar}>
                        {lugar}
                      </option>
                    ))}
                </select>
              </div>
            ))}</>)}

            {LugaresVoo2 && (<>
              <h3>Volta</h3>
            {Array.from({ length: pessoas }, (_, i) => (
            <div className="FormRow" key={i}>
              <select
                value={lugaresVolta[i] || ""}
                onChange={(e) => handleChangeVolta(i, e.target.value)}
                className="pais_modal"
              >
                <option value="">Seleciona um lugar</option>
                {lugaresDisponiveisVolta
                  .filter(l => !lugaresVolta.includes(l) || l === lugaresVolta[i])
                  .map((lugar) => (
                    <option key={lugar} value={lugar}>
                      {lugar}
                    </option>
                  ))}
              </select>
            </div>
          ))}
            </>)}
  
            <div className="FormRow">
              <button type="button" onClick={confirmarLugares}>
                Confirmar Lugares
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if(activeModal === "hotel") {
    return (
      <div>
        <div className="Top_Modal">
          <div className="Title_Modal">
            <h2>Selecionar Quartos</h2>
          </div>
        </div>
        <div className="Middle_Modal">
          <form>
            {Array.from({ length: pessoas }, (_, i) => (
              <div className="FormRow" key={i}>
                  <select
                    value={quartosSelecionados[i]}
                    onChange={(e) => handleChangeQuarto(i, e.target.value)}
                    className="pais_modal"
                  >
                    <option value="">Seleciona um quarto</option>
                    {quartosDisponiveis
                      .filter(
                        (q) =>
                          !quartosSelecionados.includes(q.id) ||
                          q.id === quartosSelecionados[i]
                      )
                      .map((q) => (
                        <option key={q.id} value={q.quarto}>
                          {q.texto}
                        </option>
                      ))}
                  </select>
              </div>
            ))}
  
            <div className="FormRow">
              <button
                type="button"
                onClick={handleConfirmar}
              >
                Confirmar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  {activeModal === "mbway"} {
    return (
      <div>
        <div className="Top_Modal">
          <div className="Title_Modal">
            <h2>MBWay</h2>
          </div>
        </div>
        <div className="Middle_Modal">
        O montante foi enviado para o seu telemóvel. Tem até 1 mês antes do voo de partida. Caso não o faça não terá o bilhete comprado. Pode ver na abra de bilhetes para ver como está o estado da compra.{"\n"}Obrigado
        </div>
      </div>
    );
  }

};

export default ModalContent;