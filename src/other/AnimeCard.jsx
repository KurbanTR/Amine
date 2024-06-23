import { useState } from 'react'
import { Link } from 'react-router-dom'

const AnimeCard = ({ info, type }) => {
  const [characterTitle, setCharacterTitle] = useState(info?.name?.full)
  const [characterImage, setCharacterImage] = useState(info?.image)
  const [characterRole, setCharacterRole] = useState(info?.role)

  return (
    <Link 
      to={`/anime/${info?.id ? info?.id : info?.animeId}`} 
      className=""
      title={`${(info?.title?.english ? info?.title?.english : info?.title?.romaji)} ${info?.genres ? `| ${info?.genres}` : ""} ${info?.releaseDate ? `| ${info?.releaseDate}` : ""}`}
    >
      <div
        style={{ backgroundImage: `url(${info?.image})`, backgroundColor: info?.color }}
        className="duration-200 cursor-pointer p-3 500res:p-2 700res:w-[133px] 700res:h-[196px] 500res:w-[102px] 500res:h-[150px] w-[190px] h-[280px] rounded-xl bg-center bg-cover bg-no-repeat relative -z-10"
      >
        <div className="bg-gradient-to-t from-black/70 from-0% to-transparent to-60% absolute top-0 left-0 w-full h-full rounded-xl -z-10"></div>
        <div className="w-full h-full flex flex-col justify-end items-start text-[14px] 700res:text-[11px] 500res:text-[8px] text-white/80 gap-[5px]">
          <span className="line-clamp-1 overflow-hidden text-[15px] 700res:text-[12px] 500res:text-[10px] text-white">
            {info?.title?.english ? info?.title?.english : info?.title?.romaji}
          </span>
          <span>
            {type === "recomm" && (
              <p>
                {info?.type.replace("_", " ")}, {info?.episodes} episodes
              </p>
            )}
            {type === "anime" && (
              <p>
                {info?.releaseDate ? info?.releaseDate + ", " : ""} {info?.genres[0]}
              </p>
            )}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default AnimeCard
