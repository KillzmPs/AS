import React, { useState, useEffect } from 'react';
import './SearchBox.css';
import { fetchClasses } from './Classes.js'; 

const SearchBox = () => {
  const [mode, setMode] = useState('flights');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');


  useEffect(() => {
    const loadClasses = async () => {
      const data = await fetchClasses();
      setClasses(data);
    };
    loadClasses();
  
  }, []);
  

  const handleSwap = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value); 
  };

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
                <input type="date" className="input" />
                <input type="date" className="input" />
              </>
            ) : (
              <>
                <input type="text" placeholder="Local" className="input left-rounded" />
                <input type="date" className="input" />
                <input type="date" className="input" />
              </>
            )}
            <input type="number" placeholder="Pessoas" className="input" min="1" />
            
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

            <button className="input search-button right-rounded">
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
