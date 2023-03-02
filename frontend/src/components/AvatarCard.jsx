import React from "react";
import imageArr from "../assets/avatar/index";
import { createAxios } from "../redux/createInstance";
import { addMemberFolder } from "../redux/apiRequest";
import { loginSuccess } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../context/GobalState";
import { useContext } from "react";
function AvatarCard({ id, idFolder, name, avatar, isIntived }) {
  const { state, dispatch } = useContext(Store);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const isDispatch = useDispatch();
  let axiosJWT = createAxios(user, isDispatch, loginSuccess);
  const handleAdd = () => {
    const newMember = {
      idUser: id,
      idFolder: idFolder,
      isIntive: true,
      isActive: false,
      isSeen: false,
    };
    addMemberFolder(user?.accessToken, newMember, isDispatch, axiosJWT);
  };
  const value = isIntived === true ? "Intived" : "Intive";
  return (
    <div className="flex flex-row m-2 p-2 justify-between items-center">
      <div className="flex flex-row items-center">
        <img className="w-10 h-10 rounded-full" src={imageArr[avatar]} alt="" />
        <div className="text-lg font-medium pl-2">{name}</div>
      </div>
      <button
        type="button"
        disabled={isIntived}
        onClick={handleAdd}
        className="w-14 h-7 bg-greatBlue rounded-md text-white">
        {value}
      </button>
    </div>
  );
}

export default AvatarCard;
