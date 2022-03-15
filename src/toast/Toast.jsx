import React, { useState } from "react";
export const ToastContainer = ({ className = "", children, ...otherProps }) => {
  return (
    <aside
      className={`fixed h-auto overflow-y-auto top-4 right-[50%]  translate-x-[50%] lg:-translate-x-[10%] lg:top-auto lg:bottom-4 max-h-[100vh] lg:right-4      text-center ${className}`}
      {...otherProps}
    >
      {children}
    </aside>
  );
};

//this toat component is configurable by the time and type
function Toast({
  timer = 3,
  type = "success",
  typeColor = {
    success: "bg-green-500",
    warning: "bg-orange-500",
    error: "bg-red-500",
  },
  clearToast,
  className = "",
  id,
  children,
  ...otherProps
}) {
  const [show, setShow] = useState(false);

  React.useEffect(() => {
    setShow(true);
    let timerFn = setTimeout(() => {
      setShow(false);
      clearToast(id);
    }, timer);
    return () => clearTimeout(timerFn);
  }, [clearToast, id, timer]);
  return (
    <>
      {show ? (
        <div
          className={`${typeColor[type]} relative m-3 p-3 px-4 font-medium rounded-md shadow-md ${className}`}
          {...otherProps}
        >
          <button
            className="hover:bg-red-700 w-4 h-4 flex items-center justify-center text-white  rounded-sm absolute top-1 right-1"
            onClick={() => {
              clearToast(id);
            }}
          >
            &times;
          </button>
          {children}
        </div>
      ) : null}
    </>
  );
}

export default Toast;
