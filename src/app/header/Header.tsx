import React, {FC} from 'react';
import {AppBar, Button, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {useActions} from "../../common/hooks";
import {authThunks} from "../../features/auth/auth.reducer";
import {useSelector} from "react-redux";
import {selectAppStatus} from "../app.selectors";

type HeaderType = {
    isLoggedIn: boolean
}

export const Header:FC<HeaderType> = (props) => {
    const {isLoggedIn} = props
    const status = useSelector(selectAppStatus)
    const {logout} = useActions(authThunks)
    const logoutHandler = () => logout({})
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <Menu/>
                </IconButton>
                <Typography variant="h6">
                    News
                </Typography>
                {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
            </Toolbar>
            {status === 'loading' && <LinearProgress/>}
        </AppBar>
    );
};