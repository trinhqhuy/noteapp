const Profile = (props) => {
  return (
    <div className="flex flex-row items-center justify-center">
      <div className="w-8 h-8 m-6 bg-orange-500 text-center rounded-full flex justify-center items-center">
        <span className="text-white text-center">H</span>
      </div>
      {/* <span className="invisible md:visible lg:visible xl:visible text-white m-5">{props.sendName}</span> */}
    </div>
  );
};

export default Profile;
