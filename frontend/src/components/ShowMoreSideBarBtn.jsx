import React from "react";
import { useContext } from "react";
import { Store } from "../context/GobalState";

function ShowMoreSideBarBtn() {
  const { state, dispatch } = useContext(Store);

  return (
    <button
      className="w-10 h-10 hover:bg-lightBlue hover:rounded-full focus:bg-lightBlue focus:rounded-full"
      onClick={() =>
        dispatch({ type: "isRightSideBar", payload: !state.isRightSideBar })
      }>
      <i className="fa-regular fa-sidebar-flip text-black dark:text-white text-lg"></i>
    </button>
  );
}

export default ShowMoreSideBarBtn;
