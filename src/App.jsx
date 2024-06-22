import './App.css';
import Header from './widgets/Header';
import {Routes, Route} from 'react-router-dom'
import MainPage from './components/page/MainPage';
import RegisterPage from './components/auth/RegisterPage';
import ProfilePage from './components/auth/ProfilePage';
import SignInPage from './components/auth/SignInPage';
import Settings from './components/auth/Settings';
import ErrorPage from './components/page/ErrorPage';
import DetailsPage from './components/page/DetailsPage';
import Chat from './components/chat/Chat';
import ChatList from './components/chat/ChatList';
import WatchPage from './components/page/WatchPage';
import SearchPage from './components/page/SearchPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<><Header/><MainPage/></>}/>
        <Route path='/search' element={<><Header/><div className='h-10'/><SearchPage/></>}/>
        <Route path='/anime/:id' element={<><Header/><DetailsPage/></>}/>
        <Route path='/registration' element={<><Header/><RegisterPage/></>}/>
        <Route path='/signin' element={<><Header/><SignInPage/></>}/>
        <Route path='/profile' element={<><Header/><ProfilePage/></>}/>
        <Route path='/settings' element={<><Header/><Settings/></>}/>
        <Route path='/watch/:id' element={<><Header/><WatchPage/></>}/>
        <Route path='/chat' element={<ChatList/>}/>
        <Route path='/chat/:id' element={<Chat/>}/>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>      
    </>
  );
}

export default App;