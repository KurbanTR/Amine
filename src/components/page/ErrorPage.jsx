import img from '../../assets/notfoundpagechainsaw.png'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
    return (
      <div className='flex flex-col items-center justify-center relative top-36'>
        <img src={img} alt='404' className='h-64 sm:h-48 mb-6' />
        <h2 className='text-3xl mb-2'>404 - Page Not Found</h2>
        <p className='text-xl mb-6'>Wrong page?</p>
        <Link to={"/"}><button className='btn-base bg-white text-def-black text-black'>TAKE ME HOME</button></Link>
      </div>
    );
};  
  

export default ErrorPage