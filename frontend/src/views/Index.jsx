import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/Logo.v1.png";
import SideDesign from "../assets/illustrations/sidedesign.svg";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import darkSide from "../assets/illustrations/darksidedesign.svg";
function Index() {
  const currentUser = useSelector((state) => state.auth.login?.currentUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) {
      navigate("/home");
    }
  }, []);
  return (
    <div className="bg-white dark:bg-gray-800 h-screen">
      <div className="sticky top-0 z-40 px-2 bg-white dark:bg-gray-800 shadow-[40px_13px_115px_rgba(0_0,_0,_0.15)] dark:shadow-[40px_13px_115px_#2a4582]">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <div className="">
            <NavLink href="/">
              <div className="flex flex-row justify-center md:justify-end lg:justify-end xl:justify-end items-center md:items-end lg:items-end xl:items-end 2xl:items-end content-center md:content-end lg:content-end xl:content-end 2xl:content-end ">
                <img
                  className="w-[3.3rem] md:w-[4.5rem] lg:w-[4.5rem] xl:w-[4.5rem] m-5 mr-1 md:block lg:block xl:block 2xl:block"
                  src={Logo}
                  alt="Logo"
                  loading="lazy"
                />
              </div>
            </NavLink>
          </div>
          <div className="flex items-center ">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 bg-[#ADACFF] text-[#1F1CF1] m-2 rounded-lg text-lg font-semibold font-['Poppins']">
              Sign in
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-4 py-2 bg-[#69E04A] text-[#CCFFBF] m-2 rounded-lg text-lg font-semibold font-['Poppins']">
              Sign up
            </button>
          </div>
        </div>
      </div>
      <img
        className="dark:hidden fixed z-30 w-[500px] sm:w-[500px] md:w-[500px] lg:w-[500px] xl:w-[600px] 2xl:w-[700px] top-32 sm:top-20 md:top-20 lg:top-32 xl:top-36 2xl:top-40 left-0 sm:left-0 md:left-0 lg:left-20 xl:left-24 2xl:left-32"
        // width={500}
        src={SideDesign}
        loading="lazy"
      />
      <img
        className="hidden dark:block fixed z-20 w-[500px] sm:w-[500px] md:w-[500px] lg:w-[500px] xl:w-[600px] 2xl:w-[700px] top-32 sm:top-20 md:top-20 lg:top-32 xl:top-36 2xl:top-40 left-0 sm:left-0 md:left-0 lg:left-20 xl:left-24 2xl:left-32"
        // width={500}
        src={darkSide}
        loading="lazy"
      />
      <canvas className="w-96 sm:w-96 md:w-96 lg:w-[33rem] xl:w-[35rem] 2xl:w-[40rem] h-96 sm:h-96 md:h-96 lg:h-[33rem] xl:h-[35rem] 2xl:h-[40rem] right-0 bottom-0 absolute circle blur-[80px] lg:blur-[90px]"></canvas>
    </div>
  );
}

export default Index;
