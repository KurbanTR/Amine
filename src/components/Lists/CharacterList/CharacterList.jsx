import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import s from './CharacterList.module.css'
import {useSelector, useDispatch} from 'react-redux'
import { fetchCharacters, fetchSearch } from '../../../store/charactersSlice';
import { Pagination } from 'antd'
import Sort from '../../Sorts/SortAnime/Sort';
import coolicon from '../../../assets/Search.svg'
import coolicon1 from '../../../assets/Search1.svg'
import { CircularProgress } from "@chakra-ui/react";

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

const ChararterCard = ({ item }) => (
  <Link to={'/character/'+item.mal_id} className={s.chararterCard}>
    <div className='relative h-[90%] rounded-xl overflow-hidden'>
      <div>
        <img src={item.images.jpg.image_url} alt="" />
      </div>                      
      <div className='absolute bottom-0 right-0 h-60 flex items-end w-full bg-gradient-to-t from-black to-transparent opacity-80 p-4'>
        <div className='flex flex-col'>
          <p className='line-clamp-1 overflow-hidden text-[1.2em] text-white'>{item.name}</p>
          <p className='text-[#ababab] font-medium'>{item.name_kanji}</p>
        </div>
      </div>
    </div>
  </Link>
);

const Footers = () => {
  const {loading} = useSelector(state=>state.character)

  const [page, setPage] = useState(1)
  const [value, setValue] = useState('')

  const data = useSelector(state => state.character.characters)
  const { pages } = useSelector(state => state.character)
  const dispatch = useDispatch()

  useEffect(()=>{
    value && dispatch(fetchSearch({value, page}));
    !value && dispatch(fetchCharacters({ page }));
    window.scrollTo({top: 0, behavior: "smooth"});
  }, [dispatch, page])

  const handleInputChange = (e) => setValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    (value) && dispatch(fetchSearch({value, page: 1}));
    (!value) && dispatch(fetchCharacters({ page: 1 }));
  };

  const handlePageChange = (page) => setPage(page);

  return (
    <>
      <Sort/>
      <div className={s.body}>
        <SearchForm onSubmit={handleSubmit} value={value} onChange={handleInputChange} />
        <div className={!loading && s.carts}>
          {loading ? <div className="w-full h-[20em] flex justify-center items-center"><CircularProgress isIndeterminate color='blue.300' /></div> : data?.map((item, index) => <ChararterCard item={item} key={index} />)}
        </div>
      </div>
      <p/>
      <div className={s.character}>
        <Pagination current={page} onChange={handlePageChange} total={pages * 10} className={s.character__pagination}/>
      </div>
    </>
  );
};

export default Footers;