import React from "react";
import { useModal } from "../context/ModalContext";
import './Modal.css'; 

const Modal = ({ children }) => {
  const { closeModels } = useModal();

  return (
    <div className="modal-overlay" onClick={closeModels}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closeModels}>
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
