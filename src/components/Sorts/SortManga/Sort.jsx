import { useEffect, useMemo, useState } from 'react'
import s from './Sort.module.css'
import expand from '../../../assets/Expand_up-1.svg'
// import calendar from '../../assets/calendar-empty.svg'
import icon from '../../../assets/icons8.svg'
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;

const ToggleSection = ({ title, isOpen, onClick }) => {
  return (
    <div onClick={onClick} className='flex justify-between py-5 w-full items-center cursor-pointer border-b-2 border-b-white/10 mb-6 '>
      <span className='font-bold'>{title}</span>
      <span><img className={`${isOpen ? 'rotate-180' : ''} w-5 h-5 duration-300`} src={expand} alt="" /></span>
    </div>
  );
};


const ToggleButton = ({ label, isActive, onClick }) => {
  return (
    <div onClick={onClick} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
      <div className={(isActive ? 'bg-white' : 'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
        <img src={icon} alt="" />
      </div>
      <span className={isActive && 'text-white font-medium'}>{label}</span>
    </div>
  );
};


const Sort = () => {
  const [year, setYear] = useState(false)
  const [genres, setGenres] = useState(true)
  const [formats, setFormats] = useState(true)
  const [status, setStatus] = useState(false)

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const [action, setAction] = useState(false)
  const [adventure, setAdventure] = useState(false)
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
    start_date: startDate,
    end_date: endDate,
  }), [startDate, endDate, action, adventure, school, comedy, drama, fantasy, horror, mahouShoujo, mecha, music, mystery, psychological, romance, sciFi, sliceOfLife, sports, supernatural, survival, manga, novel, lightNovel, oneshot, doujin, manhwa, manhua, publishing, complete, hiatus, discontinued, upcoming]);

  useEffect(() => {
    localStorage.setItem('filtersManga', JSON.stringify(filters))
  }, [filters]);

  const onHandleChange = (date)=>{
    setStartDate(`${date[0].$y.toString().padStart(2, '0')}-${(date[0].$M + 1).toString().padStart(2, '0')}-${date[0].$D.toString().padStart(2, '0')}`)
    setEndDate(`${date[1].$y.toString().padStart(2, '0')}-${(date[1].$M + 1).toString().padStart(2, '0')}-${date[1].$D.toString().padStart(2, '0')}`)
  }

  return (
    <div className={s.sort}>
      <h1 className='text-3xl mb-8 font-bold'>Catalog</h1>
      <div>
        <ToggleSection title="Year" isOpen={year} onClick={() => setYear(!year)} />
        <div className={`relative overflow-hidden duration-300 flex gap-3 items-start font-bold`} style={{ height: year ? 0 : '74px', visibility: year === 0 ? 'hidden' : 'visible'}}>
          {/* <span className='h-[44px] flex items-center cursor-pointer'><img className='w-8' src={calendar} alt="" /></span>
          <input value={date} onChange={e => setDate(e.target.value)} className='outline-none border-2 focus:border-white/80 border-white/30 bg-def-black appearance-none w-[110px] px-3 py-2 rounded-xl' type="text" min="1960" max="2026" step="1" placeholder="2007-12-17"/> */}
          <Space direction="vertical" size={12}>
            <RangePicker
              onChange={onHandleChange}
              id={{
                start: 'startInput',
                end: 'endInput',
              }}
            />
          </Space>
        </div>

        <ToggleSection title="Genres" isOpen={genres} onClick={() => setGenres(!genres)} />
        <div className={`relative overflow-hidden duration-300 flex flex-col gap-3 items-start font-bold`} style={{ height: genres ? 0 : '666px', visibility: genres === 0 ? 'hidden' : 'visible'}}>
        <ToggleButton label="Action" isActive={action} onClick={() => setAction(!action)} />
          <ToggleButton label="Adventure" isActive={adventure} onClick={() => setAdventure(!adventure)} />
          <ToggleButton label="School" isActive={school} onClick={() => setSchool(!school)} />
          <ToggleButton label="Comedy" isActive={comedy} onClick={() => setComedy(!comedy)} />
          <ToggleButton label="Drama" isActive={drama} onClick={() => setDrama(!drama)} />
          <ToggleButton label="Fantasy" isActive={fantasy} onClick={() => setFantasy(!fantasy)} />
          <ToggleButton label="Horror" isActive={horror} onClick={() => setHorror(!horror)} />
          <ToggleButton label="MahouShoujo" isActive={mahouShoujo} onClick={() => setMahouShouji(!mahouShoujo)} />
          <ToggleButton label="Mecha" isActive={mecha} onClick={() => setMecha(!mecha)} />
          <ToggleButton label="Music" isActive={music} onClick={() => setMusic(!music)} />
          <ToggleButton label="Mystery" isActive={mystery} onClick={() => setMystery(!mystery)} />
          <ToggleButton label="Psychological" isActive={psychological} onClick={() => setPsychological(!psychological)} />
          <ToggleButton label="Romance" isActive={romance} onClick={() => setRomance(!romance)} />
          <ToggleButton label="SliceOfLife" isActive={sliceOfLife} onClick={() => setSliceOfLife(!sliceOfLife)} />
          <ToggleButton label="Sports" isActive={sports} onClick={() => setSports(!sports)} />
          <ToggleButton label="Supernatural" isActive={supernatural} onClick={() => setSupernatural(!supernatural)} />
          <ToggleButton label="Survival" isActive={survival} onClick={() => setSurvival(!survival)} />
          <ToggleButton label="SciFi" isActive={sciFi} onClick={() => setSciFi(!sciFi)} />
        </div>

        <ToggleSection title="Formats" isOpen={formats} onClick={() => setFormats(!formats)} />
        <div className={`relative overflow-hidden duration-300 flex flex-col gap-3 items-start font-bold`} style={{ height: formats ? 0 : '270px', visibility: formats === 0 ? 'hidden' : 'visible'}}>
          <ToggleButton label="Manga" isActive={manga} onClick={() => setManga(!manga)} />
          <ToggleButton label="Novel" isActive={novel} onClick={() => setNovel(!novel)} />
          <ToggleButton label="LightNovel" isActive={lightNovel} onClick={() => setLightNovel(!lightNovel)} />
          <ToggleButton label="OneShot" isActive={oneshot} onClick={() => setOneshot(!oneshot)} />
          <ToggleButton label="Doujin" isActive={doujin} onClick={() => setDoujin(!doujin)} />
          <ToggleButton label="Manhwa" isActive={manhwa} onClick={() => setManhwa(!manhwa)} />
          <ToggleButton label="Manhua" isActive={manhua} onClick={() => setManhua(!manhua)} />         
        </div>

        <ToggleSection title="Status" isOpen={status} onClick={() => setStatus(!status)} />
        <div className={`relative overflow-hidden duration-300 flex flex-col gap-3 items-start font-bold`} style={{ height: status ? 0 : '270px', visibility: status === 0 ? 'hidden' : 'visible'}}>
          <ToggleButton label="Publishing" isActive={publishing} onClick={() => setPublishing(!publishing)} />
          <ToggleButton label="Complete" isActive={complete} onClick={() => setComplete(!complete)} />
          <ToggleButton label="Hiatus" isActive={hiatus} onClick={() => setHiatus(!hiatus)} />
          <ToggleButton label="Discontinued" isActive={discontinued} onClick={() => setDiscontinued(!discontinued)} />
          <ToggleButton label="Upcoming" isActive={upcoming} onClick={() => setUpcoming(!upcoming)} /> 
        </div>
      </div>
    </div>
  )
}

export default Sort