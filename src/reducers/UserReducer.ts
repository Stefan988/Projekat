import { User } from "../model/model.type";
import { Action, ActionType } from "../model/action.type";

export const userReducer = (state: User | null = null, action: Action = { type: ActionType.DEFAULT }) => {
    switch (action.type) {
        case ActionType.LOGIN:
            return action.user;

        case ActionType.LOGOUT:
            return null;
        default:
            return state;
    }
}