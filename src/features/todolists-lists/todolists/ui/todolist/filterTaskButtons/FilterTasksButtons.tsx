import React, {useCallback} from 'react';
import {FilterValuesType, TodolistDomainType, todolistsActions} from "../../../model/todolists.reducer";
import {Button} from "@mui/material";
import {useActions} from "../../../../../../common/hooks";
import {FC} from "react";

type Props = {
    todolist: TodolistDomainType
}

export const FilterTasksButtons: FC<Props> = ({todolist}) => {
    const {changeTodolistFilter} = useActions(todolistsActions)

    const changeFilterHandler = (filter: FilterValuesType) => {
        changeTodolistFilter({filter, id: todolist.id})
    }

    return (
        <div style={{paddingTop: '10px'}}>
            <Button variant={todolist.filter === 'all' ? 'outlined' : 'text'}
                    onClick={() => changeFilterHandler('all')}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={todolist.filter === 'active' ? 'outlined' : 'text'}
                    onClick={() => changeFilterHandler('active')}
                    color={'primary'}>Active
            </Button>
            <Button variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={() => changeFilterHandler('completed')}
                    color={'secondary'}>Completed
            </Button>
        </div>
    )
}