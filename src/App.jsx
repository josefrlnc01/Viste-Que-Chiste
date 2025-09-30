import './index.css' 
import Jokes from "./components/jokes";
import Header from './components/header';

import { useState } from 'react';
import Resolveds from './components/jokes';
import Flyer from './components/flyer';
import { Toaster, toast } from 'react-hot-toast';
import PanelSaveds from './components/Saveds';

// Backup jokes in case the model fails

// Backup jokes in case the model fails




export default function App() {
    const [menuToggle, setMenuToggle] = useState(false)
    const [readyForCanvas, setReadyForCanvas] = useState(null);
    const [saved, setSaved] = useState('')
    const [menuCategories, setMenuCategories] = useState(null)
    const [chisteId, setChisteId] = useState(null)

    

 return (
  <>
  <Header
    menuToggle={menuToggle}
    setMenuToggle={setMenuToggle}
    menuCategories={menuCategories}
    setMenuCategories={setMenuCategories}
    chisteId={chisteId}
    setChisteId={setChisteId}
    
  />
    {(menuToggle || menuCategories) && (
                        <PanelSaveds
                            menuCategories={menuCategories}
                            menuToggle={menuToggle}
                            mostrarChisteAleatorio={window.mostrarChisteAleatorio}
                            
                        />
                    )}
  
  <Jokes
    chisteId={chisteId}
    setChisteId={setChisteId}
    setReadyForCanvas={setReadyForCanvas}
    mostrarChisteAleatorio={(fn) => { window.mostrarChisteAleatorio = fn; }}
    
  />
  <Toaster position='bottom-center'/>
  </>
 )
}