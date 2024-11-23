import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface WindowContextType {
  windowSize: number | string;
  setWindowSize?: Dispatch<SetStateAction<number | string>>;
}

export const WindowSize = createContext<WindowContextType | null>(null);

export default function WindowContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [windowSize, setWindowSize] = useState<number | string>(
    window.innerWidth
  );

  useEffect(() => {
    function setWindowWidth() {
      setWindowSize(window.innerWidth);
    }
    window.addEventListener("resize", setWindowWidth);

    // CleanUP Function
    return () => {
      window.removeEventListener("resize", setWindowWidth);
    };
  }, []);

  return (
    <WindowSize.Provider value={{ windowSize }}>{children}</WindowSize.Provider>
  );
}
