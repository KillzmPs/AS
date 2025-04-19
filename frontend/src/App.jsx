import React from 'react';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ModalContent from "./components/ModalContent";
import { useModal } from "./context/ModalContext";
import Modal from './components/Modal';
import { useUser } from './context/UserContext';

const App = () => {
  const { activeModal } = useModal();
  const { user, logout } = useUser();

  return (
    <div>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
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
