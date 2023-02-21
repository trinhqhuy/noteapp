import React from "react";
import { Store } from "../context/GobalState";
import { useContext } from "react";
import { updateNote } from "../redux/apiRequest";
import { createAxios } from "../redux/createInstance";
import { loginSuccess } from "../redux/authSlice";
import { readAllNote, deleteNote } from "../redux/apiRequest";
import { useSelector, useDispatch } from "react-redux";
const ShowMoreNote = (props) => {
  const { state, dispatch } = useContext(Store);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const isDispatch = useDispatch();
  let axiosJWT = createAxios(user, isDispatch, loginSuccess);
  const handleClickSubmit = (e) => {
    if (e.currentTarget.textContent !== state.setNote.setNote.content) {
      const newNoteContent = {
        ...state.setNote.setNote,
        content: e.currentTarget.textContent,
      };
      updateNote(user?.accessToken, newNoteContent, isDispatch, axiosJWT)
        .then(() => {
          readAllNote(
            user?.accessToken,
            state.idFolder.id,
            isDispatch,
            axiosJWT
          );
          dispatch({ type: "setNote", payload: { setNote: newNoteContent } });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
  const handleClickPinNoteSubmit = () => {
    const newNoteContent = {
      ...state.setNote.setNote,
      pin: !state.setNote.setNote.pin,
    };
    updateNote(user?.accessToken, newNoteContent, isDispatch, axiosJWT)
      .then(async () => {
        await readAllNote(
          user?.accessToken,
          state.idFolder.id,
          isDispatch,
          axiosJWT
        );
        await dispatch({
          type: "setNote",
          payload: { setNote: newNoteContent },
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleClickDeleteNote = () => {
    deleteNote(
      user?.accessToken,
      state.setNote.setNote._id,
      isDispatch,
      axiosJWT
    )
      .then(() => {
        readAllNote(user?.accessToken, state.idFolder.id, isDispatch, axiosJWT);
        dispatch({ type: "isShowMoreNote", payload: false });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div
          className="text-xl text-black break-all indent-3 outline-none focus:border-2 focus:border-white focus:rounded-lg caret-greatGreen focus:p-2"
          contentEditable
          suppressContentEditableWarning={true}
          onBlur={(e) => {
            handleClickSubmit(e);
          }}>
          {state.setNote.setNote.content}
        </div>
      </div>
      <div className="flex px-4 py-3 text-right justify-end items-center">
        <button
          className="group text-white bg-gradient-to-br from-lightBlue to-greatRed hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-white dark:focus:ring-greatblue font-medium rounded-lg text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-sm h-10 min-w-fit px-3.5 py-2.5 w-5 text-center mr-2"
          onClick={handleClickDeleteNote}>
          <i className="fa-regular fa-trash group-hover:pr-3"></i>
          <span className="hidden group-hover:contents">Delete note</span>
        </button>
        <button
          className="group text-white bg-gradient-to-br from-lightBlue to-cyanBlue hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-white dark:focus:ring-greatblue font-medium rounded-lg text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-sm h-10 min-w-fit px-3.5 py-2.5 w-5 text-center mr-2"
          onClick={handleClickPinNoteSubmit}>
          <i className="fa-regular fa-thumbtack group-hover:pr-3"></i>
          <span className="hidden group-hover:contents">Pin note</span>
        </button>
        <button
          type="button"
          className=" text-white bg-gradient-to-br from-lightBlue to-darkGreen hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-white dark:focus:ring-greatblue font-medium rounded-lg text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-sm px-5 py-2.5 text-center mr-2 "
          onClick={() => {
            dispatch({ type: "isShowMoreNote", payload: false });
          }}>
          {
            //handle click cancel button
          }
          <i className="fas fa-times"></i> Close
        </button>
      </div>
    </>
  );
};

export default ShowMoreNote;
