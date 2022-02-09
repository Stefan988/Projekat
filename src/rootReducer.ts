import { combineReducers } from "redux";
import { postReducer } from './reducers/PostReducer'
import { postCategoryReducer, activeCategoryReducer } from "./reducers/PostCategoryReducer";
import { userReducer } from "./reducers/UserReducer";
import { titleReducer } from "./reducers/TitleReducer";
export default combineReducers({
    posts: postReducer,
    postCategories: postCategoryReducer,
    selectedCategoryId: activeCategoryReducer,
    user: userReducer,
    title: titleReducer
});