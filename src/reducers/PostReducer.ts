import { Post } from "../model/model.type";
import { Action, ActionType } from "../model/action.type";

export const postReducer = (state: Post[] = [], action: Action = { type: ActionType.DEFAULT }): Post[] => {

    switch (action.type) {
        case ActionType.ADD_POST:

            return [...state, action.post];
        case ActionType.SET_POSTS:

            return action.posts;
        case ActionType.UPDATE_POST:
            return state.map(element => {
                if (element.id !== action.post.id) {
                    return element
                }
                return action.post
            })
        case ActionType.DELETE_POST:
            return state.filter(element => element.id !== action.id);
        case ActionType.ADD_COMMENT:
            return state.map(element => {
                if (element.id === action.comment.post.id) {
                    return { ...element, comments: [...element.comments, { ...action.comment, post: element }] }
                }
                return element;
            });
        case ActionType.DELETE_COMMENT:
            return state.map(element => {
                if (element.id === action.comment.post.id) {
                    return { ...element, comments: element.comments.filter(com => com.id !== action.comment.id) }
                }
                return element;
            })
        default:
            return state;
    }

}