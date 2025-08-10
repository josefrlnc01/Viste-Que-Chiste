import { useState, useEffect } from "react";
import categories from '../data/chistes_categorias.json'
import { useCategoria } from "../context/CategoriaContext";
import toast from "react-hot-toast";
export default  function Categories(){
    const {cateGoria, setCategoria} = useCategoria()
    
    const cats = document.getElementById('categories')
    function handleSuccesCategorie(cat){
        setCategoria(cat)
        toast.success(`¡Categoría '${cat}' activa!`)
    }

   return(
    <>
    <section id="categories" className="min-w-full min-h-screen mt-10 ">
    <div className="h-full min-w-screen flex flex-col justify-evenly items-center overflow-y-auto">
    <button onClick={() => handleSuccesCategorie('Animales')} className="categorie-btn min-w-1/2 bg-pink-500 p-3 rounded-xl">ANIMALES</button>
    <button onClick={() => handleSuccesCategorie('Borrachos')} className="categorie-btn min-w-1/2 bg-pink-500 p-3 rounded-xl">BORRACHOS</button>
    <button onClick={() => handleSuccesCategorie('Brainrot Italiano')} className="categorie-btn min-w-1/2 bg-pink-500 p-3 rounded-xl">BRAINROT ITALIANO</button>
    <button onClick={() => handleSuccesCategorie('Colegios')} className="categorie-btn  min-w-1/2 bg-pink-500 p-3 rounded-xl">COLEGIOS</button>
    
        <button onClick={() => handleSuccesCategorie('Generales')} className="categorie-btn min-w-1/2 bg-pink-500 p-3 rounded-xl">GENERALES </button>
        <button onClick={() => handleSuccesCategorie('Médicos')} className="categorie-btn min-w-1/2 bg-pink-500 p-3 rounded-xl">MÉDICOS</button>
        <button onClick={() => handleSuccesCategorie('Pepito')} className="categorie-btn min-w-1/2 bg-pink-500 p-3 rounded-xl">PEPITO </button>
        <button onClick={() => handleSuccesCategorie('Suegras')} className="categorie-btn min-w-1/2 bg-pink-500 p-3 rounded-xl">SUEGRAS</button>
        <button onClick={() => handleSuccesCategorie('Trabalenguas')} className="categorie-btn min-w-1/2 bg-pink-500 p-3 rounded-xl">TRABALENGUAS</button>
    </div>
    </section>
    </>
   )

  
}