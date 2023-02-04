import React from "react";
import { useContext } from "react";
import { ButtonContext } from "../context/AppContext";
const ShowMoreNote = (props) => {
  const isClickCancelBtn = useContext(ButtonContext);
  return (
    <>
      <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="text-xl text-black break-all indent-3">
          {props.content}
        </div>
      </div>
      <div className="px-4 py-3 text-right">
        <button
          type="button"
          className="mt-2 lg:mt-10 xl:mt-10 text-white bg-gradient-to-br from-lightBlue to-darkGreen hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-white dark:focus:ring-greatblue font-medium rounded-lg text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={() =>
            isClickCancelBtn.setState({
              ...isClickCancelBtn.state,
              isShowMoreNote: false,
            })
          }>
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
