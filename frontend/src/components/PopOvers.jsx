import React, { useContext, useState } from "react";
function PopOvers({ title, item, profile, action }) {
  const height = item ? "h-80" : "h-[21rem]";
  const Noti = item && (
    <div className="h-[15.35rem] overflow-y-scroll pb-28">{item}</div>
  );
  const Profile = profile && <div className="h-24 ">{profile}</div>;
  return (
    <div className="fixed z-50 overflow-y-auto w-full h-screen">
      <div className="min-height-100vh px-4 ">
        <div className="inset-0 transition-opacity">
          <div className="absolute inset-0" onClick={action} />
          {
            //handle click outside
          }
        </div>
        <div
          className={
            "fixed z-40 w-80 top-16 right-10 backdrop-filter backdrop-blur-xl bg-white/40 border-2 border-white rounded-lg overflow-hidden shadow-xl transform-gpu transition-all " +
            height
          }
          role="PopOvers"
          aria-modal="true"
          aria-labelledby="modal-headline">
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <span className="text-2xl font-bold">{title}</span>
          </div>
          {Noti}
          {Profile}
        </div>
      </div>
    </div>
  );
}

export default PopOvers;
