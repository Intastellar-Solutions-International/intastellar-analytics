import "./Style.css";
export default function Text(props){
    return(
        <>
            <input className="intInput" placeholder={props?.placeholder} autoComplete="off" type={
                props?.type ? props.type : "text"
            } pattern={props?.pattern ? props.pattern : ""} onChange={props.onChange} />
        </>
    )
}