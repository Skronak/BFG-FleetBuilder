import { NavLink, useNavigate} from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    return (
        <div>
            <NavLink to="/home" className={({ isActive }) => isActive? "link link-active":"link"}>Accueil</NavLink>
            <NavLink to="/list" className={({ isActive }) => isActive? "link link-active":"link"}>Mes listes</NavLink>
        </div>
    )
}