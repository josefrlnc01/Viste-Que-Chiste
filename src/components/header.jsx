import menuIcon from '../assets/dataset.webp'
import categoriesIcon from '../assets/iconapss.webp'
import Categories from './Categories'
import PanelSaveds from './saveds'
import { useState } from 'react'
import { useBackToHome } from '../hooks/backToHome';
import {toast} from 'react-hot-toast'

export default function Header({menuToggle, setMenuToggle, menuCategories, setMenuCategories}){
    const [categoria, setCategoria] = useState('Generales')

    const ultimaCategoria = categoria
    const mostrarMenuCategorias = () => {
        if(!menuCategories){
            setMenuCategories(true)
        }
        else{

            setMenuCategories(null)
        }
    }

    const mostrarMenu = () => {
        if(!menuToggle){
            setMenuToggle(true)
        }
       else{
        setMenuToggle(null)
       }
    }


    useBackToHome({
        homePath : '/',
        doublePressToExit : true,
        onSecondPress: () => {
            toast.success('Pulsa otra vez para salir')
        },
        shouldCloseOverlay : ()  => {
            // Cierra paneles abiertos (favoritos o categorías) y consume el back
            let closed = false
            if (menuToggle) {
                setMenuToggle(null)
                closed = true
            }
            if (menuCategories) {
                setMenuCategories(null)
                closed = true
            }
            return closed
        }
    })

    return(
        <>
        <header className="min-w-dvw flex flex-row justify-between mt-6  min-h-4 ">
        {menuCategories ? '' :  <button type='button' className="btn-header ml-1 px-4 h-20 flex justify-center items-center  bg-blue-600 active:scale-95 transition-transform duration-150
         shadow-[0_8px_0_rgba(0,0,0,0.15)] hover:shadow-[0_10px_0_rgba(0,0,0,0.18)]
         border-2 border-black rounded-md z-20"><img alt='logo de menu' className='w-9' src={menuIcon} onClick={mostrarMenu} />​</button>}   
               
        {menuToggle || menuCategories ? <PanelSaveds
        menuCategories={menuCategories}
        menuToggle={menuToggle}/> : ''}
        {menuToggle ? '' :  <button type='button' className="btn-header mr-1 px-4 h-20 flex justify-center items-center  bg-blue-600 active:scale-95 transition-transform duration-150
         shadow-[0_8px_0_rgba(0,0,0,0.15)] hover:shadow-[0_10px_0_rgba(0,0,0,0.18)]
         border-2 border-black  rounded-md z-20"><img alt='logo de menu' className='w-9' src={categoriesIcon} onClick={mostrarMenuCategorias} />​</button>}
 

        
       
        </header>
        </>
    )
}