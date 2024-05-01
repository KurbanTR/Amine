import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import AnimeList from './components/AnimeList/AnimeList';
import MangaList from './components/MangaList/MangaList'
import AnimeDetails from './components/AnimeList/AnimeDetails/AnimeDetails';
import MangaDetails from './components/MangaList/MangaDetails/MangaDetails'
import {Routes, Route} from 'react-router-dom'
import MainPage from './components/MainPage/MainPage';
import CharacterAnime from './components/Characters/CharacterAnime';

function App() {
  const [theme, setTheme] = useState(false);
  {theme === 'light' ? 'light-theme' : 'dark-theme'}

  return (
    <>
      <Header tema={theme} setTema={setTheme}/>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/profile' element={<img className='relative top-[10em]' src='https://freesvg.org/img/abstract-user-flat-4.png'/>}/>
        <Route path='/anime' element={<div className='main'><AnimeList/></div>}/>
        <Route path='/anime/:id' element={<AnimeDetails/>}/>
        <Route path='/manga' element={<div className='main'><MangaList/></div>}/>
        <Route path='/manga/:id' element={<MangaDetails/>}/>
        <Route path='/character/:id' element={<CharacterAnime/>}/>
      </Routes>
    </>
  );
}

export default App;