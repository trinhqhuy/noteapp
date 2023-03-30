import React, { useEffect } from "react";
import AvatarCard from "../components/AvatarCard";
import { getAllMember } from "../redux/apiRequest";
import { loginSuccess } from "../redux/authSlice";
import { Store } from "../context/GobalState";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../redux/createInstance";

function ManagerMember() {
  const { state, dispatch } = useContext(Store);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const isDispatch = useDispatch();
  let axiosJWT = createAxios(user, isDispatch, loginSuccess);
  const member = useSelector((state) => state.members.members?.all);
  useEffect(() => {
    getAllMember(user?.accessToken, state.isFolder.id, isDispatch, axiosJWT);
  }, []);
  const normalUser = member?.filter((admin) => {
    const canDelete = !admin.isAdmin;
    return canDelete;
  });
  const adminUser = member?.filter((admin) => {
    const canDelete = admin.isAdmin;
    return canDelete;
  });
  const adminItem = adminUser?.map((a) => (
    <AvatarCard
      key={a.user[0]._id}
      id={a.user[0]._id}
      name={a.user[0].username}
      avatar={a.user[0].avatar}
      isIntived={false}
      isAdmin={true}
      isDelete={false}
    />
  ));
  const memberItems = normalUser?.map((a) => (
    <AvatarCard
      key={a.user[0]._id}
      id={a._id}
      name={a.user[0].username}
      avatar={a.user[0].avatar}
      isIntived={false}
      isDelete={adminUser[0]._idUser === user?._id}
    />
  ));
  return (
    <div className="flex flex-col">
      {adminItem}
      {memberItems}
    </div>
  );
}

export default ManagerMember;
