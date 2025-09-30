import { useState, useRef, useEffect, useMemo } from 'react';
import { speak } from '../utils/tts.js';
import chistesData from '../data/chistes.json'
import { useFavoritesStore } from '../features/favorites/favoritesStore.js';
import { gsap } from "gsap";
import { toast } from 'react-hot-toast';
import categoriesChistes from '../data/chistes_categorias.json'

import Flyer from "./flyer.jsx";
import interstitialAdd from '../pages/adds.jsx';
import { useCategoria } from '../context/CategoriaContext.jsx';
import { Share } from '@capacitor/share';
import Confetti from "react-confetti";


const BACKUP_jokeDefinitive = [
  "¿Qué le dice un jaguar a otro jaguar? Jaguar you",
  "¿Cómo se despiden los químicos? Ácido un placer",
  "¿Qué le dice una iguana a su hermana gemela? Somos iguanitas"
];

export default function Jokes({chisteId, setChisteId}) {
  const [chisteActual, setChisteActual] = useState('');
  const { addJoke, removeJoke } = useFavoritesStore();

  const [showFlyer, setShowFlyer] = useState(false);
  const maxForaddsCounter = 6
  const [firstJoke, setFirstJoke] = useState(false)
  const { categoria } = useCategoria()
  const [showConfetti, setShowConfetti] = useState(false);
  const [jokeDefinitive, setjokeDefinitive] = useState(chistesData);
  const prevChisteRef = useRef();
  const [isPrev, setIsPrev] = useState(false);

  
  const { jokes } = useFavoritesStore()


  


  useEffect(() => {
    prevChisteRef.current = categoria
  }, [categoria])

  

  const handleAction = () => {
    setShowConfetti(true);

    // Ocultar confetti después de 3 segundos
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  };

  function plusCounter() {
    let addsCounter = parseInt(localStorage.getItem('addsCounter') || '0')
    addsCounter++
    localStorage.setItem('addsCounter', addsCounter.toString())
  }



  async function shareJoke() {
    try {
      if (!firstJoke) {
        console.log('No hay chiste para compartir');
        return;
      }
      if (window.Capacitor?.isNativePlatform()) {
        await new Promise(resolve => setTimeout(resolve, 100)); // Esperar a que se renderice

        await Share.share({
          title: 'Chiste',
          text: chisteActual,
          dialogTitle: 'Compartir chiste'
        });
        toast.success('Chiste copiado al portapapeles');
      }



    } catch (error) {
      console.error('Error en sharejoke:', error);
      toast.error('Error al compartir el chiste. Por favor, inténtalo de nuevo.');
    }
  }




  function saveJoke() {

    // Detectar duplicados por texto, ya que el store guarda { id: uuid, text }
    if (jokes.some(j => j.text === chisteActual)) {
      toast.error('Este chiste ya está guardado 🥸​')
      return
    }
    handleAction()
    toast.success('Nuevo chiste para la colección 🤪​')
    addJoke(chisteActual)
  }

  const getJokesForCategory = () => {
    return categoria === 'Generales'
      ? [...jokeDefinitive]
      : [...categoriesChistes.filter(cat => cat.categoria === categoria)];
  };

  const getCurrentIndex = () => {
    return Number(localStorage.getItem(`indice_${categoria}`) || 0);
  };

  


  const updateJoke = (joke, index) => {
    setChisteActual(joke.chiste || joke.text || '');
    setChisteId(String(joke.id));
    localStorage.setItem(`indice_${categoria}`, index);
    setFirstJoke(true);
  };

    const jokeds = getJokesForCategory();
      const sortedJokes = [...jokeds].sort((a, b) => Number(a.id) - Number(b.id));
   const currentIdx = getCurrentIndex()


  useEffect(() => {
   
    if (currentIdx <= 0) {
      updateJoke(sortedJokes[0], 0); // muestra directamente el primero
    }
  }, [currentIdx, sortedJokes]);


  const mostrarChisteAnterior = () => {
    try {
      const jokes = getJokesForCategory();
      const sortedJokes = [...jokes].sort((a, b) => Number(a.id) - Number(b.id));
      if (jokes.length === 0) return;

      const currentIdx = getCurrentIndex();
      const prevIdx = (currentIdx - 1 + jokes.length) % jokes.length;
      
      const prevJoke = sortedJokes[prevIdx];
      
      if (prevJoke) {
        updateJoke(prevJoke, prevIdx);
      }
      gsap.fromTo('.text-card',
        { rotationX: 360, opacity: 0.5 },
        { rotationX: 0, opacity: 1, yoyo: true }
      );

    } catch (error) {
      console.error('Error al mostrar el chiste anterior:', error);
    }
  }


  const noCategory = () => {
        return localStorage.getItem('categoria') === null
      }   

  const mostrarChisteAleatorio = () => {
    try {
      const jokes = getJokesForCategory();
      

      const currentIdx = getCurrentIndex();
      
      const nextIdx = (currentIdx + 1) % jokes.length;
      const sortedJokes = [...jokes].sort((a, b) => Number(a.id) - Number(b.id));
      const nextJoke = sortedJokes[nextIdx];
    
      if(localStorage.getItem('categoria') === null){
        toast.error('Selecciona una categoría para empezar')
        return
      }
      if (nextJoke ) {
          updateJoke(nextJoke, nextIdx);
      }
     


      // 8) Contadores / ads
      plusCounter();
      const adds = parseInt(localStorage.getItem('addsCounter') || '0', 10);
      if (adds >= maxForaddsCounter) {
        interstitialAdd();
        localStorage.setItem('addsCounter', '0');
      }

      // 9) Animación
      gsap.fromTo('.text-card',
        { rotationX: 0, opacity: 0.5 },
        { rotationX: 360, opacity: 1, yoyo: true }
      );

      // 10) Si necesitas llevar un índice por categoría:
      // handleIndex(categ); // (si esa función espera la categoría efectiva)

    } catch (error) {
      console.error('Error al mostrar el chiste:', error);
      const backupJoke = BACKUP_jokeDefinitive[Math.floor(Math.random() * BACKUP_jokeDefinitive.length)];
      setChisteActual(backupJoke);
      speak(backupJoke);
    }
  }



  return (
    <>

      <Flyer joke={chisteActual} visible={showFlyer} />
      <main className='min-h-[calc(100vh-144px)] flex flex-col justify-between '>
       
          {showConfetti && (
            <Confetti
              width={typeof window !== 'undefined' ? window.innerWidth : 360}
              height={typeof window !== 'undefined' ? window.innerHeight : 640}
            />
          )}
        
           <div className='flex flex-col justify-center grow mx-auto px-8 py-6 self-end'>
         <div className='bg-white rounded-3xl p-8 text-center shadow-lg border border-black/5 relative overflow-hidden'>
             
             <p className='text-card text-md text-pretty space-x-3 font-medium '>{chisteActual}</p>
            
           </div>
           <div className=' min-w-full min-h-full p-2 mt-1 mb-0  flex justify-center gap-4 '>
               {firstJoke ? <button type='button' className='w-12 h-12 rounded-2xl border-none text-xl cursor-pointer transition-all duration-300 flex items-center justify-center bg-gradient-to-br from-cyan-400 to-blue-500 hover:-translate-y-1 hover:shadow-lg active:scale-95' onClick={() => speak(chisteActual)}>🔊​</button> : ''}

               {firstJoke ? <button type='button' className=' w-12 h-12 rounded-2xl border-none text-xl cursor-pointer transition-all duration-300 flex items-center justify-center bg-gradient-to-br from-pink-400 to-rose-500 hover:-translate-y-1 hover:shadow-lg active:scale-95' onClick={saveJoke}>⭐​​</button> : ''}
               {firstJoke ? <button type='button' className='w-12 h-12 rounded-2xl border-none text-xl cursor-pointer transition-all duration-300 flex items-center justify-center bg-gradient-to-br from-teal-400 to-emerald-500 hover:-translate-y-1 hover:shadow-lg active:scale-95' onClick={() => shareJoke()}>🚀​​​</button> : ''}

             </div>
             </div>
         

       
       <div className='min-w-full min-h-6/12 p-2   flex items-center justify-center gap-2 mb-3 '>
         {firstJoke ? <button type='button' onClick={mostrarChisteAnterior} className='flex-1 py-6 px-4 border-none rounded-2xl font-semibold text-sm cursor-pointer transition-all duration-300 uppercase tracking-wide text-white bg-gradient-to-br from-indigo-500 to-purple-600 hover:-translate-y-1 hover:shadow-lg active:translate-y-0
           '>ANTERIOR</button> : ''}
 
 {noCategory() ? '' : <button type='button' onClick={mostrarChisteAleatorio}
  
 className='flex-1 py-6 px-4 border-none rounded-2xl font-semibold text-sm cursor-pointer transition-all duration-300 uppercase tracking-wide text-white bg-gradient-to-br from-pink-500 to-rose-600 hover:-translate-y-1 hover:shadow-lg active:translate-y-0
           '>{!firstJoke ? 'CONTAR CHISTE 😝' : 'SIGUIENTE 😝'}​</button>}
           

        
         </div>

         
           
      </main>
    </>
  );

}