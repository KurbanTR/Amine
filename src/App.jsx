import './App.css';
import { useState } from 'react';
import Header from './components/page/Header/Header';
import AnimeList from './components/Lists/AnimeList/AnimeList';
import MangaList from './components/Lists/MangaList/MangaList'
import AnimeDetails from './components/Lists/AnimeList/AnimeDetails/AnimeDetails';
import MangaDetails from './components/Lists/MangaList/MangaDetails/MangaDetails'
import {Routes, Route} from 'react-router-dom'
import MainPage from './components/page/MainPage/MainPage';
import CharacterAnime from './components/Elements/Characters/CharacterAnime';
import Person from './components/Elements/Voices/Voices';
import CharacterList from './components/Lists/CharacterList/CharacterList';
import RegisterPage from './components/auth/AuthPage/RegisterPage';
import ProfilePage from './components/auth/Profile/ProfilePage';

function App() {
  const [theme, setTheme] = useState(false);
  {theme === 'light' ? 'light-theme' : 'dark-theme'}

  return (
    <>
      <Header tema={theme} setTema={setTheme}/>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        {/* <Route path='/profile' element={<img className='relative top-[10em]' src='https://freesvg.org/img/abstract-user-flat-4.png'/>}/> */}
        <Route path='/anime' element={<div className='main'><AnimeList/></div>}/>
        <Route path='/anime/:id' element={<AnimeDetails/>}/>
        <Route path='/manga' element={<div className='main'><MangaList/></div>}/>
        <Route path='/manga/:id' element={<MangaDetails/>}/>
        <Route path='/voices/:id' element={<Person/>}/>
        <Route path='/character' element={<div className='main'><CharacterList/></div>}/>
        <Route path='/character/:id' element={<CharacterAnime/>}/>
        <Route path='/registration' element={<RegisterPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
      </Routes>
    </>
  );
}

export default App;