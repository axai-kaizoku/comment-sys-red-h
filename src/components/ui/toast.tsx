"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type Toast = {
  id: number;
  title: string;
  message: string;
};

type ToastContextType = {
  addToast: ({}: { message: string; title: string }) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({
  children,
  position = "bottom-right",
}: {
  children: ReactNode;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    ({ title, message }: { message: string; title: string }) => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, title, message }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div
        className={cn(
          "fixed z-50 space-y-2 transition-all",
          position === "top-right" && "top-4 right-4",
          position === "top-left" && "top-4 left-4",
          position === "bottom-right" && "bottom-4 right-4",
          position === "bottom-left" && "bottom-4 left-4"
        )}
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="bg-neutral-50 border border-neutral-200 text-black px-4 py-2 rounded-lg shadow-lg 
                       opacity-0 animate-fade-in-up "
          >
            <div className="p-2 flex flex-col justify-start items-start gap-2">
              <span className="font-medium">{toast.title}</span>
              <span className="text-sm">{toast.message}</span>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}
