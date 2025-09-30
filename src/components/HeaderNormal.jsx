import menuIcon from '../assets/dataset.webp'
import categoriesIcon from '../assets/iconapss.webp'


export default function HeaderNormal({menuCategories, setMenuCategories, menuToggle, setMenuToggle, chisteId}) {
    
     const actualCategory = localStorage.getItem('categoria')

   
    const mostrarMenu = () => {
        // Si el menú principal ya está abierto, lo cierra
        // Si está cerrado, cierra el otro menú (si está abierto) y abre el principal
        setMenuToggle(prev => !prev);
        if (menuCategories) {
            setMenuCategories(false);
        }
    }

    const mostrarMenuCategorias = () => {
        // Si el menú de categorías ya está abierto, lo cierra
        // Si está cerrado, cierra el otro menú (si está abierto) y abre el de categorías
        setMenuCategories(prev => !prev);
        if (menuToggle) {
            setMenuToggle(false);
        }
    }


  return (
     <header className="h-36 bg-gradient-to-br flex flex-col justify-between from-sky-400 to-cyan-400 py-8 px-4 pb-5 relative overflow-hidden">
                {/* Botón del menú principal */}
                <div className='relative min-w-1/2 w-full mx-auto flex justify-between'>
                    <button
                        type='button'
                        className={`w-12 h-12 bg-white/15 border-none rounded-2xl text-white flex items-center justify-center cursor-pointer transition-all duration-300 backdrop-blur-lg shadow-md relative overflow-hidden hover:bg-white/25 hover:-translate-y-1 hover:shadow-lg active:-translate-y-0 ${menuCategories ? 'hidden' : ''}`}
                        onClick={mostrarMenu}
                    >
                        <img alt='logo de menu' className='w-9' src={menuIcon} />
                    </button>

                   

                    {/* Botón de categorías */}
                    <button
                        type='button'
                        className={`w-12 h-12 bg-white/15 border-none rounded-2xl text-white flex items-center justify-center cursor-pointer transition-all duration-300 backdrop-blur-lg shadow-md relative overflow-hidden hover:bg-white/25 hover:-translate-y-1 hover:shadow-lg active:-translate-y-0 ${menuToggle ? 'hidden' : ''}`}
                        onClick={mostrarMenuCategorias}
                    >
                        <img alt='logo de categorías' className='w-9' src={categoriesIcon} />
                    </button>
                </div>
                <div className='w-full mx-auto flex justify-between'>
                <div className='inline-block  mx-auto bg-white/90 text-blue-400 px-4 py-2 rounded-full font-semibold text-sm backdrop-blur-lg'>

                    <p className='text-blue-300  font-bold'>Categoría: {actualCategory}</p>
                </div>
                <span className='absolute bottom-4 right-5 bg-white/90 text-blue-400 px-2 py-1 rounded-lg text-xs font-semibold'>
                    {String(chisteId).includes('_') ? String(chisteId).split('_')[1] : chisteId} 
                </span>
                            </div>
            </header>
  )
}
