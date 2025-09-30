
import categoriesIcon from '../assets/iconapss.webp'


export default function HeaderSaveds({ menuToggle, setMenuToggle }) {
    const handleCloseSaveds = () => {
        setMenuToggle(false);
    }
    return (

        <header className="bg-gradient-to-br from-emerald-500 to-teal-600 py-8 px-4 pb-5 relative overflow-hidden h-36">
            {/* Botón del menú principal */}
            <div className='relative  w-full   flex justify-end'>
                <button
                    type='button'
                    className="w-12 h-12 bg-white/15 border-none rounded-2xl text-white flex items-center justify-center cursor-pointer transition-all duration-300 backdrop-blur-lg shadow-md relative overflow-hidden hover:bg-white/25 hover:-translate-y-1 hover:shadow-lg active:-translate-y-0"
                    onClick={handleCloseSaveds}
                    aria-label="Cerrar categorías"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div className='w-full mx-auto flex flex-col justify-between'>


                <p className='font-bold text-center text-2xl text-white'>Chistes guardados</p>
                <span className='font-light text-center text-white text-sm mt-1.5'>Busca tus favoritos</span>

            </div>
        </header>

    )
}
