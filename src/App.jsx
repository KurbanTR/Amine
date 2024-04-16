import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import AnimeList from './components/AnimeList/AnimeList';
import MangaList from './components/MangaList/MangaList'
import AnimeDetails from './components/AnimeList/AnimeDetails/AnimeDetails';
import MangaDetails from './components/MangaList/MangaDetails/MangaDetails'
import {Routes, Route} from 'react-router-dom'
import Sort from './components/Sort/Sort';

function App() {
  const [theme, setTheme] = useState(false);
  {theme === 'light' ? 'light-theme' : 'dark-theme'}

  return (
    <>
      <Header tema={theme} setTema={setTheme}/>
      <Routes>
        <Route path='/anime' element={<div className='main'><AnimeList/><Sort/></div>}/>
        <Route path='/anime/:id' element={<AnimeDetails/>}/>
        <Route path='/manga' element={<div className='main'><MangaList/><Sort/></div>}/>
        <Route path='/manga/:id' element={<MangaDetails/>}/>
      </Routes>
    </>
  );
}

export default App;