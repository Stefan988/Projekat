import { Action, ActionType } from "../model/action.type";

export const titleReducer = (state: string = '', action: Action = { type: ActionType.DEFAULT }) => {
    if (action.type === ActionType.SET_TITLE) {
        return action.title;
    }

    return state;
}