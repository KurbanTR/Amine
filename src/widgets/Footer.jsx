import { Link } from "react-router-dom"
import anime from '../assets/anime.svg'
import animeActime from '../assets/anime (2) 1.svg'
import manga from '../assets/comic.svg'
import mangaActime from '../assets/comic (2) 1.svg'
import characters from '../assets/boy.svg'
import charactersActime from '../assets/boy (2) 1.svg'
import { useState } from "react"

const Footer = () => {
  const [active, setActive] = useState()
  const animeIcon = active == 'anime' ? animeActime : anime
  const mangaIcon = active == 'manga' ? mangaActime : manga
  const charactersIcon = active == 'characters' ? charactersActime : characters
  return (
    <footer className="hidden 850res:block fixed bottom-0 w-full z-10">
        <div className="p-4 text-[10px] font-bold bg-[#1c1c1c]">
            <nav className='flex justify-around'>  
              <Link to='/anime' className='flex items-center flex-col gap-1'>
                <img className='w-10 600res:w-9 400res:w-8' src={animeIcon} alt="anime" onClick={()=>setActive('anime')}/>
                <div className={`${active == 'anime' && 'text-red-500'} cursor-pointer hover:text-red-500`}>Anime</div>
              </Link>
              <Link to='/manga' className='flex items-center flex-col gap-1'>
                <img className='w-10 600res:w-9 400res:w-8' src={mangaIcon} alt="manga" onClick={()=>setActive('manga')}/>
                <div className={`${active == 'manga' && 'text-red-500'} cursor-pointer hover:text-red-500`}>Manga</div>
              </Link>
              <Link to='/characters' className='flex items-center flex-col gap-1'>
                <img className='w-10 600res:w-9 400res:w-8' src={charactersIcon} alt="characters" onClick={()=>setActive('characters')}/>
                <div className={`${active == 'characters' && 'text-red-500'} cursor-pointer hover:text-red-500`}>Character</div>
              </Link>
            </nav>
        </div>
    </footer>
  )
}

export default Footer
