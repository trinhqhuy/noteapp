import { ButtonContext } from "../context/AppContext";
import { useContext } from "react";
const Modal = (props) => {
  const isShowModalBtn = useContext(ButtonContext);

  return (
    <div className="fixed z-50 overflow-y-auto top-0 w-full left-0 backdrop-blur-[2px]">
      <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0 ">
        <div className="fixed inset-0 transition-opacity">
          <div
            className="absolute inset-0"
            onClick={() =>
              isShowModalBtn.setState({
                ...isShowModalBtn.state,
                isClickAddFolderModal: false,
                isClickAddNoteBtn: false,
                isShowMoreNote: false,
              })
            }
          />
          {
            //handle click outside
          }
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div
          className="inline-block align-center backdrop-blur-xl bg-white/40 border-2 border-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full "
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline">
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <span className="text-2xl font-bold">{props.title}</span>
          </div>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
