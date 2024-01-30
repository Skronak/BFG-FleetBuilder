import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import React from "react";
import {ArmyPage} from "@/pages/createArmy/ArmyPage";
import Header from "./pages/Header";
import ListArmyPage from "@/pages/armyList/ListArmyPage";
import HomePage from "./Home";

const App: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className='App'>
            <Header></Header>
                <Routes>
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/home" element={<HomePage/>} />
                    <Route path="/list" element={<ListArmyPage/>} />
                    <Route path="/create/:idRace" element={<ArmyPage/>} />
                    <Route path="/edit/:idArmy" element={<ArmyPage/>} />
                    <Route path="*" element={<Navigate to="/"/>} />
                </Routes>
            <button onClick={()=>navigate(-1)}>Précedent</button>
        </div>
    );
};export default App;