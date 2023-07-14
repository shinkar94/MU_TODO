import React, {FC, useCallback} from 'react';
import {EditableSpan} from "../../../../../../common/components";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useActions} from "../../../../../../common/hooks";
import {TodolistDomainType, todolistsThunks} from "../../../model/todolists.reducer";

type PropsType = {
    todolist: TodolistDomainType
}

export const TodolistTitle:FC<PropsType> = (props) => {
    const {todolist} = props
    const {changeTodolistTitle: changeTodolistTitleThunk, removeTodolist: removeTodolistThunk} = useActions(todolistsThunks)
    const changeTodolistTitle = useCallback((title: string) => {
        changeTodolistTitleThunk({id: todolist.id,title: title})
    }, [todolist.id])
    const removeTodolist = () => {
        removeTodolistThunk(props.todolist.id)
    }
    return (
        <h3><EditableSpan value={todolist.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist} disabled={todolist.entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </h3>
    );
};