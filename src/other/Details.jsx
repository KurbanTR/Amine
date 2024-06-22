import { useState } from 'react';

// DetailItem Component
const DetailItem = ({ label, value }) => {
  if (!value) return null;
  return (
    <div className='flex pt-7 w-[340px] 900res:w-[45vw]'>
      <p className='text-[#7c7c7c] text-lg w-[100px] 900res:text-base 900res:w-[80px] 700res:text-sm 700res:w-[65px] 540res:text-xs 540res:w-[60px]'>{label}</p>
      <p className='text-base 900res:text-base 700res:text-sm 540res:text-xs'>{value}</p>
    </div>
  );
};

// Description Component
const Description = ({ description }) => {
  const [limit, setLimit] = useState(true);
  if (!description) return null;
  return (
    <div>
      <p className='text-3xl font-medium 650res:text-xl'>About</p>
      <div className='pt-7 650res:pt-2'>
        <div className='overflow-hidden'>
          <p className='text-[#7c7c7c] text-lg font-medium leading-9 650res:text-sm 450res:text-xs'>
            {limit ? `${description.slice(0, 394)}...` : description}
          </p>
        </div>
        {description.length > 394 && (
          <span
            onClick={() => setLimit(!limit)}
            className='cursor-pointer font-medium text-[1.1em] 650res:text-[.8em]'
          >
            {limit ? 'More' : 'Hide'}
          </span>
        )}
      </div>
    </div>
  );
};

export { DetailItem, Description };

// import { useState } from 'react';
import { useSelector } from 'react-redux';
// import { DetailItem, Description } from './DetailComponents';

const Details = () => {
  const data = useSelector((state) => state.anime.anime);
  if (!data) return null;

  // Dynamic properties based on category
  const detailProps = {
    anime: [
      { label: 'Type', value: data?.type },
      { label: 'Episodes', value: data?.episodes },
      { label: 'Genres', value: data?.genres?.map((genre) => genre.name).join(', ') },
      { label: 'Aired', value: data?.aired?.string },
      { label: 'Status', value: data?.status },
      { label: 'Season', value: data?.season },
      { label: 'Studios', value: data?.studios?.[0]?.name },
      { label: 'Source', value: data?.source },
      { label: 'Rating', value: data?.rating },
      { label: 'Duration', value: data?.duration },
    ],
  };

  const descriptionProp = data?.about || data?.synopsis;

  return (
    <div className='py-[2em] flex gap-[1em] w-full 900res:flex 900res:flex-col 900res:gap-10'>
      <div>
        <p className='text-3xl font-medium 650res:text-2xl'>Details</p>
        <div className='900res:flex 900res:flex-wrap'>
          {detailProps['anime'].map(({ label, value }) => (
            <DetailItem key={label} label={label} value={value} />
          ))}
        </div>
      </div>
      <Description description={descriptionProp} />
    </div>
  );
};

export default Details;
