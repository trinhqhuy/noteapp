import {
  useState,
  useEffect,
  useContext,
  createContext,
  lazy,
  Suspense,
} from "react";
import MainArea from "../components/MainArea";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import { getAllFoler } from "../redux/apiRequest";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../redux/authSlice";
import { createAxios } from "../redux/createInstance";
import { Store } from "../context/GobalState";
// import ShowMoreNote from "../features/ShowMoreNote";
// import AddNoteForm from "../features/AddNoteForm";
// import AddFolerForm from "../features/AddFolerForm";
// import Modal from "../components/Modal";
// import RightSideBar from "../components/RightSideBar";
const AddFolerForm = lazy(() => import("../features/AddFolerForm"));
const AddNoteForm = lazy(() => import("../features/AddNoteForm"));
const RightSideBar = lazy(() => import("../components/RightSideBar"));
const Modal = lazy(() => import("../components/Modal"));
const ShowMoreNote = lazy(() => import("../features/ShowMoreNote"));
const UpdateFolderForm = lazy(() => import("../features/UpdateFolderForm"));
const Toast = lazy(() => import("../components/Toast"));
const Home = () => {
  // const isShowModal = useContext(ButtonContext);
  const { state, dispatch } = useContext(Store);
  const [isParentValue, setIsParentValue] = useState(0); // send id to child
  const isDispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const folderList = useSelector((state) => state.folder.getAll?.allFolder);
  let axiosJWT = createAxios(user, isDispatch, loginSuccess);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (user?.accessToken) {
      getAllFoler(user?.accessToken, user?._id, isDispatch, axiosJWT);
    }
  }, []);
  return (
    <div className="overscroll-none">
      <Suspense>
        {state.isToast && (
          <Toast
            setToast={() => dispatch({ type: "isToast", payload: false })}
            message="Do you want to delete this folder ?"
            isDelete={true}
          />
        )}
        <NavBar toValueChild={isParentValue} isClickHome={setIsParentValue} />
        <div className="relative flex">
          {state.isAddFolderModal && (
            <Modal title="Add folder" enableEdit={false}>
              <AddFolerForm />
            </Modal>
          )}
          {state.isAddNoteModal && (
            <Modal title="Add note" enableEdit={false}>
              <AddNoteForm />
            </Modal>
          )}
          {state.isShowMoreNote && (
            <Modal aNote={state.setNote} enableEdit={true}>
              <ShowMoreNote aNote={state.setNote} />
            </Modal>
          )}
          {state.isUpdateFolderModal && (
            <Modal title="Update folder" enableEdit={false}>
              <UpdateFolderForm />
            </Modal>
          )}
          <RightSideBar></RightSideBar>

          <SideBar
            sendFolderList={folderList} //redesign logic this sidebar
            sendValueToParent={setIsParentValue}
          />
          <MainArea toValueChild={isParentValue} />
        </div>
      </Suspense>
    </div>
  );
};

export default Home;
