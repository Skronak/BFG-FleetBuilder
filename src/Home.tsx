import React from "react";
import "./App.css";
import {useNavigate} from "react-router-dom";

export default function HomePage() {

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
