import React from "react";
import { useContext, useState } from "react";
import { Store } from "../context/GobalState";
const RightSideBar = () => {
  const { state, dispatch } = useContext(Store);

  return (
    <aside
      className={`xs:w-1/3 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/4 2xl:w-1/4 fixed z-40 right-0 h-screen bg-[#F0F5FE] dark:bg-gray-800 transition-all ease-in duration-200 transform-gpu ${
        state.isRightSideBar ? " translate-x-0" : "translate-x-full"
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
            1 member
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
      <div className="grid w-54 h-38 content-center m-3 bg-white dark:bg-slate-600  rounded-md shadow-[2px_4px_20px_2px_#BFDBFE] dark:shadow-[2px_4px_20px_2px_#2a4582]">
        <div className="p-3">
          <label className="text-black dark:text-white text-md">Settings</label>
        </div>
        {/* <div className="p-3">
          <a className="text-white text-md">
            <i className="fa-solid fa-user-plus text-greatGreen"></i>
            <span className="pl-2">Add member</span>
          </a>
        </div> */}
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
    </aside>
  );
};

export default RightSideBar;
