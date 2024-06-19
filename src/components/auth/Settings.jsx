import { useDispatch, useSelector } from 'react-redux';
import out from '../../assets/out.svg'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDefineUser, signOut, updateUserProfile } from '../../store/authSlice';
import AvatarMenu from '../../other/AvatarMenu';

const Settings = () => {
  const {data} = useSelector(state=>state.profile)
  const [userName, setUserName] = useState(data?.name)
  const [bio, setBio] = useState(data?.bio)
  const [img, setImg] = useState(data?.img)

  const [hasChanged, setHasChanged] = useState(false)

  const [active, setActive] = useState(false)

  const dispatch = useDispatch()
  const nav = useNavigate()

  const {id} = useSelector(state => state.user)

  useEffect(()=>{
    dispatch(getDefineUser({id}))
  }, [dispatch, id])

  const onHandleOut = () => {
    dispatch(signOut({nav}))  
  }

  useEffect(() => {
    if (data) {
      setUserName(data?.name);
      setBio(data?.bio);
      setImg(data?.img);
    }
  }, [data]);

  useEffect(() => {
    if (img === data?.img && bio === data?.bio && userName === data?.name) {
      setHasChanged(false);
    } else {
      setHasChanged(true);
    }
  }, [img, bio, userName, data]);

  const onSave = ()=>{
    if(hasChanged){
      dispatch(updateUserProfile({img, bio, userName, user: id}))
    }
  }
  const onReset = ()=>{
    if(hasChanged){
      setUserName(data?.name)
      setBio(data?.bio)
      setImg(data?.img)
    }
  }

  return (
    <main className='mx-auto relative top-28 w-[1440px] 1480res:w-full 1480res:px-5 pb-10'>
      <h1 className='text-5xl font-medium'>Settings</h1>
      <div className=" flex flex-col w-[1440px] 1480res:w-full mx-auto 1480res:pl-5 600res:pl-0">
        <h2 className="text-4xl font-medium my-10 500res:text-3xl">Edit profile</h2>
        <div className="mb-5">
          <h3 className="text-sm text-white/70 mb-2">Avatar ( max 1000x1000 )</h3>
          <div className="flex gap-4 items-center">
            <img src={img} className="bg-center bg-no-repeat bg-cover flex-shrink-0 rounded-full w-[90px] h-[90px] object-cover" alt='avatar'></img>
            <div className="flex flex-col gap-2 items-center">
              <div className=" relative btn-base bg-white text-def-black w-min h-min !rounded-3xl 500res:!text-sm 500res:p-3">
                <h1 onClick={()=>setActive(true)}>Change</h1>
                <AvatarMenu active={active} setActive={setActive} setImg={setImg}/>
              </div>
              <h1 className="text-sm text-white/70 500res:text-xs">Img only</h1>
            </div>          
          </div>      
        </div>
        <div className="max-w-[500px] flex flex-col gap-0">
          <div className="my-3">
            <h3 className="text-sm text-white/70 mb-2">Username</h3>
            <div className="border-solid border-[2px] border-white/20 flex p-3 rounded-[10px] bg-transparent duration-300 items-center">
              <input type="text" placeholder={userName} required="" className="w-full h-full bg-transparent outline-none placeholder:font-normal placeholder:text-white/40 text-white" value={userName} onChange={e=>setUserName(e.target.value)}/>
            </div>
          </div>
          <div className="my-3">
            <h3 className="text-sm text-white/70 mb-2">Bio</h3>
            <div className="border-solid border-[2px] border-white/20 flex p-3 rounded-[10px] bg-transparent duration-300 items-center">
              <textarea placeholder="Your new bio..." className="w-full h-full bg-transparent outline-none placeholder:font-normal placeholder:text-white/40 text-white" maxLength="500" rows="5" cols="20" value={bio} onChange={e=>setBio(e.target.value)}></textarea>
            </div>
          </div>
          <div className=" flex gap-3 my-5">
            <button className={`${!hasChanged && 'btn-disabled'} bg-white text-def-black btn-base`} onClick={onSave}>Save</button>
            <button className={`${!hasChanged && 'btn-disabled'} btn-base bg-def-gray text-white`} onClick={onReset}>Reset</button>
          </div>
        </div>
      </div>
      <button onClick={onHandleOut} className="btn-base bg-red-500 text-white flex justify-center items-center gap-3 mt-10 w-full">
        <img src={out} alt="out" />
        <h1>Log Out</h1>
      </button>
    </main>
  );
}

export default Settings;