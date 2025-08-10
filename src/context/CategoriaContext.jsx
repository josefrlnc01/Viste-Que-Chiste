import { createContext, useState, useContext } from "react";

const CategoriaContext = createContext();

export function CategoriaProvider({ children }) {
  const [categoria, setCategoria] = useState("Generales");
  return (
    <CategoriaContext.Provider value={{ categoria, setCategoria }}>
      {children}
    </CategoriaContext.Provider>
  );
}

export function useCategoria() {
    return useContext(CategoriaContext);
  }