import { useState, useEffect, createContext, useContext } from "react";
import MainArea from "../components/MainArea";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import Modal from "../components/Modal";
import { getAllFoler } from "../redux/apiRequest";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import jwtdecode from "jwt-decode";
import axios from "axios";
import { loginSuccess } from "../redux/authSlice";
import { createAxios } from "../redux/createInstance";
import AddFolerForm from "../features/AddFolerForm";
import AddNoteForm from "../features/AddNoteForm";
import { ButtonContext } from "../context/AppContext";
import { readAllNote } from "../redux/apiRequest";
import ShowMoreNote from "../features/ShowMoreNote";
const Home = () => {
  const isShowModal = useContext(ButtonContext);
  const [isParentValue, setIsParentValue] = useState(0); // send id to child
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const folderList = useSelector((state) => state.folders.getAll?.allFolder);

  let axiosJWT = createAxios(user, dispatch, loginSuccess);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (user?.accessToken) {
      getAllFoler(user?.accessToken, user?._id, dispatch, axiosJWT);
    }
    // if (isShowModal.state.is_idFolder != "") {
    //   readAllNote(
    //     user?.accessToken,
    //     isShowModal.state.is_idFolder,
    //     dispatch,
    //     axiosJWT
    //   );
    // }
  }, []);
  return (
    <div className="overscroll-none">
      <NavBar toValueChild={isParentValue} isClickHome={setIsParentValue} />
      <div className="relative flex">
        {isShowModal.state.isClickAddFolderModal ? (
          <Modal title="Add folder">
            <AddFolerForm />
          </Modal>
        ) : (
          <></>
        )}
        {isShowModal.state.isClickAddNoteBtn ? (
          <Modal title="Add note">
            <AddNoteForm />
          </Modal>
        ) : (
          <></>
        )}
        {isShowModal.state.isShowMoreNote ? (
          <Modal title={isShowModal.state.title}>
            <ShowMoreNote content={isShowModal.state.content} />
          </Modal>
        ) : (
          <></>
        )}
        <SideBar
          sendFolderList={folderList} //redesign logic this sidebar
          sendValueToParent={setIsParentValue}
        />
        <MainArea toValueChild={isParentValue} />
      </div>
    </div>
  );
};

export default Home;
