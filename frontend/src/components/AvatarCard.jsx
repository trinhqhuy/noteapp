import React from "react";

import imageArr from "../assets/avatar/index";
function AvatarCard({ id, name, avatar }) {
  const handleAdd = () => {
    console.log(id);
  };
  return (
    <div className="flex flex-row m-2 p-2 justify-between items-center">
      <div className="flex flex-row items-center">
        <img className="w-10 h-10 rounded-full" src={imageArr[avatar]} alt="" />
        <div className="text-lg font-medium pl-2">{name}</div>
      </div>
      <button
        type="button"
        onClick={handleAdd}
        className="w-12 h-7 bg-greatBlue rounded-md text-white">
        Intive
      </button>
    </div>
  );
}

export default AvatarCard;
