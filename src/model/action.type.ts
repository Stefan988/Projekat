export enum ActionType {
    LOGIN = 'login',
    SIGN_UP = 'signup',
    SET_POSTS = 'sp',
    ADD_POST = 'ap',
    DEFAULT = 'def',
    FETCH_POST_CATEGORIES = 'fpc',
    SET_ACTIVE_CATEGORY = 'ac',
    SET_CATEGORIES = 'setCategories',
    DELETE_POST = 'delpost',
    LOGOUT = 'logout',
    ADD_COMMENT = 'add comment',
    DELETE_COMMENT = 'delete commetn',
    UPDATE_POST = 'update post',
    SET_TITLE = 'set title'

}

export interface Action {
    type: ActionType,
    [key: string]: any
}