import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

type user = {
  name: string;
  role: "1996" | "2001";
  email: string;
};
interface UserContextType {
  user: user | null;
  setUser: Dispatch<SetStateAction<user | null>>;
}

export const User = createContext<UserContextType | null>(null);

const UserContext = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<user | null>(null);

  return <User.Provider value={{ user, setUser }}>{children}</User.Provider>;
};

export default UserContext;
