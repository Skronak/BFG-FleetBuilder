import React, {useState} from "react";
import "./InputField.css";

function InputField({className}) {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState("<fleet name>");

    const toggleFrom = () => {
        setIsEditing(!isEditing);
    };
    const handleUpdate = evt => {
        evt.preventDefault();
        toggleFrom();
    };
    const handleChange = evt => {
        setValue(evt.target.value);
    };
    return isEditing ? (
            <div className={className}>
                <form className="Todo-edit-form" onSubmit={handleUpdate}>
                    <input onChange={handleChange} value={value} type="text"/>
                    <button>Save</button>
                </form>
            </div>
        ) : (
            <div className={className}>
                <li className={"Todo-task"}>
                    {value}
                </li>
                <div className="Todo-buttons">
                    <button onClick={toggleFrom}>
                        <i className="fas fa-pen"/>
                    </button>
                    <button>
                        <i className="fa fa-plus-circle"></i>
                    </button>
                </div>
            </div>
        );
}

export default InputField;