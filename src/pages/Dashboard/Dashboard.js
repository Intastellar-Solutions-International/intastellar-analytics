const { useState, useEffect, useRef, useContext } = React;
import TopWidgets from "../../Components/widget/TopWidgets.js";
import useFetch from "../../Functions/FetchHook";
import Fetch from "../../Functions/fetch";
import API from "../../API/api";
import Widget from "../../Components/widget/widget";
import AddDomain from "../../Components/AddDomain/AddDomain";
import {Loading, CurrentPageLoading} from "../../Components/widget/Loading";
import "./Style.css";
import Map from "../../Components/Charts/WorldMap/WorldMap.js";
import { DomainContext, OrganisationContext } from "../../App.js";

export default function Dashboard(props){
    document.title = "Dashboard | Intastellar Analytics";
    const [currentDomain, setCurrentDomain] = useContext(DomainContext);
    const [organisation, setOrganisation] = useContext(OrganisationContext);
    const dashboardView = props.dashboardView;
    let url = API.gdpr.getInteractions.url;
    let method = API.gdpr.getInteractions.method;
    let header = API.gdpr.getInteractions.headers;

    if(dashboardView === "GDPR Cookiebanner") {
        API.gdpr.getInteractions.headers.Domains = currentDomain;
        url = API.gdpr.getInteractions.url;
        method = API.gdpr.getInteractions.method;
        header = API.gdpr.getInteractions.headers;
    };
    const [loading, data, error, getUpdated] = useFetch(5, url, method, header);

    return (loading && localStorage.getItem("domains") == "undefined") ? (
        <CurrentPageLoading />
    ) : (localStorage.getItem("domains") == "undefined") ? (
        <>
            <div className="dashboard-content">
                <AddDomain />
            </div>
        </>
    ) : (
        <>
            <div className="dashboard-content">
                <h2>Dashboard</h2>
                <p>Viewing all data for: {(organisation != null) ? JSON.parse(organisation).name : null}</p>
                {
                    (dashboardView === "GDPR Cookiebanner" && organisation != null &&  JSON.parse(organisation).id == 1) ? <TopWidgets dashboardView={dashboardView} API={{
                        url: API.gdpr.getTotalNumber.url,
                        method: API.gdpr.getTotalNumber.method,
                        header: API.gdpr.getTotalNumber.headers 
                    }} /> : null
                }
                <div className="">
                    <h2>Data of user interaction</h2>
                    <p>Updated: {getUpdated}</p>
                    {(loading) ? <Loading /> : <Widget totalNumber={data.Total.toLocaleString("de-DE")} overviewTotal={ true } type="Total interactions" /> }
                </div>
                <div className="grid-container grid-3">
                    {(loading) ? <Loading /> : <Widget totalNumber={data?.Accepted.toLocaleString("de-DE") + "%"} type="Accepted cookies" />}
                    {(loading) ? <Loading /> : <Widget totalNumber={ data?.Declined.toLocaleString("de-DE") + "%"} type="Declined cookies" /> }
                </div>
                <div className="grid-container grid-3">
                    {(loading) ? <Loading /> : <Widget totalNumber={data?.Marketing.toLocaleString("de-DE") + "%"} type="Accepted only Marketing" />}
                    {(loading) ? <Loading /> : <Widget totalNumber={data?.Functional.toLocaleString("de-DE") + "%"} type="Accepted only Functional" />}
                    {(loading) ? <Loading /> : <Widget totalNumber={data?.Statics.toLocaleString("de-DE") + "%"} type="Accepted only Statics" />}
                    {/* {(!data) ? <Loading /> : <Pie data={{
                        Accepted: data.Accepted,
                        Declined: data.Declined,
                        Marketing: data.Marketing,
                        Functional: data.Functional,
                        Statics: data.Statics
                    }} />} */}
                </div>
                <div>
                    <section>
                        {(loading) ? <Loading /> :
                            <section>
                                <h3>User interactions based on country</h3>
                                <p>Updated: {getUpdated}</p>
                                {
                                    <Map data={{
                                        Marketing: data.Marketing.toLocaleString("de-DE"),
                                        Functional: data.Functional.toLocaleString("de-DE"),
                                        Statistic: data.Statics.toLocaleString("de-DE"),
                                        Accepted: data.Accepted.toLocaleString("de-DE"),
                                        Declined: data.Declined.toLocaleString("de-DE"),
                                        Countries: data.Countries
                                    }} />
                                }
                            </section>
                        }
                    </section>
                </div>
                {/* <div className="grid-container grid-3 widget">
                    {(!data) ? <Loading /> :
                    <PieChart data={{
                        Marketing: data.Marketing,
                        Functional: data.Functional,
                        Statistic: data.Statics,
                        Accepted: data.Accepted,
                        Declined: data.Declined
                        }} />
                    }
                </div> */}
            </div>
        </>
    )
}