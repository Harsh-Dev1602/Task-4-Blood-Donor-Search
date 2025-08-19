import React from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useAuth } from "../Context/AuthProvider.jsx";
import Logo from './Logo.jsx';

function LogIn() {
  const [authUser, setAuthUser] = useAuth();
  const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful }, } = useForm()
  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    // console.log(userInfo);
    axios.post("/api/user/login", userInfo)
      .then((response) => {
        if (response.data) {
          toast.success("Login successfully");
        }
        sessionStorage.setItem("Blood Donor", JSON.stringify(response.data));
        setAuthUser(response.data);

      })
      .catch((error) => {
        if (error.response) {
          toast.error("Error: " + error.response.data.error);
        }
      });
  };

  return (
    <>
        <div style={{ maxHeight: "100vh" }}  className='w-full h-screen'>
      <div style={{ minHeight: "100vh" }} className="overflow-y-auto  Img_Bg flex flex-col gap-5 lg:flex-row justify-evenly items-center ">
          <Logo />
          <form onSubmit={handleSubmit(onSubmit)} className='w-full md:w-[450px] p-5 Box_Shedow bg-white rounded-xl flex justify-center items-center flex-col gap-5 animate__animated animate__flipInY'>
            <h1 className="bg-gradient-to-r from-[#CB0404] via-[#C562AF] to-[#FE5D26] bg-clip-text text-transparent p-2 font-bold text-2xl md:text-4xl">User Log In</h1>

            <div className="w-full h-auto">
              <input  {...register("email", { required: true })} type="email" className='w-full p-2 outline-none  text-xl rounded-xl shadow-sm shadow-[#cccc]' placeholder='Enter a email ' />
              {errors.email && <span className=' text-red-600 font-semibold text-md'>This field is required</span>}
            </div>
            <div className="w-full h-auto">
              <input  {...register("password", { required: true })} type="password" className='w-full p-2 outline-none  text-xl rounded-xl shadow-sm shadow-[#cccc]' placeholder='Enter a password' />
              {errors.password && <span className=' text-red-600 font-semibold text-md'>This field is required</span>}
            </div>

            <button className="w-full bg-gradient-to-r from-[#CB0404] via-[#C562AF] to-[#FE5D26]  cursor-pointer hover:bg-sky-700   text-white rounded-xl text-2xl p-3" >Log In</button>
            <Link to="register">
              <span className='hover:text-blue-800 cursor-pointer hover:underline font-bold text-center'>Create your new blood donor account</span>
            </Link>
          </form>
        </div>
      </div>
    </>
  )
}

export default LogIn;