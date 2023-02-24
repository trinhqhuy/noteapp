import React from "react";
import Logo from "../assets/favicons.png";
import { deleteFolder } from "../redux/apiRequest";
import { createAxios } from "../redux/createInstance";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { useContext } from "react";
import { getAllFoler } from "../redux/apiRequest";
import { Store } from "../context/GobalState";
function Toast({ setToast, message, isDelete }) {
  const { state, dispatch } = useContext(Store);
  const isDispatch = useDispatch();
  const user = useSelector((state) => state.auth.login?.currentUser);
  let axiosJWT = createAxios(user, isDispatch, loginSuccess);
  const handleDeleteFolder = () => {
    deleteFolder(
      user?.accessToken,
      state.isFolder.id,
      isDispatch,
      axiosJWT
    ).then(() => {
      dispatch({ type: "isRightSideBar", payload: false });
      dispatch({ type: "isSideBarItem", payload: false });
      dispatch({ type: "isReset" });
      getAllFoler(user?.accessToken, user?._id, isDispatch, axiosJWT).then(() =>
        setToast(false)
      );
    });
  };
  return (
    <div
      id="toast-notification"
      className="fixed z-50 top-32 left-[50%] translate-y-[-50%] translate-x-[-50%] w-full max-w-xs text-gray-900 bg-white/70 backdrop-blur-xl border-2 border-white rounded-lg shadow"
      role="alert">
      <div className="flex items-center p-4">
        <span className="text-sm font-semibold text-gray-900">
          New notification
        </span>
        <button
          type="button"
          className="ml-auto -mx-1.5 -my-1.5  text-gray-500 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex h-8 w-8 "
          data-dismiss-target="#toast-notification"
          aria-label="Close"
          onClick={() => setToast(false)}>
          <span className="sr-only">Close</span>
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"></path>
          </svg>
        </button>
      </div>
      <div className="flex items-center mb-3  p-3">
        <div className="inline-block relative shrink-0">
          <img className="w-12 rounded-full" src={Logo} />
          <span className="inline-flex absolute right-0 bottom-0 justify-center items-center w-6 h-6 bg-blue-600 rounded-full text-white">
            <i className="fa-solid fa-bell text-sm"></i>
            <span className="sr-only">Message icon</span>
          </span>
        </div>
        <div className="ml-3 text-sm font-normal">
          {/* <div className="text-sm font-semibold text-gray-900">
            Bonnie Green
          </div> */}
          <div className="text-md font-normal">{message}</div>
          <span className="text-xs font-medium text-blue-600 dark:text-blue-500">
            a few seconds ago
          </span>
        </div>
      </div>
      {isDelete && (
        <div className="grid grid-cols-2 grid-flow-col mt-2 border-t-2 border-white">
          <div className="border-r-[1px] border-white grid justify-items-center">
            <button
              onClick={() => setToast(false)}
              type="button"
              className="text-greatBlue font-medium text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-sm px-5 py-2.5 text-center ">
              Cancel
            </button>
          </div>
          <div className="border-l-[1px] border-white grid justify-items-center">
            <button
              className=" text-greatRed  font-medium text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-sm px-5 py-2.5 text-center "
              // type="submit"
              onClick={handleDeleteFolder}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Toast;
