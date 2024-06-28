import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import AnimeCard from '../../other/AnimeCard'
import ErrorPage from './ErrorPage'
import Preloader from '../../other/Preloader'
// import CatalogCheckboxesComponent from '../Components/AdvancedSearchPage/CatalogSheckboxesComponent'
// import CatologYearSelectComponent from '../Components/AdvancedSearchPage/CatologYearSelectComponent'

const SearchPage = () => {

  const [yearOpened, setYearOpened] = useState(true)
  const [seasonOpened, setSeasonOpened] = useState(false)
  const [genresOpened, setGenresOpened] = useState(false)
  const [formatsOpened, setFormatsOpened] = useState(false)
  const [airingStatusOpened, setAiringStatusOpened] = useState(true)
  const [sortOpened, setSortOpened] = useState(false)

  const [searchError, setSearchError] = useState(false)
  const [preloader, setPreloader] = useState(true)

  const [seasons, setSeasons] = useState([
    {title: "Winter", id: "WINTER"},
    {title: "Spring", id: "SPRING"},
    {title: "Summer", id: "SUMMER"},
    {title: "Fall", id: "FALL"},
  ])
  const [genres, setGenres] = useState([
    "Action", 
    "Adventure", 
    "Cars", 
    "Comedy", 
    "Drama", 
    "Fantasy", 
    "Horror", 
    "Mahou Shoujo", 
    "Mecha", 
    "Music", 
    "Mystery", 
    "Psychological", 
    "Romance", 
    "Sci-Fi", 
    "Slice of Life", 
    "Sports", 
    "Supernatural",
    "Thriller"
  ])
  const [formats, setFormats] = useState([
    {title: "TV", id: "TV"},
    {title: "TV Short", id: "TV_SHORT"},
    {title: "OVA", id: "OVA"},
    {title: "ONA", id: "ONA"},
    {title: "Movie", id: "MOVIE"},
    {title: "Special", id: "SPECIAL"},
    {title: "Music", id: "MUSIC"},
  ])
  const [airingStatus, setAiringStatus] = useState([
    {title: "Releasing", id: "RELEASING"},
    {title: "Not Yet Released", id: "NOT_YET_RELEASED"},
    {title: "Finished", id: "FINISHED"},
    {title: "Cancelled", id: "CANCELLED"},
    {title: "Hiatus", id: "HIATUS"},
  ])
  const [sort, setSort] = useState([
    {title: "Popularity", id: '["POPULARITY_DESC"]'},
    {title: "Newest", id: '["START_DATE_DESC","POPULARITY_DESC"]'},
    {title: "Rating", id: '["SCORE_DESC","POPULARITY_DESC"]'},
    {title: "Name (A-Z)", id: '["TITLE_ROMAJI","POPULARITY_DESC"]'},
    {title: "Name (Z-A)", id: '["TITLE_ROMAJI_DESC","POPULARITY_DESC"]'},
  ])

  const [selectedSeason, setSelectedSeason] = useState("")
  const [selectedGenres, setSelectedGenres] = useState([])
  const [selectedFormat, setSelectedFormat] = useState("")
  const [selectedAiringStatus, setSelectedAiringStatus] = useState("")
  const [selectedSort, setSelectedSort] = useState('["POPULARITY_DESC"]')
  const [yearValue, setYearValue] = useState("")
  const [searchValue, setSearchValue] = useState("")

  const [statusCanBeChanged, setStatusCanBeChanged] = useState(true)

  const [searchResult, setSearchResult] = useState(null)
  const [searchParams, setSearchParams] = useState({
    page: 1,
    perPage: 50,
    season: null,
    sort: '["POPULARITY_DESC"]',
    year: null,
    status: null,
    format: null,
  })

  const changeYear = (year, isValid) => {
    if(!isValid) return
    setSearchParams(prev => ({...prev, year: (Number(year) === 0 ? null : Number(year))}))
  }

  const changeSeason = (season) => {
    let newSeason = season;
    if(season === selectedSeason) newSeason = null
    setSearchParams(prev => ({...prev, season: newSeason}))
    setSelectedSeason(newSeason)
  }

  const changeGenres = (genre) => {
    let genresArrCopy = [...selectedGenres]

    if(genresArrCopy.includes(genre)) genresArrCopy = genresArrCopy.filter(item => item !== genre)
    else genresArrCopy.push(genre) 

    setSelectedGenres(genresArrCopy)
  }

  const changeFormat = (format) => {
    let newFormat = format;
    if(format === selectedFormat) newFormat = null
    setSearchParams(prev => ({...prev, format: newFormat}))
    setSelectedFormat(newFormat)
  }
  
  const changeAiringStatus = (status) => {
    setStatusCanBeChanged(false)
    let newStatus = status;
    if(status === selectedAiringStatus) newStatus = null
    setSearchParams(prev => ({...prev, status: newStatus}))
    setSelectedAiringStatus(newStatus)
  }

  const changeSort = (newSort) => {
    if(!selectedAiringStatus && newSort === sort[1].id && statusCanBeChanged) {
      setSearchParams(prev => ({...prev, status: 'RELEASING', sort: newSort}))
      setSelectedAiringStatus('RELEASING')
    }
    else {
      if(statusCanBeChanged) {
        setSearchParams(prev => ({...prev, status: null, sort: newSort}))
        setSelectedAiringStatus(null)  
      } else setSearchParams(prev => ({...prev, sort: newSort}))
    }
    setSelectedSort(newSort)
  }

  const fetchAnime = () => {
    setPreloader(true)
    setSearchError(false)
    let URL = `https://march-api1.vercel.app/meta/anilist/advanced-search`
    if(selectedGenres.length > 0 && searchValue) URL = `https://march-api1.vercel.app/meta/anilist/advanced-search?genres=[${selectedGenres.map(item => {return `"${item}"`})}]&query=${searchValue}`
    else if(selectedGenres.length > 0) URL = `https://march-api1.vercel.app/meta/anilist/advanced-search?genres=[${selectedGenres.map(item => {return `"${item}"`})}]`
    else if(searchValue) URL = `https://march-api1.vercel.app/meta/anilist/advanced-search?query=${searchValue}`
    axios.get(URL, {params: searchParams})
    .then(resp => {
      document.title = `Anime Catalog sorted by ${((sort.find(item => item.id === selectedSort)).title)} - 404NIME`
      setSearchResult(resp.data.results)
    })
    .catch(() => setSearchError(true))
    .finally(() => {
      setTimeout(() => {
        setPreloader(false)
      }, 300)
    })
  }

  const resetParams = () => {
    setSearchParams({
      page: 1,
      perPage: 50,
      season: null,
      sort: '["POPULARITY_DESC"]',
      year: null,
      status: null,
      format: null,
    })
    setSelectedFormat(null)
    setSelectedGenres([])
    setSelectedSeason(null)
    setSelectedAiringStatus(null)
    setSelectedSort('["POPULARITY_DESC"]')
    setYearValue("")
    setSearchValue("")
    setStatusCanBeChanged(true)
  }

  useEffect(() => {
    fetchAnime()
  }, [])

  return (
    <div className="w-[1440px] mx-auto 1480res:w-full 1480res:m-0 1480res:px-5">
      <div className="flex 900res:flex-col 900res:gap-6 gap-10 justify-between mt-24 900res:mt-10">
        <div className="w-full flex-shrink min-w-[200px]"> 
          <h2 className="text-3xl font-[550] mb-8">Catalog</h2>          
          <CatologYearSelectComponent setYearOpened={setYearOpened} yearOpened={yearOpened}
            setYearValue={setYearValue} changeYear={changeYear} yearValue={yearValue}/>
          <CatalogCheckboxesComponent setBoxesOpened={setSeasonOpened} boxesOpened={seasonOpened}
            componentHeight={162} mainTitle={"Season"} componentArray={seasons}
            selectedBoxes={selectedSeason} changeSelectedBoxes={changeSeason} selectedBoxesIsArray={false}/>
          <CatalogCheckboxesComponent setBoxesOpened={setGenresOpened} boxesOpened={genresOpened}
            componentHeight={666} mainTitle={"Genres"} componentArray={genres}
            selectedBoxes={selectedGenres} changeSelectedBoxes={changeGenres} selectedBoxesIsArray={true}/>
          <CatalogCheckboxesComponent setBoxesOpened={setFormatsOpened} boxesOpened={formatsOpened}
            componentHeight={270} mainTitle={"Formats"} componentArray={formats}
            selectedBoxes={selectedFormat} changeSelectedBoxes={changeFormat} selectedBoxesIsArray={false}/>
          <CatalogCheckboxesComponent setBoxesOpened={setAiringStatusOpened} boxesOpened={airingStatusOpened}
            componentHeight={198} mainTitle={"Airing Status"} componentArray={airingStatus}
            selectedBoxes={selectedAiringStatus} changeSelectedBoxes={changeAiringStatus} selectedBoxesIsArray={false}/>
        </div>
        <div className="flex-shrink-0">
          <div className="flex justify-between 600res:flex-wrap 600res:justify-center gap-5 w-full mb-8 [&>*]:flex-shrink-0">
            <div
              className="w-full !flex-shrink 650res:flex-shrink-0 ml-5 600res:ml-0 h-[52px] border-solid border-[2px] border-white/20 flex
                    p-3 rounded-xl bg-white/20
                    relative items-center duration-300
                    z-20"
            >
              <label className="flex mr-3" htmlFor={"input2"}>
                <span className="cursor-pointer">
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      className="fill-white/80 500res:fill-white"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10 0.5C4.75329 0.5 0.5 4.75329 0.5 10C0.5 15.2467 4.75329 19.5 10 19.5C12.082 19.5 14.0076 18.8302 15.5731 17.6944L20.2929 22.4142C20.6834 22.8047 21.3166 22.8047 21.7071 22.4142L22.4142 21.7071C22.8047 21.3166 22.8047 20.6834 22.4142 20.2929L17.6944 15.5731C18.8302 14.0076 19.5 12.082 19.5 10C19.5 4.75329 15.2467 0.5 10 0.5ZM3.5 10C3.5 6.41015 6.41015 3.5 10 3.5C13.5899 3.5 16.5 6.41015 16.5 10C16.5 13.5899 13.5899 16.5 10 16.5C6.41015 16.5 3.5 13.5899 3.5 10Z"
                      fill="#ffffff"
                    />
                  </svg>
                </span>
              </label>
              <input
                value={searchValue}
                type="text"
                placeholder="Search"
                className={`w-full h-full bg-transparent outline-none placeholder:font-normal placeholder:text-white/80 text-white
            `}
                id="input2"
                onChange={(e) => setSearchValue(e.target.value.trimStart())}
              />
            </div>
            <div className="mr-5 600res:mr-0 flex items-center gap-3">
              <div
                onClick={() => fetchAnime()}
                className="flex font-medium lex items-center gap-2 cursor-pointer p-3 450res:p-2 hover:bg-white/30 [&>span>svg]:hover:scale-125 active:scale-90 duration-150 rounded-lg"
              >
                <span>
                  <svg
                    className="duration-300 w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10 0.5C4.75329 0.5 0.5 4.75329 0.5 10C0.5 15.2467 4.75329 19.5 10 19.5C12.082 19.5 14.0076 18.8302 15.5731 17.6944L20.2929 22.4142C20.6834 22.8047 21.3166 22.8047 21.7071 22.4142L22.4142 21.7071C22.8047 21.3166 22.8047 20.6834 22.4142 20.2929L17.6944 15.5731C18.8302 14.0076 19.5 12.082 19.5 10C19.5 4.75329 15.2467 0.5 10 0.5ZM3.5 10C3.5 6.41015 6.41015 3.5 10 3.5C13.5899 3.5 16.5 6.41015 16.5 10C16.5 13.5899 13.5899 16.5 10 16.5C6.41015 16.5 3.5 13.5899 3.5 10Z"
                      fill="white"
                    />
                  </svg>
                </span>
                <span>Submit</span>
              </div>
              <div
                onClick={() => resetParams()}
                className="flex items-center gap-2 cursor-pointer p-3 450res:p-2 hover:bg-white/30 [&>span>svg]:hover:-rotate-180 active:scale-90 duration-150 rounded-lg"
              >
                <span>
                  <svg
                    className="duration-300 w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M7.62095 6.20695C8.81127 5.25458 10.2564 4.5 11.9998 4.5C16.1419 4.5 19.4998 7.85786 19.4998 12C19.4998 16.1421 16.1419 19.5 11.9998 19.5C8.74488 19.5 5.97175 17.4254 4.93515 14.5256C4.74925 14.0055 4.22477 13.6568 3.68448 13.7713L2.70621 13.9787C2.16592 14.0932 1.81614 14.6262 1.98184 15.1531C3.32107 19.4112 7.2982 22.5 11.9998 22.5C17.7987 22.5 22.4998 17.799 22.4998 12C22.4998 6.20101 17.7987 1.5 11.9998 1.5C9.21627 1.5 7.04815 2.76845 5.48857 4.07458L3.70689 2.29289C3.42089 2.00689 2.99077 1.92134 2.6171 2.07612C2.24342 2.2309 1.99978 2.59554 1.99978 3V8.5C1.99978 9.05228 2.4475 9.5 2.99978 9.5H8.49978C8.90424 9.5 9.26888 9.25636 9.42366 8.88268C9.57844 8.50901 9.49289 8.07889 9.20689 7.79289L7.62095 6.20695Z"
                      fill="white"
                    />
                  </svg>
                </span>
                <span>Reset</span>
              </div>
              <div className="relative ">
                <div className={` ${sortOpened ? "opacity-100" : "opacity-0 pointer-events-none"} duration-200 overflow-hidden absolute top-14 flex flex-col gap-2 p-3 right-0 bg-def-black border border-white/20 rounded-xl text-white w-[200px]`}>
                    {sort?.map(item => <div onClick={() => {changeSort(item?.id); setSortOpened(false)}}
                      className='flex justify-between items-center rounded-md p-2 hover:bg-white/20 cursor-pointer'>
                      <span>{item?.title}</span>
                      <span>
                        <svg
                          className={`${item?.id === selectedSort ? "opacity-100" : "opacity-0"} w-4 h-4"`}
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M21.2287 6.60355C21.6193 6.99407 21.6193 7.62723 21.2287 8.01776L10.2559 18.9906C9.86788 19.3786 9.23962 19.3814 8.84811 18.9969L2.66257 12.9218C2.26855 12.5349 2.26284 11.9017 2.64983 11.5077L3.35054 10.7942C3.73753 10.4002 4.37067 10.3945 4.7647 10.7815L9.53613 15.4677L19.1074 5.89644C19.4979 5.50592 20.1311 5.50591 20.5216 5.89644L21.2287 6.60355Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                    </div>)}
                </div>
                <div 
                  onClick={() => setSortOpened(!sortOpened)}
                  className={`${sortOpened ? "!text-white !bg-white/30" : ""} hover:bg-white/30 active:scale-90 duration-150
                  text-white/70 flex gap-2 items-center cursor-pointer p-3 450res:p-2 rounded-lg hover:text-white`}
                >
                  <span>{sort?.find(item => item.id === selectedSort)?.title}</span>
                  <div className="">
                </div>
                  <svg
                    className={`w-4 h-4 duration-300`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.29289 7.29289C3.68342 6.90237 4.31658 6.90237 4.70711 7.29289L12 14.5858L19.2929 7.29289C19.6834 6.90237 20.3166 6.90237 20.7071 7.29289C21.0976 7.68342 21.0976 8.31658 20.7071 8.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L3.29289 8.70711C2.90237 8.31658 2.90237 7.68342 3.29289 7.29289Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          {preloader ? <Preloader/>
          :
            searchError ? <ErrorPage/> 
            :
              searchResult?.length > 0 ? 
                <div
                  className="grid grid-cols-5 gap-5 1100res:gap-x-0 flex-shrink-0 justify-items-center h-min 1320res:grid-cols-4 1100res:grid-cols-3
                900res:grid-cols-4 850res:grid-cols-3 700res:grid-cols-4 600res:grid-cols-3 500res:grid-cols-4 450res:grid-cols-3"
                >
                  {searchResult?.map((item, i) => (
                    <AnimeCard info={item} type={"anime"} key={i} catalog={true}/>
                    ))}
                </div>
              : <ErrorPage/> 
          }
        </div>
      </div>
    </div>
  );
}



const CatalogCheckboxesComponent = ({setBoxesOpened, boxesOpened, componentHeight, mainTitle, componentArray, selectedBoxes, changeSelectedBoxes, selectedBoxesIsArray}) => {
    return (
    <div>
      <div
        className="flex justify-between pb-5 w-full items-center cursor-pointer border-b-2 border-b-white/10 mb-6 "
        onClick={() => setBoxesOpened(!boxesOpened)}
      >
        <span className="font-medium">{mainTitle}</span>
        <span>
          <svg
            className={`${
              boxesOpened ? "rotate-180" : ""
            } w-5 h-5 duration-300`}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.29289 7.29289C3.68342 6.90237 4.31658 6.90237 4.70711 7.29289L12 14.5858L19.2929 7.29289C19.6834 6.90237 20.3166 6.90237 20.7071 7.29289C21.0976 7.68342 21.0976 8.31658 20.7071 8.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L3.29289 8.70711C2.90237 8.31658 2.90237 7.68342 3.29289 7.29289Z"
              fill="white"
            />
          </svg>
        </span>
      </div>
      <div
        style={{height: `${componentHeight}px`}}
        className={`${
          boxesOpened ? '' : "!h-0"
        } relative overflow-hidden duration-300 flex items-start flex-col gap-3`}
      >
        {componentArray?.map((item) => (
          <div
            className={`${
              selectedBoxesIsArray ?
                (selectedBoxes.includes(item) ? "text-white" : "") 
                :
                (selectedBoxes === item?.id ? "text-white" : "")
            } duration-300 flex gap-2 text-text-gray cursor-pointer`}
            onClick={()=> changeSelectedBoxes(selectedBoxesIsArray ? item : item?.id)}
          >
            <div
              className={`${
                selectedBoxesIsArray ? 
                  (selectedBoxes.includes(item) ? "bg-white border-none" : "")
                  :
                  (selectedBoxes === item?.id) ? "bg-white border-none" : ""
              } duration-300 w-5 h-5 bg-def-black border-2 border-text-gray flex justify-center items-center rounded-[4px]`}
            >
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M21.2287 6.60355C21.6193 6.99407 21.6193 7.62723 21.2287 8.01776L10.2559 18.9906C9.86788 19.3786 9.23962 19.3814 8.84811 18.9969L2.66257 12.9218C2.26855 12.5349 2.26284 11.9017 2.64983 11.5077L3.35054 10.7942C3.73753 10.4002 4.37067 10.3945 4.7647 10.7815L9.53613 15.4677L19.1074 5.89644C19.4979 5.50592 20.1311 5.50591 20.5216 5.89644L21.2287 6.60355Z"
                  fill="#121212"
                />
              </svg>
            </div>
            <span>{selectedBoxesIsArray ? item : item?.title}</span>
          </div>
        ))}
      </div>
    </div>
  
    )
  }
  
  const CatologYearSelectComponent = ({setYearOpened, yearOpened, setYearValue, changeYear, yearValue}) => {
    return (
      <div>
      <div
        className="flex justify-between py-5 w-full items-center cursor-pointer border-b-2 border-b-white/10 mb-6 "
        onClick={() => setYearOpened(!yearOpened)}
      >
        <span className="font-medium">Year</span>
        <span>
          <svg
            className={`${
              yearOpened ? "rotate-180" : ""
            } w-5 h-5 duration-300`}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.29289 7.29289C3.68342 6.90237 4.31658 6.90237 4.70711 7.29289L12 14.5858L19.2929 7.29289C19.6834 6.90237 20.3166 6.90237 20.7071 7.29289C21.0976 7.68342 21.0976 8.31658 20.7071 8.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L3.29289 8.70711C2.90237 8.31658 2.90237 7.68342 3.29289 7.29289Z"
              fill="white"
            />
          </svg>
        </span>
      </div>
      <div
        className={`${
          yearOpened ? "h-[74px]" : "h-0"
        } relative overflow-hidden duration-300 flex gap-3 items-start`}
      >
        <span className="h-[44px] flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17 2C17 1.44772 16.5523 1 16 1C15.4477 1 15 1.44772 15 2V3H9V2C9 1.44772 8.55228 1 8 1C7.44772 1 7 1.44772 7 2V3H5C3.34315 3 2 4.34315 2 6V20C2 21.6569 3.34315 23 5 23H19C20.6569 23 22 21.6569 22 20V6C22 4.34315 20.6569 3 19 3H17V2ZM20 9V6C20 5.44772 19.5523 5 19 5H17V6C17 6.55228 16.5523 7 16 7C15.4477 7 15 6.55228 15 6V5H9V6C9 6.55228 8.55228 7 8 7C7.44772 7 7 6.55228 7 6V5H5C4.44772 5 4 5.44772 4 6V9H20ZM4 11H20V20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V11Z"
              fill="white"
            />
          </svg>
        </span>
        <input
          className="outline-none border-2 focus:border-white/80 border-white/30
          bg-def-black appearance-none w-[110px] px-3 py-2 rounded-xl"
          value={yearValue}
          type="number"
          min="1960"
          max="2026"
          maxLength="4"
          step="1"
          placeholder="1960-2026"
          onChange={(e) => {
            setYearValue(e.target.value);
            changeYear(e.target.value, e.target.validity.valid);
          }}
        />
      </div>
    </div>
  )
  }
  export default SearchPage