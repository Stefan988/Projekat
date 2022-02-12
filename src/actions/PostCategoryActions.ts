import { Action, ActionType } from "../model/action.type"
import { PostCategory } from "../model/model.type"
import { Dispatch } from "redux"
import Axios from "axios"

export const fetchPostCategories = (cat: PostCategory): Action => {
    return {
        type: ActionType.FETCH_POST_CATEGORIES,
        categories: cat
    }
}
export const setActiveCategory = (cat?: PostCategory): Action => {
    return {
        type: ActionType.SET_ACTIVE_CATEGORY,
        category: cat ? cat.id : 0
    }
}
export const setCategories = (cat: PostCategory[]): Action => {
    return {
        type: ActionType.SET_CATEGORIES,
        categories: cat
    }
}
export const loadCategories = (dispach: Dispatch<Action>) => {
    return () => {
        return Axios.get('https://localhost:5000/postCategory').then(value => {
            dispach(setCategories(value.data));
        })
    }
}