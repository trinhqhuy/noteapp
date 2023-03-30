import React from "react";
import { useContext } from "react";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import { Store } from "../context/GobalState";
import { useDispatch, useSelector } from "react-redux";
import { addMemberFolder, searchMember } from "../redux/apiRequest";
import AvatarCard from "../components/AvatarCard";
import { createAxios } from "../redux/createInstance";
import { loginSuccess } from "../redux/authSlice";
import ErrorMessage from "../components/ErrorMessage";
import ManagerMember from "../features/ManagerMember";
function AddMemberForm(props) {
  const { state, dispatch } = useContext(Store);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const isDispatch = useDispatch();
  const [isMember, searchMember] = useState("");
  let axiosJWT = createAxios(user, isDispatch, loginSuccess);
  const searchedUser = useSelector((state) => state.user.users);
  const message = useSelector((state) => state.user.users.message.message);

  const handleAddMember = () => {
    const newMember = {
      // idUser: ,
      idFolder: state.isFolder.id,
      isActive: false,
      isSeenNoti: false,
    };
    addMemberFolder();
  };
  return (
    <form className="p-5">
      <SearchBar isSearch={searchMember} />
      <ManagerMember />
      {state.isSearchedMember != null ? (
        state.isSearchedMember.intive == null ? (
          <AvatarCard
            id={state.isSearchedMember._id}
            name={state.isSearchedMember.username}
            idFolder={state.isFolder.id}
            avatar={state.isSearchedMember.avatar}
            isIntived={false}
          />
        ) : (
          <AvatarCard
            id={state.isSearchedMember._id}
            name={state.isSearchedMember.username}
            idFolder={state.isFolder.id}
            avatar={state.isSearchedMember.avatar}
            isIntived={true}
          />
        )
      ) : (
        state.resSearch === 400 && (
          <ErrorMessage title="Can't found this user" />
        )
      )}
    </form>
  );
}

export default AddMemberForm;
