import { createAxios } from "../redux/createInstance";
import { loginSuccess } from "../redux/authSlice";
import { searchMember } from "../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { Store } from "../context/GobalState";

const SearchBar = (props) => {
  const { state, dispatch } = useContext(Store);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [isName, setName] = useState("");
  const isDispatch = useDispatch();
  let axiosJWT = createAxios(user, isDispatch, loginSuccess);
  useEffect(() => {
    if (isName != "") {
      const timer = setTimeout(() => {
        searchMember(user?.accessToken, isName, isDispatch, axiosJWT)
          .then((data) => {
            dispatch({ type: "isSearchedMember", payload: data.data });
            dispatch({ type: "resSearch", payload: data.status });
          })
          .catch((err) => console.log(err));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isName]);
  return (
    <div className="relative">
      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
        <div className="pr-2 border-r-2 border-[#0E6EFC] dark:border-gray-600">
          <i className="fa-solid fa-magnifying-glass text-[#0E6EFC] dark:text-white"></i>
        </div>
      </div>
      <input
        type="search"
        id="search"
        autoComplete="off"
        value={isName}
        onChange={(e) => {
          setName(e.target.value);
        }}
        className="block p-3 pl-16 w-full text-sm text-white bg-[#BFDBFE] rounded-lg placeholder-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-700 dark:text-white shadow-[2px_4px_20px_2px_#BFDBFE] dark:shadow-[2px_4px_20px_2px_#2a4582] focus-visible:outline-none"
        placeholder="Search"
        required=""
      />
    </div>
  );
};

export default SearchBar;
