import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Home from "./Home";
import React from "react";
import {ArmyCreateForm} from "./ArmyCreateForm";
import Header from "./pages/Header";
import ArmyList from "./pages/ArmyList";

const App: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className='App'>
            <Header></Header>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/home" element={<Home/>} />
                    <Route path="/list" element={<ArmyList/>} />
                    <Route path="/create" element={<ArmyCreateForm/>} />
                    <Route path="*" element={<Navigate to="/"/>} />
                </Routes>
            <button onClick={()=>navigate(-1)}>Précedent</button>
        </div>
    );
};export default App;