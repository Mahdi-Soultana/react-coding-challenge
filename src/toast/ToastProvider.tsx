import React, { useState } from "react";
import { ToastContext } from "./ToastContext";
import Toast, { ToastContainer } from "./Toast";
type Props = {
  children: React.ReactNode;
};

export function ToastProvider(props: Props) {
  const { children } = props;
  /////////
  const [toasts, setToasts] = useState([]);

  const [stats, setState] = React.useState({
    success: 0,
    warning: 0,
    error: 0,
  });

  function addToast(params) {
    let {
      type = "success",
      ttl,
      body = "you are doing good so far 🥰",
    } = params;
    ttl = ttl == null ? 500 : ttl;
    console.log(ttl);

    setToasts((prevS) => {
      return [
        ...prevS,
        {
          key: `toast-${Math.random() * 100}`,
          type,
          ttl,
          body,
        },
      ];
    });

    fetch(`/api/toasts/${type}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((data) => {
        setState(data);
      });
  }

  // console.log(toasts);
  //this function is just to clear the teast from the state

  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management#garbage_collection

  function clearToast(id) {
    setToasts((prevS) => {
      return prevS.filter((toast) => id !== toast.key);
    });
  }
  /////////////
  return (
    <ToastContext.Provider value={{ stats, addToast }}>
      {children}

      <ToastContainer>
        {toasts.map((toast) => (
          <Toast
            key={toast.key}
            id={toast.key}
            type={toast.type}
            timer={Number(toast.ttl)}
            clearToast={clearToast}
          >
            {toast.body || "Helloo i'm fallback"}
          </Toast>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
}
