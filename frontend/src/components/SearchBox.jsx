import React, { useState, useEffect } from 'react';
import './SearchBox.css';
import { fetchClasses } from './Classes.js'; 
import { useNotification } from '../context/NotificationContext';
import { useBilhete } from '../context/BilheteContext.jsx';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const [mode, setMode] = useState('flights');
  const [idaVolta, setIdaVolta] = useState('idaevolta');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [DateOrigin, setDateOrigin ] = useState('');
  const [DateDestination, setDateDestination ] = useState('');
  const [pessoas, setPessoas] = useState('');
  const { notifyError } = useNotification();
  const {tipoBilhete, setTipoBilhete} = useBilhete();
  const navigate = useNavigate();


  useEffect(() => {
    const loadClasses = async () => {
      const data = await fetchClasses();
      setClasses(data);
    };
    loadClasses();
  
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

  const clicar = () => {
    console.log(mode);
    console.log(idaVolta);
    console.log(origin);
    console.log(destination);
    console.log(selectedClass);
    console.log(DateOrigin);
    console.log(DateDestination);
    console.log(pessoas);


    if(mode === "flights") {
      if(idaVolta === "idaevolta") {
        if(!origin || !destination || !selectedClass || !DateOrigin || !DateDestination || !pessoas) {
          notifyError("Preencha todos os campos");
        } else {
          setTipoBilhete("idaevolta");
          notifyError("sucesso");
        }
      } else {
        if(!origin || !destination || !selectedClass || !DateOrigin || !pessoas) {
          notifyError("Preencha todos os campos");
        } else {
          setTipoBilhete("ida");
          notifyError("sucesso");
        }
      }
    } else {
      if(!origin || !DateOrigin || !DateDestination || !pessoas) {
        notifyError("Preencha todos os campos");
      } else {
        setTipoBilhete("hotels");
          notifyError("sucesso");
      }
    }

    navigate("/CriacaoBilhete");

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
