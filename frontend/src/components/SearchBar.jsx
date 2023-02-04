const SearchBar = () => {
    return <div className="relative">
    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
        <div className="pr-2 border-r-2 border-[#0E6EFC] dark:border-gray-600"><i className="fa-solid fa-magnifying-glass text-[#0E6EFC] dark:text-white"></i></div>
    </div>
    <input type="search" id="search" className="block p-3 pl-16 w-full text-sm text-white bg-[#BFDBFE] rounded-lg placeholder-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:shadow-[2px_4px_20px_2px_#2a4582] focus-visible:outline-none" placeholder="Search" required=""/>
    
</div>
}
 
export default SearchBar;