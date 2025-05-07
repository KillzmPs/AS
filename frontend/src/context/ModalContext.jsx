import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [activeModal, setActiveModal] = useState(null);

  const openLogin = () => setActiveModal("login");
  const openRegister = () => setActiveModal("register");
  const autenticacao = () => setActiveModal("2fa");
  const esquecimePass = () => setActiveModal("Esquecime_Pass");
  const idaevolta = () => setActiveModal("ida-volta");
  const hotels = () => setActiveModal("hotel");
  const openAccountSettings = () => setActiveModal("account-settings");
  const refMultibanco = () => setActiveModal("multibanco");
  const refMbWay = () => setActiveModal("mbway");
  const closeModels = () => setActiveModal(null);

  return (
    <ModalContext.Provider
      value={{
        activeModal,
        openLogin,
        openRegister,
        autenticacao,
        esquecimePass,
        openAccountSettings,
        idaevolta,
        hotels,
        refMultibanco,
        refMbWay,
        closeModels
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
