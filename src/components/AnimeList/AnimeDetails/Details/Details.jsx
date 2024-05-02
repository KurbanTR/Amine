import { useState } from 'react';
import {useSelector} from 'react-redux'

const Details = () => {
    const anime = useSelector(state => state.anime.anime)
    const [limit, setLimit] = useState(true)
    return (
        <div className='py-[2em] flex gap-[1em] w-full'>
            <div className='min-w-[23em]'>
                <p className='text-3xl font-medium'>Details</p>
                <div className='w-full'>
                    {anime?.type && <div className='flex pt-7 w-full'>
                        <p className='text-[#7c7c7c] text-lg w-[27%]'>Type</p>
                        <p className='text-base'>{anime?.type}</p>
                    </div>}
                    {anime?.episodes && <div className='flex pt-7 w-full'>
                        <p className='text-[#7c7c7c] text-lg w-[27%]'>Episodes</p>
                        <p className='text-base'>{anime?.episodes}</p>
                    </div>}
                    {anime?.genres.length !== 0 && <div className='flex pt-7 w-full'>
                        <p className='text-[#7c7c7c] text-lg w-[27%]'>Genres</p>
                        <p className='tetext-base'>{anime?.genres.map(genre => genre.name).join(", ")}</p>
                    </div>}
                    {anime?.aired?.string && <div className='flex pt-7 w-full'>
                        <p className='text-[#7c7c7c] text-lg w-[27%]'>Aired</p>
                        <p className='text-base'>{anime?.aired.string}</p>
                    </div>}
                    {anime?.status && <div className='flex pt-7 w-full'>
                        <p className='text-[#7c7c7c] text-lg w-[27%]'>Status</p>
                        <p className='text-base'>{anime?.status}</p>
                    </div>}
                    {anime?.season && <div className='flex pt-7 w-full'>
                        <p className='text-[#7c7c7c] text-lg w-[27%]'>Season</p>
                        <p className='text-base'>{anime?.season}</p>
                    </div>}
                    {anime?.studios[0]?.name && <div className='flex pt-7 w-full'>
                        <p className='text-[#7c7c7c] text-lg w-[27%]'>Studios</p>
                        <p className='text-base'>{anime?.studios[0].name}</p>
                    </div>}
                    {anime?.source && <div className='flex pt-7 w-full'>
                        <p className='text-[#7c7c7c] text-lg w-[27%]'>Source</p>
                        <p className='text-base'>{anime?.source}</p>
                    </div>}
                    {anime?.rating && <div className='flex pt-7 w-full'>
                        <p className='text-[#7c7c7c] text-lg w-[27%]'>Rating</p>
                        <p className='text-base'>{anime?.rating}</p>
                    </div>}
                    {anime?.duration && <div className='flex pt-7 w-full'>
                        <p className='text-[#7c7c7c] text-lg w-[27%]'>Duration</p>
                        <p className='text-base'>{anime?.duration}</p>
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
