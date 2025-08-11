import menuIcon from '../assets/dataset.webp'
import categoriesIcon from '../assets/iconapss.webp'
import Categories from './Categories'
import PanelSaveds from './saveds'
import { useState } from 'react'
export default function Header({menuToggle, setMenuToggle, menuCategories, setMenuCategories}){
    const [categoria, setCategoria] = useState('Generales')

    const ultimaCategoria = categoria
    const mostrarMenuCategorias = () => {
        console.log(menuCategories)
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
    return(
        <>
        <header className="min-w-dvw flex flex-row justify-between pt-2  min-h-4 ">
        {menuCategories ? '' :  <button type='button' className="btn-header ml-1 px-4 h-20 flex justify-center items-center opacity-95  bg-blue-500  rounded-md z-20"><img alt='logo de menu' className='w-9' src={menuIcon} onClick={mostrarMenu} />​</button>}   
            
        {menuToggle || menuCategories ? <PanelSaveds
        menuCategories={menuCategories}
        menuToggle={menuToggle}/> : ''}
        {menuCategories ? '' :  <button type='button' className="btn-header mr-1 px-4 h-20 flex justify-center items-center opacity-95  bg-blue-500  rounded-md z-20"><img alt='logo de menu' className='w-9' src={menuIcon} onClick={mostrarMenu} />​</button>}   

        
       
        </header>
        </>
    )
}