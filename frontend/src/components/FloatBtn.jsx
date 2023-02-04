import { ButtonContext } from "../context/AppContext";
import { useContext } from "react";
function FloatBtn() {
  const isShowAddNoteBtn = useContext(ButtonContext);
  return (
    <button
      onClick={() =>
        isShowAddNoteBtn.setState({
          ...ButtonContext,
          isClickHambergerBtn: isShowAddNoteBtn.state.isClickHambergerBtn,
          isClickAddNoteBtn: true,
          isLoading: isShowAddNoteBtn.state.isLoading,
          isClickSideBarItem: isShowAddNoteBtn.state.isClickSideBarItem,
          isIdFolder: isShowAddNoteBtn.state.isIdFolder,
        })
      }
      className="group fixed w-[70px] h-[70px] bottom-5 right-5 inline-block bg-greatBlue/70 backdrop-blur-xl rounded-full">
      <i className="fa-solid fa-plus text-white w-5 h-5"></i>
      <span className="group-hover:flex group-hover:w-[90px] justify-center hidden group-hover:absolute group-hover:bottom-[100%] group-hover:right-[50%] group-hover:bg-white group-hover:p-2 rounded-full text-black dark:group-hover:text-white dark:group-hover:bg-gray-400">
        Add note
      </span>
      <span className="group-hover:bg-white before:content-[''] group-hover:origin-center group-hover:rotate-45 group-hover:h-[10px] group-hover:w-[10px] group-hover:absolute group-hover:left-[17px] group-hover:top-[-11px] dark:group-hover:bg-gray-400"></span>
    </button>
  );
}

export default FloatBtn;
