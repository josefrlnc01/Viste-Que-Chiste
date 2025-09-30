
import { useCategoria } from "../context/CategoriaContext";
import toast from "react-hot-toast";

export default function Categories() {
    const { setCategoria } = useCategoria();
    
    function handleSuccesCategorie(cat) {
        // 1. Primero actualizamos el estado y el localStorage
        setCategoria(cat);
        localStorage.setItem('categoria', cat);
        
        // 2. Luego intentamos mostrar un chiste de la categoría
        if (window.mostrarChisteAleatorio && typeof window.mostrarChisteAleatorio === 'function') {
            // Forzamos un pequeño retraso para asegurar que el estado se ha actualizado
            setTimeout(() => {
                window.mostrarChisteAleatorio();
            }, 100);
        } else {
          
            // Si no se encuentra la función, recargamos la página
            window.location.reload();
        }
        
        toast.success(`¡Categoría '${cat}' activa!`);
    }

   return(
    <>
    <section id="categories" className="min-w-full min-h-screen mt-10 grid grid-cols-2  overflow-y-auto gap-4">
    
    <button onClick={() => handleSuccesCategorie('Generales')} className="categorie-btn flex flex-col justify-center items-center gap-2 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-4 border border-indigo-200 hover:shadow-md transition-all duration-300  focus:scale-90  ">
        <span className="text-3xl">🤣</span>
    <span>GENERALES</span> 
        <span className=" text-black text-sm font-light ">450 chistes</span> 
        </button>
        <button onClick={() => handleSuccesCategorie('Abogados')} className="categorie-btn flex flex-col justify-center items-center gap-2 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-4 border border-indigo-200 hover:shadow-md transition-all duration-300 focus:scale-90 ">
    <span className="text-3xl">🧑‍⚖️</span>
    <span>ABOGADOS</span> 
        <span className=" text-black text-sm font-light ">100 chistes</span>  
        </button>

    <button onClick={() => handleSuccesCategorie('Animales')} className="categorie-btn flex flex-col justify-center items-center gap-2 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-4 border border-indigo-200 hover:shadow-md transition-all duration-300  focus:scale-90  ">
    <span className="text-3xl">🪿</span>
    <span>ANIMALES</span>  
        <span className=" text-black text-sm font-light ">100 chistes</span>   
        </button>

    <button onClick={() => handleSuccesCategorie('Borrachos')} className="categorie-btn flex flex-col justify-center items-center gap-2 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-4 border border-indigo-200 hover:shadow-md transition-all duration-300 focus:scale-90 ">
        <span className="text-3xl">🍻</span>
    <span>BORRACHOS</span> 
        <span className=" text-black text-sm font-light ">150 chistes</span>   
        </button>
   
    <button onClick={() => handleSuccesCategorie('Colegios')} className="categorie-btn flex flex-col justify-center items-center gap-2 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-4 border border-indigo-200 hover:shadow-md transition-all duration-300 focus:scale-90 ">
    <span className="text-3xl">🏫</span>
    <span>COLEGIOS</span> 
        <span className=" text-black text-sm font-light ">100 chistes</span>  
        </button>
    <button onClick={() => handleSuccesCategorie('Fútbol')} className="categorie-btn  flex flex-col justify-center items-center gap-2 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-4 border border-indigo-200 hover:shadow-md transition-all duration-300 focus:scale-90 ">
    <span className="text-3xl">⚽</span>
    <span>FÚTBOL</span> 
        <span className=" text-black text-sm font-light ">150 chistes</span>  
        </button>
       
        <button onClick={() => handleSuccesCategorie('Jaimito')} className="categorie-btn flex flex-col justify-center items-center gap-2 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-4 border border-indigo-200 hover:shadow-md transition-all duration-300 focus:scale-90 ">
        <span className="text-3xl">👦</span>
    <span>JAIMITO</span> 
        <span className=" text-black text-sm font-light ">100 chistes</span>   
            </button>
        <button onClick={() => handleSuccesCategorie('Medicos')} className="categorie-btn flex flex-col justify-center items-center gap-2 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-4 border border-indigo-200 hover:shadow-md transition-all duration-300 focus:scale-90 ">
        <span className="text-3xl">🩺</span>
    <span>MÉDICOS</span> 
        <span className=" text-black text-sm font-light ">125 chistes</span>  
            </button>
       
        <button onClick={() => handleSuccesCategorie('Suegras')} className="categorie-btn flex flex-col justify-center items-center gap-2 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-4 border border-indigo-200 hover:shadow-md transition-all duration-300 focus:scale-90">
        <span className="text-3xl">👵</span>
    <span>SUEGRAS</span> 
        <span className=" text-black text-sm font-light ">100 chistes</span>  
            </button>
        <button onClick={() => handleSuccesCategorie('Trabalenguas')} className="categorie-btn flex flex-col justify-center items-center gap-2 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-4 border border-indigo-200 hover:shadow-md transition-all duration-300 focus:scale-90 ">
        <span className="text-3xl">🔡</span>
    <span>TRABALENGUAS</span> 
        <span className=" text-black text-sm font-light ">100 chistes</span>  
            </button>
        
   
    </section>
    </>
   )

  
}