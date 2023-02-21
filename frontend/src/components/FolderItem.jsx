import { useState, useContext, startTransition } from "react";
import { readAllNote } from "../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../redux/createInstance";
import { loginSuccess } from "../redux/authSlice";
import { useEffect } from "react";
import { Store } from "../context/GobalState";
import { useMemo } from "react";

const FolderItem = ({ folderArray }) => {
  const { state, dispatch } = useContext(Store);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const isDispatch = useDispatch();
  let axiosJWT = createAxios(user, isDispatch, loginSuccess);
  const active = {
    backgroundColor: "#1D684A",
    color: "#ffff",
  };
  const inactive = {};
  const [selected, setSelected] = useState(0);
  const handleClickButton = async (e, divNum, id) => {
    e.preventDefault();
    setSelected(divNum);
    await dispatch({ type: "isRightSideBar", payload: false });
    await dispatch({ type: "isLoading" });
    await dispatch({ type: "isSideBarItem", payload: true });
    await dispatch({ type: "fade" });
    await dispatch({ type: "idFolder", payload: { id: id } });
    startTransition(() => {
      readAllNote(user?.accessToken, id, isDispatch, axiosJWT)
        .then(async () => {
          await dispatch({ type: "isLoading" });

          await dispatch({ type: "fade" });

          await dispatch({ type: "idFolder", payload: { id: id } });
        })
        .catch(() => dispatch({ type: "fade" }));
    });
  };
  const setReset = () => {
    setSelected(-1);
  };
  // useEffect(() => {
  //   setReset();
  // }, [state.isReset]);
  useMemo(() => {
    setReset();
  }, [state.isReset]);
  return (
    <>
      {folderArray?.map(({ _id, name, icon, color }, idx) => (
        <div key={_id} className="my-3">
          <a
            className="flex items-center py-4 p-2 text-base font-normal bg-white dark:bg-gray-700 transform-gpu shadow-[2px_4px_20px_2px_#BFDBFE] dark:shadow-[2px_4px_20px_2px_#2a4582] text-gray-900 rounded-lg dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600 m-[11px] truncate ..."
            onClick={(e) => handleClickButton(e, idx + 1, _id)}
            style={selected == idx + 1 ? active : inactive}
            href="">
            <i
              className={`fa-solid fa-${icon} mx-2`}
              style={{
                color: color,
              }}></i>
            <span className="flex-1 ml-3 whitespace-nowrap text-xl font-medium truncate ...">
              {name}
            </span>
          </a>
        </div>
      ))}
    </>
  );
};

export default FolderItem;
