const Link = window.ReactRouterDOM.Link;
const useParams = window.ReactRouterDOM.useParams;
export default function SideNav(props) {
    const useLocation = window.ReactRouterDOM.useLocation;
    const { handle, id } = useParams();
    return <>
        <aside className="sidebar expand">
            <nav className="collapsed expand">
                {
                    props?.links?.map((link) => {
                        return <Link className={"navItems" + (useLocation().pathname === link?.path ? " --active" : "")} to={"/" + id + link?.path}>{link?.icon ? <i className={"dashboard-icons " + link?.icon}></i> : null} <span className="hiddenCollapsed">{link?.name}</span></Link>
                    })
                }
            </nav>
        </aside>
    </>
}