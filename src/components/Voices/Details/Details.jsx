import { useState } from 'react';
import {useSelector} from 'react-redux'

const Details = () => {
    const anime = useSelector(state => state.anime.person)
    const [limit, setLimit] = useState(true)

    const getBirthday = (birthday)=>{
        const result = new Date(birthday).toLocaleDateString('ru-US', { year: 'numeric', month: 'long', day: 'numeric' });
        return result
    }
    return (
        <div className='py-[2em] flex gap-[1em] w-full'>
            <div className='min-w-[23em]'>
                <p className='text-3xl font-medium'>Details</p>
                <div className='w-full'>
                    {anime?.name && <div className='flex pt-7 w-full'>
                        <p className='text-[#7c7c7c] text-lg w-[27%]'>Name</p>
                        <p className='text-base'>{anime?.name}</p>
                    </div>}
                    {anime?.family_name && <div className='flex pt-7 w-full'>
                        <p className='text-[#7c7c7c] text-lg w-[27%]'>Family</p>
                        <p className='text-base'>{anime?.family_name}</p>
                    </div>}
                    {anime?.alternate_names.length !== 0 && <div className='flex pt-7 w-full'>
                        <p className='text-[#7c7c7c] text-lg w-[27%]'>Alternate Names</p>
                        <p className='text-base'>{anime?.alternate_names.map(nick => nick).join(", ")}</p>
                    </div>}
                    {anime?.birthday && <div className='flex pt-7 w-full'>
                        <p className='text-[#7c7c7c] text-lg w-[27%]'>Birthday</p>
                        <p className='text-base'>{getBirthday(anime?.birthday)}</p>
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
