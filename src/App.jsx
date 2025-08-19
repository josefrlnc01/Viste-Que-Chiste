import './index.css' 
import Jokes from "./components/jokes";
import Header from './components/header';
import PanelSaveds from './components/saveds';
import { useState } from 'react';
import Resolveds from './components/jokes';
import Flyer from './components/flyer';
import { Toaster, toast } from 'react-hot-toast';

// Backup jokes in case the model fails



let savedAtLocal = localStorage.getItem('savedThemes', '')

export default function App() {
    const [menuToggle, setMenuToggle] = useState(false)
    const [readyForCanvas, setReadyForCanvas] = useState(null);
    const [saved, setSaved] = useState('')
    
    // Set background image
    const appStyle = {
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/back.webp)`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100%',
        position: 'relative'
    };
    const [menuCategories, setMenuCategories] = useState(null)

   
  

    return (
        <div style={appStyle}>
            <>
                <Header
                    menuToggle={menuToggle}
                    setMenuToggle={setMenuToggle}
                    menuCategories={menuCategories}
                    setMenuCategories={setMenuCategories}
                />
                {readyForCanvas && (
                    <Flyer 
                        joke={saved} 
                        readyForCanvass={readyForCanvas} 
                        setReadyForCanvas={setReadyForCanvas} 
                    />
                )}
                <Jokes setReadyForCanvas={setReadyForCanvas} />
                <Toaster position='bottom-center'/>
            </>
        </div>
    );
}