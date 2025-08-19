import React from 'react'
import axios from "axios";
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom';
import { useAuth } from "../Context/AuthProvider.jsx";
import Logo from './Logo.jsx';

function Register() {
    const [authUser, setAuthUser] = useAuth();

    const AllGender = [
        {
            id: 0,
            text: "Select Gender",
            value: "",
        },
        {
            id: 1,
            text: "Male",
            value: "male",
        },
        {
            id: 2,
            text: "Female",
            value: "female",
        },
        {
            id: 3,
            text: "Other",
            value: "other",
        },
    ];

    const AllBloodGroup = [
        {
            id: 0,
            text: "Select bloodGroup",
            value: "",
        },
        {
            id: 1,
            text: "A+",
            value: "A+",
        },
        {
            id: 2,
            text: "B+",
            value: "B+",
        },
        {
            id: 3,
            text: "O+",
            value: "O+",
        },
        {
            id: 4,
            text: "O-",
            value: "O-",
        },
    ];

    const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm();

    React.useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    const onSubmit = async (data) => {
        const userInfo = {
            fullname: data.fullname,
            email: data.email,
            mobile: data.mobile,
            gender: data.gender,
            bloodGroup: data.bloodGroup,
            city: data.city,
            aadharNumber: data.aadharNumber,
            password: data.password
        };

        console.log(userInfo)

        await axios.post("/api/user/register", userInfo)
            .then((response) => {
                if (response.data) {
                    toast.success("Register successfully..");
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
            <div style={{ maxHeight: "100vh" }} className=" w-full h-screen " >
                <div style={{ minHeight: "100vh" }} className=' overflow-y-auto Img_Bg flex flex-col gap-5 lg:flex-row  justify-evenly items-center' >
                    <Logo />
                    <form  onSubmit={handleSubmit(onSubmit)} className='w-full md:w-[450px] p-5 Box_Shedow  bg-white rounded-xl flex justify-center items-center flex-col gap-5 animate__animated animate__flipInY'>
                        <h1 className="bg-gradient-to-r from-[#CB0404] via-[#C562AF] to-[#FE5D26] bg-clip-text text-transparent p-2 font-bold text-2xl md:text-4xl">User Registration</h1>
                        <div className="w-full h-auto">
                            <input type="text" {...register("fullname", { required: true })} className='w-full p-2 outline-none  text-xl  rounded-xl shadow-sm shadow-[#cccc]' placeholder='Enter a full name' />
                            {errors.fullname && <span className=" text-red-600 font-semibold text-md">This field is required</span>}
                        </div>
                        <div className="w-full h-auto">
                            <input type="email" {...register("email", { required: true })} className='w-full p-2 outline-none  text-xl rounded-xl shadow-sm shadow-[#cccc]' placeholder='Enter a email ' />
                            {errors.email && <span className=" text-red-600 font-semibold text-md">This field is required</span>}
                        </div>
                        <div className="w-full h-auto">
                            <input type="number" {...register("mobile", { required: true })} className='w-full p-2 outline-none  text-xl rounded-xl shadow-sm shadow-[#cccc]' placeholder='Enter a Mobile Number ' />
                            {errors.mobile && <span className=" text-red-600 font-semibold text-md">This field is required</span>}
                        </div>

                        <div className="w-full h-auto">
                            <select {...register("gender", { required: true })} className='w-full p-2 outline-none text-xl cursor-pointer text-center rounded-xl shadow-sm shadow-[#cccc]'>
                                {
                                    AllGender.map(({ id, value, text }) => (<option key={id} value={value} className=" outline-none cursor-pointer " >{text}</option>))
                                }
                            </select>
                            {errors.gender && <span className=" text-red-600 font-semibold text-md">This field is required</span>}
                        </div>

                        <div className="w-full h-auto">
                            <select {...register("bloodGroup", { required: true })} className='w-full p-2 outline-none  text-xl cursor-pointer text-center rounded-xl shadow-sm shadow-[#cccc]'>
                                {
                                    AllBloodGroup.map(({ id, text, value }) => (<option key={id} value={value} className=" outline-none cursor-pointer ">{text}</option>))
                                }
                            </select>
                            {errors.bloodGroup && <span className=" text-red-600 font-semibold text-md">This field is required</span>}

                        </div>
                        <div className="w-full h-auto">
                            <input type="text" {...register("city", { required: true })} className='w-full p-2 outline-none  text-xl rounded-xl shadow-sm shadow-[#cccc]' placeholder='Enter a city' />
                            {errors.city && <span className=" text-red-600 font-semibold text-md">This field is required</span>}
                        </div>
                        <div className="w-full h-auto">
                            <input type="number" {...register("aadharNumber", { required: true })} className='w-full p-2 outline-none  text-xl rounded-xl shadow-sm shadow-[#cccc]' placeholder='Enter a valid Aadhar Number' />
                            {errors.aadharNumber && <span className=" text-red-600 font-semibold text-md">This field is required</span>}
                        </div>
                        <div className="w-full h-auto">
                            <input type="password" {...register("password", { required: true })} className='w-full p-2 outline-none  text-xl rounded-xl shadow-sm shadow-[#cccc]' placeholder='Enter a password' />
                            {errors.password && <span className=" text-red-600 font-semibold text-md">This field is required</span>}
                        </div>
                        <button className="w-full bg-gradient-to-r from-[#CB0404] via-[#C562AF] to-[#FE5D26]   text-white rounded-xl hover:bg-sky-700 cursor-pointer text-2xl p-3" >Register</button>
                        <Link to="/">
                            <span className=' hover:text-blue-800 cursor-pointer font-bold hover:underline text-center'>Already have an Blood Donor account Log In </span>
                        </Link>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register