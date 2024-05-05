import { useEffect, useMemo, useState } from 'react'
import s from './Sort.module.css'
import expand from '../../assets/Expand_up-1.svg'
import calendar from '../../assets/calendar-empty.svg'
import icon from '../../assets/icons8.svg'
import { useDispatch } from 'react-redux'
import {animeApi} from '../../api/animeApi'
import {setAnimes} from '../../store/animeSlice'

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

  const [tv, setTv] = useState(false)
  const [tvShort, setTvShort] = useState(false)
  const [ova, setOva] = useState(false)
  const [ona, setOna] = useState(false)
  const [movie, setMovie] = useState(false)
  const [special, setSpecial] = useState(false)
  const [music1, setMusic1] = useState(false)

  const [airing, setAiring] = useState(false)
  const [complete, setComplete] = useState(false)
  const [upcoming, setUpcoming] = useState(false)

  const dispatch = useDispatch();

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
    survival && '76',
  ]
    .filter(Boolean)
    .join(','),
  type: [
    tv ? 'tv' : '',
    ova && 'ova',
    ona && 'ona',
    movie && 'movie',
    special && 'special',
    music1 && 'music'
  ]
    .filter(Boolean)
    .join(','),
  status: [
    airing ? 'airing' : '',
    complete && 'complete',
    upcoming && 'upcoming'
  ]
    .filter(Boolean)
    .join(','),
  start_date: date
}), [mainDate, action, adventure, school, comedy, drama, fantasy, horror, mahouShoujo, mecha, music, mystery, psychological, romance, sciFi, sliceOfLife, sports, supernatural, survival, tv, ova, ona, movie, special, music1, airing, complete, upcoming]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await animeApi.getSerch(filters);
      dispatch(setAnimes(data.data.data));
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();

}, [filters, dispatch]);

  

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


        {/* <div onClick={()=>setSeason(!season)} className='flex justify-between pb-5 w-full items-center cursor-pointer border-b-2 border-b-white/10 mb-6 '>
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
        </div> */}


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
        

        <div onClick={()=>setStatus(!status)} className='flex justify-between pb-5 w-full items-center cursor-pointer border-b-2 border-b-white/10 mb-6 '>
          <span className='font-medium'>Status</span>
          <span><img className={`${formats?'rotate-180':false} w-5 h-5 duration-300`} src={expand} alt=""/></span>          
        </div>
        <div className={`relative overflow-hidden duration-300 flex flex-col gap-3 items-start`} style={{ height: status ? 0 : '270px', visibility: status === 0 ? 'hidden' : 'visible'}}>
          <div onClick={()=>{setAiring(!airing); setComplete(false); setUpcoming(false)}} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(airing?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={airing&&'text-white font-medium'}>Airing</span>
          </div>

          <div onClick={()=>{setComplete(!complete); setAiring(false); setUpcoming(false)}} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
            <div className={(complete?'bg-white':'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
              <img src={icon} alt="" />
            </div>
            <span className={complete&&'text-white font-medium'}>Complete</span>
          </div>

          <div onClick={()=>{setUpcoming(!upcoming); setAiring(false); setComplete(false)}} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
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

