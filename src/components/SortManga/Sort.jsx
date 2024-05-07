import { useEffect, useMemo, useState } from 'react'
import s from './Sort.module.css'
import expand from '../../assets/Expand_up-1.svg'
import calendar from '../../assets/calendar-empty.svg'
import icon from '../../assets/icons8.svg'

const Sort = () => {
  const [year, setYear] = useState(false)
  const [genres, setGenres] = useState(true)
  const [formats, setFormats] = useState(true)
  const [status, setStatus] = useState(false)

  const [date, setDate] = useState('')
  const [mainDate, setMainDate] = useState('')

  const [action, setAction] = useState(false)
  const [adventure, setAdventyre] = useState(false)
  const [school, setSchool] = useState(false)
  const [comedy, setComedy] = useState(false)
  const [drama, setDrama] = useState(false)
  const [fantasy, setFantasy] = useState(false)
  const [horror, setHorror] = useState(false)
  const [mahouShoujo, setMahouShouji] = useState(false)
  const [mecha, setMecha] = useState(false)
  const [music, setMusic] = useState(false)
  const [mystery, setMystery] = useState(false)
  const [psychological, setPsychological] = useState(false)
  const [romance, setRomance] = useState(false)
  const [sciFi, setSciFi] = useState(false)
  const [sliceOfLife, setSliceOfLife] = useState(false)
  const [sports, setSports] = useState(false)
  const [supernatural, setSupernatural] = useState(false)
  const [survival, setSurvival] = useState(false)

  const [manga, setManga] = useState(false)
  const [novel, setNovel] = useState(false)
  const [lightNovel, setLightNovel] = useState(false)
  const [oneshot, setOneshot] = useState(false)
  const [doujin, setDoujin] = useState(false)
  const [manhwa, setManhwa] = useState(false)
  const [manhua, setManhua] = useState(false)

  const [publishing, setPublishing] = useState(false)
  const [complete, setComplete] = useState(false)
  const [hiatus, setHiatus] = useState(false)
  const [discontinued, setDiscontinued] = useState(false)
  const [upcoming, setUpcoming] = useState(false)

  const filters = useMemo(() => ({
    genres: [
      action ? '1' : '',
      adventure && '2',
      school && '23',
      comedy && '4',
      drama && '8',
      fantasy && '10',
      horror && '14',
      mahouShoujo && '66',
      mecha && '18',
      music && '19',
      mystery && '7',
      psychological && '40',
      romance && '22',
      sciFi && '24',
      sliceOfLife && '36',
      sports && '30',
      supernatural && '37',
      survival && '77',
    ]
      .filter(Boolean)
      .join(','),
    type: [
      manga ? 'manga' : '',
      novel && 'novel',
      lightNovel && 'lightNovel',
      oneshot && 'oneshot',
      doujin && 'doujin',
      manhwa && 'manhwa',
      manhua && 'manhua',
    ]
      .filter(Boolean)
      .join(','),
    status: [
      publishing ? 'publishing' : '',
      complete && 'complete',
      hiatus && 'hiatus',
      discontinued && 'discontinued',
      upcoming && 'upcoming'
    ]
      .filter(Boolean)
      .join(','),
    start_date: date
  }), [mainDate, action, adventure, school, comedy, drama, fantasy, horror, mahouShoujo, mecha, music, mystery, psychological, romance, sciFi, sliceOfLife, sports, supernatural, survival, manga, novel, lightNovel, oneshot, doujin, manhwa, manhua, publishing, complete, hiatus, discontinued, upcoming]);

  useEffect(() => {
    localStorage.setItem('filtersManga', JSON.stringify(filters))
  }, [filters]);

  

  return (
    <div className={s.sort}>
      <h1 className='text-3xl font-medium mb-8'>Catalog</h1>
      <div>
        <div onClick={()=>setYear(!year)} className='flex justify-between py-5 w-full items-center cursor-pointer border-b-2 border-b-white/10 mb-6 '>
          <span className='font-medium'>Year</span>
          <span><img className={`${year?'rotate-180':false} w-5 h-5 duration-300`} src={expand} alt=""/></span>          
        </div>
        <div className={`relative overflow-hidden duration-300 flex gap-3 items-start`} style={{ height: year ? 0 : '74px', visibility: year === 0 ? 'hidden' : 'visible'}}>
          <span className='h-[44px] flex items-center cursor-pointer'><img onClick={()=>setMainDate(date)} className='w-8' src={calendar} alt="" /></span>
          <input value={date} onChange={e => setDate(e.target.value)} className='outline-none border-2 focus:border-white/80 border-white/30 bg-def-black appearance-none w-[110px] px-3 py-2 rounded-xl' type="text" min="1960" max="2026" step="1" placeholder="2007-12-17"/>
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

          <div onClick={()=>setSchool(!school)} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(school?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={school&&'text-white font-medium'}>School</span>
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
            <span className={drama&&'text-white font-medium'}>Drama</span>
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

          <div onClick={()=>setPsychological(!psychological)} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(psychological?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={psychological&&'text-white font-medium'}>Psychologica</span>
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

          <div onClick={()=>setSurvival(!survival)} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(survival?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={survival&&'text-white font-medium'}>Survival</span>
          </div>
        </div>


        <div onClick={()=>setFormats(!formats)} className='flex justify-between pb-5 w-full items-center cursor-pointer border-b-2 border-b-white/10 mb-6 '>
          <span className='font-medium'>Formats</span>
          <span><img className={`${formats?'rotate-180':false} w-5 h-5 duration-300`} src={expand} alt=""/></span>          
        </div>
        <div className={`relative overflow-hidden duration-300 flex flex-col gap-3 items-start`} style={{ height: formats ? 0 : '270px', visibility: formats === 0 ? 'hidden' : 'visible'}}>
          <div onClick={()=>{setManga(!manga); setNovel(false); setLightNovel(false); setOneshot(false); setDoujin(false); setManhwa(false); setManhua(false)}} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(manga?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={manga&&'text-white font-medium'}>Manga</span>
          </div>

          <div onClick={()=>{setNovel(!novel); setManga(false); setLightNovel(false); setOneshot(false); setDoujin(false); setManhwa(false); setManhua(false)}} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(novel?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={novel&&'text-white font-medium'}>Novel</span>
          </div>

          <div onClick={()=>{setLightNovel(!lightNovel); setNovel(false); setManga(false); setOneshot(false); setDoujin(false); setManhwa(false); setManhua(false)}} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(lightNovel?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={lightNovel&&'text-white font-medium'}>Light Novel</span>
          </div>

          <div onClick={()=>{setOneshot(!oneshot); setNovel(false); setLightNovel(false); setManga(false); setDoujin(false); setManhwa(false); setManhua(false)}} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(oneshot?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={oneshot&&'text-white font-medium'}>Oneshot</span>
          </div>

          <div onClick={()=>{setDoujin(!doujin); setNovel(false); setLightNovel(false); setOneshot(false); setManga(false); setManhwa(false); setManhua(false)}} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(doujin?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={doujin&&'text-white font-medium'}>Doujin</span>
          </div>

          <div onClick={()=>{setManhwa(!manhwa);  setNovel(false); setLightNovel(false); setOneshot(false); setDoujin(false); setManga(false); setManhua(false)}} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(manhwa?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={manhwa&&'text-white font-medium'}>Manhwa</span>
          </div>

          <div onClick={()=>{setManhua(!manhua); setNovel(false); setLightNovel(false); setOneshot(false); setDoujin(false); setManhwa(false); setManga(false)}} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(manhua?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={manhua&&'text-white font-medium'}>Manhua</span>
          </div>
        </div>
        

        <div onClick={()=>setStatus(!status)} className='flex justify-between pb-5 w-full items-center cursor-pointer border-b-2 border-b-white/10 mb-6 '>
          <span className='font-medium'>Status</span>
          <span><img className={`${formats?'rotate-180':false} w-5 h-5 duration-300`} src={expand} alt=""/></span>          
        </div>
        <div className={`relative overflow-hidden duration-300 flex flex-col gap-3 items-start`} style={{ height: status ? 0 : '270px', visibility: status === 0 ? 'hidden' : 'visible'}}>
          <div onClick={()=>{setPublishing(!publishing); setComplete(false); setUpcoming(false)}} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(publishing?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={publishing&&'text-white font-medium'}>Publishing</span>
          </div>

          <div onClick={()=>{setComplete(!complete); setPublishing(false); setHiatus(false); setDiscontinued(false); setUpcoming(false)}} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(complete?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={complete&&'text-white font-medium'}>Complete</span>
          </div>

          <div onClick={()=>{setHiatus(!hiatus); setPublishing(false); setComplete(false); setDiscontinued(false); setUpcoming(false)}} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(hiatus?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={hiatus&&'text-white font-medium'}>Hiatus</span>
          </div>

          <div onClick={()=>{setDiscontinued(!discontinued); setPublishing(false); setComplete(false); setHiatus(false); setUpcoming(false)}} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(discontinued?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={discontinued&&'text-white font-medium'}>Discontinued</span>
          </div>

          <div onClick={()=>{setUpcoming(!upcoming); setPublishing(false); setComplete(false); setHiatus(false); setDiscontinued(false)}} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
          <div className={(upcoming?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={upcoming&&'text-white font-medium'}>Upcoming</span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Sort

