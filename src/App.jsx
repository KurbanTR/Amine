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
import Chat from './components/chat/Chat';
import ChatList from './components/chat/ChatList';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<><Header/><MainPage/></>}/>
        <Route path='/anime' element={<><Header/><div className='main'><ListPage category='anime'/></div><Footer/></>}/>
        <Route path='/manga' element={<><Header/><div className='main'><ListPage category='manga'/></div><Footer/></>}/>
        <Route path='/characters' element={<><Header/><div className='main'><ListPage category='characters'/></div><Footer/></>}/>
        <Route path='/anime/:id' element={<><Header/><DetailsPage category='anime'/><Footer/></>}/>
        <Route path='/manga/:id' element={<><Header/><DetailsPage category='manga'/><Footer/></>}/>
        <Route path='/characters/:id' element={<><Header/><DetailsPage category='characters'/><Footer/></>}/>
        <Route path='/people/:id' element={<><Header/><DetailsPage category='people'/><Footer/></>}/>
        <Route path='/registration' element={<><Header/><RegisterPage/><Footer/></>}/>
        <Route path='/signin' element={<><Header/><SignInPage/><Footer/></>}/>
        <Route path='/profile' element={<><Header/><ProfilePage/><Footer/></>}/>
        <Route path='/settings' element={<><Header/><Settings/><Footer/></>}/>
        <Route path='/chat' element={<ChatList/>}/>
        <Route path='/chat/:id' element={<Chat/>}/>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>      
    </>
  );
}

export default App;