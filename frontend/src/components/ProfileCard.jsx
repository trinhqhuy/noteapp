import React, { useContext, useEffect, useState } from "react";
// import imageArr from "../assets/avatar/index";
import { createAxios } from "../redux/createInstance";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { signOut } from "../redux/apiRequest";
import { useNavigate } from "react-router-dom";
import { Store } from "../context/GobalState";
function ProfileCard({ name, img }) {
  const { state, dispatch } = useContext(Store);
  const isDispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login?.currentUser);
  let axiosJWT = createAxios(user, isDispatch, loginSuccess);
  const handleSignOut = () => {
    signOut(user?.accessToken, user?._id, axiosJWT, isDispatch, navigate);
  };
  const [image, setImage] = useState("");
  useEffect(() => {
    img !== undefined &&
      import(`../assets/avatar/${img}.png`)
        .then((img) => setImage(img.default))
        .catch((err) => console.error(err));
  }, [img]);
  return (
    <div className="flex flex-col">
      <div className="p-2 m-1 flex flex-row justify-center items-center">
        <div className="fixed z-50 rounded-full w-200 h-32 grid justify-items-center items-center">
          <img className="w-20 rounded-full" src={image} />
        </div>
        <div className="blur-[18px] transform-gpu rounded-full w-200 h-32 grid justify-items-center items-center">
          <img className="w-20 " src={image} />
        </div>
        {/* <img
          className="w-20 h-20 rounded-full mr-2"
          src={imageArr[img]}
          alt=""
        /> */}
      </div>
      <div className="flex justify-center items-center">
        <p className="text-2xl font-semibold ">{name}</p>
      </div>
      <div className="flex justify-between items-center m-3">
        <button
          type="button"
          onClick={handleSignOut}
          className="m-2 h-9 flex flex-row items-center justify-center py-3 bg-greatBlue p-3 text-gray-900 rounded-full dark:text-white hover:bg-greatBlue/70">
          {/* <i className="fa-regular fa-folders text-white"></i> */}
          <span className="text-white truncate ...">Sign out</span>
        </button>
        <button
          type="button"
          onClick={() =>
            dispatch({
              type: "isShowEditProfile",
              payload: !state.isShowEditProfile,
            })
          }
          className="m-2 h-9 flex flex-row items-center justify-center py-3 bg-greatBlue p-3 text-gray-900 rounded-full dark:text-white hover:bg-greatBlue/70">
          <span className="text-white truncate ...">Edit Profile</span>
        </button>
      </div>
    </div>
  );
}

export default ProfileCard;
