const Button = (props) => {
    const {textColor, bgColor, name} = props
    return <button className={`${textColor} ${bgColor}`}>
    {name}
</button> 
}
 
export default Button;