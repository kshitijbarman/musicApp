import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/themeSlice";
import { NavLink } from "react-router-dom";

const Slidebar = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();

  return (
    <Sidebar className="h-[57vh] rounded-lg pt-20">
      <Menu
        className={`pl-5 text-sm space-y-1 ${
          darkMode ? "bg-[#f5f5f5]" : "bg-black text-white"
        }`}
      >
        <h2
          className={`py-1 text-center text-gray-800 ${
            darkMode ? "bg-[#f5f5f5]" : "bg-black text-white"
          }`}
        >
          LIBRARY
        </h2>

        {/* ✅ Fixed: pass NavLink as component to MenuItem */}
        <MenuItem component={<NavLink to="/artist" />} className="py-1">
          Artists
        </MenuItem>
        <MenuItem component={<NavLink to="/playlist" />} className="py-1">
          Liked Songs
        </MenuItem>
        <MenuItem component={<NavLink to="/album" />} className="py-1">
          Albums
        </MenuItem>

        <MenuItem className="py-1">Podcasts</MenuItem>
        <MenuItem className="py-1">History</MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default Slidebar;
