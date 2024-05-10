import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import s from './MangaList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'antd';
import Sort from '../SortManga/Sort';
import coolicon from '../../assets/Search.svg';
import coolicon1 from '../../assets/Search1.svg';
import { fetchMangas, searchMangaWithPagination} from "../../store/mangaSlice";

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
      Submit
    </button>
  </form>
);

const MangaCard = ({ item }) => (
  <Link to={'/anime/'+item.mal_id}>
    <div className='relative h-[88.5%] rounded-xl overflow-hidden'>
      <div>
        <img src={item.images.jpg.image_url} alt="" />
      </div>                      
      <div className='absolute bottom-0 right-0 h-60 flex items-end w-full bg-gradient-to-t from-black to-transparent opacity-80 p-4'>
        <div className='flex flex-col'>
          <p className='line-clamp-1 overflow-hidden text-[1.2em] text-white'>{item.title}</p>
          <p className='text-[#ababab] font-medium'>{item.published.prop.from.year ? item.published.prop.from.year+(!item.genres.length==0 ? ', '+item.genres[0].name : '') : !item.genres.length==0 ? item.genres[0].name : ''}</p>
        </div>
      </div>
    </div>
  </Link>
);

const MangaList = () => {
  const [page, setPage] = useState(1)
  const [value, setValue] = useState('')

  const data = useSelector(state => state.manga.mangas)
  const { pages } = useSelector(state => state.manga)
  const dispatch = useDispatch()

  useEffect(()=>{
    const filters = JSON.parse(localStorage.getItem('filtersManga'));
    const mergedObj = Object.assign({}, filters, { q: value, page });
    const allKeysEmpty = filters && Object.keys(filters).every(key => filters[key] === '');
    (value || !allKeysEmpty) && dispatch(searchMangaWithPagination(mergedObj));
    (!value && allKeysEmpty) && dispatch(fetchMangas({ page }));
    window.scrollTo({top: 0, behavior: "smooth"});
  }, [dispatch, page])

  const handleInputChange = (e) => setValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    const filters = JSON.parse(localStorage.getItem('filtersManga'));
    const mergedObj = Object.assign({}, filters, { q: value, page });
    const allKeysEmpty = filters && Object.keys(filters).every(key => filters[key] === '');
    (value || !allKeysEmpty) && dispatch(searchMangaWithPagination(mergedObj));
    (!value && allKeysEmpty) && dispatch(fetchMangas({ page }));
  };

  const handlePageChange = (page) => setPage(page);

  return (
    <>
      <Sort/>
      <div className={s.body}>
        <SearchForm onSubmit={handleSubmit} value={value} onChange={handleInputChange} />
        <div className={s.carts}>
          {data?.map((item, index) => <MangaCard item={item} key={index} />)}
        </div>
      </div>
      <p/>
      <div className={s.character}>
        <Pagination current={page} onChange={handlePageChange} total={pages * 10} className={s.character__pagination}/>
      </div>
    </>
  );
};

export default MangaList;