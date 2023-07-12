import React, {useCallback, useEffect} from 'react'
import {TodolistDomainType} from 'features/todolists-lists/todolists/todolists.reducer'
import {tasksThunks} from 'features/todolists-lists/tasks/tasks.reducer';
import {TaskType} from 'features/todolists-lists/todolists/todolists.api';
import {useActions} from 'common/hooks';
import {AddItemForm} from 'common/components'
import {FilterTasksButtons} from "../FilterTasksButtons";
import {Tasks} from "../../tasks/Tasks";
import {TodolistTitle} from "../TodolistTitle";

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


