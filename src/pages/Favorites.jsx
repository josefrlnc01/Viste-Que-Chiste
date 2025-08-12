import { useFavoritesStore } from "../features/favorites/favoritesStore";
import {speak} from '../utils/tts'
import { useState } from "react";
import html2canvas from "html2canvas";
import Flyer from "../components/flyer";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Share } from '@capacitor/share';
export default function Favorites(){
    const { jokes, removeJoke} = useFavoritesStore()
    const [showFlyer, setShowFlyer] = useState(false);
  console.log(jokes)
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
              jokes.map(joke => {
                const writeUrl = writeRes.uri;
             Share.share({
                 title: '¡Mira este chiste!',
                 text: joke.chiste,
                 url: writeUrl,
                 dialogTitle: 'Compartir chiste'
             })
              })
             
          } catch (error) {
              setShowFlyer(false);
              console.error("Error in shareCanvas:", error);
              return;
          }
      }
      


  return (
   
    <div className="min-w-dvw mx-auto mt-18 p-4 min-h-screen flex flex-col justify-start ">
       
      <h2 className="text-2xl font-bold mb-4 text-center text-green-400 bg-white opacity-75 mt-6 p-3 rounded-md">MIS CHISTES FAVORITOS 🤩​</h2>
      {jokes.length === 0 ? (
        <p className="text-green-500 text-center">Aun tienes chistes favoritos 🧐</p>
      ) : (
        jokes.map((joke) => (
          
          <div key={joke.id} className="card bg-gray-100 p-4 mb-3 rounded-md shadow min-w-4/5 mx-auto">
            <Flyer joke={joke.text} visible={showFlyer} />
           
            <p>{joke.text}</p>
            <div className="mt-2 flex gap-3">
              <button onClick={() => speak(joke.text)} className="bg-sky-400 p-2 text-sm text-white rounded">
                🔊 Escuchar
              </button>
              <button className=' p-2 bg-green-400  rounded-md text-white text-sm' onClick={() => shareCanvas()}>🚀 Compartir​​​</button>
              <button onClick={() => removeJoke(joke.id)} className="bg-pink-700 p-2 text-sm text-white rounded">
                🗑 Eliminar
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}