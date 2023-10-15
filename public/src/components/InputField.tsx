import {useState} from "react";
import "./InputField.css";

interface Props {
    subClass: string
}

export default function InputField({subClass}: Props) {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState("<fleet name>");

    const toggleFrom = () => {
        setIsEditing(!isEditing);
    };
    const handleUpdate = (evt: { preventDefault: () => void; }) => {
        evt.preventDefault();
        toggleFrom();
    };
    const handleChange = (evt: { target: { value: React.SetStateAction<string>; }; }) => {
        setValue(evt.target.value);
    };
    return isEditing ? (
            <div className={subClass}>
                <form className="Todo-edit-form" onSubmit={handleUpdate}>
                    <input onChange={handleChange} value={value} type="text"/>
                    <button>Save</button>
                </form>
            </div>
        ) : (
            <div className={subClass}>
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