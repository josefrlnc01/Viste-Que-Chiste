import categoriesIcon from '../assets/iconapss.webp';

export default function HeaderCategories({ setMenuCategories }) {
    const handleCloseCategories = () => {
        setMenuCategories(false);
    };

    return (
        <header className="bg-gradient-to-br from-violet-500 to-purple-600 py-8 px-4 pb-5 relative overflow-hidden h-36">
            <div className='relative min-w-1/2 w-full mx-auto flex justify-end'>
                <button
                    type='button'
                    className="w-12 h-12 bg-white/15 border-none rounded-2xl text-white flex items-center justify-center cursor-pointer transition-all duration-300 backdrop-blur-lg shadow-md relative overflow-hidden hover:bg-white/25 hover:-translate-y-1 hover:shadow-lg active:-translate-y-0"
                    onClick={handleCloseCategories}
                    aria-label="Cerrar categorías"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div className='w-full mx-auto text-center'>
                <p className='text-white font-bold text-2xl'>Categorías</p>
                <p className='text-white/90 font-light mt-1.5'>Elige tu categoría favorita</p>
            </div>
        </header>
    );
}
