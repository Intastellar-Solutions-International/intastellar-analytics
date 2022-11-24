import Widget from "./widget";
import useFetch from "../../Functions/FetchHook";
import Loading from "./Loading";

export default function TopWidgets(props) {
    
    const APIUrl = props.API.url;
    const APIMethod = props.API.method;
    const APIHeader = props.API.header;

    const [loading, data, error] = useFetch(APIUrl, APIMethod, APIHeader);
    if (data === "Err_Login_Expired") {
        localStorage.removeItem("globals");
        window.location.href = "/login";
        return;
    }

    return (
        <>
            {(loading) ? <Loading /> : <Widget overviewTotal={ true } totalNumber={ data.Total } type="Website" /> }
            {(loading) ? <Loading /> : <Widget totalNumber={ data.JS + "%" } type="JS" /> }
            {(loading) ? <Loading /> : <Widget totalNumber={ data.WP + "%" } type="WordPress" /> }
        </>
    )
}