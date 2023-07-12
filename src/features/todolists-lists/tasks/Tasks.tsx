import React, {FC} from 'react';
import {Task} from "./Task/Task";
import {TaskStatuses} from "../../../common/enums";
import {TodolistDomainType} from "../todolists/todolists.reducer";
import {TaskType} from "../todolists/todolists.api";
type PropsType = {
    todolist: TodolistDomainType
    tasks: TaskType[]
}
export const Tasks:FC<PropsType> = (props) => {
    const {todolist, tasks} = props
    let tasksForTodolist = tasks

    if (todolist.filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (todolist.filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
    }
    return (
        <div>
            {tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={todolist.id}/>)}
        </div>
    );
};