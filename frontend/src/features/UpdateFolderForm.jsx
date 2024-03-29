import React from "react";
import { useState, useContext } from "react";
import FolderGroupIcon from "../components/FolderGroupIcon";
import { Store } from "../context/GobalState";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../redux/createInstance";
import { loginSuccess } from "../redux/authSlice";
import { getAllFolder, updateFolder } from "../redux/apiRequest";

const UpdateFolderForm = () => {
  const { state, dispatch } = useContext(Store);
  const [isfolderName, setFolderName] = useState(state.isFolder.name);
  const [isIcon, setIconValue] = useState(state.isFolder.icon);
  const [isColor, setColorValue] = useState(state.isFolder.color);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const isDispatch = useDispatch();
  let axiosJWT = createAxios(user, isDispatch, loginSuccess);
  // let axiosJWTReload = createAxios(user, isDispatch, loginSuccess);

  const handleUpdateFolder = async (e) => {
    e.preventDefault();
    if (user?.accessToken) {
      const newFolder = {
        newName: isfolderName,
        newIcon: isIcon,
        newColor: isColor.toUpperCase(),
      };
      await updateFolder(
        user?.accessToken,
        state.isFolder.id,
        newFolder,
        isDispatch,
        axiosJWT
      );
      await getAllFolder(
        user?.accessToken,
        user?._id,
        isDispatch,
        axiosJWT
      ).then(() =>
        dispatch({
          type: "isFolder",
          payload: {
            ...state.isFolder,
            name: isfolderName,
            icon: isIcon,
            color: isColor,
          },
        })
      );
      //call func theo thứ tự
    }
  };
  return (
    <form onSubmit={handleUpdateFolder}>
      <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <label>Name</label>
        <input
          type="text"
          className="w-full bg-white rounded-md p-2 mt-2 mb-3 focus-visible:outline-none caret-greatBlue"
          onChange={(e) => setFolderName(e.target.value)}
          autoFocus
          value={isfolderName}
        />
        <label>Icon</label>
        <div className="w-full bg-white rounded-md p-2 mt-2 mb-3">
          <FolderGroupIcon getName={setIconValue} class={isIcon} />
        </div>
        <label>Color</label>
        <div className="flex flex-row w-full bg-white rounded-md p-2 mt-2 mb-3 justify-between">
          <input
            type="color"
            className="w-7 h-7 rounded-full border-white"
            defaultValue={state.isFolder.color}
            onChange={(e) => setColorValue(e.target.value)}
          />
          <span className="text-greatBlue">{state.isFolder.color}</span>
        </div>
      </div>
      <div className="px-4 py-3 text-right">
        <button
          type="button"
          className="mt-2 lg:mt-10 xl:mt-10 text-white bg-gradient-to-br from-greatGreen to-greatRed hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-white dark:focus:ring-greatblue font-medium rounded-lg text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={() => {
            dispatch({ type: "isUpdateFolderModal", payload: false });
          }}>
          {
            //handle click cancel button
          }
          <i className="fas fa-times"></i> Cancel
        </button>
        <button
          className="my-5 mx-5 lg:mt-10 xl:mt-10 text-white bg-gradient-to-br from-greatGreen to-greatBlue hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-white dark:focus:ring-greatblue font-medium rounded-lg text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-sm px-5 py-2.5 text-center mr-2 mb-2"
          // type="submit"
        >
          <i className="fas fa-plus"></i> Update
        </button>
      </div>
    </form>
  );
};

export default UpdateFolderForm;
