import MenuButton from "./MenuButton";

const BoxContentPin = (props) => {
  const handleDelete = (id) => {
    props.id;
  };
  return (
    <div className="snap-center m-5">
      <div className="relative z-10 left-[-5px] top-[50px] grid align-top">
        <i className="fa-solid fa-star text-greatRed text-2xl"></i>
      </div>
      <div className="relative z-2 left-[200px] top-[40px] grid align-top">
        <MenuButton />
      </div>

      <div className="w-fit min-w-[30rem] h-fit rounded-2xl md:rounded-3xl lg:rounded-3xl xl:rounded-3xl backdrop-blur-sm bg-white/40  backdrop-opacity-20 border-2 border-white grid justify-items-center items-center p-5 text-xl">
        {props.id} Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
        rerum amet necessitatibus. Ratione quam saepe cumque molestias soluta,
        quia adipisci, expedita, nam id repudiandae eaque dicta impedit deleniti
        dolore asperiores.
      </div>
    </div>
  );
};

export default BoxContentPin;
