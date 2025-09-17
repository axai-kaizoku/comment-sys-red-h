"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "./button";
import { useClickOutside } from "@/hooks/use-click-outside";

type SelectContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  value: string | null;
  setValue: (val: string, label: React.ReactNode) => void;
  selectedLabel: React.ReactNode;
};

const SelectContext = createContext<SelectContextType | undefined>(undefined);

function useSelect() {
  const ctx = useContext(SelectContext);
  if (!ctx) throw new Error("Select components must be used inside <Select>");
  return ctx;
}

type SelectProps = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (val: string) => void;
  children: React.ReactNode;
};

export function Select({
  value: controlledValue,
  defaultValue,
  onValueChange,
  children,
}: SelectProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState<string | null>(
    defaultValue || null
  );
  const [selectedLabel, setSelectedLabel] = useState<React.ReactNode>(null);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const setValue = (val: string, label: React.ReactNode) => {
    if (!isControlled) setUncontrolledValue(val);
    setSelectedLabel(label);
    onValueChange?.(val);
    setOpen(false);
  };

  useEffect(() => {
    if (!value || value === "null") {
      setSelectedLabel(null);
    }
  }, [value]);

  useClickOutside(ref, () => setOpen(false));

  return (
    <SelectContext.Provider
      value={{ open, setOpen, value, setValue, selectedLabel }}
    >
      <div ref={ref} className="relative inline-block">
        {children}
      </div>
    </SelectContext.Provider>
  );
}

function SelectTrigger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { open, setOpen } = useSelect();
  return (
    <Button
      type="button"
      onClick={() => setOpen(!open)}
      className={cn(
        "flex items-center justify-between w-48 px-3 py-2 text-sm border rounded-md bg-white hover:bg-gray-50",
        className
      )}
    >
      {children}
      <span className="ml-2">
        <ChevronDown className="opacity-70 size-4" />
      </span>
    </Button>
  );
}

function SelectValue({
  placeholder,
  className,
}: {
  placeholder?: string;
  className?: string;
}) {
  const { selectedLabel } = useSelect();
  return (
    <span className={cn(className)}>
      {selectedLabel ? selectedLabel : placeholder || "Select an option"}
    </span>
  );
}

function SelectContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { open } = useSelect();
  return (
    <div
      className={cn(
        "absolute mt-1 w-48 bg-white border rounded-md shadow-md transition-all origin-top border-neutral-300",
        open
          ? "scale-100 opacity-100"
          : "scale-95 opacity-0 pointer-events-none",
        className
      )}
    >
      <ul className="p-1 space-y-1 max-h-40 overflow-y-auto hide-scrollbar">
        {children}
      </ul>
    </div>
  );
}

function SelectItem({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { setValue, setOpen, value: stateValue } = useSelect();
  const isSelected = value === stateValue;
  return (
    <li
      onClick={() => {
        setValue(value, children);
        setOpen(false);
      }}
      className={cn(
        "px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 flex items-center",
        className
      )}
    >
      {isSelected ? (
        <Check className="size-4 mr-2" />
      ) : (
        <div className="pointer-events-none size-4 mr-2" />
      )}
      {children}
    </li>
  );
}

Select.Trigger = SelectTrigger;
Select.Value = SelectValue;
Select.Content = SelectContent;
Select.Item = SelectItem;
