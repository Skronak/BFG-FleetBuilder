import {Link, Route,BrowserRouter as Router, Routes} from "react-router-dom";
import Home from "./Home";
import React from "react";
import {ArmyCreateForm} from "./ArmyCreateForm";

const App: React.FC = () => {
    return (
        <Router>
            {/*<nav>*/}
            {/*    <ul>*/}
            {/*        <li>*/}
            {/*            <Link to="/">Home</Link>*/}
            {/*        </li>*/}
            {/*        <li>*/}
            {/*            <Link to="/about">About</Link>*/}
            {/*        </li>*/}
            {/*        <li>*/}
            {/*            <Link to="/products">Products</Link>*/}
            {/*        </li>*/}
            {/*        <li>*/}
            {/*            <Link to="/contact">Contact</Link>*/}
            {/*        </li>*/}
            {/*    </ul>*/}
            {/*</nav>*/}
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/create" element={<ArmyCreateForm/>} />
        </Routes>
        </Router>
    );
};export default App;