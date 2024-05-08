import { useContext, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import AnimeList from './components/AnimeList/AnimeList';
import MangaList from './components/MangaList/MangaList'
import AnimeDetails from './components/AnimeList/AnimeDetails/AnimeDetails';
import MangaDetails from './components/MangaList/MangaDetails/MangaDetails'
import {Routes, Route} from 'react-router-dom'
import MainPage from './components/MainPage/MainPage';
import CharacterAnime from './components/Characters/CharacterAnime';
import Person from './components/Voices/Voices';
import CharacterList from './components/CharacterList/CharacterList';
import RegisterPage from './components/AuthPage/RegisterPage';

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
        <Route path='/voices/:id' element={<Person/>}/>
        <Route path='/character' element={<div className='main'><CharacterList/></div>}/>
        <Route path='/character/:id' element={<CharacterAnime/>}/>
        <Route path='/registration' element={<RegisterPage/>}/>
      </Routes>
    </>
  );
}

export default App;