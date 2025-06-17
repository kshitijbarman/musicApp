import React, { useState } from "react";
import { MdKeyboardArrowDown, MdDarkMode } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/themeSlice";
import { IoIosSunny } from "react-icons/io";
import { setSearchQuery } from "../redux/searchSlice";

const Navbar = () => {
  const darkMode = useSelector((state) => state.theme.darkMode); 
  const dispatch = useDispatch();
  const [search,setSearch]=useState('')

  const handleSearch = (e) => {
    setSearch(e.target.value);
    dispatch(setSearchQuery(e.target.value)); // Dispatch action
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-3 px-5 shadow-md 
        ${darkMode ? "bg-[#f5f5f5] " : "bg-black text-white border-b "}`}
    >
      <div className="lg:flex items-center">
        <div className="flex gap-2 items-center">
          <img src="/savan-logo.png" className="w-10" alt="Logo" />
          <Link to="/" className="font-semibold text-lg md:text-xl lg:hidden xl:block">
            JioSavan
          </Link>
        </div>

        <ul className="flex md:hidden lg:flex gap-3 text-base font-semibold pl-5">
          <li className="cursor-pointer text-2xl lg:text-base">Music</li>
          <NavLink to='/playlist'><li className="cursor-pointer text-2xl lg:text-base">PlayList</li></NavLink>
          <li className="cursor-pointer hidden lg:block">Pro</li>
        </ul>
      </div>

      <div className="hidden xl:block bg-white rounded-3xl text-center">
        <input
          type="text"
          name="search"
          id="search"
          onChange={handleSearch}
          className="py-2 px-4 w-[40vw] rounded-3xl border border-gray-300 text-black outline-none"
          placeholder="⌕ Search "
          autoComplete="off"
          autoCorrect="off"
        />
      </div>
        
      <div className="lg:flex items-center gap-4">
        <div className="flex items-center">
         
          <button onClick={() => dispatch(toggleTheme())} className="pr-5 text-2xl">
          {darkMode?<MdDarkMode/>:<IoIosSunny/>}
            {/* <MdDarkMode /> */}
          </button>

          <div className="flex flex-col text-sm font-semibold">
            <span className={`text-gray-600 text-[14px] md:text-lg flex flex-col text-sm font-semibold ${darkMode?'bg-[#f5f5f5]':'bg-black text-white'}`}>Music Languages</span>
            <span className={`text-gray-500 text-[12px] hidden ${darkMode?'bg-[#f5f5f5]':'bg-black text-white'} lg:block`}>Hindi</span>
          </div>
          <MdKeyboardArrowDown className="text-xl text-gray-500 ml-1" />
        </div>

        <ul className={`hidden lg:flex gap-5 text-gray-600 font-semibold ${darkMode?'bg-[#f5f5f5]':'bg-black text-white'}`}>
          <NavLink to="/login">
            <li className="cursor-pointer">Log In</li>
          </NavLink>
          <NavLink to="/sign-up">
            <li className="cursor-pointer">Sign Up</li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
