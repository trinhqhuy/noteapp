import { useContext, lazy, Suspense } from "react";
import Logo from "../assets/Logo.v1.png";
import SearchBar from "./SearchBar";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../redux/authSlice";
import { createAxios } from "../redux/createInstance";
import { getAllFolder, getNotification } from "../redux/apiRequest";
import ShowMoreSideBarBtn from "./ShowMoreSideBarBtn";
import Profile from "./Profile";
import { Store } from "../context/GobalState";
import { updateNotification } from "../redux/apiRequest";
const NavBar = ({ notification }) => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const { state, dispatch } = useContext(Store);
  const isDispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(user, isDispatch, loginSuccess);
  const handleClickReset = async () => {
    if (!user) {
      navigate("/login");
    }
    if (user?.accessToken) {
      dispatch({ type: "isRightSideBar", payload: false });
      dispatch({ type: "isSideBarItem", payload: false });
      dispatch({ type: "isReset" });
      await getAllFolder(user?.accessToken, user?._id, isDispatch, axiosJWT);
    }
  };

  const seenNotification = async () => {
    const isState = {
      idUser: user?._id,
      isNoti: true,
      isSeenNoti: true,
    };
    await updateNotification(user?.accessToken, isState, isDispatch, axiosJWT);
    await getNotification(user?.accessToken, user?._id, isDispatch, axiosJWT);
  };
  const notiCount = notification?.length - 1;
  const notifi = notification[notiCount]?.notiLength > 0 && (
    <div className="relative z-10 left-[12px] bottom-[1.8rem] flex flex-row justify-center items-center w-5 h-5 bg-greatRed rounded-full text-white font-medium shadow-[1px_1px_15px_1px_#FF5365]">
      <span>{notification[notiCount]?.notiLength}</span>
    </div>
  );
  return (
    <div className="sticky top-0 z-40 px-2  bg-[#F0F5FE] dark:bg-gray-800 ">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <div className="">
          <NavLink onClick={handleClickReset} href="/">
            <div className="flex flex-row justify-center md:justify-end lg:justify-end xl:justify-end items-center md:items-end lg:items-end xl:items-end 2xl:items-end content-center md:content-end lg:content-end xl:content-end 2xl:content-end ">
              <img
                className="w-[3.3rem] md:w-[4.5rem] lg:w-[4.5rem] xl:w-[4.5rem] m-5 mr-1 hidden md:block lg:block xl:block 2xl:block "
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
            className="block md:hidden lg:hidden xl:hidden 2xl:hidden w-10 h-10 hover:bg-lightBlue hover:rounded-full focus:bg-lightBlue focus:rounded-full "
            onClick={() => dispatch({ type: "isHamberger" })}>
            <i className="fa-solid fa-bars text-black dark:text-white"></i>
          </button>
        </div>
        <div className="md:hidden lg:hidden xl:hidden 2xl:hidden ">
          <NavLink onClick={handleClickReset} href="/">
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
          {/* {toValueChild == 0 ? <></> : <SearchBar />} */}
        </div>
        {
          //profile btn
        }
        <div className="flex items-center ">
          <button
            className=" w-10 h-10 hover:bg-lightBlue hover:rounded-full focus:bg-lightBlue focus:rounded-full "
            onClick={async () => {
              await seenNotification();
              await dispatch({
                type: "isPopOversNotificaton",
                payload: !state.isPopOversNotificaton,
              });
            }}>
            <div className="py-1 px-2">
              <i className="fa-regular fa-bell text-black dark:text-white text-lg "></i>
              {notifi}
            </div>
          </button>
          <Profile avatar={user?.avatar} username={user?.username} />
          {state.isSideBarItem ? <ShowMoreSideBarBtn /> : <></>}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
