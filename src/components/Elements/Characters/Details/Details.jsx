import { useState } from 'react';
import {useSelector} from 'react-redux'
import s from './Details.module.css'

const Details = () => {
    const anime = useSelector(state => state.character.character)
    const [limit, setLimit] = useState(true)
    return (
        <div className={`${s.main} py-[2em] flex gap-[1em] w-full`}>
            <div>
                <p className='text-3xl font-medium'>Details</p>
                <div className={s.info}>
                    {anime?.name && <div className='flex pt-7 w-[340px]'>
                        <p className='text-[#7c7c7c] text-lg w-[100px]'>Name</p>
                        <p className='text-base'>{anime?.name}</p>
                    </div>}
                    {anime?.name_kanji && <div className='flex pt-7 w-[340px]'>
                        <p className='text-[#7c7c7c] text-lg w-[100px]'>Japan</p>
                        <p className='text-base'>{anime?.name_kanji}</p>
                    </div>}
                    {anime?.nicknames.length !== 0 && <div className='flex pt-7 w-[340px]'>
                        <p className='text-[#7c7c7c] text-lg w-[100px]'>Nick</p>
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
