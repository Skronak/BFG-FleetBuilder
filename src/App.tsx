import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Home from "./Home";
import React from "react";
import {CreateArmyPage} from "@/pages/createArmy/CreateArmyPage";
import Header from "./pages/Header";
import ListArmyPage from "@/pages/armyList/ListArmyPage";

const App: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className='App'>
            <Header></Header>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/home" element={<Home/>} />
                    <Route path="/list" element={<ListArmyPage/>} />
                    <Route path="/create/:idArmy" element={<CreateArmyPage/>} />
                    <Route path="*" element={<Navigate to="/"/>} />
                </Routes>
            <button onClick={()=>navigate(-1)}>Précedent</button>
        </div>
    );
};export default App;