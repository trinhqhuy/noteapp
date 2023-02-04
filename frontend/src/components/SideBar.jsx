import FolderItem from "./FolderItem";
import { ButtonContext } from "../context/AppContext";
import { useContext, useState } from "react";
const SideBar = (props) => {
  const handleClick = (id) => {
    //show Right side
    // props.sendToParent(false)
    props.sendValueToParent(id);
    //show id of Folder Item
    // console.log(id)
  };
  //  console.log();
  //  console.log(props.sendFolderList);
  // console.log(folderList);
  // theem vao  ben duoi neu muon nut xem them
  const isShow = useContext(ButtonContext);
  return (
    <aside
      className={
        isShow.state.isClickHambergerBtn
          ? " w-1/2  md:visible lg:visible xl:visible sm:w-1/3 md:w-1/4 fixed z-30 md:sticky lg:sticky xl:sticky 2xl:sticky  h-screen bg-[#F0F5FE] dark:bg-gray-800 transition-all ease-in-out delay-150 -translate-y-1 duration-300 motion-safe:scale-100 scale-140 transform-gpu"
          : "invisible w-0 md:visible lg:visible xl:visible  md:w-1/4 lg:w-1/5 xl:w-1/5 fixed z-30 md:sticky lg:sticky xl:sticky 2xl:sticky top-22 h-[calc(100vh_-_10rem)] bg-[#F0F5FE] dark:bg-gray-800 "
      }
      aria-label="Sidebar">
      <div className="overflow-y-auto bg-[#F0F5FE] dark:bg-gray-800">
        <div className="flex justify-between justify-items-center items-center p-5">
          <div className="text-black text-xl font-bold dark:text-white truncate ...">
            Folder
          </div>
          <a
            href="#"
            onClick={() =>
              isShow.setState({
                ...isShow.state,
                isClickAddFolderModal: true,
              })
            }
            className="group h-9 flex flex-row items-center justify-center py-3 bg-greatBlue p-3 shadow-[5px_10px_25px_10px_#BFDBFE] dark:shadow-[2px_4px_25px_5px_#2a4582] text-gray-900 rounded-lg dark:text-white hover:bg-greatBlue/70">
            <i className="fa-regular fa-folders text-white"></i>
            <span className="pl-3 text-md md:text-lg lg:text-lg xl:text-xl 2xl:text-xl font-bold text-white truncate ...">
              New
            </span>
            <span className="group-hover:flex group-hover:w-[100px] justify-center hidden group-hover:absolute group-hover:top-[62px] group-hover:right-[-63px] group-hover:bg-white group-hover:p-2 rounded-full text-black dark:group-hover:text-white dark:group-hover:bg-gray-400 ">
              Add folder
            </span>
            <span className="group-hover:bg-white before:content-[''] group-hover:origin-center group-hover:rotate-45 group-hover:h-[10px] group-hover:w-[10px] group-hover:absolute group-hover:right-[16px] group-hover:top-[60px] dark:group-hover:bg-gray-400"></span>
          </a>
        </div>
        <div className="scroll-smooth ">
          <div className="max-h-[calc(100vh_-_10rem)] scrollbar-hidden overflow-y-auto scroll-smooth py-5">
            <FolderItem
              sendToParent={handleClick}
              folderArray={props?.sendFolderList}
              // folderArray={folderArray}
            />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
