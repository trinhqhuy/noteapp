import MenuButton from "./MenuButton";
import { useContext } from "react";
import { Store } from "../context/GobalState";

const BoxContentPin = (props) => {
  const { state, dispatch } = useContext(Store);
  return (
    <a
      className="snap-center m-2"
      onClick={() => {
        dispatch({ type: "isShowMoreNote", payload: true });
        dispatch({ type: "setNote", payload: { setNote: props.aNote } });
      }}>
      <div className="relative z-10 left-[-5px] top-[20px] grid align-top">
        <i className="fa-solid fa-star text-greatRed text-2xl"></i>
      </div>

      <div className="w-48 h-fit rounded-2xl md:rounded-3xl lg:rounded-3xl xl:rounded-3xl backdrop-blur-sm bg-white/40  backdrop-opacity-20 border-2 border-white  p-5 transform-gpu ">
        {props.aNote.title && props.aNote.content !== "" ? (
          <>
            <div className="text-xl font-[450] break-all">
              {props.aNote.title}
            </div>
            <div className=" block justify-items-left items-center text-md truncate ...">
              {props.aNote.content}
            </div>
          </>
        ) : (
          <div className="text-xl font-[450] ">Empty note</div>
        )}
      </div>
    </a>
  );
};

export default BoxContentPin;
