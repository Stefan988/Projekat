import { PostCategory } from "../model/model.type";
import { Action, ActionType } from "../model/action.type";

export const postCategoryReducer = (state: PostCategory[] = [], action: Action = { type: ActionType.DEFAULT }) => {
    switch (action.type) {
        case ActionType.FETCH_POST_CATEGORIES:
            return [...state, action.categories];
        case ActionType.SET_CATEGORIES:
            return action.categories;
    }
    return state;
}
export const activeCategoryReducer = (state: number = 0, action: Action = { type: ActionType.DEFAULT }) => {
    switch (action.type) {
        case ActionType.SET_ACTIVE_CATEGORY:
            return action.category === state ? 0 : action.category;
        default:
            return state;
    }
}