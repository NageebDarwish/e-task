import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

interface MenuContextType {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
export const Menu = createContext<MenuContextType | null>(null);
export default function MenuContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <Menu.Provider value={{ isOpen, setIsOpen }}>{children}</Menu.Provider>
  );
}
