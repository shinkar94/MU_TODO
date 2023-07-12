import React from 'react';
import {Route, Routes} from "react-router-dom";
import {TodolistsList} from "../../features/todolists-lists/TodolistsList";
import {Login} from "../../features/auth/Login/Login";
import {Container} from "@mui/material";

export const Routing = () => {
    return (
        <Container fixed>
            <Routes>
                <Route path={'/'} element={<TodolistsList/>}/>
                <Route path={'/login'} element={<Login/>}/>
            </Routes>
        </Container>
    );
};
