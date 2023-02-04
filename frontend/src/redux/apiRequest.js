import axios from "axios";
import {
  loginStart,
  loginSuccess,
  loginFailed,
  registerStart,
  registerSuccess,
  registerFailed,
} from "./authSlice";
import {
  getFolderStart,
  getFolderSuccess,
  getFolderFailed,
  addFolderStart,
  addFolderSuccess,
  addFolderFailed,
} from "./folderSlide";
import {
  readAllNotesStart,
  readAllNotesSuccess,
  readAllNotesFailed,
  addNoteStart,
  addNoteSuccess,
  addNoteFailed,
} from "./noteSlide";
// import { getUsersFailed, getUsersStart } from "./userSlice"
export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:8000/v1/auth/login", user, {
      withCredentials: true,
    });
    dispatch(loginSuccess(res.data));
    navigate("/");
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
// export const getAllUser = async(accessToken, dispatch) => {
//     dispatch(getUsersStart())
//     try {
//         const res = await axios.get("http://localhost:8000/v1/folder", {
//             headers: {token: `Bearer ${accessToken}`}
//         })
//         dispatch(getAllFolderSuccess())
//     }catch(err) {
//         dispatch(getAllFolderFailed())
//     }
// }
export const getAllFoler = async (accessToken, id, dispatch, axiosJWT) => {
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