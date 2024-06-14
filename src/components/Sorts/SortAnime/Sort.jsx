import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import s from './Sort.module.css';
import expand from '../../../assets/Expand_up-1.svg';
import icon from '../../../assets/icons8.svg';
import { DatePicker, Space } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';

const { RangePicker } = DatePicker;

const ToggleSection = ({ title, isOpen, onClick }) => (
  <div onClick={onClick} className='flex justify-between py-5 w-full items-center cursor-pointer border-b-2 border-b-white/10 mb-6'>
    <span className='font-medium'>{title}</span>
    <span><img className={classNames('w-5 h-5 duration-300', { 'rotate-180': isOpen })} src={expand} alt="" /></span>
  </div>
);

const ToggleButton = ({ label, isActive, onClick }) => (
  <div onClick={onClick} className='duration-300 flex items-center gap-2 text-gray-500 cursor-pointer'>
    <div className={classNames('duration-300 w-5 h-5 flex justify-center items-center rounded-[4px]', {
      'bg-white': isActive,
      'bg-def-black border-2 border-gray-500': !isActive,
    })}>
      <img src={icon} alt="" />
    </div>
    <span className={classNames({ 'text-white font-medium': isActive })}>{label}</span>
  </div>
);

const Sort = () => {
  const [year, setYear] = useState(false);
  const [genres, setGenres] = useState(true);
  const [format, setFormat] = useState(true);
  const [status, setStatus] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [formats, setFormats] = useState('');
  const [statuts, setStatuts] = useState('');

  const genreOptions = [
    { label: 'Action', state: useState(false) },
    { label: 'Adventure', state: useState(false) },
    { label: 'School', state: useState(false) },
    { label: 'Comedy', state: useState(false) },
    { label: 'Drama', state: useState(false) },
    { label: 'Fantasy', state: useState(false) },
    { label: 'Horror', state: useState(false) },
    { label: 'MahouShoujo', state: useState(false) },
    { label: 'Mecha', state: useState(false) },
    { label: 'Music', state: useState(false) },
    { label: 'Mystery', state: useState(false) },
    { label: 'Psychological', state: useState(false) },
    { label: 'Romance', state: useState(false) },
    { label: 'SliceOfLife', state: useState(false) },
    { label: 'Sports', state: useState(false) },
    { label: 'Supernatural', state: useState(false) },
    { label: 'Survival', state: useState(false) },
    { label: 'SciFi', state: useState(false) }
  ];

  const filters = useMemo(() => ({
    genres: genreOptions.map(({ state }, index) => state[0] ? (index + 1).toString() : '').filter(Boolean).join(','),
    type: formats,
    status: statuts,
    start_date: startDate,
    end_date: endDate,
  }), [startDate, endDate, formats, statuts, genreOptions]);

  useEffect(() => {
    localStorage.setItem('filtersAnime', JSON.stringify(filters));
  }, [filters]);

  const onHandleChange = (date) => {
    setStartDate(`${date[0].format('YYYY-MM-DD')}`);
    setEndDate(`${date[1].format('YYYY-MM-DD')}`);
  };

  return (
    <div className={s.sort}>
      <h1 className='text-3xl font-medium mb-8'>Catalog</h1>
      <div>
        <ToggleSection title="Year" isOpen={year} onClick={() => setYear(!year)} />
        <AnimatePresence>
          {year && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className='overflow-hidden duration-300 flex gap-3 items-start'
            >
              <Space direction="vertical" size={12}>
                <RangePicker onChange={onHandleChange} />
              </Space>
            </motion.div>
          )}
        </AnimatePresence>

        <ToggleSection title="Genres" isOpen={genres} onClick={() => setGenres(!genres)} />
        <AnimatePresence>
          {genres && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className='overflow-hidden duration-300 flex flex-col gap-3 items-start'
            >
              {genreOptions.map(({ label, state }) => (
                <ToggleButton key={label} label={label} isActive={state[0]} onClick={() => state[1](!state[0])} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <ToggleSection title="Formats" isOpen={format} onClick={() => setFormat(!format)} />
        <AnimatePresence>
          {format && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className='overflow-hidden duration-300 flex flex-col gap-3 items-start'
            >
              {['TV', 'OVA', 'ONA', 'Movie', 'Special', 'Music'].map(f => (
                <ToggleButton key={f} label={f} isActive={formats === f.toLowerCase()} onClick={() => {formats === f.toLocaleLowerCase() ? setFormats('') : setFormats(f.toLowerCase())}} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <ToggleSection title="Status" isOpen={status} onClick={() => setStatus(!status)} />
        <AnimatePresence>
          {status && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: .5 }}
              className='overflow-hidden flex flex-col gap-3 items-start'
            >
              {['Airing', 'Complete', 'UpComing'].map(s => (
                <ToggleButton key={s} label={s} isActive={statuts === s.toLowerCase()} onClick={() => setStatuts(s.toLowerCase())} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Sort;
