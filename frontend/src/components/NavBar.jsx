import { useState } from "react";
import Logo from "../assets/Logo.v1.png";
import Profile from "./Profile";
import SearchBar from "./SearchBar";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { ButtonContext } from "../context/AppContext";
const NavBar = (props) => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const isClickBtn = useContext(ButtonContext);

  return (
    <div className="sticky top-0  z-50 px-2  bg-[#F0F5FE] dark:bg-gray-800 ">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <div className="">
          <NavLink
            onClick={() =>
              isClickBtn.setState({
                ...isClickBtn.state,
                isClickSideBarItem: false,
                isReset: !isClickBtn.state.isReset,
              })
            }
            href="/">
            <div className="flex flex-row justify-center md:justify-end lg:justify-end xl:justify-end items-center md:items-end lg:items-end xl:items-end 2xl:items-end content-center md:content-end lg:content-end xl:content-end 2xl:content-end ">
              <img
                className="w-[3.3rem] md:w-[4.5rem] lg:w-[4.5rem] xl:w-[4.5rem] m-5 mr-1 hidden md:block lg:block xl:block 2xl:block"
                src={Logo}
                alt="Logo"
                loading="lazy"
              />
              <span className="invisible md:visible lg:visible xl:visible text-3xl font-extrabold text-black dark:text-white m-5 ml-0 mb-4 hidden md:block lg:block xl:block 2xl:block ">
                otes.
              </span>
            </div>
          </NavLink>

          <button
            className="block  md:hidden lg:hidden xl:hidden 2xl:hidden w-16"
            onClick={() =>
              isClickBtn.setState({
                ...isClickBtn.state,
                isClickHambergerBtn: !isClickBtn.state.isClickHambergerBtn,
              })
            }>
            <i className="fa-solid fa-bars text-black dark:text-white"></i>
          </button>
        </div>
        <div className="md:hidden lg:hidden xl:hidden 2xl:hidden ">
          <NavLink onClick={() => props.isClickHome(0)} href="/">
            <img
              className="w-[3.3rem] md:w-[4.5rem] lg:w-[4.5rem] xl:w-[4.5rem] "
              src={Logo}
              alt="Logo"
              loading="lazy"
            />
          </NavLink>
        </div>

        {
          //search bar
        }
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          {props.toValueChild == 0 ? <></> : <SearchBar />}
        </div>
        {
          //profile btn
        }
        <Profile sendName={user?.username} />
      </div>
    </div>
  );
};

export default NavBar;
