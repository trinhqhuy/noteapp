import React from "react";

function Spinner() {
  return (
    <>
      <div className="w-4 h-4 inline-block rounded-full bg-[#1abc9c] animate-boucing-1"></div>
      <div className="w-4 h-4 inline-block rounded-full bg-[#ffd64a] animate-boucing-2"></div>
      <div className="w-4 h-4 inline-block rounded-full bg-[#e867af] animate-boucing-3"></div>
    </>
  );
}

export default Spinner;
