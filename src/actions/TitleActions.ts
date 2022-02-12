import { Action, ActionType } from "../model/action.type"

export const setTitle = (title: string): Action => {
    return {
        type: ActionType.SET_TITLE,
        title: title
    }
}