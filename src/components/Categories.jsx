import { useState, useEffect } from "react";
import categories from '../data/chistes_categorias.json'
import { useCategoria } from "../context/CategoriaContext";
import fondo1 from '../assets/back.webp'
import fondo2  from '../assets/fondo2.webp'
import fondo3  from '../assets/fondo3.webp'
import fondo4  from '../assets/fondo4.webp'


import toast from "react-hot-toast";
export default  function Categories(){
    const {cateGoria, setCategoria} = useCategoria()
    const themes = [fondo1, fondo2, fondo3, fondo4]
   const handleTheme = () => {
    let last
    let savedAtLocal = localStorage.getItem('savedThemes' || '')
    
    
    const themesFiltered = themes.filter(theme => theme !== savedAtLocal)
      last =  themesFiltered[Math.floor(Math.random() * themesFiltered.length)]
      localStorage.setItem('savedThemes', last)
      
      document.body.style.backgroundImage =  `url(${last})`
      document.body.style.backgroundRepeat = 'no-repeat'
      document.body.style.backgroundSize = 'cover'
   
  }

   
    function handleSuccesCategorie(cat){
        setCategoria(cat)
        localStorage.setItem('categoria', cat)
        toast.success(`¡Categoría '${cat}' activa!`)
    }

   return(
    <>
    <section id="categories" className="min-w-full min-h-screen mt-10 ">
    <div className="h-full min-w-screen flex flex-col justify-evenly items-center overflow-y-auto gap-4">
    <button onClick={handleTheme} className='min-w-auto bg-green-400 opacity-95 p-6 rounded-xl'>🎨</button>
    <button onClick={() => handleSuccesCategorie('Generales')} className="categorie-btn min-w-1/2 bg-blue-500 p-6 rounded-xl flex justify-between gap-7 text-white items-center "><span className="font-bold bg-blue-950 text-white p-1 rounded-b-md">450</span> <span>GENERALES</span>  </button>
    <button onClick={() => handleSuccesCategorie('Abogados')} className="categorie-btn  min-w-1/2 bg-pink-500 p-3 rounded-xl flex justify-between text-white items-center"><span className="font-bold bg-pink-950 text-white p-1 rounded-b-md">100</span> <span>ABOGADOS</span>  </button>
    <button onClick={() => handleSuccesCategorie('Animales')} className="categorie-btn min-w-1/2 bg-pink-500 p-3 rounded-xl flex justify-between text-white items-center"><span className="font-bold bg-pink-950 text-white p-1 rounded-b-md">100</span><span>ANIMALES</span>  </button>
    <button onClick={() => handleSuccesCategorie('Borrachos')} className="categorie-btn min-w-1/2 bg-pink-500 p-3 rounded-xl flex justify-between text-white items-center"><span className="font-bold bg-pink-950 text-white p-1 rounded-b-md">150</span><span>BORRACHOS</span>  </button>
    <button onClick={() => handleSuccesCategorie('Brainrot Italiano')} className="categorie-btn min-w-1/2 bg-pink-500 p-3 rounded-xl flex justify-between text-white items-center"><span className="font-bold bg-pink-950 text-white p-1 rounded-b-md">100</span><span>BRAINROT </span>  </button>
    <button onClick={() => handleSuccesCategorie('Colegios')} className="categorie-btn  min-w-1/2 bg-pink-500 p-3 rounded-xl text-white flex justify-between items-center"><span className="font-bold bg-pink-950 text-white p-1 rounded-b-md">100</span><span>COLEGIOS</span>  </button>
    <button onClick={() => handleSuccesCategorie('Fútbol')} className="categorie-btn  min-w-1/2 bg-pink-500 p-3 rounded-xl text-white flex justify-between items-center"><span className="font-bold bg-pink-950 text-white p-1 rounded-b-md">150</span><span>FÚTBOL</span>  </button>
       
        <button onClick={() => handleSuccesCategorie('Jaimito')} className="categorie-btn min-w-1/2 bg-pink-500 p-3 rounded-xl text-white flex justify-between items-center"><span className="font-bold bg-pink-950 text-white p-1 rounded-b-md">100</span><span>JAIMITO</span>  </button>
        <button onClick={() => handleSuccesCategorie('Médicos')} className="categorie-btn min-w-1/2 bg-pink-500 p-3 rounded-xl text-white flex justify-between items-center"><span className="font-bold bg-pink-950 text-white p-1 rounded-b-md">125</span><span>MÉDICOS</span>  </button>
       
        <button onClick={() => handleSuccesCategorie('Suegras')} className="categorie-btn min-w-1/2 bg-pink-500 p-3 rounded-xl text-white flex justify-between items-center"><span className="font-bold bg-pink-950 text-white p-1 rounded-b-md">100</span> <span>SUEGRAS</span> </button>
        <button onClick={() => handleSuccesCategorie('Trabalenguas')} className="categorie-btn min-w-1/2 bg-pink-500 p-3 rounded-xl text-white flex justify-between items-center"><span className="font-bold bg-pink-950 text-white p-1 rounded-b-md">100</span><span>TRABALENGUAS</span>  </button>
        
    </div>
    </section>
    </>
   )

  
}