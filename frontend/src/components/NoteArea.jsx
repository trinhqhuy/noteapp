import BoxContent from "./BoxContent";
import { useSelector } from "react-redux";
const NoteArea = (props) => {
  // console.log(props.noteArray);
  // console.log(isNumber.state.is_idFolder);
  // const isNumber = useContext(ButtonContext);
  const noteList = useSelector((state) => state.notes.readAll?.listNote);
  const regularNote = noteList?.filter((note) => note.pin == false);
  // const [globalState, dispatch] = useGobalState(); //useReducer
  // const handleClick = () => dispatch({ type: "loading" });
  return (
    <div className="">
      {/* <button onClick={handleClick}>hi</button>
      {globalState.isLoading && <p>hi</p>} //useReducer*/}
      <div className="text-black font-bold text-xl px-10 pt-8 dark:text-white">
        Notes - {regularNote?.length}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-5 m-3">
        {regularNote?.map((note) => (
          <div key={note._id}>
            <BoxContent aNote={note} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteArea;
