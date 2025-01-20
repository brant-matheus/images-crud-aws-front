"use client";

import { createContext, use, useContext, useEffect, useState } from "react";
import { Notification, useToaster } from "rsuite";

const toastTypeDecoder = (type: types) => {
  switch (type) {
    case "success":
      return "sucesso";
    case "error":
      return "error";
    case "warning":
      return "aviso";
    case "info":
      return "info";
    default:
      return "info";
  }
};

type ToastContextProps = {
  children: React.ReactNode;
};

type ToastContextType = {
  pushToast: ({ text, type, placement }: PushToastProps) => void;
};

type types = "success" | "error" | "warning" | "info";
type placements =
  | "topStart"
  | "topCenter"
  | "topEnd"
  | "bottomStart"
  | "bottomCenter"
  | "bottomEnd";

interface PushToastProps {
  text: string;
  type: types;
  placement?: placements;
}

const ToastContext = createContext<ToastContextType | null>(null);
export const ToastProvider = ({ children }: ToastContextProps) => {
  const toaster = useToaster();
  const [header, setHeader] = useState<string>("info");
  const [toastProps, setToastProps] = useState<PushToastProps>({
    text: "Aviso",
    type: "info",
    placement: "topEnd",
  });

  const pushToast = ({ text, type, placement = "topEnd" }: PushToastProps) => {
    const header = toastTypeDecoder(type);
    setHeader(header);
    setToastProps({ text, type, placement });
  };

  useEffect(() => {
    const message = (
      <Notification type={toastProps.type} header={header + "!"}>
        <p>{toastProps.text}</p>
      </Notification>
    );

    toaster.push(message, { placement: toastProps.placement, duration: 2500 });
  }, [toastProps, header]);

  return (
    <ToastContext.Provider value={{ pushToast }}>
      {children}
    </ToastContext.Provider>
  );
};
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within an ToastProvider");
  }
  return context;
};
