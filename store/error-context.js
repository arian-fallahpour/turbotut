import { createContext, useEffect, useState } from "react";

export const GlobalErrorContext = createContext({
  visible: false,
  globalError: null,
  setGlobalError: (message) => {},
});

export const GlobalErrorProvider = ({ children }) => {
  const [globalError, setGlobalError] = useState(null);
  const [visible, setVisible] = useState(false);
  const duration = 7.5;

  useEffect(() => {
    let timeout;

    if (visible) {
      timeout = setTimeout(() => setVisible(false), duration * 1000);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [visible]);

  const setGlobalErrorHandler = (message) => {
    setGlobalError(message);
    setVisible(true);
  };

  const errorContext = {
    visible,
    globalError,
    setGlobalError: setGlobalErrorHandler,
  };

  return (
    <GlobalErrorContext.Provider value={errorContext}>
      {children}
    </GlobalErrorContext.Provider>
  );
};
