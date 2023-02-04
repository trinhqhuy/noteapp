import MenuButton from "./MenuButton";

const BoxContentPin = (props) => {
  const handleDelete = (id) => {
    props.id;
  };
  return (
    <div className="snap-center ">
      <div className="relative z-2 justify-end right-[20px] top-[30px] grid align-top">
        {/* <MenuButton /> */}
      </div>

      <div className="min-w-38 md:min-w-42 lg:min-w-48 xl:min-w-80 2xl:min-w-72 h-fit rounded-2xl md:rounded-3xl lg:rounded-3xl xl:rounded-3xl backdrop-blur-sm bg-white/40  backdrop-opacity-20 border-2 border-white  p-5 ">
        <div className="text-xl font-[450] break-all ">{props.title}</div>
        <div className=" block justify-items-left items-center text-md truncate ...">
          {props.content}
        </div>
      </div>
    </div>
  );
};

export default BoxContentPin;
