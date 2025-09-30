
import { useEffect, useState } from 'react'
import { useBackToHome } from '../hooks/backToHome';
import { toast } from 'react-hot-toast'
import HeaderCategories from './HeaderCategories'
import HeaderNormal from './HeaderNormal'
import HeaderSaveds from './HeaderSaveds'

export default function Header({ menuToggle, setMenuToggle, menuCategories, setMenuCategories, chisteId, setChisteId}) {
   
   
    
    
    

    useBackToHome({
        homePath: '/',
        doublePressToExit: true,
        onSecondPress: () => {
            toast.success('Pulsa otra vez para salir')
        },
        shouldCloseOverlay: () => {
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

    const renderHeader = () => {
        if (menuCategories) {
            return <HeaderCategories setMenuCategories={setMenuCategories}  />;
        } else if (menuToggle) {
            return <HeaderSaveds menuToggle={menuToggle} setMenuToggle={setMenuToggle} />;
        } else {
            return (
                <HeaderNormal
                    chisteId={chisteId}
                    setChisteId={setChisteId}
                    menuCategories={menuCategories}
                    setMenuCategories={setMenuCategories}
                    setMenuToggle={setMenuToggle}
                    menuToggle={menuToggle}
                    
                />
            );
        }
    };

    return (
        <>
            {renderHeader()}
        </>
    )
}