import React, { useState } from "react";
import { data, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setData } from "../redux/signupDataSlice";

const SignUpForm = () => {
  const dispatch =useDispatch()
  const [formData,setFormData]=useState({
    name:'',
    email:'',
    password:''
  })
  const navigate=useNavigate()

  const handleChange=(e)=>{
     setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handleSubmit=(e)=>{
     e.preventDefault()
     console.log(formData)
    //  localStorage.setItem('userInfo',JSON.stringify(formData))
    // dispatch(setData(formData))
    dispatch(setData({ name: formData.name, email: formData.email, password: formData.password }));

    alert("data saved in redux")
     setFormData({
     name:'',
     email:'',
     password:'',
    })
    navigate('/login')
  }
  return (
   
<div className='h-screen w-full flex items-center justify-center bg-amber=200'>
        <div className='hidden w-1/2 h-full bg-gray-800 lg:block'>
            <div className='flex gap-x-5 pt-5 pl-5'>
            <img src='/savan-logo.png' className='w-10'/>
            <h2 className='text-xl font-semi-bold text-white'>jiosaavn</h2>
            </div>
            <img src='https://staticweb6.jiosaavn.com/web6/jioindw/dist/1741237096/_i/artist/Nucleya.png' className='w-[25rem]  mx-auto mt-15'/>
            <h1 className='text-center text-3xl font-bold text-white'>All Your Music.</h1>
            <h1 className='text-center text-3xl font-bold text-gray-100'>Anytime, anywhere.</h1>
        </div>


        <div className='w-1/2 '>
        <div className='bg-gray-200 w-[22rem] min-h-[22rem] mx-auto  rounded-2xl'>
           <h1 className='text-center text-3xl font-semibold pt-5 pb-6'>SignUp</h1>
           <form onSubmit={handleSubmit}>
              <div className='px-5 space-y-3 '>
              <input type='text' name='name' value={formData.name}  placeholder='Enter Your name' required onChange={handleChange} className='border-b w-full py-2 px-2 outline-none' ></input>
              <input type='email' name='email' value={formData.email} placeholder='Enter Your Email' required onChange={handleChange} className='border-b w-full py-2 px-2 outline-none' ></input>
              <input type='password' name='password' value={formData.password}  placeholder='Enter Your password' required onChange={handleChange} className='border-b w-full py-2 px-2 outline-none' ></input>
              <button type='submit' className='bg-blue-600 w-full mt-3 py-2 text-white hover:bg-blue-700 font-semibold'>SignUp</button>
              </div>
           </form>
           <p className="text-center mt-3">Don't have an account? <span className="text-blue-500"><NavLink to='/login'>Login</NavLink></span></p>
       </div>
        </div>
      </div>
  )
};
export default SignUpForm;

