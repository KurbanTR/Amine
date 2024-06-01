import './App.css';
import Header from './widgets/Header';
import Footer from './widgets/Footer';
import {Routes, Route} from 'react-router-dom'
import MainPage from './components/page/MainPage';
import RegisterPage from './components/auth/RegisterPage';
import ProfilePage from './components/auth/ProfilePage';
import SignInPage from './components/auth/SignInPage';
import Settings from './components/auth/Settings';
import ErrorPage from './components/page/ErrorPage';
import ListPage from './components/page/ListPage';
import DetailsPage from './components/page/DetailsPage';

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/anime' element={<div className='main'><ListPage category='anime'/></div>}/>
        <Route path='/manga' element={<div className='main'><ListPage category='manga'/></div>}/>
        <Route path='/characters' element={<div className='main'><ListPage category='characters'/></div>}/>
        <Route path='/anime/:id' element={<DetailsPage category='anime'/>}/>
        <Route path='/manga/:id' element={<DetailsPage category='manga'/>}/>
        <Route path='/characters/:id' element={<DetailsPage category='characters'/>}/>
        <Route path='/people/:id' element={<DetailsPage category='people'/>}/>
        <Route path='/registration' element={<RegisterPage/>}/>
        <Route path='/signin' element={<SignInPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;