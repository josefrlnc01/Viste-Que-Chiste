import { useFavoritesStore } from "../features/favorites/favoritesStore";
import {speak} from '../utils/tts'
import { useState } from "react";
import html2canvas from "html2canvas";
import Flyer from "../components/flyer";
export default function Favorites(){
    const { jokes, removeJoke} = useFavoritesStore()
    const [showFlyer, setShowFlyer] = useState(false);
  
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
                  if (navigator.canShare && navigator.canShare({ files: [file] })) {
                      navigator.share({
                          title: 'Nuevo Chiste del dia',
                          text: '😂 VISTE QUE CHISTE 😂',
                          files: [file]
                      }).catch((error) => {
                          console.error("Error sharing file:", error);
                          downloadImage(b, file.name);
                      });
                  } else {
                      downloadImage(b, file.name);
                  }
                  resolve();
              }, 'image/png', 1.0);
          });
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


  return (
   
    <div className="max-w-xl mx-auto mt-14 py-8 min-h-screen ">
       
      <h2 className="text-2xl font-bold mb-4 text-center text-green-400 bg-white opacity-75 p-3 rounded-md">MIS CHISTES FAVORITOS 🤩​</h2>
      {jokes.length === 0 ? (
        <p className="text-green-500 text-center">Aun tienes chistes favoritos 🧐</p>
      ) : (
        jokes.map((joke) => (
          
          <div key={joke.id} className="card bg-gray-100 p-4 mb-3 rounded-md shadow w-5/6 mx-auto">
            <Flyer joke={joke.text} visible={showFlyer} />
            <p>{joke.text}</p>
            <div className="mt-2 flex gap-3">
              <button onClick={() => speak(joke.text)} className="bg-sky-400 p-2 text-white rounded">
                🔊 Escuchar
              </button>
              <button className=' p-2 bg-green-400  rounded-md text-white' onClick={() => shareCanvas()}>🚀 Compartir​​​</button>
              <button onClick={() => removeJoke(joke.id)} className="bg-pink-700 p-2 text-white rounded">
                🗑 Eliminar
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}