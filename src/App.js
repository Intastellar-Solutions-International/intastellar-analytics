import "./App.css";
import Header from "./components/header/header";
import Login from "./Login/Login";
import Nav from "./components/header/Nav";
const { useState, useEffect, useRef } = React;
const Router = window.ReactRouterDOM.BrowserRouter;
const Route =  window.ReactRouterDOM.Route;
const Switch = window.ReactRouterDOM.Switch;
const Redirect = window.ReactRouterDOM.Redirect;

import Dashboard from "./pages/Dashboard/Dashboard.js";
import Websites from "./pages/Domains/index.js";
export default function App() {
    const [dashboardView, setDashboardView] = useState("GDPR Cookiebanner");

    if (JSON.parse(localStorage.getItem("globals"))?.token !== undefined || JSON.parse(localStorage.getItem("globals"))?.status) {
        return (
            <>
                <Router>
                    <Header />
                    <div className="main-grid"> 
                         <Nav />
                        <Switch>
                            <Route path="/dashboard" exact>
                                <Dashboard dashboardView={dashboardView} setDashboardView={setDashboardView} />
                            </Route>
                            <Route path="/domains" exact>
                                <Websites />
                            </Route>
                            <Redirect to="/login" />
                        </Switch>
                    </div>
                </Router>
            </>
        )
    } else if(JSON.parse(localStorage.getItem("globals"))?.status == undefined || JSON.parse(localStorage.getItem("globals"))?.status != "admin") {
        return (
            <Router path="/login" exact>
                <Login />
            </Router>
        )
    }
}