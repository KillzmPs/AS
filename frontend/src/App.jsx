import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DadosPessoais from './pages/DadosPessoais';
import ModalContent from "./components/ModalContent";
import { useModal } from "./context/ModalContext";
import Modal from './components/Modal';
import { useUser } from './context/UserContext';
import Bilhetes from './pages/Bilhetes';
import ComprarBilhetes from './pages/ComprarBilhetes'
const App = () => {
  const { activeModal } = useModal();
  const { user, login , logout} = useUser();

  
  return (
    <div>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/areapessoal" element={<DadosPessoais />} />
        <Route path='/bilhetes' element={<Bilhetes />} />
        <Route path='/CriacaoBilhete' element={<ComprarBilhetes />} />
      </Routes>

      {activeModal && (
        <Modal>
          <ModalContent />
        </Modal>
      )}
    </div>
  );
};

export default App;
