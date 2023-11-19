import React from "react";
import "./App.css";
import {useNavigate} from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/list');
    };

    return (
        <div className="builder-form">
            <button className='index' onClick={handleButtonClick}>MORDHEIM</button>
        </div>
    );
}

export default Home
