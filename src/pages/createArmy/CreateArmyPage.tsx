import React, {useEffect, useState} from "react";
import ArmyForm from "@/pages/createArmy/ArmyForm";
import {Link, useParams} from "react-router-dom";

export function CreateArmyPage() {
    const [showEditList, setShowEditList] = useState(true);
    let {idArmy} = useParams();
    const getImageUrl = (name: string) => {
        return new URL(`./assets/${name}`, import.meta.url).href;
    }

    useEffect(() => {
        console.log(`/${idArmy}`);
    }, []);

    return (showEditList && idArmy? (
        <ArmyForm armyId={+idArmy}/>
    ) : (
        <div className="builder-form">
            <p>{idArmy}</p>

            <Link to="/">Home</Link>
        </div>
    ))
}