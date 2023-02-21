import { useContext, lazy, Suspense } from "react";
import Girl from "../assets/illustrations/Girl.png";
import Man from "../assets/illustrations/manshoulder.png";
import CircleBackground from "./CircleBackground";
import Spinner from "./Spinner";
import { useSelector } from "react-redux";
import Fade from "./Fade";
import useWait from "../hooks/useWait";
import { Store } from "../context/GobalState";
const BoxContentPin = lazy(() =>
  useWait(1000).then(() => import("./BoxContentPin"))
);
const NoteArea = lazy(() => useWait(1000).then(() => import("./NoteArea")));
const FloatBtn = lazy(() => useWait(1000).then(() => import("./FloatBtn")));
const MainArea = () => {
  const { state, dispatch } = useContext(Store);
  const noteList = useSelector((state) => state.notes.readAll?.listNote);
  const pinNote = noteList?.filter((note) => note.pin === true);
  // console.log(noteList);
  // console.log(pinNote);
  return (
    <div className="w-full md:w-3/4 lg:w-4/5 xl:w-4/5 bg-[#BFDBFE] dark:bg-[#023e7d] rounded-tl-md">
      {state.isSideBarItem ? (
        <>
          <CircleBackground color1="bg-middleBlue" color2="bg-greatGreen" />
          <Suspense
            fallback={
              <div className="flex flex-row h-[calc(100vh_-_5rem)] justify-center items-center overflow-y-auto transform-gpu">
                <Spinner />
              </div>
            }>
            <div className="sticky z-8 h-[calc(100vh_-_5rem)] overflow-y-scroll">
              {state.isLoading ? (
                <div className="flex flex-row h-[calc(100vh_-_5rem)] justify-center items-center overflow-y-auto transform-gpu">
                  <Spinner />
                </div>
              ) : (
                <Fade show={state.fade}>
                  <div className="text-black dark:text-white font-bold text-xl px-10 pt-8">
                    Pin notes - {pinNote?.length}
                  </div>
                  {pinNote?.length === 0 ? (
                    <div className="flex flex-col justify-center items-center overflow-y-auto">
                      <img
                        className="w-80 pb-5"
                        src={Man}
                        alt=""
                        loading="lazy"
                      />
                      <span className="text-black dark:text-white text-xl font-bold">
                        Empty pin note
                      </span>
                    </div>
                  ) : (
                    <div className="scrollbar-hidden px-[15vw] w-full flex snap-x overflow-x-auto self-center z-10">
                      {pinNote?.map((note) => (
                        <BoxContentPin key={note._id} aNote={note} />
                      ))}
                    </div>
                  )}
                  <NoteArea noteArray={noteList} />
                  <FloatBtn />
                </Fade>
              )}
            </div>
          </Suspense>
        </>
      ) : (
        <div className="flex flex-col h-[calc(100vh_-_5rem)]  justify-center items-center overflow-y-auto">
          <img className="w-80 pb-5" src={Girl} alt="" loading="lazy" />

          <span className="text-black dark:text-white text-xl font-bold">
            Choose a folder or add first folder
          </span>
        </div>
      )}
    </div>
  );
};

export default MainArea;
