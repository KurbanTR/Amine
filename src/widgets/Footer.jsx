import { Link } from "react-router-dom"


const Footer = () => {
  return (
    <footer className="hidden 650res:block fixed bottom-0 w-full z-10">
        <div className="p-4 text-3xl 600res:text-2xl 400res:text-xl font-bold bg-[#1c1c1c]">
            <nav className='flex justify-around'>      
                <Link to='/anime' className='cursor-pointer hover:text-red-500'>Anime</Link>
                <Link to='/manga' className='cursor-pointer hover:text-red-500'>Manga</Link>
                <Link to='/characters' className='cursor-pointer hover:text-red-500'>Character</Link>
            </nav>
        </div>
    </footer>
  )
}

export default Footer
