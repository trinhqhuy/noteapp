import React from "react";
import { useState } from "react";
import FolderGroupIcon from "../components/FolderGroupIcon";
import { addFolder } from "../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../redux/createInstance";
import { addFolderSuccess } from "../redux/folderSlide";
import { loginSuccess } from "../redux/authSlice";
import { getAllFolder } from "../redux/apiRequest";
import { Store } from "../context/GobalState";
import { useContext } from "react";

const AddFolerForm = (props) => {
  // const isClickCancelBtn = useContext(ButtonContext);
  const { state, dispatch } = useContext(Store);

  const [isName, setNameValue] = useState("");
  const [isIcon, setIconValue] = useState("");
  const [isColor, setColorValue] = useState("#B1FF03");
  const user = useSelector((state) => state.auth.login?.currentUser);
  const isDispatch = useDispatch();
  let axiosJWT = createAxios(user, isDispatch, loginSuccess);

  const handleFormAdd = async (e) => {
    e.preventDefault();
    if (user?.accessToken) {
      const newFoler = {
        name: isName,
        _idUser: user._id,
        icon: isIcon,
        color: isColor.toUpperCase(),
      };
      await addFolder(user?.accessToken, isDispatch, newFoler, axiosJWT);
      await getAllFolder(user?.accessToken, user?._id, isDispatch, axiosJWT);
      //call func theo thứ tự
    }
  };
  return (
    <form onSubmit={handleFormAdd}>
      <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <label>Name</label>
        <input
          type="text"
          className="w-full bg-white rounded-md p-2 mt-2 mb-3 focus-visible:outline-none caret-greatBlue"
          onChange={(e) => setNameValue(e.target.value)}
          autoFocus
        />
        <label>Icon</label>
        <div className="w-full bg-white rounded-md p-2 sm:p-2 md:p-2 lg:p-3 xl:p-5 2xl:p-7  mt-2 mb-3">
          <FolderGroupIcon getName={setIconValue} />
        </div>
        <label>Color</label>
        <div className="flex flex-row w-full bg-white rounded-md p-2 mt-2 mb-3 justify-between">
          <input
            type="color"
            className="w-7 h-7 rounded-full border-white"
            defaultValue={isColor}
            onChange={(e) => setColorValue(e.target.value)}
          />
          <span className="text-greatBlue">{isColor}</span>
        </div>
      </div>
      <div className="px-4  text-right">
        <button
          type="button"
          className="mt-2 lg:mt-10 xl:mt-10 text-white bg-gradient-to-br from-greatGreen to-greatRed hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-white dark:focus:ring-greatblue font-medium rounded-lg text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={() => {
            dispatch({ type: "isAddFolderModal", payload: false });
          }}>
          {
            //handle click cancel button
          }
          <i className="fas fa-times"></i> Cancel
        </button>
        <button
          className="my-5 mx-5 lg:mt-10 xl:mt-10 text-white bg-gradient-to-br from-greatGreen to-greatBlue hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-white dark:focus:ring-greatblue font-medium rounded-lg text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-sm px-5 py-2.5 text-center mr-2 mb-2"
          // type="submit"
          disabled={!isName || !isIcon || !isColor}>
          <i className="fas fa-plus"></i> Create
        </button>
      </div>
    </form>
  );
};

export default AddFolerForm;
