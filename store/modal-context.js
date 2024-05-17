import { createContext, useState } from "react";

export const ModalContext = createContext({
  visible: false,
  content: null,
  showModal: (content) => {},
  hideModal: () => {},
});

export const ModalProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState(null);

  const showModalHandler = (content) => {
    setContent(content);
    setVisible(true);
  };

  const hideModalHandler = () => {
    setVisible(false);
  };

  const loginContext = {
    visible,
    content,
    showModal: showModalHandler,
    hideModal: hideModalHandler,
  };

  return (
    <ModalContext.Provider value={loginContext}>
      {children}
    </ModalContext.Provider>
  );
};
