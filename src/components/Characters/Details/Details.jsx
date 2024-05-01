import { useState } from 'react';
import {useSelector} from 'react-redux'

const Details = () => {
    const anime = useSelector(state => state.anime.character)
    const [limit, setLimit] = useState(true)
    return (
        <div className='py-[2em] flex gap-[1em] w-full'>
            <div className='min-w-[23em]'>
                <p className='text-3xl font-medium'>Details</p>
                <div className='w-full'>
                    {anime?.name && <div className='flex pt-7 w-full'>
                        <p className='text-[#7c7c7c] text-lg w-[27%]'>Name</p>
                        <p className='text-base'>{anime?.name}</p>
                    </div>}
                    {anime?.name_kanji && <div className='flex pt-7 w-full'>
                        <p className='text-[#7c7c7c] text-lg w-[27%]'>Japan</p>
                        <p className='text-base'>{anime?.name_kanji}</p>
                    </div>}
                    {anime?.nicknames.length !== 0 && <div className='flex pt-7 w-full'>
                        <p className='text-[#7c7c7c] text-lg w-[27%]'>Nick</p>
                        <p className='text-base'>{anime?.nicknames.map(nick => nick).join(", ")}</p>
                    </div>}
                </div>
            </div>
            <div>
                {anime?.about && <>
                <p className='text-3xl font-medium'>About</p>
                <div className='pt-10'>
                    <div className='overflow-hidden'>
                        <p className='text-[#7c7c7c] text-lg font-medium leading-9'>{limit ? anime?.about.slice(0, 394) : anime?.about}</p>
                    </div>
                    {anime?.about.length > 394 && <span onClick={()=>setLimit(!limit)} className='cursor-pointer font-medium text-[1.1em]'>{!limit ? 'Hide' : 'More'}</span>}
                </div></>
                }
            </div>
        </div>
    )
}

export default Details
