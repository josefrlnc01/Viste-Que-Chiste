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
];

export default function Jokes({ chisteId, setChisteId }) {
  const [chisteActual, setChisteActual] = useState('');
  const { addJoke } = useFavoritesStore();
  const [firstJoke, setFirstJoke] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const prevChisteRef = useRef();
  const { jokes } = useFavoritesStore()
  const maxForaddsCounter = 6
  const { categoria } = useCategoria()

  useEffect(() => {
    prevChisteRef.current = categoria;
    
    // Primero intentar cargar desde localStorage
    const id = localStorage.getItem(`indice_${categoria}`)
    const joke = localStorage.getItem(`joke_${categoria}`)
    
    if (joke && id) {
      // Si existe en localStorage, usar eso
      setChisteId(id)
      setChisteActual(joke)
      setFirstJoke(true)
    } else {
      // Solo si NO hay nada guardado, cargar el primer chiste
      const jokes = getJokesForCategory();
      if (jokes.length > 0) {
        const firstJoke = [...jokes].sort((a, b) => Number(a.id) - Number(b.id))[0];
        if (firstJoke) {
          const idToShow = String(firstJoke.id).includes('_')
            ? String(firstJoke.id).split('_')[1]
            : String(firstJoke.id);
          setChisteId(idToShow);
          setChisteActual(firstJoke.chiste || firstJoke.text || '');
          setFirstJoke(true)
          // Guardar en localStorage
          localStorage.setItem(`indice_${categoria}`, '1');
          localStorage.setItem(`joke_${categoria}`, firstJoke.chiste || firstJoke.text || '');
        }
      }
    }
  }, [categoria]);


  
  const handleConfetti = () => {
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



  async function shareJoke(id) {
    try {
      let jokeForShare = chisteActual
      if (!firstJoke) {
        const currentIdx = getCurrentIndex();
        const currentJoke = localStorage.getItem(`joke_${categoria}`)
        jokeForShare = currentJoke
      }

      if (window.Capacitor?.isNativePlatform()) {
        await new Promise(resolve => setTimeout(resolve, 100)); // Esperar a que se renderice

        await Share.share({
          title: 'Chiste',
          text: jokeForShare,
          dialogTitle: 'Compartir chiste'
        });
        toast.success('Chiste copiado al portapapeles');
      }

      const card = document.getElementById(`card-${id}`);
      if (card) {
        // Animación de salida
        gsap.to(card, {
          y: -100, // Se mueve hacia arriba
          // Se desvanece
          duration: 0.8, // Duración de la animación
          ease: 'power2.inOut',
          onComplete: () => {
            // Restablecer la animación después de completarse
            gsap.set(card, { clearProps: 'all' });
          }
        });
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
    handleConfetti()
    toast.success('Nuevo chiste para la colección 🤪​')
    addJoke(chisteActual)
  }

  const getJokesForCategory = () => {
   
    return categoria === 'Generales' ? chistesData : categoriesChistes.filter(joke => joke.categoria === categoria)
  };

  // Obtener el índice actual (1-based para el usuario)
  const getCurrentIndex = () => {
    const storedIndex = localStorage.getItem(`indice_${categoria}`);
    // Si no hay índice guardado, empezamos en 1
    return storedIndex !== null ? parseInt(storedIndex, 10) : 1;
  };

  // Actualizar el chiste actual
  const updateJoke = (joke, userIndex) => {
    if (!joke) return;
    
    // Índice del array (0-based)
    const arrayIndex = userIndex - 1;
    
    setChisteActual(joke.chiste || joke.text || '');
    setChisteId(String(joke.id));
    localStorage.setItem(`joke_${categoria}`, joke.text || joke.chiste || '');
    // Guardar el índice 1-based para el usuario
    localStorage.setItem(`indice_${categoria}`, userIndex);
    setFirstJoke(true);
  };

  const jokeds = getJokesForCategory();
  const sortedJokes = [...jokeds].sort((a, b) => Number(a.id) - Number(b.id));

 

  useEffect(() => {
    // Intentar cargar el último chiste del localStorage
    const ultimoChisteGuardado = localStorage.getItem('ultimoChiste');
    
    if (ultimoChisteGuardado && sortedJokes.length > 0) {
      try {
        const { chiste, categoria: catGuardada, indice } = JSON.parse(ultimoChisteGuardado);
        
        // Si la categoría guardada coincide con la actual
        if (catGuardada === categoria && indice < sortedJokes.length) {
          updateJoke(sortedJokes[indice], indice);
          return;
        }
      } catch (e) {
        console.error('Error al cargar el último chiste:', e);
      }
    }
    
    
  }, [sortedJokes]);


  const mostrarChisteAnterior = () => {
    try {
      const jokes = getJokesForCategory();
      if (jokes.length === 0) {
        toast.error('No hay chistes disponibles en esta categoría');
        return;
      }

      const currentIdx = getCurrentIndex();
      // Asegurarse de que el índice anterior no sea negativo
      const prevIdx = currentIdx <= 0 ? jokes.length - 1 : currentIdx - 1;
      const sortedJokes = [...jokes].sort((a, b) => Number(a.id) - Number(b.id));
      const prevJoke = sortedJokes[prevIdx];

      if (prevJoke) {
        updateJoke(prevJoke, prevIdx);
        // Actualizar el localStorage con el chiste anterior
        localStorage.setItem('ultimoChiste', JSON.stringify({
          chiste: prevJoke.chiste || prevJoke.text || '',
          categoria: categoria,
          indice: prevIdx
        }));
      }

      // Animación
      gsap.fromTo('.text-card',
        { rotationX: 360, opacity: 0.5 },
        { rotationX: 0, opacity: 1, yoyo: true }
      );

      // Contador de anuncios
      const adds = parseInt(localStorage.getItem('addsCounter') || '0', 10);
      if (adds >= maxForaddsCounter) {
        interstitialAdd();
        localStorage.setItem('addsCounter', '0');
      }

    } catch (error) {
      console.error('Error al mostrar el chiste anterior:', error);
      toast.error('Error al cargar el chiste anterior');
    }
  }


  const noCategory = () => {
    return localStorage.getItem('categoria') === null;
  };

  const mostrarChisteAleatorio = () => {
    try {
      const jokes = getJokesForCategory();
      if (jokes.length === 0) {
        toast.error('No hay chistes disponibles para esta categoría');
        return;
      }

      const currentIdx = getCurrentIndex();
      const sortedJokes = [...jokes].sort((a, b) => Number(a.id) - Number(b.id));
      
      // Calcular el siguiente índice (1-based para el usuario)
      const nextUserIdx = (currentIdx % sortedJokes.length) + 1;
      const nextJoke = sortedJokes[nextUserIdx]; // Convertir a 0-based

      if (nextJoke) {
        updateJoke(nextJoke, nextUserIdx);
        // Guardar el chiste actual en localStorage
        localStorage.setItem('ultimoChiste', JSON.stringify({
          chiste: nextJoke.chiste || nextJoke.text || '',
          categoria: categoria,
          indice: nextUserIdx
        }));
      }
      plusCounter()
      const adds = parseInt(localStorage.getItem('addsCounter') || '0', 10);
      if (adds >= maxForaddsCounter) {
        interstitialAdd();
        localStorage.setItem('addsCounter', '0');
      }


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
  };



  // Exponer la función al hacer clic en una categoría
  useEffect(() => {
    // Exponer la función al objeto window cuando el componente se monta
    window.mostrarChisteAleatorio = mostrarChisteAleatorio;
    window.getJokesForCategory = getJokesForCategory;
    // Limpiar la función del objeto window cuando el componente se desmonte
    return () => {
      delete window.mostrarChisteAleatorio;
    };
  }, [mostrarChisteAleatorio]);

 
  return (
    <>


      <main className='min-h-[calc(100vh-144px)] flex flex-col justify-between '>

        {showConfetti && (
          <Confetti
            width={typeof window !== 'undefined' ? window.innerWidth : 360}
            height={typeof window !== 'undefined' ? window.innerHeight : 640}
          />
        )}

        <div
        
          className='flex flex-col justify-center grow mx-auto px-2  py-6 '>
          <div
          id={`card-${chisteId}`} 
          className='bg-white rounded-3xl p-8 text-center shadow-lg border border-black/5 relative overflow-hidden'>

            <p className='text-card text-md text-pretty space-x-3 font-medium '>{chisteActual}</p>

          </div>
          <div className=' min-w-full min-h-full p-2 mt-1 mb-0  flex justify-center gap-4 '>
            <button 
            onClick={() => speak(chisteActual)}
            className="px-4 py-3 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-2xl font-medium text-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
              🔊 Escuchar
            </button>

            <button 
            onClick={() => saveJoke()}
            className="px-4 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-white rounded-2xl font-medium text-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
              ⭐ Guardar
            </button>
            <button 
            onClick={() => shareJoke(chisteId)}
            className="px-4 py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-2xl font-medium text-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
              🚀 Compartir
            </button>

          </div>
        </div>



        <div className='min-w-full min-h-6/12 p-2   flex items-center justify-center gap-2 mb-3 '>
          <button type='button' onClick={mostrarChisteAnterior} className='flex-1 py-6 px-4 border-none rounded-2xl font-semibold text-sm cursor-pointer transition-all duration-300 uppercase tracking-wide text-white bg-gradient-to-br from-indigo-500 to-purple-600 hover:-translate-y-1 hover:shadow-lg active:translate-y-0
           '>ANTERIOR</button>

          {noCategory() ? '' : <button type='button' onClick={mostrarChisteAleatorio}

            className='flex-1 py-6 px-4 border-none rounded-2xl font-semibold text-sm cursor-pointer transition-all duration-300 uppercase tracking-wide text-white bg-gradient-to-br from-pink-500 to-rose-600 hover:-translate-y-1 hover:shadow-lg active:translate-y-0
           '>SIGUIENTE 😝​</button>}



        </div>



      </main>
    </>
  );

}