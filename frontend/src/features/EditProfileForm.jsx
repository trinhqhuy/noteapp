import React, { useState, useContext } from "react";
import AvatarIconItem from "../components/AvatarIconItem";
import { Store } from "../context/GobalState";
import { updateInfoUser, signOut } from "../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAxios } from "../redux/createInstance";
import { loginSuccess } from "../redux/authSlice";
function EditProfileForm() {
  const { state, dispatch } = useContext(Store);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [message, setMessage] = useState("");
  const isDispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(user, isDispatch, loginSuccess);
  const [isIcon, setIconValue] = useState(user?.avatar);
  const [isMail, setMail] = useState(user?.email);
  const [isPassword, setPassword] = useState("");
  const [isUserName, setUserName] = useState(user?.username);
  const handleUpdate = (e) => {
    e.preventDefault();
    const newuser = {
      id: user?._id,
      username: isUserName,
      password: isPassword,
      email: isMail,
      avatar: isIcon,
    };
    updateInfoUser(user?.accessToken, newuser, isDispatch, axiosJWT)
      .then((data) => {
        if (data.status === 200)
          signOut(
            user?.accessToken,
            newuser?._id,
            axiosJWT,
            isDispatch,
            navigate
          );
        dispatch({ type: "isRightSideBar", payload: false });
        dispatch({ type: "isSideBarItem", payload: false });
        dispatch({
          type: "isShowEditProfile",
          payload: false,
        });
        dispatch({ type: "isReset" });
        if (data.status === 500) {
          setMessage("Username or email already used");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <form onSubmit={handleUpdate}>
      <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <label>Username</label>
        <input
          type="text"
          className="w-full bg-white rounded-md p-2 mt-2 mb-3 focus-visible:outline-none caret-greatBlue"
          onChange={(e) => setUserName(e.target.value)}
          autoFocus
          value={isUserName}
        />
        <label>Email</label>
        <input
          type="email"
          className="w-full bg-white rounded-md p-2 mt-2 mb-3 focus-visible:outline-none caret-greatBlue"
          onChange={(e) => setMail(e.target.value)}
          autoFocus
          value={isMail}
        />
        <label>Avatar</label>
        <div className="w-full bg-white rounded-md p-2 mt-2 mb-3">
          <AvatarIconItem getName={setIconValue} isIcon={isIcon} />
        </div>
        <div className="flex flex-row justify-between">
          <label>Password</label>
          <button className="text-md text-greatBlue">Forgot password</button>
        </div>
        <input
          type="password"
          className="w-full bg-white rounded-md p-2 mt-2 mb-3 focus-visible:outline-none caret-greatBlue"
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          value={isPassword}
          placeholder="Change your password"
        />
        <p className="text-lg text-greatRed">{message}</p>
      </div>

      <div className="px-4 py-3 text-right">
        <button
          type="button"
          className="mt-2 lg:mt-10 xl:mt-10 text-white bg-gradient-to-br from-greatGreen to-greatRed hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-white dark:focus:ring-greatblue font-medium rounded-lg text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={() => {
            dispatch({
              type: "isShowEditProfile",
              payload: false,
            });
          }}>
          {
            //handle click cancel button
          }
          <i className="fas fa-times"></i> Cancel
        </button>
        <button
          className="my-5 mx-5 lg:mt-10 xl:mt-10 text-white bg-gradient-to-br from-greatGreen to-greatBlue hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-white dark:focus:ring-greatblue font-medium rounded-lg text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-sm px-5 py-2.5 text-center mr-2 mb-2"
          // type="submit"
        >
          <i className="fas fa-plus"></i> Update
        </button>
      </div>
    </form>
  );
}

export default EditProfileForm;
