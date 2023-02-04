import { useState, useContext } from "react";
import { ButtonContext } from "../context/AppContext";
import { readAllNote } from "../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../redux/createInstance";
import { loginSuccess } from "../redux/authSlice";
import { useEffect } from "react";
const FolderItem = ({ folderArray }) => {
  const isNumber = useContext(ButtonContext);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const active = {
    backgroundColor: "#1D684A",
    color: "#ffff",
  };
  const inactive = {};
  const [selected, setSelected] = useState(0);
  const [isReset, setStateReset] = useState({});

  const handleClickButton = async (e, divNum, _id) => {
    e.preventDefault();
    setSelected(divNum);
    await readAllNote(user?.accessToken, _id, dispatch, axiosJWT);
    await isNumber.setState({
      ...isNumber.state,
      isLoading: true,
      isClickSideBarItem: true,
      isIdFolder: _id,
    });
  }; // need change another patten
  useEffect(() => {
    setStateReset({
      backgroundColor: "#374151",
      color: "#6b7280",
    });
  }, [isNumber.state.isReset]);
  return (
    <>
      {folderArray?.map(({ name, icon, color, _id }, idx) => (
        <div key={_id} className="my-3">
          <a
            className="flex items-center py-4 p-2 text-base font-normal bg-white dark:bg-gray-700 shadow-[2px_4px_20px_2px_#BFDBFE] dark:shadow-[2px_4px_20px_2px_#2a4582] text-gray-900 rounded-lg dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600 m-[11px] truncate ..."
            onClick={(e) => handleClickButton(e, idx + 1, _id)}
            style={selected == idx + 1 ? active : isReset}
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
