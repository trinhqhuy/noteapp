import BoxContent from "./BoxContent";
import { useSelector } from "react-redux";

const NoteArea = (props) => {
  // console.log(props.noteArray);
  // console.log(isNumber.state.is_idFolder);
  // const isNumber = useContext(ButtonContext);
  const noteList = useSelector((state) => state.notes.readAll?.listNote);

  return (
    <div className="">
      <div className="text-black font-bold text-xl px-10 pt-8 dark:text-white">
        Notes - {noteList?.length}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-5 m-3">
        {noteList?.map(({ _id, title, content }) => (
          <div key={_id}>
            <BoxContent title={title} content={content} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteArea;
