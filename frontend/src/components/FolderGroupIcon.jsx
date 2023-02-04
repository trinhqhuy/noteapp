const FolderGroupItem = (props) => {
    const iconArray = [
        { name: "folder-open" },
        { name: "camera-retro" },
        { name: "folder" },
        { name: "hammer" },
        { name: "store" },
        { name: "cart-plus" },
        { name: "palette" },
        { name: "address-book" },
        { name: "flask" },
        { name: "camera" },
        { name: "book" },
        { name: "gear" },
        { name: "cloud" },
      ];
   const returnIconValue = (e) => {
    props.getName(e.target.value)
   }
    return <>
    <div className="scrollbar-hidden px-[15vw] w-full flex snap-x overflow-x-auto self-center">
        {iconArray.map(({name}) => (
           <div key={`11${name}`}>
             <input type="radio" value={name} id={`1${name}`} name="status" className="hidden peer" onClick={(e) => returnIconValue(e)}/>
            <label htmlFor={`1${name}`} className={`fa-solid fa-${name} text-xl m-4 mb-8 peer-checked:text-greatGreen cursor-pointer text-greatBlue`}>
           
            </label>
           </div>
        ))}
    </div>
    </>
}
 
export default FolderGroupItem;