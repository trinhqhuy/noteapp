import React from "react";
import Logo from "../assets/favicons.png";
function Toast({ setToast, message }) {
  return (
    <div
      id="toast-notification"
      className="fixed z-50 top-20 left-[50%] translate-y-[-50%] translate-x-[-50%] p-4 w-full max-w-xs text-gray-900 bg-white/70 backdrop-blur-xl border-2 border-white rounded-lg shadow"
      role="alert">
      <div className="flex items-center mb-3">
        <span className="mb-1 text-sm font-semibold text-gray-900">
          New notification
        </span>
        <button
          type="button"
          className="ml-auto -mx-1.5 -my-1.5  text-gray-500 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex h-8 w-8 "
          data-dismiss-target="#toast-notification"
          aria-label="Close"
          onClick={() => setToast(false)}>
          <span className="sr-only">Close</span>
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"></path>
          </svg>
        </button>
      </div>
      <div className="flex items-center">
        <div className="inline-block relative shrink-0">
          <img className="w-12 rounded-full" src={Logo} />
          <span className="inline-flex absolute right-0 bottom-0 justify-center items-center w-6 h-6 bg-blue-600 rounded-full text-white">
            <i className="fa-solid fa-bell text-sm"></i>
            <span className="sr-only">Message icon</span>
          </span>
        </div>
        <div className="ml-3 text-sm font-normal">
          {/* <div className="text-sm font-semibold text-gray-900">
            Bonnie Green
          </div> */}
          <div className="text-sm font-normal">{message}</div>
          <span className="text-xs font-medium text-blue-600 dark:text-blue-500">
            a few seconds ago
          </span>
        </div>
      </div>
    </div>
  );
}

export default Toast;
