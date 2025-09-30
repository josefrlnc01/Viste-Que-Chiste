import { useState } from "react"
import Favorites from "./Favorites"
import Categories from "./Categories"
export default function PanelSaveds({menuToggle,menuCategories, mostrarChisteAleatorio}){
    
   
   
    // No renderizar si no hay menú abierto
    if (!menuToggle && !menuCategories) {
        return null;
    }

    return (
        <>
            {/* Fondo semitransparente */}
            <div 
                className="fixed inset-0 bg-white/90 backdrop-blur-sm z-40"
                style={{
                    top: '144px', // Altura del header
                    height: 'calc(100vh - 144px)' // Restar la altura del header
                }}
            />
            
            {/* Contenido del menú */}
            <aside 
                className="saveds fixed w-full flex px-8 py-6 flex-col items-center overflow-y-auto z-50"
                style={{
                    top: '144px', // Altura del header
                    height: 'calc(100vh - 144px)', // Restar la altura del header
                    maxHeight: 'calc(100vh - 144px)' // Asegurar que no se salga de la pantalla
                }}
            >
                {menuToggle && <Favorites/>}
                {menuCategories && <Categories mostrarChisteAleatorio={mostrarChisteAleatorio}/>}
            </aside>
        </>
    )
}