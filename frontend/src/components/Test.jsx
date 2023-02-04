const Test = () => {
    const test = document.querySelector(".testfeature")
    const test1 = `<p>hello</p>`
    test.innerHTML = test1
    console.log(test)
    return <div className="testfeature">
    <label className=" text-black dark:text-white text-lg font-bold my-3">Password</label>
                <input type="password" className="text-black bg-lightBlue focus-visible:outline-none py-3 px-3 mb-5 w-96 min-w-full rounded-md" />
                <label className="text-black dark:text-white text-lg font-bold my-3">Re-Password</label>
                <input type="password" className="text-black bg-lightBlue focus-visible:outline-none py-3 px-3 w-96 min-w-full rounded-md" />
    </div>
}
 
export default Test;