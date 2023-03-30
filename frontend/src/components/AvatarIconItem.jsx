import React, { useState } from "react";
import imageArr from "../assets/avatar/index";

function AvatarIconItem({ getName, isIcon }) {
  const returnIconValue = (e, key) => {
    e.preventDefault();
    getName(key);
    selected(key);
  };
  const [isSelected, selected] = useState(isIcon);
  return (
    <>
      <div className="scrollbar-hidden px-[15vw] sm:px-[15vw] md:px-[15vw] lg:px-[15vw] xl:px-[13vw] 2xl:px-[13vw] w-full flex snap-x overflow-x-auto self-center">
        {/* {Object.keys(imageArr).map((key) => (
          <img key={key} src={imageArr[key]} alt={`Avatar ${key}`} />
        ))} */}
        {Object.keys(imageArr).map((key) => (
          <div key={`11${key}`}>
            <input
              type="image"
              value={key}
              id={`1${key}`}
              name="status"
              src={imageArr[key]}
              className={`w-12 h-12 my-2 mx-10 rounded-full ${
                isSelected == key ? "border-4 border-greatGreen" : ""
              }`}
              alt="button"
              onClick={(e) => returnIconValue(e, key)}
              //   className="hidden peer"
            />
            {/* <img
              htmlFor={`1${key}`}
              src={imageArr[key]}
              className={`w-12 h-12 m-10 rounded-full cursor-pointer peer-checked:border-4 peer-checked:border-greatGreen`}
            /> */}
          </div>
        ))}
      </div>
    </>
  );
}

export default AvatarIconItem;
