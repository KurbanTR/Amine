import { useState } from 'react';

const AvatarMenu = ({ active, setActive, setImg }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidImageUrl = await validateImageUrl(imageUrl);

    if (!isValidImageUrl) {
      setErrorMessage('Пожалуйста, введите правильный URL изображения.');
    } else {
      setErrorMessage('');
      // Передача URL изображения через setImg
      setImg(imageUrl);
      // Закрытие меню после успешного ввода
      setActive(false);
      setImageUrl('')
    }
  };

  const validateImageUrl = async (url) => {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      const contentType = res.headers.get('content-type');
      return contentType && contentType.startsWith('image');
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return (
    <div className={`w-full p-4 fixed top-20 z-[1] ${!active && 'hidden'} 850res:p-6 700res:p-4`}>
      <div className="
        p-4 bg-[#1c1c1c] rounded-xl mx-auto 
        1650res:max-w-4xl 1480res:max-w-3xl 1320res:max-w-2xl 
        1200res:max-w-xl 1000res:max-w-lg 850res:max-w-md 
        600res:max-w-sm
      ">
        <h2 className="text-white/70 mt-4">Enter URL image</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            value={imageUrl} 
            onChange={handleInputChange} 
            className="w-full p-2 rounded mt-2 text-[#c1c1c1] bg-black"
            placeholder="URL"
            required 
          />
        </form>
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        <div className='gap-5 mt-3'>
          <span className='btn-base bg-def-gray' onClick={() => setActive(false)}>
            <button className="relative top-[-2px] cursor-pointer text-white">Close</button>
          </span>
          <span className='btn-base bg-blue-500'>
            <button className="relative top-[-2px] cursor-pointer text-white">Submit</button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AvatarMenu;