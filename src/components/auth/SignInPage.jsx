import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { singInToAccount } from '../../store/authSlice'
import { Link } from 'react-router-dom'
import { message } from 'antd';
import Input from './Input'
import Preloader from '../../other/Preloader'

const SignInPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const {loading} = useSelector(state => state.user)
  const nav = useNavigate()
  const dispatch = useDispatch()

  const [messageApi, contextHolder] = message.useMessage();
  const errorMessage = (error) => {
    messageApi.open({
      type: 'error',
      content: error,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    if (email === '' || password === '') {
      setError(true)
    } else {
      const formData = new FormData()
      formData.append('email', email)
      formData.append('password', password)

      dispatch(singInToAccount({ email, password, nav, errorMessage }))
      setError(false)
    }
  }

  useEffect(() => {
    document.title = 'JumCloud - Authentication'
  }, [])

  if(loading) return <Preloader/>
  return (
    <main className="w-full flex justify-center items-center relative" style={{ height: `${window.outerHeight - 125}px` }}>
      {contextHolder}
      <section className="flex items-center justify-center flex-col px-[4em] w-[50em] pt-28 relative z-10">
        <div className="pb-[1em] font-[600]">
          <h1 className="text-6xl 1480res:text-4xl 1000res:text-3xl">Log In</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-[1em] pt-[1%] w-full">
          <Input title='Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input title='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <div className="w-full flex items-center flex-col gap-3">
            <button type="submit" className="bg-red-700 px-[1em] py-[.5em] font-semibold text-5xl 1480res:text-2xl 1000res:text-1xl rounded-lg hover:bg-red-600 mt-[1%]">Log In</button>
            <p className="text-red-600 text-3xl 1480res:text-base 1000res:text-sm">{error ? 'Заполните все поля' : false}</p>
          </div>
          <div>
            <p className='text-3xl 1480res:text-base 1000res:text-sm'>If you don't have an account, <Link className='text-blue-500' to='/registration'>register</Link></p>
          </div>
        </form>
      </section>
    </main>
  )
}

export default SignInPage