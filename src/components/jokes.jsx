import { useState, useRef } from 'react';
import { speak } from '../utils/tts';
import chistesData from '../data/chistes.json'
import { useFavoritesStore } from '../features/favorites/favoritesStore';
import { gsap } from "gsap";
import {  toast } from 'react-hot-toast';
import categoriesChistes from '../data/chistes_categorias.json'
import html2canvas from "html2canvas";
import Flyer from "./flyer";
import interstitialAdd  from '../pages/adds.jsx';
import { useCategoria } from '../context/CategoriaContext.jsx';
import { Share } from '@capacitor/share';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from "@capacitor/filesystem";
import Confetti from "react-confetti";

const BACKUP_JOKES = [
  "¿Qué le dice un jaguar a otro jaguar? Jaguar you",
  "¿Cómo se despiden los químicos? Ácido un placer",
  "¿Qué le dice una iguana a su hermana gemela? Somos iguanitas"
];

export default function Jokes() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [chisteActual, setChisteActual] = useState('');
    const { addJoke, removeJoke } = useFavoritesStore();
     const [showFlyer, setShowFlyer] = useState(false);
    const flyerRef = useRef(null);
    const maxForaddsCounter = 6
    const [firstJoke, setFirstJoke] = useState(false)
    const {categoria} = useCategoria()

   const [showConfetti, setShowConfetti] = useState(false);

  const handleAction = () => {
    setShowConfetti(true);

    // Ocultar confetti después de 3 segundos
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  };

  function plusCounter(){
    let addsCounter = parseInt(localStorage.getItem('addsCounter') || '0')
    addsCounter++
    localStorage.setItem('addsCounter',addsCounter.toString())
  }

  async function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
    })
  }

    async function shareCanvas() {
        try {
          if(!firstJoke) return
            setShowFlyer(true);
           
            // Wait for the Flyer to be visible in the DOM
            await new Promise((resolve) => setTimeout(resolve, 100));
            const flyer = document.getElementById("customFlyer");
            if (!flyer) {
                console.error("Flyer element not found");
                setShowFlyer(false);
                return null;
            }
            const canvas = await html2canvas(flyer, {
                useCORS: true,
                allowTaint: true,
                scale: 2,
                backgroundColor: null,
                logging: true
            });
            setShowFlyer(false);
            
            const blob = await new Promise((resolve) => {
                canvas.toBlob((b) => {
                    const file = new File([b], 'flyer.png', { type: 'image/png' });
                    resolve(b);
                }, 'image/png', 1.0);
            });
             const blob64 = await blobToBase64(blob);
            const fileName = `chiste${Date.now()}.png`
            const writeRes = await Filesystem.writeFile({
              path: fileName,
              data : blob64.split(',')[1],
              directory:Directory.Cache
            })
           const writeUrl = writeRes.uri;
           Share.share({
               title: '¡Mira este chiste!',
               text: chisteActual,
               url: writeUrl,
               dialogTitle: 'Compartir chiste'
           })
        } catch (error) {
            setShowFlyer(false);
            console.error("Error in shareCanvas:", error);
            return;
        }
    }
    

    const downloadImage = (blob, filename) => {
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    }

  

    const [jokes, setJokes] = useState(chistesData);

    

    const mostrarChisteAleatorio = () => {
      try {
         handleAction()
        const pool = categoria === 'Generales'
        ? jokes
        : categoriesChistes.filter(cat => cat.categoria === categoria)
        setFirstJoke(true)
        const randomJoke = pool[Math.floor(Math.random() * pool.length)]
       
        const normalized =
        typeof randomJoke === 'string'
          ? { chiste: randomJoke, categoria: categoria === 'Generales' ? 'General' : categoria }
          : { chiste: randomJoke?.chiste ?? String(randomJoke ?? ''), categoria: randomJoke?.categoria ?? 'General' };
        
        
        setChisteActual(normalized.chiste)
        plusCounter()
        if(parseInt(localStorage.getItem('addsCounter') || '0') >= maxForaddsCounter ){
          interstitialAdd()
          localStorage.setItem('addsCounter', '0')
        }
        console.log(parseInt(localStorage.getItem('addsCounter') || '0'))
        
        gsap.fromTo('.card',
          {rotationX:0, opacity:.5},
          {rotationX:360,
          opacity:1,
            yoyo:true}
        )
      } catch (error) {
        console.error('Error al mostrar el chiste:', error);
        // Fallback to backup jokes if there's an error
        const backupJoke = BACKUP_JOKES[Math.floor(Math.random() * BACKUP_JOKES.length)];
        setChisteActual(backupJoke);
        speak(backupJoke);
      }
    }
   

  
     return (
    <>
     
      <Flyer joke={chisteActual} visible={showFlyer} />
      <main className='min-h-screen'> 
        <div className="min-w-full min-h-screen  text-center flex flex-col justify-start items-center gap-20">
          {showConfetti && (
            <Confetti
              width={typeof window !== 'undefined' ? window.innerWidth : 360}
              height={typeof window !== 'undefined' ? window.innerHeight : 640}
            />
          )}
          <div className='min-w-9/12 min-h-full mt-10 flex flex-col gap-4 justify-center items-center'>
            <button type='button' onClick={mostrarChisteAleatorio} className='joke bg-yellow-300 p-8 rounded-md 
            '>CONTAR CHISTE 😆</button>
            <div className='card min-w-4/5 max-w-60 min-h-52 mx-auto mt-16 flex flex-col justify-between bg-slate-300 text-black p-4 rounded-md shadow-xl'>
              <p className='text-lg text-pretty'>{chisteActual}</p>
              <div className=' min-w-full min-h-full p-2 mt-2 mb-0   text-white flex flex-row justify-center gap-2  rounded-lg'>
              {firstJoke ?  <button className=' p-6 bg-sky-400 shadow-md  rounded-md' onClick={() => speak(chisteActual)}>🔊​</button> : ''}
               
                {firstJoke ? <button className=' p-6 bg-pink-400 shadow-md   rounded-md' onClick={() => {
                  toast.success('Nuevo chiste para la colección 🤪​')
                  addJoke(chisteActual)
                }}>⭐​​</button> : ''}
                {firstJoke ? <button className=' p-6 bg-green-400 shadow-md   rounded-md' onClick={() => shareCanvas()}>🚀​​​</button> : '' }
                
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
      
}