import { NavLink, useNavigate} from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    return (
        <div>
            <NavLink to="/home" className={({ isActive }) => isActive? "link link-active":"link"}>Home</NavLink>
            <NavLink to="/list" className={({ isActive }) => isActive? "link link-active":"link"}>List</NavLink>
            <NavLink to="/create" className={({ isActive }) => isActive? "link link-active":"link"}>Creation</NavLink>
        </div>
    )
}