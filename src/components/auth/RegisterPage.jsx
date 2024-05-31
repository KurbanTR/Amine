import { useState } from "react";
import { createAccount } from "../../store/authSlice";
import { useNavigate } from "react-router-dom"
import { useDispatch} from "react-redux"
import { message } from 'antd';

const RegisterPage = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [eror, setError] = useState(false)
  const [secPassword, setSecPassword] = useState('')
  const [errPassword, setErrPassword] = useState(false)
  const nav = useNavigate()
  const dispatch = useDispatch()

  // const {token} = useSelector(state => state.user)

  // const toast = useToast()
  // const statuses = ['success', 'error', 'warning', 'info']

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'You have successfully registered',
      // You have successfully logged in to your account
    });
  };
  const error = (errorReg) => {
    messageApi.open({
      type: 'error',
      content: errorReg
    });
  };

  const onHandleClick = () => {
    if(email ===  '' || password === ''){
      setError(true)
    }else{
      if(password !== secPassword){
        setErrPassword(true)
      }else{
        setError(false)
        setErrPassword(false)
        dispatch(createAccount({email, password, name, nav, success, errorReg: error}))
        setPassword('')
        setEmail('')
        setSecPassword('')
        setName('')
      }
    }
  }

  return (
    <>
      <main className="w-[100%] h-[100vh]  flex justify-center items-center">
        <section className=" flex items-center justify-center flex-col p-[4em] w-[50em]">
          <div className="pb-[100px] font-[600]">
            <h1 className="text-6xl ">Registration</h1>
          </div>
          <div className="flex flex-col items-center gap-[3em] pt-[40px] w-[100%]">
            <div className="w-[100%]">
              <p>NickName</p>
              <input type="email" value={name} placeholder="Your NickName" onChange={(e)=>setName(e.target.value)}  className="w-100% bg-[#606060] w-[100%] rounded-md px-5 py-4"/>
            </div>
            <div className="w-[100%]">
              <p>Email</p>
              <input type="email" value={email} placeholder="Your Email" onChange={(e)=>setEmail(e.target.value)}  className="w-100% bg-[#606060] w-[100%] rounded-md px-5 py-4"/>
            </div>
            <div className="w-[100%]">
              <p>Password</p>
              <input type="password" value={password} placeholder="Your Password" onChange={(e)=>setPassword(e.target.value)} className="w-[100%] bg-[#606060] rounded-md px-5 py-4 text-white"/>
            </div>
            <div className="w-[100%]">
              <p>Repeat Password</p>
              <input type="password" value={secPassword} placeholder="Your Password" onChange={(e)=>setSecPassword(e.target.value)} className="w-[100%] bg-[#606060] rounded-md px-5 py-4 text-white"/>
              <p className="text-red-600">{errPassword ? 'Пароли должны совпадать' : false}</p>
            </div>
            <div className="w-[100%] flex justify-center">
              <button onClick={onHandleClick} className="bg-red-700 px-[2em] py-[.6em] font-[600] text-2xl rounded-lg hover:bg-red-600 ">Register</button>
              <p className="text-red-600">{eror ? 'Заполните все поля' : false}</p>
            </div>
          </div>
        </section>
        {contextHolder}
      </main>
    </>
  );
};

export default RegisterPage;
