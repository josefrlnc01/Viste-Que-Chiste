import { createContext, useState, useContext } from "react";

const CategoriaContext = createContext();

export function CategoriaProvider({ children }) {
  const categ = localStorage.getItem('categoria')
  const [categoria, setCategoria] = useState(`${categ}`);
  return (
    <CategoriaContext.Provider value={{ categoria, setCategoria }}>
      {children}
    </CategoriaContext.Provider>
  );
}

export function useCategoria() {
    return useContext(CategoriaContext);
  }