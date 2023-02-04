import React from "react";
import { useContext, useState } from "react";
import { ButtonContext } from "../context/AppContext";
import { addNote } from "../redux/apiRequest";
import { addNoteSuccess } from "../redux/noteSlide";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../redux/createInstance";
import { loginSuccess } from "../redux/authSlice";
import { getAllFoler } from "../redux/apiRequest";
import { readAllNote } from "../redux/apiRequest";

const AddNoteForm = () => {
  const handleClick = useContext(ButtonContext);
  const [isTitle, setTitleValue] = useState("");
  const [isContent, setContentValue] = useState("");
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  let axiosJWT = createAxios(user, dispatch, addNoteSuccess);
  let axiosJWTReload = createAxios(user, dispatch, loginSuccess);
  const handleFormAddNote = async (e) => {
    e.preventDefault();
    if (user?.accessToken) {
      const newNote = {
        _idFolder: handleClick.state.isIdFolder,
        _idUser: user?._id,
        title: isTitle,
        content: isContent,
      };
      await addNote(user?.accessToken, dispatch, newNote, axiosJWT);
      await readAllNote(
        user?.accessToken,
        handleClick.state.isIdFolder,
        dispatch,
        axiosJWT
      );
      await getAllFoler(user?.accessToken, user?._id, dispatch, axiosJWTReload);
    }
  };
  // console.log(handleClick.state.isIdFolder); // error
  return (
    <form onSubmit={handleFormAddNote}>
      <div className="px-4 pt-5 sm:p-6 sm:pb-4">
        <label>Title</label>
        <input
          type="text"
          className="w-full bg-white rounded-md p-2 mt-2 mb-3 focus-visible:outline-none"
          onChange={(e) => setTitleValue(e.target.value)}
          autoFocus
        />
        <label>Content</label>
        <textarea
          name=""
          id=""
          cols="10"
          rows="10"
          className="w-full bg-white rounded-md p-2 mt-2 mb-3 h-20 focus-visible:outline-none"
          onChange={(e) => setContentValue(e.target.value)}></textarea>
      </div>
      <div className="px-4 py-3 text-right">
        <button
          type="button"
          className="mt-2 lg:mt-10 xl:mt-10 text-white bg-gradient-to-br from-greatGreen to-greatRed hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-white dark:focus:ring-greatblue font-medium rounded-lg text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={() =>
            handleClick.setState({
              ...handleClick.state,
              isClickAddFolderModal: false,
              isClickAddNoteBtn: false,
            })
          }>
          {
            //handle click cancel button
          }
          <i className="fas fa-times"></i> Cancel
        </button>
        <button
          className="my-5 mx-5 lg:mt-10 xl:mt-10 text-white bg-gradient-to-br from-greatGreen to-greatBlue hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-white dark:focus:ring-greatblue font-medium rounded-lg text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-sm px-5 py-2.5 text-center mr-2 mb-2"
          // type="submit"
        >
          <i className="fas fa-plus"></i> Create
        </button>
      </div>
    </form>
  );
};

export default AddNoteForm;
