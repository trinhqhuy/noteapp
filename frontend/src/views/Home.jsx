import {
  useState,
  useEffect,
  useContext,
  createContext,
  lazy,
  Suspense,
} from "react";
import Loader from "../components/Loader";
import MainArea from "../components/MainArea";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import { getAllFolder, getNotification } from "../redux/apiRequest";
import { useSelector, useDispatch } from "react-redux";
import { json, useNavigate } from "react-router-dom";
import { loginSuccess } from "../redux/authSlice";
import { createAxios } from "../redux/createInstance";
import { Store } from "../context/GobalState";
import ItemsPopOvers from "../components/ItemsPopOvers";
import useDynamicImport from "../hooks/useDynamicImport";
// import ShowMoreNote from "../features/ShowMoreNote";
// import AddNoteForm from "../features/AddNoteForm";
// import AddFolerForm from "../features/AddFolerForm";
// import Modal from "../components/Modal";
// import RightSideBar from "../components/RightSideBar";
const AddFolderForm = lazy(() => import("../features/AddFolerForm"));
const AddNoteForm = lazy(() => import("../features/AddNoteForm"));
const RightSideBar = lazy(() => import("../components/RightSideBar"));
// const Modal = lazy(() => import("../components/Modal"));
const ShowMoreNote = lazy(() => import("../features/ShowMoreNote"));
const UpdateFolderForm = lazy(() => import("../features/UpdateFolderForm"));
// import AddMemberForm from "../features/AddMemberForm";
const AddMemberForm = lazy(() => import("../features/AddMemberForm"));
const EditProfile = lazy(() => import("../features/EditProfileForm"));
import Fade from "../components/Fade";
import Modal from "../components/Modal";
// import ProfileCard from "../components/ProfileCard";
const ProfileCard = lazy(() => import("../components/ProfileCard"));
const Toast = lazy(() => import("../components/Toast"));
const PopOvers = lazy(() => import("../components/PopOvers"));

