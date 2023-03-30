import React from "react";
import { useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Store } from "../context/GobalState";
import { createAxios } from "../redux/createInstance";
import { loginSuccess } from "../redux/authSlice";
import { getAllMember, leaveGroup, getAllFolder } from "../redux/apiRequest";
const RightSideBar = () => {
  const { state, dispatch } = useContext(Store);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const isDispatch = useDispatch();
  let axiosJWT = createAxios(user, isDispatch, loginSuccess);
  const member = useSelector((state) => state.members.members?.all);
  const stateRightSideBar = state.isRightSideBar;
  const adminUser =
    stateRightSideBar &&
    member?.filter((admin) => {
      const canDelete = admin.isAdmin;
      return canDelete;
    });
  const manageFolder = stateRightSideBar &&
    adminUser[0]?._idUser === user?._id && (
      <div className="grid w-54 h-38 content-center m-3 bg-white dark:bg-slate-600  rounded-md shadow-[2px_4px_20px_2px_#BFDBFE] dark:shadow-[2px_4px_20px_2px_#2a4582]">
        <div className="p-3">
          <label className="text-black dark:text-white text-md">Settings</label>
        </div>
        <div className="mx-3 pb-3 border-b-2 border-gray-500">
          <button
            href=""
            onClick={() =>
              dispatch({ type: "isUpdateFolderModal", payload: true })
            }
            className="text-black dark:text-white text-md ">
            <i className="fa-solid fa-pen-to-square text-orange-400"></i>
            <span className="pl-2">Update folder</span>
          </button>
        </div>
        <div className="p-3">
          <button
            onClick={() => dispatch({ type: "isToast", payload: true })}
            className="text-black dark:text-white text-md">
            <i className="fa-solid fa-trash text-greatRed"></i>
            <span className="pl-2">Delete folder</span>
          </button>
        </div>
      </div>
    );
  const handleDeleteMember = () => {
    const member = {
      idUser: user?._id,
      idFolder: state.isFolder?.id,
    };
    leaveGroup(user?.accessToken, member, isDispatch, axiosJWT).then(() => {
      dispatch({ type: "isRightSideBar", payload: false });
      dispatch({ type: "isSideBarItem", payload: false });
      dispatch({ type: "isReset" });
      getAllFolder(user?.accessToken, user?._id, isDispatch, axiosJWT);
    });
  };
  const leaveGroupButton = stateRightSideBar &&
    adminUser[0]?._idUser !== user?._id && (
      <div className="grid w-54 h-38 content-center m-3 bg-white dark:bg-slate-600  rounded-md shadow-[2px_4px_20px_2px_#BFDBFE] dark:shadow-[2px_4px_20px_2px_#2a4582]">
        <div className="p-3">
          <button
            onClick={handleDeleteMember}
            className="text-black dark:text-white text-md">
            <i className="fa-solid fa-right-from-bracket text-greatRed"></i>
            <span className="pl-2">Leave group</span>
          </button>
        </div>
      </div>
    );
  useEffect(() => {
    getAllMember(user?.accessToken, state.isFolder?.id, isDispatch, axiosJWT);
  }, [stateRightSideBar]);

  return (
    <aside
      className={`xs:w-1/3 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/4 2xl:w-1/4 fixed z-40 right-0 h-screen bg-[#F0F5FE] dark:bg-gray-800 transition-all ease-in duration-200 transform-gpu ${
        stateRightSideBar ? " translate-x-0" : "translate-x-full"
      }`}>
      <div className="flex justify-center items-center my-5 ">
        <label className=" text-black text-xl font-bold dark:text-white truncate ...">
          Folder information
        </label>
      </div>
      <div className="grid w-54 h-38 content-center m-3 bg-white dark:bg-slate-600  rounded-md shadow-[2px_4px_20px_2px_#BFDBFE] dark:shadow-[2px_4px_20px_2px_#2a4582]">
        <div className="p-3 ">
          <label className="text-black dark:text-white text-md">
            Infomation members
          </label>
        </div>
        <div className="mx-3 pb-3 border-b-2 border-gray-500">
          <i className="fa-solid fa-user-group text-greatBlue"></i>
          <span className="text-black dark:text-white text-md ml-3">
            {member?.length} member
          </span>
        </div>
        <div className="m-3">
          <button
            onClick={() => dispatch({ type: "isSearchMember", payload: true })}
            className="">
            <i className="fa-solid fa-gear text-black dark:text-white"></i>
            <span className="text-black dark:text-white text-md ml-3">
              Manager member
            </span>
          </button>
        </div>
      </div>
      {manageFolder}
      {leaveGroupButton}
    </aside>
  );
};

export default RightSideBar;
