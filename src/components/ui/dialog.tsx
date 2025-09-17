"use client";
import { useClickOutside } from "@/hooks/use-click-outside";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { createContext, ReactNode, useContext, useRef, useState } from "react";

type DialogContextType = {
  open: boolean;
  setOpen: (val: boolean) => void;
};
const DialogContext = createContext<DialogContextType | undefined>(undefined);

function useDialog() {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error("Dialog components must be used inside <Dialog>");
  return ctx;
}

type DialogProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (val: boolean) => void;
  children: ReactNode;
};

export function Dialog({
  open: controlledOpen,
  defaultOpen,
  onOpenChange,
  children,
}: DialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(
    defaultOpen ?? false
  );
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = (val: boolean) => {
    if (!isControlled) setUncontrolledOpen(val);
    onOpenChange?.(val);
  };

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
}

function DialogTrigger({ children }: { children: ReactNode }) {
  const { setOpen } = useDialog();
  return (
    <div onClick={() => setOpen(true)} className="inline-block cursor-pointer">
      {children}
    </div>
  );
}

function DialogContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { open, setOpen } = useDialog();
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));

  if (!open) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center transition-all",
        open ? "visible" : "invisible"
      )}
    >
      <div
        className={cn(
          "absolute inset-0 h-screen bg-black/50 transition-opacity duration-200",
          open ? "opacity-100" : "opacity-0"
        )}
        onClick={() => setOpen(false)}
      />
      <div
        ref={ref}
        className={cn(
          "relative bg-white rounded-lg shadow-lg p-6 w-full max-w-lg transform transition-all duration-200",
          open ? "scale-100 opacity-100" : "scale-95 opacity-0",
          className
        )}
      >
        {children}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-gray-800"
        >
          <X className="size-5" />
        </button>
      </div>
    </div>
  );
}

function DialogTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-lg font-semibold mb-2">{children}</h2>;
}

function DialogDescription({ children }: { children: ReactNode }) {
  return <p className="text-gray-600 mb-4">{children}</p>;
}

function DialogClose({ children }: { children: ReactNode }) {
  const { setOpen } = useDialog();
  return (
    <button
      onClick={() => setOpen(false)}
      className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
    >
      {children}
    </button>
  );
}

Dialog.Trigger = DialogTrigger;
Dialog.Content = DialogContent;
Dialog.Title = DialogTitle;
Dialog.Description = DialogDescription;
Dialog.Close = DialogClose;
