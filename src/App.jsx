import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import AnimeList from './components/AnimeList/AnimeList';
import AnimeDetails from './components/AnimeDetails/AnimeDetails';
import {Routes, Route} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { fetchPersons } from './store/animeSlice';

function App() {
  const [theme, setTheme] = useState(false);
  {theme === 'light' ? 'light-theme' : 'dark-theme'}
  const dispatch = useDispatch()
  
useEffect(()=>{
  dispatch(fetchPersons())
},[])

  return (
    <>
      <Header tema={theme} setTema={setTheme}/>
      <Routes>
        <Route path='/' element={<AnimeList/>}/>
        <Route path='/anime/:id' element={<AnimeDetails/>}/>
      </Routes>
    </>
  );
}

export default App;