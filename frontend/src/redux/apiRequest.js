import axios from "axios";
import {
  loginStart,
  loginSuccess,
  loginFailed,
  registerStart,
  registerSuccess,
  registerFailed,
  signOutStart,
  signOutSuccess,
  signOutFailed,
} from "./authSlice";
import {
  getFolderStart,
  getFolderSuccess,
  getFolderFailed,
  addFolderStart,
  addFolderSuccess,
  addFolderFailed,
  updateFolderStart,
  deleteFolderStart,
  addMemberStart,
  addMemberSuccess,
  addMemnberFailed,
} from "./folderSlide";
import {
  readAllNotesStart,
  readAllNotesSuccess,
  readAllNotesFailed,
  addNoteStart,
  addNoteSuccess,
  addNoteFailed,
  updateNoteStart,
  updateNoteSuccess,
  updateNoteFailed,
  deleteNoteStart,
  deleteNoteSuccess,
  deleteNoteFailed,
} from "./noteSlide";
import {
  getAllMemberStart,
  getAllMemberSuccess,
  getAllMemberFailed,
  deleteMemberStart,
  deleteMemberSuccess,
  deleteMemberFailed,
  leaveGroupStart,
  leaveGroupSuccess,
  leaveGroupFailed,
} from "./memberSlide";
import {
  getAllNotifiSuccess,
  getAllNotifiFailed,
  getAllNotifiStart,
  updateNotificationStart,
  updateNotificationSuccess,
  updateNotificationFailed,
} from "./notificationSlide";
import {
  getUsersFailed,
  getUsersSuccess,
  getUsersStart,
  updateUserStart,
  updateUserSuccess,
  updateUserFailed,
} from "./userSlice";
axios.defaults.withCredentials = true;
export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:8000/v1/auth/login", user, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
    dispatch(loginSuccess(res.data));
    navigate("/home");
  } catch (err) {
    dispatch(loginFailed(err));
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    await axios.post("http://localhost:8000/v1/auth/register", user);
    dispatch(registerSuccess());
    navigate("/login");
  } catch (err) {
    dispatch(registerFailed(err));
  }
};
export const signOut = async (
  accessToken,
  id,
  axiosJWT,
  dispatch,
  navigate
) => {
  dispatch(signOutStart());

  try {
    await axiosJWT.post("http://localhost:8000/v1/auth/logout", id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(signOutSuccess());
    navigate("/login");
  } catch (err) {
    dispatch(signOutFailed(err));
  }
};
// export const getAllUser = async(accessToken, dispatch) => {
//     dispatch(getUsersStart())
//     try {
//         const res = await axios.get("http://localhost:8000/v1/folder", {
//             headers: {token: `Bearer ${accessToken}`}
//         })
//         dispatch(getAllFolderSuccess())
//     }catch(err) {
//         dispatch(getAllFolderFƒailed())
//     }
// }
export const getAllFolder = async (accessToken, id, dispatch, axiosJWT) => {
  dispatch(getFolderStart());
  try {
    const res = await axiosJWT.get("http://localhost:8000/v1/folder/" + id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getFolderSuccess(res.data));
  } catch (err) {
    dispatch(getFolderFailed());
  }
};
export const addFolder = async (accessToken, dispatch, folder, axiosJWT) => {
  dispatch(addFolderStart());
  try {
    await axiosJWT.post("http://localhost:8000/v1/folder/", folder, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(addFolderSuccess());
  } catch (err) {
    dispatch(addFolderFailed(err.response.data));
  }
};

export const addNote = async (accessToken, dispatch, note, axiosJWT) => {
  dispatch(addNoteStart());
  try {
    await axiosJWT.post("http://localhost:8000/v1/note/", note, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(addNoteSuccess());
  } catch (err) {
    dispatch(addNoteFailed(err.response.data));
  }
};
export const readAllNote = async (accessToken, id, dispatch, axiosJWT) => {
  dispatch(readAllNotesStart());
  try {
    const res = await axiosJWT.get("http://localhost:8000/v1/note/" + id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(readAllNotesSuccess(res.data));
  } catch (err) {
    dispatch(readAllNotesFailed(err));
  }
};
export const updateNote = async (accessToken, note, dispatch, axiosJWT) => {
  dispatch(updateNoteStart());
  try {
    const res = await axiosJWT.put("http://localhost:8000/v1/note/", note, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(updateNoteSuccess(res.data));
  } catch (err) {
    dispatch(updateNoteFailed(err));
  }
};
export const deleteNote = async (accessToken, id, dispatch, axiosJWT) => {
  dispatch(deleteNoteStart());
  try {
    const res = await axiosJWT.delete("http://localhost:8000/v1/note/" + id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(deleteNoteSuccess(res.data));
  } catch (err) {
    dispatch(deleteNoteFailed(err));
  }
};
export const updateFolder = async (
  accessToken,
  id,
  folder,
  dispatch,
  axiosJWT
) => {
  dispatch(updateFolderStart());
  try {
    const res = await axiosJWT.put(
      "http://localhost:8000/v1/folder/" + id,
      folder,
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(updateNoteSuccess(res.data));
  } catch (err) {
    dispatch(updateNoteFailed(err));
  }
};
export const deleteFolder = async (accessToken, id, dispatch, axiosJWT) => {
  dispatch(deleteFolderStart());
  try {
    const res = await axiosJWT.delete("http://localhost:8000/v1/folder/" + id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(deleteNoteSuccess(res.data));
  } catch (err) {
    dispatch(deleteNoteFailed(err));
  }
};

export const addMemberFolder = async (
  accessToken,
  member,
  dispatch,
  axiosJWT
) => {
  dispatch(addMemberStart());
  try {
    const res = await axiosJWT.post(
      "http://localhost:8000/v1/folder/add",
      member,
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(addMemberSuccess(res.data));
  } catch (err) {
    dispatch(addMemnberFailed(err));
  }
};
export const searchMember = async (accessToken, user, dispatch, axiosJWT) => {
  dispatch(getUsersStart());
  try {
    const res = await axiosJWT.post("http://localhost:8000/v1/member/", user, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getUsersSuccess());
    return { data: res.data, status: res.status };
  } catch (err) {
    dispatch(getUsersFailed());
    return { error: err, status: err.response ? err.response.status : null };
  }
};
export const getAllMember = async (accessToken, id, dispatch, axiosJWT) => {
  dispatch(getAllMemberStart());
  try {
    const res = await axiosJWT.get("http://localhost:8000/v1/member/" + id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getAllMemberSuccess(res.data));
  } catch (err) {
    dispatch(getAllMemberFailed(err));
  }
};
export const getNotification = async (
  accessToken,
  idUser,
  dispatch,
  axiosJWT
) => {
  dispatch(getAllNotifiStart());
  try {
    const res = await axiosJWT.get(
      "http://localhost:8000/v1/member/noti/" + idUser,
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(getAllNotifiSuccess(res.data));
  } catch (err) {
    dispatch(getAllNotifiFailed(err));
  }
};
export const updateNotification = async (
  accessToken,
  state,
  dispatch,
  axiosJWT
) => {
  dispatch(updateNotificationStart());
  try {
    const res = await axiosJWT.post(
      "http://localhost:8000/v1/member/updatenoti/",
      state,
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(updateNotificationSuccess(res.data));
  } catch (err) {
    dispatch(updateNotificationFailed(err));
  }
};

export const deleteMember = async (accessToken, member, dispatch, axiosJWT) => {
  dispatch(deleteMemberStart());
  try {
    const res = await axiosJWT.get(
      "http://localhost:8000/v1/member/delete/" + member,
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(deleteMemberSuccess(res.data));
  } catch (err) {
    dispatch(deleteMemberFailed(err));
  }
};
export const leaveGroup = async (accessToken, member, dispatch, axiosJWT) => {
  dispatch(leaveGroupStart());
  try {
    const res = await axiosJWT.post(
      "http://localhost:8000/v1/member/leave/",
      member,
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(leaveGroupSuccess(res.data));
  } catch (err) {
    dispatch(leaveGroupFailed(err));
  }
};
export const updateInfoUser = async (accessToken, user, dispatch, axiosJWT) => {
  dispatch(updateUserStart());
  try {
    const res = await axiosJWT.put("http://localhost:8000/v1/user/", user, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(updateUserSuccess(res.data));
    return { data: res.data, status: res.status };
  } catch (err) {
    dispatch(updateUserFailed());
    return { error: err, status: err.response ? err.response.status : null };
  }
};
