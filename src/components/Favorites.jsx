import { useFavoritesStore } from "../features/favorites/favoritesStore";
import {speak} from '../utils/tts'
import { useState } from "react";
import gsap from 'gsap'
import toast from 'react-hot-toast'
import { Share } from '@capacitor/share';
import Flyer from "./flyer";

export default function Favorites(){
    const { jokes, removeJoke} = useFavoritesStore()
    
   
   
  
      async function shareJoke(joke) {
        try {
        
          if (window.Capacitor?.isNativePlatform()) {
            await new Promise(resolve => setTimeout(resolve, 100)); // Esperar a que se renderice
    
            await Share.share({
              title: 'Viste Que Chiste',
              text: joke.text,
              dialogTitle: 'Compartir chiste'
            });
            toast.success('Chiste copiado al portapapeles');
          }
    
          const card = document.getElementById(`card-${joke.id}`);
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
      
      function remove(id) {
    const card = document.getElementById(`card-${id}`);
    if (card) {
      // Animación de salida
      gsap.to(card, {
        x: 5000, // Se mueve a la derecha
        opacity: 0, // Se desvanece
        duration: 1, // Duración de la animación
        ease: 'power2.inOut',
        onComplete: () => {
          // Eliminar el chiste después de la animación
          removeJoke(id);
          toast.success('Chiste eliminado de favoritos 🧐');
        }
      });
    } else {
      // Si por alguna razón no se encuentra el elemento, eliminar directamente
      removeJoke(id);
      toast.success('Chiste eliminado de favoritos 🧐');
    }
  }

  return (
   
    <div className="h-full min-w-screen flex flex-col justify-start items-center overflow-y-auto gap-4 ">
       
      
      {jokes.length === 0 ? (
        <p className="text-green-500 text-center  bg-white opacity-75 mt-6 p-3 rounded-md">Aún no tienes chistes favoritos 🧐</p>
      ) : (
        jokes.map((joke) => (
          
          <div 
          id={`card-${joke.id}`}
          key={joke.id} 
          className="card flex flex-col justify-center w-5/6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-4 border border-gray-200 hover:shadow-md transition-all duration-300 transform"
        >
           
            <div> 
            <p className="font-medium text-center text-wrap">{joke.text}</p>
            </div>
            
            <div className=" mt-2 flex ml-0 justify-center items-center gap-2 ">
              <span className="text-sm font-light text-white " >{joke.categoria}</span>
              <button onClick={() => speak(joke.text)} className="bg-sky-400 p-2 text-sm text-white rounded-2xl">
                🔊 Escuchar
              </button>
              <button className='p-2 bg-green-400  text-white text-sm rounded-2xl' onClick={() => shareJoke(joke)}>🚀 Compartir​​​</button>
              <button onClick={() => remove(joke.id)} className="bg-pink-700 p-2 text-sm text-white rounded-2xl">
                🗑 Eliminar
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}