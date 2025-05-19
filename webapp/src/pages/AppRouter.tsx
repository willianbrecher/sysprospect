import type { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./Register/Register";
import Layout from "../components/Layout/Layout";
import LeadRouter from "./Lead/LeadRouter";

const AppRouter: FC = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Register />} />
                <Route path="/Leads/*" element={<LeadRouter />} />
            </Route>
        </Routes>
    );
}

export default AppRouter;