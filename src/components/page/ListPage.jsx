import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Sort from "../Sorts/SortAnime/Sort";
import Pagination from "../Pagination/Pagination";
import { CircularProgress } from "@chakra-ui/react";
import { searchAnimeWithPagination, fetchAnimes } from "../../store/animeSlice";
import s from '../../styles/ListPage.module.css'
import coolicon from '../../assets/Search.svg';
import coolicon1 from '../../assets/Search1.svg';

const SearchForm = ({ onSubmit, value, onChange }) => (
    <form onSubmit={onSubmit} className="flex justify-center gap-[2em]">
      <div className={s.inputBlock}>
        <img src={coolicon1} className="w-4" alt="?" />
        <input 
          value={value} 
          className="text-[#fafafa] font-medium text-[1.1em] w-full" 
          onChange={onChange} 
          placeholder="Search..." 
        />
      </div>
      <button type="submit" className={s.coolicon} >
        <img src={coolicon} className="w-4" alt="?" />
        <p>Submit</p>
      </button>
    </form>
)
const ListCard = ({ item, title, year, genre, category }) => (
    <Link to={`/${category}/`+item.mal_id}  className={s.animeCard}>
      <div className='relative h-[90%] rounded-xl overflow-hidden'>
        <div>
          <img src={item?.images.jpg.image_url} alt="" />
        </div>                      
        <div className='absolute bottom-0 right-0 h-60 flex items-end w-full bg-gradient-to-t from-black to-transparent opacity-80 p-4'>
          <div className='flex flex-col'>
            <p className='line-clamp-1 overflow-hidden text-[1.2em] text-white'>{title}</p>
            <p className='text-[#ababab] font-medium'>{year}{genre && `, ${genre}`}</p>
          </div>
        </div>
      </div>
    </Link>
);

const ListPage = ({category}) => {
    const {loading} = useSelector(state=>state.anime)

    const location = useLocation();
  
    const [page, setPage] = useState(1)
    const [value, setValue] = useState('')
  
    const data = useSelector(state => state.anime.animes)
    const { pages } = useSelector(state => state.anime)
    const dispatch = useDispatch()
  
    const getFilters = ()=>{
      const filters = JSON.parse(localStorage.getItem('filtersAnime'));
      const mergedObj = Object.assign({}, filters, { q: value, page, category });
      const allKeysEmpty = filters && Object.keys(filters).every(key => filters[key] === '');
      (value || !allKeysEmpty) && dispatch(searchAnimeWithPagination(mergedObj));
      (!value && allKeysEmpty) && dispatch(fetchAnimes({ page, category }));
    }

    useEffect(()=>{
      getFilters()
      window.scrollTo({top: 0, behavior: "smooth"});
    }, [dispatch, page, location])
  
    const handleInputChange = (e) => setValue(e.target.value);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setPage(1);
      getFilters()
    };
  
    const handlePageChange = (page) => setPage(page);
  
    return (
      <>
        <Sort/>
        <div className={s.body}>
          <SearchForm onSubmit={handleSubmit} value={value} onChange={handleInputChange} />
          <div className={!loading && s.carts}>
            {loading ? (
              <div className="w-full h-[20em] flex justify-center items-center">
                <CircularProgress isIndeterminate color='blue.300' />
              </div>
            ) : (
              data?.map((item, index) => (
                <ListCard
                  item={item}
                  key={index}
                  category={category}
                  title={item?.title || item?.name}
                  year={item?.aired?.prop?.from?.year || item?.published?.prop.from.year || item?.name_kanji}
                  genre={item?.genres &&(item?.genres.length !== 0 && item?.genres[0]?.name)}
                />
              ))
            )}
          </div>
        </div>
        <p/>
        <div className={s.character}>
          <Pagination total={pages} page={1} onChange={handlePageChange}/>
        </div>
      </>
    );
  };
  
  export default ListPage;