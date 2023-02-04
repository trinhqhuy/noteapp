import CircleBackground from "./CircleBackground";
import NoteArea from "./NoteArea";
import BoxContentPin from "./BoxContentPin";
import { useState, useContext } from "react";
import FloatBtn from "./FloatBtn";
import Girl from "../assets/illustrations/Girl.png";
import { readAllNote } from "../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAxios } from "../redux/createInstance";
import { loginSuccess } from "../redux/authSlice";
import { ButtonContext } from "../context/AppContext";

import { useEffect } from "react";
const MainArea = (props) => {
  const [elementRight, setElementRight] = useState(true);
  const isShow = props.toChild;
  const isNumber = useContext(ButtonContext);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const noteList = useSelector((state) => state.notes.readAll?.arrayNote);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(user, dispatch, loginSuccess);
  let axiosJWTReload = createAxios(user, dispatch, loginSuccess);
  const [isLoading, setTimerLoading] = useState(false);
  const handleClickFloatBtn = (isClick) => {
    props.sendValueAddButtonClick(isClick);
  };
  useEffect(() => {
    if (isNumber.state.isLoading) {
      setTimeout(
        () =>
          isNumber.setState({
            ...isNumber.state,
            isLoading: false,
          }),
        1000
      );
    }
  });
  //   console.log(props.toValueChild);
  return (
    <div className="w-full md:w-3/4 lg:w-4/5 xl:w-4/5 bg-[#BFDBFE] dark:bg-[#023e7d] rounded-tl-md">
      {isNumber.state.isClickSideBarItem ? (
        <div className="">
          {isNumber.state.isLoading ? (
            <div className="flex flex-row h-[calc(100vh_-_5rem)]  justify-center items-center overflow-y-auto">
              <div className=" w-4 h-4 inline-block rounded-full bg-[#1abc9c] animate-boucing-1"></div>
              <div className="w-4 h-4 inline-block rounded-full bg-[#ffd64a] animate-boucing-2"></div>
              <div className="w-4 h-4 inline-block rounded-full bg-[#e867af] animate-boucing-3"></div>
            </div>
          ) : (
            <>
              <CircleBackground color1="bg-middleBlue" color2="bg-greatGreen" />
              <div className="sticky z-8 h-[calc(100vh_-_5rem)] overflow-y-scroll">
                <div className="text-black dark:text-white font-bold text-xl px-10 pt-8">
                  Pin notes - 2
                </div>
                <div className="scrollbar-hidden px-[15vw] w-full flex snap-x overflow-x-auto self-center z-10">
                  <BoxContentPin id={isNumber.state.is_idFolder} />
                  <BoxContentPin />
                </div>
                <NoteArea noteArray={noteList} />
                <FloatBtn />
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="flex flex-col h-[calc(100vh_-_5rem)]  justify-center items-center overflow-y-auto">
          <img className="w-80 pb-5" src={Girl} alt="" />
          <span className="text-black text-xl font-bold">
            Choose a folder or add first folder
          </span>
        </div>
      )}
    </div>
  );
};

export default MainArea;
