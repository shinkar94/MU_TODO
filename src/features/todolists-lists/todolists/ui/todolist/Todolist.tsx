import React, {useCallback, useEffect} from 'react'
import {TodolistDomainType} from 'features/todolists-lists/todolists/model/todolists.reducer'
import {tasksThunks} from 'features/todolists-lists/tasks/model/tasks.reducer';
import {TaskType} from 'features/todolists-lists/todolists/api/todolists.api';
import {useActions} from 'common/hooks';
import {AddItemForm} from 'common/components'
import {FilterTasksButtons} from "./filterTaskButtons/FilterTasksButtons";
import {Tasks} from "../../../tasks/ui/Tasks";
import {TodolistTitle} from "./todolistTitle/todolistTitle";

type PropsType = {
	todolist: TodolistDomainType
	tasks: TaskType[]
}

export const Todolist = React.memo(function (props: PropsType) {
	const {fetchTasks, addTask} = useActions(tasksThunks)

	useEffect(() => {
		fetchTasks(props.todolist.id)
	}, [])

	const addTaskCallBack = async (title: string) => {
		await addTask({title: title,todolistId: props.todolist.id}).unwrap()
	}

	return <div>
		<TodolistTitle todolist={props.todolist}/>
		<AddItemForm addItem={addTaskCallBack} disabled={props.todolist.entityStatus === 'loading'}/>
		<Tasks todolist={props.todolist} tasks={props.tasks}/>
		<FilterTasksButtons todolist={props.todolist}/>
	</div>
})


