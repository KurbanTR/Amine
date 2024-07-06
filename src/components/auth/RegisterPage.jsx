import { useState } from 'react';
import Input from './Input';
import ErrorPage from '../page/ErrorPage'
import { useSelector } from 'react-redux';
import Preloader from '../../other/Preloader'

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secPassword, setSecPassword] = useState('');
  const [errPassword, setErrPassword] = useState(false);
  const { data, loading } = useSelector(state => state.profile)
  const [eror, setEror] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== secPassword) {
      setErrPassword(true);
    } else {
      setErrPassword(false);
    }

    if (!name || !email || !password || !secPassword) {
      setEror(true);
    } else {
      setEror(false);
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('secPassword', secPassword);

    console.log('Form submitted');
  };

  if(loading) return <Preloader/>
  if(data?.token) return <ErrorPage/>
  return (
    <main className="w-full flex justify-center items-center relative" style={{ height: `${window.outerHeight - 110}px` }}>
      <section className="flex items-center justify-center flex-col px-[4em] w-[50em] pt-20 relative z-10">
        <div className="pb-[1em] font-[600]">
          <h1 className="text-6xl 1480res:text-4xl 1000res:text-3xl">Registration</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-[1em] pt-[1%] w-full">
          <Input title='Name' type='name' value={name} onChange={(e) => setName(e.target.value)} />
          <Input title='Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input title='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <Input title='Repeat Password' type='password' value={secPassword} onChange={(e) => setSecPassword(e.target.value)} />
          <div className="w-full flex items-center flex-col gap-3">
            <p className="text-red-600 text-3xl 1480res:text-base 1000res:text-sm ">{eror && 'Fill in all the fields'}</p>
            <p className="text-red-600 text-3xl 1480res:text-base 1000res:text-sm ">{errPassword && 'The password must not be the same'}</p>
            <button type="submit" className="bg-red-700 px-[1em] py-[.5em] font-semibold text-5xl 1480res:text-2xl 1000res:text1xl rounded-lg hover:bg-red-600">Register</button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default RegistrationForm;