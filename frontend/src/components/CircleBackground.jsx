const CircleBackground = (props) => {
    const {color1, color2} = props
    return <div className="fixed z-0 h-64 w-96 translate-y-[-50%] translate-x-[-50%] left-[50%] top-[50%]">
    <div className={`fixed z-0 rounded-full ${color1} blur-3xl w-44 h-44 top-[-150px] left-[170px] md:top-[-160px] md:left-[450px] lg:top-[-20px] lg:left-[200px] xl:top-[-110px] xl:left-[450px] animate-blob`}></div>
    <div className={`fixed z-0 rounded-full ${color2} blur-3xl w-32 h-32 md:bottom-[-150px] md:left-[400px] lg:bottom-[-205px] lg:left-[500px] xl:bottom-[-205px] xl:left-[500px] bottom-[-120px] left-[0px]`}></div>
  </div>
}
 
export default CircleBackground;