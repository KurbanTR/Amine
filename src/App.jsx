import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import AnimeList from './components/AnimeList/AnimeList';
import AnimeDetails from './components/AnimeList/AnimeDetails/AnimeDetails';
import {Routes, Route} from 'react-router-dom'
import Sort from './components/Sort/Sort';

function App() {
  const [theme, setTheme] = useState(false);
  {theme === 'light' ? 'light-theme' : 'dark-theme'}

  return (
    <>
      <Header tema={theme} setTema={setTheme}/>
      <Routes>
        <Route path='/' element={<div className='main'><Sort/><AnimeList/></div>}/>
        <Route path='/anime/:id' element={<div className='main'><Sort/><AnimeDetails/></div>}/>
      </Routes>
    </>
  );
}

export default App;