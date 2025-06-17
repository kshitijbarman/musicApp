// import React from "react";
// import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";


// const Slidebar = () => {
//   return (
//     <Sidebar >
//       <Menu className="pl-5 text-sm ">
//         <h2 className=" text-center py-2">BROWSER</h2>
//         <MenuItem> New Releases </MenuItem>
//         <MenuItem> Top Charts </MenuItem>
//         <MenuItem> Top Playlists </MenuItem>
//         <MenuItem> Podcasts </MenuItem>
//         <MenuItem> Top Artists </MenuItem>
//         <MenuItem> Radio </MenuItem>
//         <h2 className="py-2 text-center">Library</h2>
//         <MenuItem> History </MenuItem>
//         <MenuItem> Liked Songs </MenuItem>
//         <MenuItem>  Albums </MenuItem>
//         <MenuItem> Podcasts </MenuItem>
//         <MenuItem> Artists </MenuItem>
//       </Menu>
//     </Sidebar>
//   );
// };

// export default Slidebar;




























// import React from "react";
// import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";

// const Slidebar = () => {
//   return (
//     <Sidebar className="h-[80vh]   rounded-lg">
//       <Menu className="pl-5 text-sm">
//         <h2 className="text-center py-2 text-gray-700">BROWSER</h2>
//         <MenuItem> New Releases </MenuItem>
//         <MenuItem> Top Charts </MenuItem>
//         <MenuItem> Top Playlists </MenuItem>
//         <MenuItem> Podcasts </MenuItem>
//         <MenuItem> Top Artists </MenuItem>
//         <MenuItem> Radio </MenuItem>

//         <h2 className="py-2 text-center text-gray-700">LIBRARY</h2>
//         <MenuItem> History </MenuItem>
//         <MenuItem> Liked Songs </MenuItem>
//         <MenuItem> Albums </MenuItem>
//         <MenuItem> Podcasts </MenuItem>
//         <MenuItem> Artists </MenuItem>
//       </Menu>
//     </Sidebar>
//   );
// };

// export default Slidebar;




















import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/themeSlice";
import { NavLink } from "react-router-dom";
import PlayListPage from './../pages/PlayListPage';


const Slidebar = () => {
   const darkMode = useSelector((state) => state.theme.darkMode); 
    const dispatch = useDispatch();
  
  return (
    <Sidebar className='h-[57vh] rounded-lg pt-20'>
      {/* <Menu className={`pl-5 text-sm space-y-1 ${darkMode ? 'bg-[#f5f5f5]' : 'bg-black text-white'}`} > */}
      <Menu className={`pl-5 text-sm space-y-1 ${darkMode ? 'bg-[#f5f5f5]' : 'bg-black text-white'}`} >
        {/* <h2 className={`text-center py-1 pt-20 text-gray-800 ${darkMode ? 'bg-[#f5f5f5]' : 'bg-black text-white'}`}>BROWSER</h2>
        <MenuItem className="py-1"> New Releases </MenuItem>
        <MenuItem className="py-1"> Top Charts </MenuItem>
        <MenuItem className="py-1"> Top Playlists </MenuItem>
        <MenuItem className="py-1"> Podcasts </MenuItem>
        <MenuItem className="py-1"> Top Artists </MenuItem>
        <MenuItem className="py-1"> Radio </MenuItem> */}

        <h2 className={`py-1 text-center text-gray-800 ${darkMode ? 'bg-[#f5f5f5]' : 'bg-black text-white'}`}>LIBRARY</h2>
        <NavLink to='/artist'> <MenuItem className="py-1"> Artists </MenuItem></NavLink>
        <NavLink to='/playlist'> <MenuItem className="py-1" > Liked Songs </MenuItem></NavLink>
        <NavLink to='/album'><MenuItem className="py-1"> Albums </MenuItem></NavLink>
        <MenuItem className="py-1"> Podcasts </MenuItem>
        <MenuItem className="py-1"> History </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default Slidebar;