const Home = () => {
  const isAddFolderFormLoaded = useDynamicImport("../features/AddFolerForm");
  const isAddNoteFormLoaded = useDynamicImport("../features/AddNoteForm");
  const isShowMoreNoteLoaded = useDynamicImport("../features/ShowMoreNote");
  const isUpdateFolderFormLoaded = useDynamicImport(
    "../features/UpdateFolderForm"
  );
  const isAddMemberFormLoaded = useDynamicImport("../features/AddMemberForm");
  const isEditProfileLoaded = useDynamicImport("../features/EditProfileForm");
  const isRightSideBarLoaded = useDynamicImport("../components/RightSideBar");
  const isToastLoaded = useDynamicImport("../components/Toast");
  const isPopOverLoaded = useDynamicImport("../components/PopOvers");
  const isProfileCardLoaded = useDynamicImport("../components/ProfileCard");
  // const isShowModal = useContext(ButtonContext);
  const { state, dispatch } = useContext(Store);
  const [isParentValue, setIsParentValue] = useState(0); // send id to child
  const isDispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const folderList = useSelector((state) => state.folder.getAll?.allFolder);
  let axiosJWT = createAxios(user, isDispatch, loginSuccess);
  const notification = useSelector(
    (state) => state.notifications.notifications?.all
  );
  // console.log(JSON.stringify(notification));
  const notiMap = notification?.map(({ _id, folder }) => ({ _id, folder }));
  const notiFilter = notiMap?.filter(
    ({ _id, folder }) => _id !== undefined && folder !== undefined
  );
  // console.log(notiArr.map(({ _id, folder }) => folder[0]._id));
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (user?.accessToken) {
      getAllFolder(user?.accessToken, user?._id, isDispatch, axiosJWT);
      getNotification(user?.accessToken, user?._id, isDispatch, axiosJWT);
    }
  }, [user?.accessToken]);

  const ShowToast = state.isToast && (
    <Suspense fallback={<Loader />}>
      {isToastLoaded && (
        <Toast
          setToast={() => dispatch({ type: "isToast", payload: false })}
          message="Do you want to delete this folder ?"
          isDelete={true}
        />
      )}
    </Suspense>
  );
  // const notiLength = notiArr.length - 1;
  // const newNoti = notiArr?.flat().filter((item, index) => index !== notiLength);
  const noti = notiFilter
    ? notiFilter
        ?.flat()
        ?.map(({ _id, folder }) => (
          <ItemsPopOvers
            key={folder[0]._id}
            id={_id}
            icon={folder[0].icon}
            content={folder[0].name}
            color={folder[0].color}
          />
        ))
    : null;
  const ShowPopOversNoti = state.isPopOversNotificaton && (
    <Suspense fallback={<Loader />}>
      {isPopOverLoaded && (
        <PopOvers
          title="Notificaton"
          action={() =>
            dispatch({ type: "isPopOversNotificaton", payload: false })
          }
          item={noti}
        />
      )}
    </Suspense>
  );
  const PopOverProfile = (
    <Suspense fallback={<Loader />}>
      {isProfileCardLoaded && (
        <ProfileCard name={user?.username} img={user?.avatar}></ProfileCard>
      )}
    </Suspense>
  );

  const ShowPopOversAccount = state.isPopOversAccount && (
    <Suspense fallback={<Loader />}>
      {isPopOverLoaded && (
        <PopOvers
          title="Account"
          action={() => dispatch({ type: "isPopOversAccount", payload: false })}
          profile={PopOverProfile}
        />
      )}
    </Suspense>
  );
  const ShowSearchMember = state.isSearchMember && (
    <Suspense fallback={<Loader />}>
      <Modal title="Manage member" enableEdit={false}>
        {isAddMemberFormLoaded && <AddMemberForm />}
      </Modal>
    </Suspense>
  );
  const ShowAddFolderModal = state.isAddFolderModal && (
    <Suspense fallback={<Loader />}>
      <Modal title="Add folder" enableEdit={false}>
        {isAddFolderFormLoaded && <AddFolderForm />}
      </Modal>
    </Suspense>
  );
  const ShowAddNoteModal = state.isAddNoteModal && (
    <Suspense fallback={<Loader />}>
      <Modal title="Add note" enableEdit={false}>
        {isAddNoteFormLoaded && <AddNoteForm />}
      </Modal>
    </Suspense>
  );
  const ShowMoreNoteFeature = state.isShowMoreNote && (
    <Suspense fallback={<Loader />}>
      <Modal aNote={state.setNote} enableEdit={true}>
        {isShowMoreNoteLoaded && <ShowMoreNote aNote={state.setNote} />}
      </Modal>
    </Suspense>
  );
  const ShowUpdateFolderModal = state.isUpdateFolderModal && (
    <Suspense fallback={<Loader />}>
      <Modal title="Update folder" enableEdit={false}>
        {isUpdateFolderFormLoaded && <UpdateFolderForm />}
      </Modal>
    </Suspense>
  );
  const ShowEditProfile = state.isShowEditProfile && (
    <Suspense fallback={<Loader />}>
      <Modal title="Edit profile" enableEdit={false}>
        {isEditProfileLoaded && <EditProfile />}
      </Modal>
    </Suspense>
  );
  const ShowRightSideBar = (
    <Suspense fallback={<Loader />}>
      {isRightSideBarLoaded && <RightSideBar />}
    </Suspense>
  );
  return (
    <div className="overscroll-none">
      <Suspense fallback={<Loader />}>
        {ShowToast}
        {ShowPopOversNoti}
        {ShowPopOversAccount}
        <NavBar
          toValueChild={isParentValue}
          isClickHome={setIsParentValue}
          notification={notification ? notification : {}}
        />
        <div className="relative flex">
          {ShowEditProfile}
          {ShowUpdateFolderModal}
          {ShowSearchMember}
          {ShowAddFolderModal}
          {ShowAddNoteModal}
          {ShowMoreNoteFeature}
          {ShowRightSideBar}
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
