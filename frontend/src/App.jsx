import React from 'react';
import Navbar from './components/Navbar';
import SearchBox from './components/SearchBox';
import Recommendations from './components/Recomendacoes';

const App = () => {
  return (
    <div>
      <Navbar />
      <SearchBox />
      <Recommendations />
      
    </div>
  );
};

export default App;