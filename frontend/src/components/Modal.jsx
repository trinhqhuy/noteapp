import { useContext } from "react";
import { updateNote } from "../redux/apiRequest";
import { createAxios } from "../redux/createInstance";
import { loginSuccess } from "../redux/authSlice";
import { readAllNote } from "../redux/apiRequest";
import { useSelector, useDispatch } from "react-redux";
import { Store } from "../context/GobalState";

const Modal = (props) => {
  const { state, dispatch } = useContext(Store);

  const user = useSelector((state) => state.auth.login?.currentUser);
  const isDispatch = useDispatch();
  let axiosJWT = createAxios(user, isDispatch, loginSuccess);
  const handleClickSubmit = (e) => {
    if (e.currentTarget.textContent !== state.setNote.setNote.title) {
      const newNoteTitle = {
        ...state.setNote.setNote,
        title: e.currentTarget.textContent,
      };

      updateNote(user?.accessToken, newNoteTitle, isDispatch, axiosJWT)
        .then(() => {
          readAllNote(
            user?.accessToken,
            state.isFolder.id,
            isDispatch,
            axiosJWT
          );
          dispatch({ type: "setNote", payload: { setNote: newNoteTitle } });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div className="fixed z-50 overflow-y-auto top-0 w-full h-full left-0 ">
      <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div
            className="absolute inset-0 backdrop-blur-[2px]"
            onClick={() => {
              dispatch({ type: "isAddFolderModal", payload: false });
              dispatch({ type: "isAddNoteModal", payload: false });
              dispatch({ type: "isShowMoreNote", payload: false });
              dispatch({ type: "isUpdateFolderModal", payload: false });
              dispatch({ type: "isSearchMember", payload: false });
              dispatch({ type: "isSearchedMember", payload: null });
              dispatch({ type: "resSearch", payload: null });
              dispatch({
                type: "isShowEditProfile",
                payload: false,
              });
            }}
          />
          {
            //handle click outside
          }
        </div>
        <span className="inline-block align-middle h-full md:h-screen lg:h-screen xl:h-screen 2xl:h-screen"></span>
        <div
          className="inline-block align-center backdrop-filter backdrop-blur-xl bg-white/40 border-2 border-white rounded-lg text-left overflow-hidden shadow-xl transform-gpu transition-all sm:my-8 align-middle max-w-lg w-full"
          role="PopOvers"
          aria-modal="true"
          aria-labelledby="modal-headline">
          {props.enableEdit ? (
            <div
              className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 outline-none focus:border-b-[1px] focus:border-white caret-greatGreen text-2xl font-bold"
              contentEditable
              suppressContentEditableWarning={true}
              onBlur={(e) => {
                handleClickSubmit(e);
              }}>
              {state.setNote.setNote.title}
            </div>
          ) : (
            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <span className="text-2xl font-bold">{props.title}</span>
            </div>
          )}
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
