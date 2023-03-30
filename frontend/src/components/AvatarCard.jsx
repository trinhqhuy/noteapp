import React from "react";
import imageArr from "../assets/avatar/index";
import { createAxios } from "../redux/createInstance";
import {
  addMemberFolder,
  searchMember,
  deleteMember,
  getAllMember,
} from "../redux/apiRequest";
import { loginSuccess } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../context/GobalState";
import { useContext } from "react";
function AvatarCard({
  id,
  idFolder,
  name,
  avatar,
  isIntived,
  isAdmin,
  isDelete,
}) {
  const { state, dispatch } = useContext(Store);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const isDispatch = useDispatch();
  let axiosJWT = createAxios(user, isDispatch, loginSuccess);
  const handleAdd = async () => {
    const newMember = {
      idUser: id,
      idFolder: idFolder,
      isIntive: true,
      isActive: false,
      isSeen: false,
    };
    const userSearch = {
      name: name,
      _idFolder: idFolder,
    };
    await addMemberFolder(user?.accessToken, newMember, isDispatch, axiosJWT);
    await searchMember(user?.accessToken, userSearch, isDispatch, axiosJWT)
      .then((data) => {
        dispatch({ type: "isSearchedMember", payload: data.data });
        dispatch({ type: "resSearch", payload: data.status });
      })
      .catch((err) => console.log(err));
  };
  const value = isIntived === true ? "Intived" : "Intive";
  const handleDeleteMember = () => {
    deleteMember(user?.accessToken, id, isDispatch, axiosJWT).then(() =>
      getAllMember(user?.accessToken, state.isFolder?.id, isDispatch, axiosJWT)
    );
  };
  const deleteBtn = isDelete && (
    <button
      type="button"
      className="w-16 h-7 bg-greatRed rounded-full text-white"
      onClick={handleDeleteMember}>
      Delete
    </button>
  );
  const adminIcon = isAdmin && (
    <i className="fa-solid fa-key text-yellow-400 text-xl"></i>
  );
  const intiveBtn = idFolder && (
    <button
      type="button"
      disabled={isIntived}
      onClick={handleAdd}
      className="w-14 h-7 bg-greatBlue rounded-full text-white">
      {value}
    </button>
  );
  return (
    <div className="flex flex-row m-2 p-2 justify-between items-center">
      <div className="flex flex-row items-center">
        <img className="w-10 h-10 rounded-full" src={imageArr[avatar]} alt="" />
        <div className="text-lg font-medium pl-2">{name}</div>
      </div>
      {adminIcon}
      {intiveBtn}
      {deleteBtn}
    </div>
  );
}

export default AvatarCard;
