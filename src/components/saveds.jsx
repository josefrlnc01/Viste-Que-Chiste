import { useState } from "react"
import Favorites from "../pages/Favorites"
import Categories from "./Categories"
export default function PanelSaveds({menuToggle,menuCategories}){
    
   
   
    return(
        <>
        <aside className="saveds h-full min-w-dvw fixed top-0 mt-0 flex px-2 py-6 flex-col justify-between z-10 overflow-y-auto ">
          {menuToggle ? <Favorites/> : ''}
        {menuCategories ? <Categories/> : ''}
        </aside>
        </>
    )
}