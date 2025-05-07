import React, { useState, useEffect } from 'react';
import './SearchBox.css';
import { fetchClasses } from './Classes.js'; 
import { useNotification } from '../context/NotificationContext';
import { useBilhete } from '../context/BilheteContext.jsx';
import { useNavigate } from 'react-router-dom';
import { RecomendacaoHoteis, RecomendacaoVoo} from './SistemaBilhetes.js';

const SearchBox = () => {
  const [mode, setMode] = useState('flights');
  const [idaVolta, setIdaVolta] = useState('idaevolta');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [DateOrigin, setDateOrigin ] = useState('');
  const [DateDestination, setDateDestination ] = useState('');
  const { notifyError } = useNotification();
  const {setTipoBilhete, guardarHoteis, guardarVoo1, guardarVoo2, denovo, eliminarHoteis, eliminarVoo1, eliminarVoo2, pessoas, setPessoas, setDatainicio, setDatafim } = useBilhete();
  const navigate = useNavigate();


  useEffect(() => {
    const loadClasses = async () => {
      const data = await fetchClasses();
      setClasses(data);
    };
    loadClasses();
    denovo();
    eliminarHoteis();
    eliminarVoo1();
    eliminarVoo2();

  
  }, []);

  const handleFlightChange = (value) => {
    setIdaVolta(value);
  }
  

  const handleSwap = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value); 
  };

  const clicar = async () => {
    if(mode === "flights") {
      if(idaVolta === "idaevolta") {
        if(!origin || !destination || !selectedClass || !DateOrigin || !DateDestination || !pessoas) {
          notifyError("Preencha todos os campos");
        } else {
          if(pessoas > 10 || pessoas < 0) {
            notifyError("Número máximo de pessoas excedido")
          } else 
          if(DateOrigin > DateDestination || (new Date(DateOrigin) < new Date())) {
            notifyError("Datas inválidas");
          } else if( origin.toLowerCase() === destination.toLowerCase()){
            notifyError("Origem e Destino é o mesmo");
          } else {
            try {
              const result = await RecomendacaoVoo('%'+ origin.charAt(0).toUpperCase() + origin.slice(1), '%'+ destination.charAt(0).toUpperCase() + destination.slice(1), DateOrigin, selectedClass, pessoas);
              if(result.length > 0) {
                guardarVoo1(result);
                try {
                  const result2 = await RecomendacaoVoo('%'+ destination.charAt(0).toUpperCase() + destination.slice(1),'%'+ origin.charAt(0).toUpperCase() + origin.slice(1), DateDestination, selectedClass, pessoas);
                  if(result2.length > 0) {
                    if(result.length == result2.length) {
                      setDatainicio(new Date(DateOrigin));
                      setDatafim(new Date(DateDestination));
                      guardarVoo2(result2);
                      setTipoBilhete("idaevolta");
                      console.log(result);
                      console.log(result2);
                      try {
                        const result = await RecomendacaoHoteis('%'+ destination.charAt(0).toUpperCase() + destination.slice(1), pessoas);
                        console.log(result);
                        if(result.length > 0) {
                          guardarHoteis(result);
                          notifyError("sucesso")
                          console.log(result);
                          navigate("/CriacaoBilhete");
                        } else {
                          notifyError("Não há Hoteis aí neste momento");
                        }
                      } catch {
                          notifyError("Erro 401");
                      }
                    }
                  } else {
                    notifyError("Não há Hoteis aí neste momento");
                  }
                } catch {
                  notifyError("Erro 401");
                }
              } else {
                notifyError("Não há Hoteis aí neste momento");
              }
            } catch {
                notifyError("Erro 401");
            }

          }
          
        }
      } else {
        if(!origin || !destination || !selectedClass || !DateOrigin || !pessoas) {
          notifyError("Preencha todos os campos");
        } else {
          if(pessoas > 10 || pessoas < 0) {
            notifyError("Número máximo de pessoas excedido")
          } else if( origin.toLowerCase() === destination.toLowerCase()){
            notifyError("Origem e Destino é o mesmo");
          } else {
            try {
              const result = await RecomendacaoVoo('%'+ origin.charAt(0).toUpperCase() + origin.slice(1),'%'+ destination.charAt(0).toUpperCase() + destination.slice(1), DateOrigin, selectedClass, pessoas);
              if(result.length > 0) {
                guardarVoo1(result);
                setTipoBilhete("ida");
                notifyError("sucesso")
                navigate("/CriacaoBilhete");
              } else {
                notifyError("Não há Hoteis aí neste momento");
              }
            } catch {
              notifyError("Erro 401");
            }
          }
          }
      }
    } else if(mode === "hotels") {
      if(!origin || !DateOrigin || !DateDestination || !pessoas) {
        notifyError("Preencha todos os campos");
      } else {
        if(pessoas > 10 || pessoas < 0) {
          notifyError("Número máximo de pessoas excedido")
        } else if(DateOrigin > DateDestination || (new Date(DateOrigin) < new Date())) {
          notifyError("Datas inválidas");
        } else {
          setDatainicio(new Date(DateOrigin));
          setDatafim(new Date(DateDestination));
          try {
            const result = await RecomendacaoHoteis('%'+ origin.charAt(0).toUpperCase() + origin.slice(1), pessoas);
            console.log(result);
            if(result.length > 0) {
              guardarHoteis(result);
              setTipoBilhete("hotels");
              notifyError("sucesso")
              navigate("/CriacaoBilhete");
            } else {
              notifyError("Não há Hoteis aí neste momento");
            }
          } catch {
              notifyError("Erro 401");
          }

        }
      }
    }

  }

  return (
    <div className="search-container-outer">
      <div className="search-container">
        <div className="search-box">
          <div className="search-tabs">
            <button
              className={mode === 'flights' ? 'tab active' : 'tab'}
              onClick={() => setMode('flights')}
            >
              <img
                className="image-tab"
                src="https://static.vecteezy.com/system/resources/thumbnails/035/861/457/small_2x/abstract-white-plane-icon-png.png"
                alt="Plane"
              />
              <span><b>Voo</b></span>
            </button>
            <button
              className={mode === 'hotels' ? 'tab active' : 'tab'}
              onClick={() => setMode('hotels')}
            >
              <img
                className="image-tab"
                src="https://freepngimg.com/save/33386-hotel-clipart/492x369"
                alt="Hotel"
              />
              <span><b>Hotel</b></span>
            </button>
          </div>

          <div className="input-row">
            {mode === 'flights' ? (
              <>
              <div className='FlightsOption'>
                <div className='Flightscheck'>
                  <label className="custom-checkbox" style={{color: "white"}}>
                    <input type="checkbox" id="IdaVolta" checked={idaVolta === "idaevolta"} onChange={() => handleFlightChange("idaevolta")}/>
                    <span className="checkmark"></span>
                    Ida e Volta
                  </label>
                </div>
                <div className='Flightscheck'> 
                  <label className="custom-checkbox" style={{color: "white"}}>
                    <input type="checkbox" id="Ida"  checked={idaVolta === "ida"} onChange={() => handleFlightChange("ida")}/>
                    <span className="checkmark" ></span>
                    Ida
                  </label>
                </div>
              </div>
                <input
                  type="text"
                  placeholder="Origem"
                  className="input left-rounded"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                />
                <button className="input switch" onClick={handleSwap}>
                  ⇄
                </button>
                <input
                  type="text"
                  placeholder="Destino"
                  className="input"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
                {idaVolta === "idaevolta" ? (<><input type="date" className="input" value={DateOrigin} onChange={(e) => setDateOrigin(e.target.value)} /> 
                <input type="date" className="input" value={DateDestination} onChange={(e) => setDateDestination(e.target.value)} /></>) : 
                ( <input type="date" className="input" value={DateOrigin} onChange={(e) => setDateOrigin(e.target.value)} /> )}
              </>
            ) : (
              <>
                <input type="text" placeholder="Local" className="input left-rounded" value={origin} onChange={(e) => setOrigin(e.target.value)} />
                <input type="date" className="input" value={DateOrigin} onChange={(e) => setDateOrigin(e.target.value)} />
                <input type="date" className="input" value={DateDestination} onChange={(e) => setDateDestination(e.target.value)} />
              </>
            )}
            <input type="number" placeholder="Pessoas" className="input" min="1" max="10" value={pessoas} onChange={(e) => setPessoas(e.target.value)} />
            {mode === 'flights' ? (
            <select
              value={selectedClass}
              onChange={handleClassChange}
              className="input"
            >
              <option value="" disabled>Classe</option>
              {classes.map((cls) => (
                <option key={cls.Id} value={cls.Id}>
                  {cls.Tipo_Classe}
                </option>
              ))}
            </select>
            ): (<></>)}

            <button className="input search-button right-rounded" onClick={clicar}>
              <img
                className="image-search"
                src="https://www.freeiconspng.com/thumbs/search-icon-png/search-icon-png-21.png"
                alt="Search"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
