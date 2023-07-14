import {TaskType} from "../../todolists/api/todolists.api";

export type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}