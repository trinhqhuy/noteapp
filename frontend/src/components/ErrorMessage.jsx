import React from "react";
import ErrorImage from "../assets/illustrations/ErrorImage.png";
function ErrorMessage({ title }) {
  return (
    <div className="flex flex-col p-5 justify-center items-center">
      <img className="w-36" src={ErrorImage} alt="" />
      <p className="text-lg font-medium">{title}</p>
    </div>
  );
}

export default ErrorMessage;
