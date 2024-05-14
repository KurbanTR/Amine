import { useState } from 'react';
import {useSelector} from 'react-redux'
import s from './Details.module.css'

const Details = () => {
    const anime = useSelector(state => state.manga.manga)
    const [limit, setLimit] = useState(true)
  return (
    <div className={`${s.main} py-[2em] flex gap-[1em] w-full`}>
        <div>
            <p className='text-3xl font-medium'>Details</p>
                <div className={s.info}>
                    {anime?.type && <div className='flex pt-7 w-[340px]'>
                        <p className='text-[#7c7c7c] text-lg w-[100px]'>Type</p>
                        <p className='text-base'>{anime?.type}</p>
                    </div>}
                    {anime?.chapters && <div className='flex pt-7 w-[340px]'>
                        <p className='text-[#7c7c7c] text-lg w-[100px]'>Chapters</p>
                        <p className='text-base'>{anime?.chapters}</p>
                    </div>}
                    {anime?.genres.length !== 0 && <div className='flex pt-7 w-[340px]'>
                        <p className='text-[#7c7c7c] text-lg w-[100px]'>Genres</p>
                        <p className='tetext-base'>{anime?.genres.map(genre => genre.name).join(", ")}</p>
                    </div>}
                    {anime?.published?.string && <div className='flex pt-7 w-[340px]'>
                        <p className='text-[#7c7c7c] text-lg w-[100px]'>Published</p>
                        <p className='text-base'>{anime?.published.string}</p>
                    </div>}
                    {anime?.status && <div className='flex pt-7 w-[340px]'>
                        <p className='text-[#7c7c7c] text-lg w-[100px]'>Status</p>
                        <p className='text-base'>{anime?.status}</p>
                    </div>}
                    {anime?.authors.length !== 0 && <div className='flex pt-7 w-[340px]'>
                        <p className='text-[#7c7c7c] text-lg w-[100px]'>Author</p>
                        <p className='text-base'>{anime?.authors[0].name}</p>
                    </div>}
                </div>
            </div>
            <div>
                <p className='text-3xl font-medium'>Desription</p>
                <div className='pt-10'>
                    <div className='overflow-hidden'>
                        <p className='text-[#7c7c7c] text-lg font-medium leading-9'>{limit ? anime?.synopsis.slice(0, 394) : anime?.synopsis}</p>
                    </div>
                    {anime?.synopsis.length > 394 &&<span onClick={()=>setLimit(!limit)} className='cursor-pointer font-medium text-[1.1em]'>{!limit ? 'Hide' : 'More'}</span>}
                </div>
            </div>
        </div>
    )
}

export default Details
