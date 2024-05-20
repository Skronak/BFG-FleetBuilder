import {Navigate, Route, Routes} from "react-router-dom";
import React from "react";
import {ArmyParentPage} from "@/pages/armyEdit/ArmyParentPage";
import FleetListPage from "@/pages/armySearch/FleetListPage.tsx";
import "./App.css";
import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import AtlasPage from "@/pages/Atlas/AtlasPage";

const App: React.FC = () => {
    return (
        <>
            <React.Suspense fallback="Loading...">
                <MantineProvider forceColorScheme={'dark'}>
                    <Routes>
                        <Route path="/" element={<FleetListPage/>} />
                        <Route path="/mordheimHelper" element={<FleetListPage/>} />
                        <Route path="/mordheimHelper/list" element={<FleetListPage/>} />
                        <Route path="/mordheimHelper/create/:idRace" element={<ArmyParentPage/>} />
                        <Route path="/mordheimHelper/edit/:idArmy" element={<ArmyParentPage/>} />
                        <Route path="/mordheimHelper/atlas" element={<AtlasPage/>} />
                        <Route path="*" element={<Navigate to="/"/>} />
                    </Routes>
                </MantineProvider>
            </React.Suspense>
        </>
    );
};

export default App;