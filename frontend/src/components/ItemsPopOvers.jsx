import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { createAxios } from "../redux/createInstance";
import {
  updateNotification,
  getNotification,
  getAllFolder,
} from "../redux/apiRequest";

function ItemsPopOvers({ id, icon, content, color }) {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const isDispatch = useDispatch();
  let axiosJWT = createAxios(user, isDispatch, loginSuccess);
  const [isVisible, setVisible] = useState(false);
  const handleAccept = () => {
    const isState = {
      _id: id,
      isActive: true,
    };
    updateNotification(user?.accessToken, isState, isDispatch, axiosJWT);
    getNotification(user?.accessToken, user?._id, isDispatch, axiosJWT);
    getAllFolder(user?.accessToken, user?._id, isDispatch, axiosJWT);
  };
  const handleReject = () => {
    const isState = {
      _id: id,
      delete: true,
    };
    updateNotification(user?.accessToken, isState, isDispatch, axiosJWT);
    getNotification(user?.accessToken, user?._id, isDispatch, axiosJWT);
    getAllFolder(user?.accessToken, user?._id, isDispatch, axiosJWT);
  };
  return (
    <div>
      <div className="px-3 pt-5 grid place-content-center grid-cols-5">
        <div className="w-[3.1rem] h-[3.1rem] bg-white rounded-full flex relative shrink-0 items-center justify-center">
          <i
            className={`fa-regular text-lg fa-${icon}`}
            style={{
              color: color,
            }}></i>
          <span className="inline-flex absolute left-[1.8rem] top-[2.1rem] justify-center items-center w-6 h-6 bg-blue-600 rounded-full text-white">
            <i className="fa-solid fa-bell text-sm"></i>
            <span className="sr-only">Message icon</span>
          </span>
        </div>
        <div className="col-span-3">
          <span>You have a invitation to {content} group</span>
        </div>
        <button
          className="font-extrabold"
          onClick={() => setVisible(!isVisible)}>
          ...
        </button>
      </div>
      <div className="relative">
        <div
          className={`absolute w-36 left-32 bg-white rounded-lg overflow-hidden transform shadow-xl ${
            !isVisible && "hidden"
          }`}>
          <button
            className="text-black block px-4 py-2 text-sm"
            role="menuitem"
            tabIndex="-1"
            id="menu-item-0"
            onClick={handleAccept}>
            Accept
          </button>
          <button
            className="text-black block px-4 py-2 text-sm"
            role="menuitem"
            tabIndex="-1"
            id="menu-item-1"
            onClick={handleReject}>
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemsPopOvers;
