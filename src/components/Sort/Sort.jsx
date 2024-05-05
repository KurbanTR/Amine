import { useState } from 'react'
import s from './Sort.module.css'
import expand from '../../assets/Expand_up-1.svg'
import calendar from '../../assets/calendar-empty.svg'
import icon from '../../assets/icons8.svg'

const Sort = () => {
  const [year, setYear] = useState(false)
  const [season, setSeason] = useState(true)
  const [genres, setGenres] = useState(true)
  const [formats, setFormats] = useState(true)
  const [airingStatus, setAiringStatus] = useState(false)

  const [winter, setWinter] = useState(false)
  const [sprint, setSprint] = useState(false)
  const [summer, setSummer] = useState(false)
  const [fall, setFall] = useState(false)

  const [action, setAction] = useState(false)
  const [adventure, setAdventyre] = useState(false)
  const [cars, setCars] = useState(false)
  const [comedy, setComedy] = useState(false)
  const [drama, setDrama] = useState(false)
  const [fantasy, setFantasy] = useState(false)
  const [horror, setHorror] = useState(false)
  const [mahouShoujo, setMahouShouji] = useState(false)
  const [mecha, setMecha] = useState(false)
  const [music, setMusic] = useState(false)
  const [mystery, setMystery] = useState(false)
  const [psychologica, setPsychologica] = useState(false)
  const [romance, setRomance] = useState(false)
  const [sciFi, setSciFi] = useState(false)
  const [sliceOfLife, setSliceOfLife] = useState(false)
  const [sports, setSports] = useState(false)
  const [supernatural, setSupernatural] = useState(false)
  const [thriller, setThriller] = useState(false)

  const [tv, setTv] = useState(false)
  const [tvShort, setTvShort] = useState(false)
  const [ova, setOva] = useState(false)
  const [ona, setOna] = useState(false)
  const [movie, setMovie] = useState(false)
  const [special, setSpecial] = useState(false)
  const [music1, setMusic1] = useState(false)

  const [releasing, setReleasing] = useState(false)
  const [notYetReleased, setNotYetReleased] = useState(false)
  const [finished, setFinished] = useState(false)
  const [cancelled, setCancelled] = useState(false)
  const [hiatus, setHiatus] = useState(false)

  return (
    <div className={s.sort}>
      <h1 className='text-3xl font-medium mb-8'>Catalog</h1>
      <div>
        <div onClick={()=>setYear(!year)} className='flex justify-between py-5 w-full items-center cursor-pointer border-b-2 border-b-white/10 mb-6 '>
          <span className='font-medium'>Year</span>
          <span><img className={`${year?'rotate-180':false} w-5 h-5 duration-300`} src={expand} alt=""/></span>          
        </div>
        <div className={`relative overflow-hidden duration-300 flex gap-3 items-start`} style={{ height: year ? 0 : '74px', visibility: year === 0 ? 'hidden' : 'visible'}}>
          <span className='h-[44px] flex items-center'><img className='w-8' src={calendar} alt="" /></span>
          <input className='outline-none border-2 focus:border-white/80 border-white/30 bg-def-black appearance-none w-[110px] px-3 py-2 rounded-xl' type="number" min="1960" max="2026" maxLength="4" step="1" placeholder="1960-2026" />
        </div>


        <div onClick={()=>setSeason(!season)} className='flex justify-between pb-5 w-full items-center cursor-pointer border-b-2 border-b-white/10 mb-6 '>
          <span className='font-medium'>Season</span>
          <span><img className={`${season?'rotate-180':false} w-5 h-5 duration-300`} src={expand} alt=""/></span>          
        </div>
        <div className={`relative overflow-hidden duration-300 flex flex-col gap-3 items-start`} style={{ height: season ? 0 : '162px', visibility: season === 0 ? 'hidden' : 'visible'}}>
          <div onClick={()=>{setWinter(!winter); setSprint(false); setSummer(false); setFall(false)}} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(winter?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={winter&&'text-white font-medium'}>Winter</span>
          </div>

          <div onClick={()=>{setSprint(!sprint); setWinter(false); setSummer(false); setFall(false)}} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(sprint?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={sprint&&'text-white font-medium'}>Sprint</span>
          </div>

          <div onClick={()=>{setSummer(!summer); setWinter(false); setSprint(false); setFall(false)}} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(summer?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={summer&&'text-white font-medium'}>Summer</span>
          </div>

          <div onClick={()=>{setFall(!fall); setWinter(false); setSprint(false); setSummer(false)}} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(fall?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={fall&&'text-white font-medium'}>Fall</span>
          </div>
        </div>


        <div onClick={()=>setGenres(!genres)} className='flex justify-between pb-5 w-full items-center cursor-pointer border-b-2 border-b-white/10 mb-6 '>
          <span className='font-medium'>Genres</span>
          <span><img className={`${genres?'rotate-180':false} w-5 h-5 duration-300`} src={expand} alt=""/></span>          
        </div>
        <div className={`relative overflow-hidden duration-300 flex flex-col gap-3 items-start`} style={{ height: genres ? 0 : '666px', visibility: genres === 0 ? 'hidden' : 'visible'}}>
          <div onClick={()=>setAction(!action)} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(action?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={action&&'text-white font-medium'}>Action</span>
          </div>

          <div onClick={()=>setAdventyre(!adventure)} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(adventure?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={adventure&&'text-white font-medium'}>Adventure</span>
          </div>

          <div onClick={()=>setCars(!cars)} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(cars?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={cars&&'text-white font-medium'}>Cars</span>
          </div>

          <div onClick={()=>setComedy(!comedy)} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(comedy?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={comedy&&'text-white font-medium'}>Comedy</span>
          </div>

          <div onClick={()=>setDrama(!drama)} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(drama?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={drama&&'text-white font-medium'}>rama</span>
          </div>

          <div onClick={()=>setFantasy(!fantasy)} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(fantasy?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={fantasy&&'text-white font-medium'}>Fantasy</span>
          </div>

          <div onClick={()=>setHorror(!horror)} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(horror?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={horror&&'text-white font-medium'}>Horror</span>
          </div>

          <div onClick={()=>setMahouShouji(!mahouShoujo)} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(mahouShoujo?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={mahouShoujo&&'text-white font-medium'}>MahouShoujo</span>
          </div>

          <div onClick={()=>setMecha(!mecha)} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(mecha?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={mecha&&'text-white font-medium'}>Mecha</span>
          </div>

          <div onClick={()=>setMusic(!music)} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(music?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={music&&'text-white font-medium'}>Music</span>
          </div>

          <div onClick={()=>setMystery(!mystery)} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(mystery?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={mystery&&'text-white font-medium'}>Mystery</span>
          </div>

          <div onClick={()=>setPsychologica(!psychologica)} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(psychologica?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={psychologica&&'text-white font-medium'}>Psychologica</span>
          </div>

          <div onClick={()=>setRomance(!romance)} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(romance?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={romance&&'text-white font-medium'}>Romance</span>
          </div>

          <div onClick={()=>setSciFi(!sciFi)} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(sciFi?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={sciFi&&'text-white font-medium'}>SciFi</span>
          </div>

          <div onClick={()=>setSliceOfLife(!sliceOfLife)} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(sliceOfLife?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={sliceOfLife&&'text-white font-medium'}>SliceOfLife</span>
          </div>

          <div onClick={()=>setSports(!sports)} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(sports?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={sports&&'text-white font-medium'}>Sports</span>
          </div>

          <div onClick={()=>setSupernatural(!supernatural)} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(supernatural?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={supernatural&&'text-white font-medium'}>Supernatural</span>
          </div>

          <div onClick={()=>setThriller(!thriller)} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(thriller?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={thriller&&'text-white font-medium'}>Thriller</span>
          </div>
        </div>


        <div onClick={()=>setFormats(!formats)} className='flex justify-between pb-5 w-full items-center cursor-pointer border-b-2 border-b-white/10 mb-6 '>
          <span className='font-medium'>Formats</span>
          <span><img className={`${formats?'rotate-180':false} w-5 h-5 duration-300`} src={expand} alt=""/></span>          
        </div>
        <div className={`relative overflow-hidden duration-300 flex flex-col gap-3 items-start`} style={{ height: formats ? 0 : '270px', visibility: formats === 0 ? 'hidden' : 'visible'}}>
          <div onClick={()=>{setTv(!tv); setTvShort(false); setOva(false); setOna(false); setMovie(false); setSpecial(false); setMusic1(false)}} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(tv?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={tv&&'text-white font-medium'}>TV</span>
          </div>

          <div onClick={()=>{setTvShort(!tvShort); setTv(false); setOva(false); setOna(false); setMovie(false); setSpecial(false); setMusic1(false)}} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(tvShort?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={tvShort&&'text-white font-medium'}>TV Short</span>
          </div>

          <div onClick={()=>{setOva(!ova); setTv(false); setTvShort(false); setOna(false); setMovie(false); setSpecial(false); setMusic1(false)}} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(ova?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={ova&&'text-white font-medium'}>OVA</span>
          </div>

          <div onClick={()=>{setOna(!ona); setTv(false); setTvShort(false); setOva(false); setMovie(false); setSpecial(false); setMusic1(false)}} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(ona?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={ona&&'text-white font-medium'}>ONA</span>
          </div>

          <div onClick={()=>{setMovie(!movie); setTv(false); setTvShort(false); setOva(false); setOna(false); setSpecial(false); setMusic1(false)}} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(movie?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={movie&&'text-white font-medium'}>Movie</span>
          </div>

          <div onClick={()=>{setSpecial(!special); setTv(false); setTvShort(false); setOva(false); setOna(false); setMovie(false); setMusic1(false)}} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(special?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={special&&'text-white font-medium'}>Special</span>
          </div>

          <div onClick={()=>{setMusic1(!music1); setTv(false); setTvShort(false); setOva(false); setOna(false); setMovie(false); setSpecial(false);}} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(music1?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={music1&&'text-white font-medium'}>Music</span>
          </div>
        </div>
        

        <div onClick={()=>setAiringStatus(!airingStatus)} className='flex justify-between pb-5 w-full items-center cursor-pointer border-b-2 border-b-white/10 mb-6 '>
          <span className='font-medium'>Airing Status</span>
          <span><img className={`${formats?'rotate-180':false} w-5 h-5 duration-300`} src={expand} alt=""/></span>          
        </div>
        <div className={`relative overflow-hidden duration-300 flex flex-col gap-3 items-start`} style={{ height: airingStatus ? 0 : '270px', visibility: airingStatus === 0 ? 'hidden' : 'visible'}}>
          <div onClick={()=>{setReleasing(!releasing); setNotYetReleased(false); setFinished(false); setCancelled(false); setHiatus(false)}} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(releasing?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={releasing&&'text-white font-medium'}>Releasing</span>
          </div>

          <div onClick={()=>{setNotYetReleased(!notYetReleased); setReleasing(false); setFinished(false); setCancelled(false); setHiatus(false)}} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(notYetReleased?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={notYetReleased&&'text-white font-medium'}>Not Yet Released</span>
          </div>

          <div onClick={()=>{setFinished(!finished); setReleasing(false); setNotYetReleased(false); setCancelled(false); setHiatus(false)}} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(finished?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={finished&&'text-white font-medium'}>Finished</span>
          </div>

          <div onClick={()=>{setCancelled(!cancelled); setReleasing(false); setNotYetReleased(false); setFinished(false); setHiatus(false)}} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(cancelled?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={cancelled&&'text-white font-medium'}>Cancelled</span>
          </div>

          <div onClick={()=>{setHiatus(!hiatus); setReleasing(false); setNotYetReleased(false); setFinished(false); setCancelled(false)}} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(hiatus?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={hiatus&&'text-white font-medium'}>Hiatus</span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Sort

